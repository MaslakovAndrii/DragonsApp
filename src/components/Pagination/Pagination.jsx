import React from 'react';

import './Pagination.scss'

const Pagination = ({ pages, pageActive, handlePage }) => {


     return (
          <div className='pagination'>
               <div className='pagination__container'>
                    {pages > 1
                         ? [...Array(pages)].map((item, index) => <button
                              className={`pagination__page btn_null ${pageActive === index + 1 ? 'page-active' : null}`}
                              key={index}
                              onClick={() => handlePage(index + 1)}
                         >
                              {index + 1}
                         </button>)
                         : null}
               </div>
          </div>
     );
};

export default Pagination;