import React from 'react'
import './badge.styles.scss';

import classNames from 'classnames';
const Badge = ({color, onClick, className}) =>  {

    return (
        <i className={classNames('badge', ('badge--' + color), className)} onClick={onClick}/>
    )
}

export default Badge;