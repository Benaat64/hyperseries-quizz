import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import QuizCard from "./components/QuizCard";
import ResultCard from "./components/ResultCard";
import ProgressBar from "./components/ProgressBar";

interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

const fetchQuestions = async (): Promise<Question[]> => {
  const response = await fetch(
    "https://opentdb.com/api.php?amount=5&type=multiple"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch questions");
  }
  const data = await response.json();
  return data.results;
};

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  const {
    data: questions,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["questions"],
    queryFn: fetchQuestions,
    refetchOnWindowFocus: false,
    retry: 3,
  });

  const handleAnswer = (selectedAnswer: string) => {
    if (questions && currentQuestion < questions.length) {
      const isCorrect =
        selectedAnswer === questions[currentQuestion].correct_answer;
      if (isCorrect) {
        setScore(score + 1);
      }
      setUserAnswers([...userAnswers, selectedAnswer]);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResult(true);
      }
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setUserAnswers([]);
    refetch();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        <p className="text-white text-2xl">Loading questions...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <p className="text-red-600 text-xl mb-4">
            Failed to load questions. Please try again.
          </p>
          <button
            onClick={() => refetch()}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        <p className="text-white text-2xl">
          No questions available. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-white text-center mb-8">
          Hyperseries Quizz
        </h1>
        <ProgressBar current={currentQuestion + 1} total={questions.length} />
        {!showResult ? (
          <QuizCard
            question={questions[currentQuestion]}
            onAnswer={handleAnswer}
            currentQuestion={currentQuestion}
            totalQuestions={questions.length}
          />
        ) : (
          <ResultCard
            score={score}
            totalQuestions={questions.length}
            onRestart={restartQuiz}
            userAnswers={userAnswers}
            questions={questions}
          />
        )}
      </div>
    </div>
  );
}
