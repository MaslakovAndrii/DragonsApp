import React from 'react';
import './InteractiveButton.scss'

const InteractiveButton = ({ children, textTooltip, actionHandler, id }) => {
     return (
          <button className='interactive-btn btn_null' onClick={() => actionHandler(id)}>
               <div className='interactive-btn__image'>
                    {children}
               </div>
               <span className='interactive-btn__tooltip tooltip'>{textTooltip}</span>
          </button>
     );
};

export default InteractiveButton;