import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Question } from "@/types/game";

interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: string) => void;
  disabled?: boolean;
}

export const QuestionCard = ({ question, onAnswer, disabled }: QuestionCardProps) => {
  const getOptionColor = (option: string) => {
    if (question.type === 'color') {
      const colorMap: Record<string, string> = {
        'Red': 'bg-red-500',
        'Blue': 'bg-blue-500',
        'Green': 'bg-green-500',
        'Yellow': 'bg-yellow-400',
        'Orange': 'bg-orange-500',
        'Purple': 'bg-purple-500',
        'Pink': 'bg-pink-400',
        'Black': 'bg-gray-900',
        'White': 'bg-white border-4 border-gray-300',
      };
      return colorMap[option] || '';
    }
    return '';
  };

  const getShapeIcon = (shape: string) => {
    const shapes: Record<string, JSX.Element> = {
      'Circle': <div className="w-16 h-16 bg-primary rounded-full" />,
      'Square': <div className="w-16 h-16 bg-secondary rounded-lg" />,
      'Triangle': (
        <div className="w-0 h-0 border-l-[32px] border-l-transparent border-r-[32px] border-r-transparent border-b-[56px] border-b-accent" />
      ),
      'Rectangle': <div className="w-20 h-12 bg-primary rounded-lg" />,
      'Star': <div className="text-5xl">⭐</div>,
    };
    return shapes[shape] || null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="p-8 bg-card/95 backdrop-blur-sm border-4 border-border shadow-large">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-10 text-foreground"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          {question.question}
        </motion.h2>
        
        <div className="grid grid-cols-2 gap-6">
          {question.options.map((option, index) => (
            <motion.div
              key={option}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <Button
                size="lg"
                onClick={() => onAnswer(option)}
                disabled={disabled}
                className="w-full h-32 text-xl md:text-2xl font-bold transition-all duration-300 bg-gradient-primary hover:scale-105 hover:shadow-medium disabled:opacity-50 disabled:cursor-not-allowed flex flex-col items-center justify-center gap-3"
              >
                {question.type === 'color' && (
                  <div className={`w-16 h-16 rounded-full shadow-lg ${getOptionColor(option)}`} />
                )}
                {question.type === 'shape' && getShapeIcon(option)}
                <span className="text-primary-foreground">{option}</span>
              </Button>
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
};
