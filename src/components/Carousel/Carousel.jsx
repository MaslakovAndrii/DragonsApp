import React, { useState } from 'react';
import './carousel.scss'
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from 'react-icons/io';

const Carousel = ({ data, size}) => {
     const [offset, setOffset] = useState(0)

     const handlerLeft = () => {
          setOffset((currentOffset) => {
               const newOffset = currentOffset + size.width
               return Math.min(newOffset, 0)
          })
     }
     

     const handlerRight = () => {

          const maxOffset = -(size.width * (data.length - 1))

          setOffset((currentOffset) => {
               const newOffset = currentOffset - size.width
               return Math.max(newOffset, maxOffset)
          })
     }

     return (
          <div className='carousel'
               style={{
                    width: size.width,
                    height: size.height,
               }}>
               <div className='carousel__window'>
                    <div className='carousel__container'
                         style={{
                              transform: `translateX(${offset}px)`,
                         }}
                    >
                         {data.map((url, index) => (
                              <div className='carousel__item item-carousel' key={index}>
                                        <img src={`${url}`} alt='photo'/>
                              </div>
                         ))}
                    </div>
               </div>
               <IoIosArrowDropleftCircle className='arrow arrow_left' onClick={handlerLeft}/>
               <IoIosArrowDroprightCircle className='arrow arrow_right' onClick={handlerRight}/>
          </div>
     );
};

export default Carousel;