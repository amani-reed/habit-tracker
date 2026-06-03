import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Trash2, Pencil } from 'lucide-react'
import ReactModal from 'react-modal'

function App() {

  const [isHabit, setHabit] = useState('');
  const [habits, setHabits] = useState([]);
  const [isEditingHabitIndex, setEditingHabitIndex] = useState(null);
  const [editHabitText, setEditHabitText] = useState('');

  const handleAddHabit = () => {
    if (isHabit.trim() === '') return;
    
    setHabits([...habits, isHabit]);
    setHabit('');

    const habitAlreadyExist = habits.some(habit => habit === isHabit);

    if (habitAlreadyExist) {
      setHabits([...habits])
      alert("That habit already exists. Please enter a different habit.")
    }
  }

  const handleDeleteHabit = (indexToDelete) => {
    const updatedHabits = habits.filter((habit, index) => (
      index !== indexToDelete
    ))
    setHabits(updatedHabits)
  }

  const handleEditHabit = (index, habit) => {
    setEditingHabitIndex(index);
    setEditHabitText(habit);

  }

  const handleOnKeyDown = (e) => {
    if (e.key === 'Enter') {
      const updatedHabits = habits.map((habit, index) => (
        index === isEditingHabitIndex ? 
        editHabitText : habit
      ))
      setHabits(updatedHabits);
      setEditingHabitIndex(null);
    }
  }

  const handleAddHabitDetails = () => {
    <ReactModal
    isOpen = {true}
    
    />
  }

  return (
    <>
     <h1>Habit Tracker</h1>
     <div className = "habitHeaders">
      <div className = "habitColumn">
     <h2>Habit</h2>
     <div className="habitControls">
        {habits.map((habit, index) => (
          <div key ={index} className="habit">
            {index === isEditingHabitIndex ? 
            <input
            type="text"
            className="editHabitName"
            value={editHabitText}
            onChange={ e => setEditHabitText(e.target.value)}
            onKeyDown={handleOnKeyDown}
            >
            </input> :
            <span>{habit}</span>}

          <Pencil
          className="editHabitIcon"
          onClick={() => handleEditHabit(index, habit)}
          />

          <Trash2 
          className="deleteHabitIcon"
          onClick={() => handleDeleteHabit(index)}
          />
          
          </div>
        ))}
     </div> 
     </div>

     <div className = "habitDetailsColumn">
     <h2>Habit Details</h2>
     {habits.map((habit) => (
      <button
      onClick = {handleAddHabitDetails}
      >Add Details</button>
     ))}
     </div>
     </div>

     <div className = "addHabitContainer">
     <input
      type="text"
      id="addHabit"
      className = 'addHabitInput'
      placeholder='Start typing...'
      value = {isHabit}
      onChange = { e => setHabit(e.target.value)}>
      </input>
     <button
     id = "addHabitBtn"
     className = 'addHabitButton'
     onClick = {handleAddHabit}
     >
      Add Habit
      </button>
      </div>
    </>
  )
}

export default App
