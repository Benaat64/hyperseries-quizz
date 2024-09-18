import { motion } from "framer-motion";

interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface ResultCardProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  userAnswers: string[];
  questions: Question[];
}

export default function ResultCard({
  score,
  totalQuestions,
  onRestart,
  userAnswers,
  questions,
}: ResultCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <h2 className="text-2xl font-semibold mb-4">Quiz Results</h2>
      <p className="text-lg mb-4">
        Your score: <span className="font-bold">{score}</span> out of{" "}
        {totalQuestions}
      </p>
      <div className="space-y-4 mb-6">
        {questions.map((q, index) => (
          <div key={index} className="border-b pb-2">
            <p
              className="font-medium"
              dangerouslySetInnerHTML={{ __html: q.question }}
            ></p>
            <p className="text-sm">
              Your answer:{" "}
              <span
                className={
                  userAnswers[index] === q.correct_answer
                    ? "text-green-600"
                    : "text-red-600"
                }
                dangerouslySetInnerHTML={{ __html: userAnswers[index] }}
              ></span>
            </p>
            {userAnswers[index] !== q.correct_answer && (
              <p className="text-sm text-green-600">
                Correct answer:{" "}
                <span
                  dangerouslySetInnerHTML={{ __html: q.correct_answer }}
                ></span>
              </p>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={onRestart}
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
      >
        Restart Quiz
      </button>
    </motion.div>
  );
}
