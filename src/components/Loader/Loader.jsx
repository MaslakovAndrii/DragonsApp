import React from 'react';

import './Loader.scss'
import { FiLoader } from 'react-icons/fi';

const Loader = () => {
     return (
          <div className='loader'>
               <FiLoader className='loader__img'/>
          </div>
     );
};

export default Loader;