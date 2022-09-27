import React from 'react';
import { BiError, BiLike } from 'react-icons/bi';
import './Notification.scss'

const Notification = ({ type, message, handleVisible }) => {

     setTimeout(() => {
          handleVisible(false)
     }, 5000)

     switch (type) {
          case 'error': {
               return (
                    <div className={`notification ${type} `}>
                         <BiError className='notification__icon' />
                         <p className='notification__message'>{message}</p>
                    </div>
               )
          }
          case 'successful': {
               return (
                    <div className={`notification ${type} `}>
                         <BiLike className='notification__icon' />
                         <p className='notification__message'>{message}</p>
                    </div>
               )
          }

          default: return
     }




};

export default Notification;