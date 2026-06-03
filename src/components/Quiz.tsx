import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Sparkles, Check, X } from "lucide-react";
import { cn } from "../lib/utils";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  cuteReaction: string;
}

const quizData: Question[] = [
  {
    id: 1,
    question: "1. Qual é o filme que a gente poderia assistir mil vezes e você nunca, jamais vai enjoar?",
    options: ["Diário de uma Paixão", "Gigantes de Aço", "Vingadores", "Titanic"],
    correctAnswer: 1,
    cuteReaction: "Acertouu! E eu assistiria outras mil vezes do seu lado se você pedisse. Robozões lutando e meu coração batendo por você! 🤖❤️"
  },
  {
    id: 2,
    question: "2. Se você precisasse chamar dois irmãos para te salvar de qualquer perigo, quem seriam?",
    options: ["Damon e Stefan", "Mario e Luigi", "Sam e Dean", "Thor e Loki"],
    correctAnswer: 2,
    cuteReaction: "Isso aí! Sam e Dean! Mas confessa... O verdadeiro caçador do seu coração sou eu, né? 👻🚘"
  },
  {
    id: 3,
    question: "3. Qual é o esporte que faz você liberar todo o estresse (e que te deixa ainda mais linda e perigosa)?",
    options: ["Muay Thai", "Kickboxing", "Jiu Jitsu", "Boxe"],
    correctAnswer: 1,
    cuteReaction: "Kickboxing! A lutadora mais linda do mundo! Temerosa nos ringues e dona do meu coração. 🥊😻"
  },
  {
    id: 4,
    question: "4. Qual a lenda da internet que a gente ama assistir pra dar aquelas risadas até a barriga doer?",
    options: ["Alanzoka", "Cellbit", "Casimiro", "Yoda"],
    correctAnswer: 0,
    cuteReaction: "O mestre absoluto do entretenimento, Alanzoka! Nossas noites rindo com as gameplays dele são perfeitas! 🎮😂"
  },
  {
    id: 5,
    question: "5. E na hora da sobremesa... Qual é o NOSSO pesadelo absoluto que a gente tem que fugir correndo?",
    options: ["Chocolate Amargo", "Qualquer coisa com coco", "Doce de leite", "Paçoca"],
    correctAnswer: 1,
    cuteReaction: "NOSSO MAIOR INIMIGO HAHAHA! Sério, quem estraga um doce colocando coco? A gente nasceu até pra odiar as mesmas coisas kkkkk 🥥🤢"
  }
];

export function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleAnswer = (index: number) => {
    if (showResult) return;
    
    setSelectedAnswer(index);
    const correct = index === quizData[currentQuestion].correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setTimeout(() => {
        if (currentQuestion < quizData.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer(null);
          setIsCorrect(null);
          setShowResult(false);
        } else {
          setQuizFinished(true);
        }
      }, 3500);
    } else {
      setTimeout(() => {
        setSelectedAnswer(null);
        setIsCorrect(null);
        setShowResult(false);
      }, 2000);
    }
  };

  return (
    <section className="py-24 px-6 md:px-12 relative w-full flex flex-col items-center justify-center min-h-screen bg-[#0a0002]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-900/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="z-10 w-full max-w-2xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-pink-200 mb-4 flex items-center justify-center gap-3">
            <Sparkles className="w-8 h-8 text-pink-400" />
            Quiz do Nosso Amor
            <Sparkles className="w-8 h-8 text-pink-400" />
          </h2>
          <p className="text-stone-400 font-light text-lg">
            Vamos ver se você realmente conhece beeeem os seus (e os nossos) gostos!
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!quizFinished ? (
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-black/40 border border-pink-900/30 rounded-3xl p-8 shadow-2xl backdrop-blur-sm"
            >
              <div className="flex justify-between items-center mb-6">
                <span className="text-pink-400 font-medium text-sm tracking-wider uppercase">
                  Pergunta {currentQuestion + 1} de {quizData.length}
                </span>
                <div className="flex gap-1">
                  {quizData.map((_, idx) => (
                    <div 
                      key={idx} 
                      className={cn(
                        "w-2 h-2 rounded-full transition-all duration-300",
                        idx === currentQuestion ? "bg-pink-500 w-4" : 
                        idx < currentQuestion ? "bg-pink-800" : "bg-stone-800"
                      )} 
                    />
                  ))}
                </div>
              </div>

              <h3 className="text-2xl font-serif text-stone-200 mb-8 leading-relaxed">
                {quizData[currentQuestion].question}
              </h3>

              <div className="grid gap-3">
                {quizData[currentQuestion].options.map((option, idx) => {
                  const isSelected = selectedAnswer === idx;
                  const isActuallyCorrect = idx === quizData[currentQuestion].correctAnswer;
                  
                  let buttonStateClass = "bg-white/5 border-pink-900/20 text-stone-300 hover:bg-white/10 hover:border-pink-800/50";
                  
                  if (showResult && isSelected) {
                    buttonStateClass = isCorrect 
                      ? "bg-green-900/30 border-green-500 text-green-200" 
                      : "bg-red-900/30 border-red-500 text-red-200 animate-[shake_0.5s_ease-in-out]";
                  } else if (showResult && isActuallyCorrect) {
                     buttonStateClass = "bg-green-900/10 border-green-500/50 text-green-300/80";
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(idx)}
                      disabled={showResult}
                      className={cn(
                        "w-full text-left px-6 py-4 rounded-xl border transition-all duration-300 flex items-center justify-between",
                        buttonStateClass
                      )}
                    >
                      <span className="text-lg">{option}</span>
                      {showResult && isSelected && (
                        isCorrect ? <Check className="text-green-500" /> : <X className="text-red-500" />
                      )}
                    </button>
                  );
                })}
              </div>

              <AnimatePresence>
                {showResult && isCorrect && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    className="mt-6 p-4 bg-pink-950/40 border border-pink-900/50 rounded-xl text-pink-200 text-center"
                  >
                    <p className="font-medium text-lg mb-1 flex items-center justify-center gap-2">
                       <Heart className="w-5 h-5 fill-pink-500 text-pink-500" />
                       {quizData[currentQuestion].cuteReaction}
                       <Heart className="w-5 h-5 fill-pink-500 text-pink-500" />
                    </p>
                  </motion.div>
                )}
                {showResult && !isCorrect && selectedAnswer !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    className="mt-6 p-3 text-red-300 text-center text-sm font-medium"
                  >
                    Hmmm, acho que o dedo escorregou! Tenta de novo, amorzinho! 😋
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-black/40 border border-pink-900/30 rounded-3xl p-10 shadow-2xl text-center backdrop-blur-sm relative overflow-hidden"
            >
               <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-900/20 via-transparent to-transparent pointer-events-none" />
              
               <div className="w-24 h-24 bg-pink-950/50 rounded-full flex items-center justify-center mx-auto mb-6 border border-pink-800/50 relative z-10">
                 <Heart className="w-12 h-12 text-pink-500 fill-pink-500 animate-[pulse_2s_ease-in-out_infinite]" />
               </div>
               
               <h3 className="text-3xl font-serif text-pink-200 mb-4 relative z-10">
                 Meu Deus, que menina perfeita!
               </h3>
               
               <p className="text-stone-300 text-lg leading-relaxed relative z-10">
                 Acertou tudinho! E a maior certeza que eu tenho nesse mundo é que eu acertei na loto quando tirei a sorte grande de ter você na minha vida. O nosso amor, nossos gostos em comum (e nosso ódio por coco kkkk), me mostram todos os dias o quanto somos almas gêmeas. ❤️
               </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </section>
  );
}
