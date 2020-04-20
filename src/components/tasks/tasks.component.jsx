import React, {useState, useEffect} from 'react';
import './tasks.styles.scss';

import AddTask from '../add-task/add-task.component';
import Task from '../task/task.component';
import EditContainer from '../edit-container/edit-container.component';

import axios from 'axios'

const Tasks = ({list, onEditListTitle, onCreateTask, smallEmptyLabel, onEditTask, onDeleteTask, onToggleTask}) => {
    const [value, setValue] = useState(list.name)

    useEffect(() => setValue(list.name), [list])

    const editTitle = (text) => {
            axios.patch(`http://localhost:3001/lists/${list.id}`, {
                name: text
            })
            .then(() => onEditListTitle(list.id, text))
            .catch(() => alert('Couldn\'t create list'));
    };
    
    return(
        <div className='tasks'>
            <div className='tasks__title'>
            <h2 style={{color: list.color.hex}}>
                <EditContainer text={value} onSave={editTitle}/>
            </h2>
            </div>
                {(!Array.isArray(list.tasks) || !list.tasks.length) ? <h2 className={smallEmptyLabel ? 'tasks-no-tasks small' : 'tasks-no-tasks'}>You don't have tasks</h2> : 
                    <div className='tasks__items'>
                        {list.tasks.map(item => {
                                return(
                                    <Task key={item.id} {...item} onEditTask={onEditTask} onDeleteTask={onDeleteTask} listId={list.id} onToggleTask={onToggleTask}/>
                                )})
                        }
                    </div>
                }    
                <AddTask createTask={onCreateTask} listId={list.id}/>
        </div>
    )
};
 
export default Tasks;