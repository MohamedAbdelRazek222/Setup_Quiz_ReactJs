import React from 'react'
import { useGlobalContext } from './context'

import SetupForm from './SetupForm'
import Loading from './Loading'
import Modal from './Modal'
function App() {

  const {waiting,loading,questions,index,correct,nextQuestion,checkAnswer}=useGlobalContext()

// waiting--------------------------------------
if(waiting){
  return <SetupForm />
}

// loading--------------------------------------
if(loading){
  return <Loading />
}

// questions-------------------------------------
console.log(questions[0])
// {category: 'Sports', type: 'multiple', difficulty: 'easy', question: 'Which of the following sports is not part of the triathlon?', correct_answer: 'Horse-Riding', …}
const {question,incorrect_answers,correct_answer} =questions[index] 
// const answers=[...incorrect_answers,correct_answer]


let answers = [...incorrect_answers] //هنا بيخلي الاجابه الصح في اماكن مختلفه
const tempIndex=Math.floor(Math.random() * 4)
if(tempIndex === 3){
  answers.push(correct_answer)
}else{
  answers.push(answers[tempIndex])
  answers[tempIndex]=correct_answer
}
return <main>
  <Modal />
  <section className="quiz">
    <p className="correct-answers">
      correct answers : {correct}/{index}
    </p>
    <article className="container">
      <h2 dangerouslySetInnerHTML={{ __html:question }} />

     {answers.map((answer,index)=>{
return (
<button key={index} className="answer-btn" onClick={()=>checkAnswer(correct_answer===answer)} dangerouslySetInnerHTML={{ __html:answer }} />
    ) })}
    
    </article>
    <button className="next-question" onClick={nextQuestion}>next question</button>
  </section>
</main>
}

export default App
