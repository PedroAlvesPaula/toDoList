import React, { useState } from 'react'
import { TasksCollections } from '../api/TasksCollections'
import { Meteor } from "meteor/meteor"

export const TaskFormEdition = ({oldText, IsEditing, task}) => {

    const [text, setText] = useState("");

    const handleOnEditionClick = async (e) => {
        e.preventDefault();

        IsEditing(task);

        if(!text) return;

        Meteor.callAsync("tasks.updateText", [task._id, text]);
    }

  return (
    <li id='edit-li'>
      <input 
        type="text" 
        defaultValue={task.text} 
        autoFocus
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={(e) => handleOnEditionClick(e)}><i className="fas fa-check"></i></button>
    </li>
  )
}
