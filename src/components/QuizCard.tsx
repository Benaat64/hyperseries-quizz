import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface QuizCardProps {
  question: Question;
  onAnswer: (answer: string) => void;
  currentQuestion: number;
  totalQuestions: number;
}

export default function QuizCard({
  question,
  onAnswer,
  currentQuestion,
  totalQuestions,
}: QuizCardProps) {
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    if (question && question.incorrect_answers) {
      const allOptions = [
        ...question.incorrect_answers,
        question.correct_answer,
      ];
      setOptions(shuffleArray(allOptions));
    }
  }, [question]);

  const shuffleArray = (array: string[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  if (!question) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <h2
        className="text-2xl font-semibold mb-4"
        dangerouslySetInnerHTML={{ __html: question.question }}
      ></h2>
      <div className="space-y-3">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(option)}
            className="w-full text-left p-3 rounded-md bg-gray-100 hover:bg-blue-100 transition-colors duration-300"
            dangerouslySetInnerHTML={{ __html: option }}
          ></button>
        ))}
      </div>
      <p className="mt-4 text-gray-600 text-sm">
        Question {currentQuestion + 1} of {totalQuestions}
      </p>
    </motion.div>
  );
}
