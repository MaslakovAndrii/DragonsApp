import React from 'react';
import './Container.scss'

const Container = ({size, children }) => {
     return (
          <div className={`container container_${size}`}>
               {children}
          </div>
     );
};

export default Container;