import React from 'react'

const Header = ({ course }) => <h1>{course.name}</h1>

const Content = ({ parts }) => {
    const total = parts.map(part => part.exercises).reduce((previousValue, currentValue) => { return previousValue + currentValue });
    return <>
        {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
        <p><strong>total of {total} exercises</strong></p>
    </>
}

const Part = ({ name, exercises }) =>
    <p>
        {name} {exercises}
    </p>;

const Course = ({ course }) =>
    <>
        <Header course={course} />
        <Content parts={course.parts} />
    </>

export default Course