import React from 'react';
import { FiLoader } from 'react-icons/fi';
import './Loader.scss'

const Loader = () => {
     return (
          <div className='loader'>
               <FiLoader className='loader__img'/>
          </div>
     );
};

export default Loader;