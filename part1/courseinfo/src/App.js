const Header = ({ course }) => <><h1>{course.name}</h1></>;
const Content = ({ parts }) => {
  return parts.map((part, index) => <Part key={index} name={part.name} exercises={part.exercises} />);
};
const Total = ({ parts }) => {
  const exercises = parts.map(part => part.exercises).reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0
  );
  return <p>Number of exercises {exercises}</p>;
};

const Part = ({ name, exercises }) => <p>
  {name} {exercises}
</p>;

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App