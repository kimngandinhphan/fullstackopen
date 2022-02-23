import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;
const StatisticLine = ({ text, amount }) =>
  <tr>
    <td>{text}</td>
    <td>{amount}</td>
  </tr>;
const Statistics = ({ good, neutral, bad }) => {
  let all = good + neutral + bad;

  return all === 0 ? <p>No feedback given</p> : <>
    <table>
      <tbody>
      <StatisticLine text={"good"} amount={good} />
      <StatisticLine text={"neutral"} amount={neutral} />
      <StatisticLine text={"bad"} amount={bad} />
      <StatisticLine text={"all"} amount={all} />
      <StatisticLine text={"average"} amount={(good * 1 + neutral * 0 + bad * -1) / all} />
      <StatisticLine text={"positive"} amount={`${good / all * 100} %`} />
      </tbody>
    </table>
  </>
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App