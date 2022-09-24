import React, { useRef, useState } from 'react';
import './carousel.scss'
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from 'react-icons/io';
import { useResize } from '../../hooks/useResize';

const Carousel = ({ data, size }) => {
     const [offset, setOffset] = useState(0)
     const carouselRef = useRef(null)
     const resize = useResize(carouselRef)

     const handlerLeft = () => {
          setOffset((currentOffset) => {
               const newOffset = currentOffset + resize.width
               return Math.min(newOffset, 0)
          })
     }

     const handlerRight = () => {
          const maxOffset = -(resize.width * (data.length - 1))

          setOffset((currentOffset) => {
               const newOffset = currentOffset - resize.width
               return Math.max(newOffset, maxOffset)
          })
     }

     return (
          <div className='carousel'
               ref={carouselRef}
               style={{
                    maxWidth: size.width,
                    height: size.height,
               }}>
               <div className='carousel__window'>
                    <div className='carousel__container'
                         style={{
                              transform: `translateX(${offset}px)`,
                         }}
                    >
                         {data.map((url, index) => (
                              <div className='carousel__item item-carousel'
                                   key={index}>
                                   <img src={`${url}`} alt='dragon-1' />
                              </div>
                         ))}
                    </div>
               </div>
               <IoIosArrowDropleftCircle className='arrow arrow_left' onClick={handlerLeft} />
               <IoIosArrowDroprightCircle className='arrow arrow_right' onClick={handlerRight} />
          </div>
     );
};

export default Carousel;