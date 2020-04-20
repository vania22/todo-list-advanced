import React from 'react';
import './task.styles.scss';

import EditContainer from '../edit-container/edit-container.component';

import axios from 'axios';

const Task = ({id, text, completed, onEditTask, onDeleteTask, onToggleTask, listId}) => {


    const editTask = (text) => {
        if(text){
            axios.patch(`http://localhost:3001/tasks/${id}`, {
                text
            })
            .then(() => onEditTask(id, text))
            .catch((err) => alert("Couldn't edit task"));
        };
    }

    const deleteTask = () => {
        axios.delete(`http://localhost:3001/tasks/${id}`)
        .then(() => onDeleteTask(id, listId));
    };

    const toggleTask = () => {
        axios.patch(`http://localhost:3001/tasks/${id}`,{
            completed: !completed
        })
        .then(() => onToggleTask(id, listId))
    }

    return (
        <div className='tasks__items-row'>
            <div className='checkbox'>
                <input type='checkbox' id={id} checked={completed ? true : false}/>
                <label htmlFor={id} onClick={toggleTask}>
                    <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </label>
            </div>
                <EditContainer text={text} onSave={editTask} onCancel={deleteTask} hint='Press green button to save task, and red to delete task'/>
        </div>  
    )
};

export default Task;
