import React from 'react'

const Header = ({course}) => <h1>{course.name}</h1>

const Total = ({parts}) => {

  return(
     <p>Total of{' '}
      {parts.reduce((prev, current) => prev + current.exercises,0)} 
      {' '}exercises
      </p>
  )
}

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
  <> 
    {parts.map(part => <Part key={part.id.toString()} part={part}></Part>)} 
  </>

const Course = ({course}) => {
  return(
    <div>
    <Header key={course.id.toString()} course={course}></Header>
    <Content key={(course.id+1).toString()} parts={course.parts}></Content>
    <Total key={(course.id+2).toString()} parts={course.parts}></Total>
    </div>
  )
}

export default Course