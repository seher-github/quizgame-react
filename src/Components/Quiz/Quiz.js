import React, { useRef, useState } from 'react'
import './Quiz.css'
import { data } from '../../assets/data';
import useSound from 'use-sound';
import correct from '../../sounds/correct.mp3';
import wrong from '../../sounds/wrong.mp3'
import Header from '../Header';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion'; // Import framer-motion

const Quiz = () => {

    let [index,setIndex] = useState(0);
    let [question, setQuestion] = useState(data[index]);
    let [lock, setLock] = useState(false);
    let [score, setScore] = useState(0);
    let [result, setResult] = useState(false);
    let [playCorrect] = useSound(correct);
    let [playWrong] = useSound(wrong);

    let Option1= useRef(null);
    let Option2= useRef(null);
    let Option3= useRef(null);
    let Option4= useRef(null);

    let option_array = [Option1, Option2, Option3, Option4];

    const checkAns = (e,ans)=>{
        if(lock===false){
        if(question.ans===ans){
            e.target.classList.add("correct");
            setLock(true);
            setScore(prev=>prev+1);
            playCorrect();
            
        }
        else{
            e.target.classList.add("wrong");
            setLock(true);
            option_array[question.ans-1].current.classList.add("correct");
            playWrong();
            
        }
    }
    }

    const next = ()=>{
        if(lock===true){
            if(index === data.length-1){
                setResult(true);
                toast.info('Quiz Completed!');
                return 0;
            }
            setIndex(++index);
            setQuestion(data[index]);
            setLock(false);
            option_array.map((option)=>{
                option.current.classList.remove("wrong");
                option.current.classList.remove("correct");
                return null;
            })
        }

    }

    const reset =()=>{
        setIndex(0);
        setQuestion(data[0]);
        setScore(0);
        setLock(false);
        setResult(false);
        toast.info('Quiz Restarted!');
    }

    const progressPercentage = ((index + 1) / data.length) * 100;
  return (
    <>
    <Header />
    <div className='container'>
   
       
        {result?<></>:<>
            <div className="progress-bar-container">
                            <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
                        </div>
            <motion.h2 initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}>{index+1}.{question.question}</motion.h2>
        <motion.ul initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ staggerChildren: 0.1 }}>
            <motion.li initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }} ref={Option1} onClick={(e)=>{checkAns(e,1)}}>{question.option1}</motion.li>
            <motion.li initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }} ref={Option2} onClick={(e)=>{checkAns(e,2)}}>{question.option2}</motion.li>
            <motion.li initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }} ref={Option3} onClick={(e)=>{checkAns(e,3)}}>{question.option3}</motion.li>
            <motion.li initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }} ref={Option4} onClick={(e)=>{checkAns(e,4)}}>{question.option4}</motion.li>
        </motion.ul>
        <motion.button  initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }} onClick={next}>Next</motion.button>
        
        </>}
        {result?<><h2>You Scored {score} out of {data.length}</h2>
        <motion.button initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }} onClick={reset}>Restart Quiz</motion.button></>:<></>}
        
        
      
    </div>
    </>
  )
}

export default Quiz
