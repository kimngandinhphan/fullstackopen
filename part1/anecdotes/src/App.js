import { useState } from 'react'

const Anecdote = ({ anecdote, votes }) =>
  <>
    <p>{anecdote}</p>
    <p>has {votes} votes</p>
  </>;

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const randomNumber = () => Math.floor(Math.random() * (anecdotes.length - 1));

  const [selected, setSelected] = useState(randomNumber())
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  const voteOnClick = () => {
    const copy = [...points];
    copy[selected]++;
    setPoints(copy);
  }

  const mostVoted = points.findIndex(point => point === Math.max(...points));
  
  return (
    <div>
      <h1>Anecdote of the Day</h1>
      <Anecdote anecdote={anecdotes[selected]} votes={points[selected]} />
      <button onClick={voteOnClick}>vote</button>
      <button onClick={() => setSelected(randomNumber())}>next anecdote</button>
      <h1>Anecdote with most Votes</h1>
      <Anecdote anecdote={anecdotes[mostVoted]} votes={points[mostVoted]} />
    </div>
  )
}

export default App