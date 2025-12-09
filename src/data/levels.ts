import { Level } from '@/types/game';

export const levels: Level[] = [
  {
    id: 1,
    name: "Colors & Shapes",
    rewardThreshold: 3,
    questions: [
      {
        id: "c1",
        type: "color",
        question: "What color is the sky?",
        options: ["Red", "Blue", "Green", "Yellow"],
        correctAnswer: "Blue"
      },
      {
        id: "s1",
        type: "shape",
        question: "Which shape is round?",
        options: ["Square", "Triangle", "Circle", "Star"],
        correctAnswer: "Circle"
      },
      {
        id: "c2",
        type: "color",
        question: "What color is grass?",
        options: ["Purple", "Green", "Orange", "Pink"],
        correctAnswer: "Green"
      },
      {
        id: "s2",
        type: "shape",
        question: "Which shape has 3 sides?",
        options: ["Square", "Triangle", "Circle", "Rectangle"],
        correctAnswer: "Triangle"
      },
      {
        id: "c3",
        type: "color",
        question: "What color is the sun?",
        options: ["Blue", "Yellow", "Black", "White"],
        correctAnswer: "Yellow"
      }
    ]
  },
  {
    id: 2,
    name: "Letters & Words",
    rewardThreshold: 4,
    questions: [
      {
        id: "l1",
        type: "letter",
        question: "What letter does 'Apple' start with?",
        options: ["B", "A", "C", "D"],
        correctAnswer: "A"
      },
      {
        id: "l2",
        type: "letter",
        question: "What letter does 'Dog' start with?",
        options: ["D", "G", "B", "P"],
        correctAnswer: "D"
      },
      {
        id: "l3",
        type: "letter",
        question: "What letter does 'Cat' start with?",
        options: ["K", "S", "C", "T"],
        correctAnswer: "C"
      },
      {
        id: "l4",
        type: "letter",
        question: "What letter does 'Ball' start with?",
        options: ["B", "P", "D", "L"],
        correctAnswer: "B"
      },
      {
        id: "l5",
        type: "letter",
        question: "What letter does 'Elephant' start with?",
        options: ["A", "E", "I", "O"],
        correctAnswer: "E"
      }
    ]
  },
  {
    id: 3,
    name: "Numbers & Counting",
    rewardThreshold: 4,
    questions: [
      {
        id: "n1",
        type: "letter",
        question: "How many fingers on one hand?",
        options: ["3", "5", "10", "4"],
        correctAnswer: "5"
      },
      {
        id: "n2",
        type: "letter",
        question: "What comes after 2?",
        options: ["1", "3", "4", "5"],
        correctAnswer: "3"
      },
      {
        id: "n3",
        type: "letter",
        question: "How many eyes do you have?",
        options: ["1", "2", "3", "4"],
        correctAnswer: "2"
      },
      {
        id: "n4",
        type: "letter",
        question: "How many wheels on a car?",
        options: ["2", "3", "4", "6"],
        correctAnswer: "4"
      },
      {
        id: "n5",
        type: "letter",
        question: "What comes before 5?",
        options: ["3", "4", "6", "7"],
        correctAnswer: "4"
      }
    ]
  },
  {
    id: 4,
    name: "Animals & Nature",
    rewardThreshold: 5,
    questions: [
      {
        id: "a1",
        type: "letter",
        question: "What sound does a dog make?",
        options: ["Meow", "Woof", "Moo", "Quack"],
        correctAnswer: "Woof"
      },
      {
        id: "a2",
        type: "letter",
        question: "What sound does a cat make?",
        options: ["Meow", "Woof", "Roar", "Oink"],
        correctAnswer: "Meow"
      },
      {
        id: "a3",
        type: "letter",
        question: "What animal says 'Moo'?",
        options: ["Dog", "Cat", "Cow", "Duck"],
        correctAnswer: "Cow"
      },
      {
        id: "a4",
        type: "letter",
        question: "What animal says 'Quack'?",
        options: ["Dog", "Duck", "Cow", "Pig"],
        correctAnswer: "Duck"
      },
      {
        id: "a5",
        type: "letter",
        question: "What animal has a long trunk?",
        options: ["Dog", "Cat", "Elephant", "Horse"],
        correctAnswer: "Elephant"
      }
    ]
  },
  {
    id: 5,
    name: "Super Challenge",
    rewardThreshold: 5,
    questions: [
      {
        id: "m1",
        type: "shape",
        question: "Which shape has no corners?",
        options: ["Square", "Triangle", "Circle", "Rectangle"],
        correctAnswer: "Circle"
      },
      {
        id: "m2",
        type: "color",
        question: "What color do you get mixing blue + yellow?",
        options: ["Green", "Red", "Purple", "Orange"],
        correctAnswer: "Green"
      },
      {
        id: "m3",
        type: "letter",
        question: "What letter comes after B?",
        options: ["A", "C", "D", "E"],
        correctAnswer: "C"
      },
      {
        id: "m4",
        type: "shape",
        question: "Which shape is like a ball?",
        options: ["Square", "Triangle", "Circle", "Star"],
        correctAnswer: "Circle"
      },
      {
        id: "m5",
        type: "color",
        question: "What color is chocolate?",
        options: ["Brown", "White", "Red", "Yellow"],
        correctAnswer: "Brown"
      },
      {
        id: "m6",
        type: "letter",
        question: "How many legs does a spider have?",
        options: ["6", "8", "10", "4"],
        correctAnswer: "8"
      }
    ]
  }
];
