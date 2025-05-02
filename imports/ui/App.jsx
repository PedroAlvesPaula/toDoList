import React, { useState } from "react";
import { useSubscribe, useTracker } from "meteor/react-meteor-data";
import { TasksCollections } from "/imports/api/TasksCollections";
import { Task } from "./Task";
import { TaskForm } from "./TaskForm";
import { Meteor } from "meteor/meteor"
import { TaskFormEdition } from "./TaskFormEdition";
import { LoginForm } from "./LoginForm";

export const App = () => {

  
  const [hideCompleted, setHide] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const isLoading = useSubscribe("tasks");
  
  const hideCompletedFilter = {isChecked: {$ne: true}};
  
  const user = useTracker(() => Meteor.user());

  const tasks = useTracker(() => { 
    if (!user) {
      return [];
    }
    
    return TasksCollections.find(hideCompleted ? hideCompletedFilter: {}, {sort: {createdAt: -1}}).fetch()
    
  });

  const handleToggleTasks = ({_id, isChecked}) => {
    Meteor.callAsync("tasks.toggleChecked", {_id, isChecked});
  }

  const handleDelete = ({ _id }) => {
    Meteor.callAsync("tasks.delete", { _id })
  }

  const pendingTasksCount = useTracker(
    () => {
      if (!user) {
        return 0;
      }
      return TasksCollections.find(hideCompletedFilter).count()
    }
  );

  const pendingTasksTitle = `${pendingTasksCount ? ` (${pendingTasksCount})` : "(0)"}`;

  const starEditing = ({ _id }) => {
      Meteor.callAsync("tasks.setIsEditing", {_id, isEditing});
      setIsEditing(true);
  }

  const endEditing = ({ _id }) => {
      Meteor.callAsync("tasks.setIsEditing", {_id, isEditing});
      setIsEditing(false);
  }

  const logout = () => Meteor.logout();

  if (isLoading()){
    return <div>Carregando...</div>
  }

  return (
    <div className="app">
      {user ? (
        <>
          <header>
            <div className="app-bar">
              <div className="app-header">
                <h1>To do list { pendingTasksTitle }</h1>
              </div>
            </div>
            <div onClick={logout} className="user">{user.username}</div>
          </header>
          <div className="main">
            <TaskForm />

            <div className="filter">
              <button onClick={() => setHide(!hideCompleted)} >{hideCompleted ? "Hide completed" : "Show all"}</button>
            </div>

            <ul className="tasks">
              {tasks.map((task) => (
                task.isEditing ? (
                  <TaskFormEdition 
                    oldText={task.text} 
                    IsEditing={endEditing}
                    task={task}
                    key={task._id}
                  />
                ) : (
                  <Task
                    key={task._id}
                    task={task}
                    onCheckboxClick={handleToggleTasks}
                    onDeleteClick={handleDelete}
                    onEditionClick={starEditing}
                  />
                )
              ))}
            </ul>
          </div>
        </>
      ) : (
        <>
          <LoginForm />
        </>
      )}
    </div>  
  );
}
