import React, { useState } from 'react'
import { TasksCollections } from '../api/TasksCollections'

export const TaskForm = () => {

    const [text, setText] = useState("");

    const handleText = async (e) => {
        e.preventDefault();

        if(!text) return;

        await Meteor.callAsync("tasks.insert", {
            text: text.trim(),
            createdAt: new Date(),
            isChecked: false
        });

        setText("");
    }

  return (
    <form className='task-form' onSubmit={handleText} >
        <input 
          type="text" 
          placeholder='Digite sua task' 
          value={text} 
          onChange={(e) => setText(e.target.value)}
        />

        <button type='submit' >Add task</button>
    </form>
  )
}
