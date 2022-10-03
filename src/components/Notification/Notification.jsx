import React, { useEffect, useState } from 'react';

import './Notification.scss'
import { BiError, BiLike } from 'react-icons/bi';

const Notification = ({ type, message, dispatch_N }) => {
     const [exit, setExit] = useState(false)

     // Один таймаут попадает на другой. Если будет время нужно разобраться почему.

     let timeout = setTimeout(() => {
          dispatch_N({
               type: "HIDE_NOTIFICATION"
          })
     }, 4000)

     useEffect(() => {
          return () => {
               setExit(false)
               clearTimeout(timeout)
          }
     }, [])


     switch (type) {
          case 'error': {
               return (
                    <div className={`notification ${type} ${exit ? 'exit' : ''} `}>
                         <BiError className='notification__icon' />
                         <p className='notification__message'>{message}</p>
                    </div>
               )
          }
          case 'successful': {
               return (
                    <div className={`notification ${type} ${exit ? 'exit' : ''}`}>
                         <BiLike className='notification__icon' />
                         <p className='notification__message'>{message}</p>
                    </div>
               )
          }

          default: return
     }
};

export default Notification;