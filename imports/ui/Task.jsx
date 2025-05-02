import React from 'react'

export const Task = ({ task, onCheckboxClick, onDeleteClick, onEditionClick }) => {

  console.log(task);

  return (
    <li>
        <input 
          type="checkbox" 
          checked={task.isChecked}
          onClick={() => onCheckboxClick(task)}
          readOnly
        />
        <span>{task.text}</span>
        <button className='delete-button' onClick={() => onDeleteClick(task)}>&times;</button>
        <button className='edition-button' onClick={() => onEditionClick(task)}><i className="fas fa-edit"></i></button>
    </li>
  );
}
