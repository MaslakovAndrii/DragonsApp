import React from 'react';
import './Container.scss'

const Container = ({size, children }) => {
     console.log(size);
     return (
          <div className={`container container_${size}`}>
               {children}
          </div>
     );
};

export default Container;