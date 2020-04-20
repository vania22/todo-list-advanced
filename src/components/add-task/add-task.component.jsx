import React, {useState} from 'react';
import './add-task.styles.scss';

import axios from 'axios';


const AddTask = ({createTask, listId}) => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [value, setValue] = useState('');

    const onAddClick = () => {
        if(value){
            const newTask = {listId, text: value, complete: false}
            axios.post('http://localhost:3001/tasks', newTask)
            .then(({data}) => createTask(listId, data));
            setValue('');
            setIsFormVisible(false);
        }else{
            alert('Task name can\'t be empty');
        }
    };
    
    return(
        <>
        <div className='tasks__add'>
            <div className='tasks__add-new' onClick={() => setIsFormVisible(!isFormVisible)}>
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 1V15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M1 8H15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Add task</span>
            </div>
            <div className={isFormVisible ? 'tasks__form' : 'tasks__form-hidden'}>
            <input type='text'
                   value={value} 
                   placeholder='Task name'
                   className='field'
                   onChange={(e) => setValue(e.target.value)}/>
                <button className='form__add-button button' onClick={onAddClick}>Add</button>
                <button className='form__cancel-button button' onClick={() => setIsFormVisible(false)}>Cancel</button>
        </div>
        </div>
        </>
    )
};

export default AddTask;