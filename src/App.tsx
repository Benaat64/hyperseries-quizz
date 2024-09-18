import { useState, useEffect } from "react";
import QuizCard from "./components/QuizCard";
import ResultCard from "./components/ResultCard";
import ProgressBar from "./components/ProgressBar";

interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY = 1000;

export default function App() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchQuestionsWithRetry();
  }, []);

  const fetchQuestionsWithRetry = async (
    retryCount = 0,
    delay = INITIAL_RETRY_DELAY
  ) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(
        "https://opentdb.com/api.php?amount=5&type=multiple"
      );

      if (response.status === 429 && retryCount < MAX_RETRIES) {
        console.log(`Rate limited. Retrying in ${delay / 1000} seconds...`);
        setTimeout(
          () => fetchQuestionsWithRetry(retryCount + 1, delay * 2),
          delay
        );
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.response_code === 0 && data.results && data.results.length > 0) {
        setQuestions(data.results);
        setIsLoading(false);
      } else {
        throw new Error("Failed to fetch questions or no questions returned");
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
      setError("Failed to load questions. Please try again.");
      setIsLoading(false);
    }
  };

  const handleAnswer = (selectedAnswer: string) => {
    if (currentQuestion < questions.length) {
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
    fetchQuestionsWithRetry();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        <p className="text-white text-2xl">Loading questions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <p className="text-red-600 text-xl mb-4">{error}</p>
          <button
            onClick={restartQuiz}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
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
