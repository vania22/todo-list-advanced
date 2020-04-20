import React from 'react';
import './list.styles.scss';

import Badge from '../badge/badge.component';
import removeSvg from '../../assets/img/remove.svg';

import classNames from 'classnames';
import axios from 'axios';

const List = ({items, isRemovable, onClick, onRemove, activeList}) => {

    const removeList = (listId) => {
        if(window.confirm('Do you really want to delete this list?')){
            axios.delete(`http://localhost:3001/lists/${listId}`)
            .then(()=> onRemove(listId));
        };
    };

    return(
        <ul className='list'>
            {items.map((item, index) => (
                <li 
                    className={classNames(item.className, {active: activeList && activeList.id === item.id})}
                    key={index}
                    onClick={() => onClick(item)}
                >
                    <i>
                        {item.icon ? item.icon : <Badge color={item.color.name}/>}
                    </i>
                    <span>{item.name} {item.tasks && item.tasks.length >=1 && ` (${item.tasks.length})`}</span>
                    {isRemovable && <img 
                                        src={removeSvg} 
                                        alt='remove item' 
                                        className='list__remove-icon'
                                        onClick={() => removeList(item.id)} />}
                 </li>
            ))}
        </ul>
    );
};

export default List;