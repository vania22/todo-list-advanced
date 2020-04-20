import React, {useState, useEffect} from 'react';
import './add-list.styles.scss';

import List from '../list/list.component';
import Badge from '../badge/badge.component';
import CloseSvg from '../../assets/img/close.svg';

import axios from 'axios';

const AddList = ({colors, onAdd}) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);  
  const [selectedColor, setSelectedColor] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if(Array.isArray(colors)) {
      setSelectedColor(colors[0].id)
    }
  
    setSelectedColor(1);
  }, [colors]);



  const closePopup = () => {
    setInputValue('');
    setSelectedColor(colors[0].id);
    setIsPopupVisible(false);
  };

  const addList = () => {
    if(!inputValue){
      alert('Task should have a name');
      return;
    }

    setIsLoading(true);

    axios.post('http://localhost:3001/lists', {
      name: inputValue, colorId: selectedColor
    }).then(({data}) => {

      const color = colors.filter(c => c.id === selectedColor)[0];
      const listObj = {...data, color, tasks: []}
      onAdd(listObj);
      console.log(listObj)
      closePopup();
    }).finally(() => setIsLoading(false));
  }

  return(
    <div className='add-list'>
      <List 
      onClick={() => setIsPopupVisible(true)}
      items={[
          {
            className: 'list__add-button',
            icon: 
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 1V15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M1 8H15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            ,
            name: 'Add List',
            active: false,
            id: 'ADD_LIST'
          }
      ]}
      />
      {
      isPopupVisible 
        &&
      <div className='add-list__popup'>
        <img 
          src={CloseSvg} 
          alt='close' 
          className='add-list__popup-close-btn'
          onClick={closePopup}
        />

        <input 
          className='field' 
          type='text' 
          placeholder='List name'
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
        <div className='add-list__popup-colors'>
            {colors.map(color => (
              <Badge 
                key={color.id} 
                color={color.name} 
                onClick={() => setSelectedColor(color.id)}
                className={selectedColor === color.id && 'active'}/>
            ))}
        </div>
        <button className='button' onClick={() => addList()}>
          {isLoading ? 'Adding...' : 'Add'}
        </button>
      </div>
      }
    </div>
  )
};

export default AddList;