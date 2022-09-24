import React, { useEffect, useRef, useState } from 'react';
import './carousel.scss'
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from 'react-icons/io';
import { CarouselPage } from './CarouselPage/CarouselPage';
import { CarouselContext } from './CarouselContecst';

const Carousel = ({ data, height }) => {
     const [offset, setOffset] = useState(0)
     const [width, setWidth] = useState(450)
     const windowRef = useRef()

     useEffect(() => {
          const resizeHandler = () => {
               const _width = windowRef.current.offsetWidth
               setWidth(_width)
               setOffset(0)
          }

          resizeHandler()
          window.addEventListener('resize', resizeHandler)

          return () => {
               window.removeEventListener('resize', resizeHandler)
          }
     }, [])


     const handlerLeft = () => {
          setOffset((currentOffset) => {
               const newOffset = currentOffset + width
               return Math.min(newOffset, 0)
          })
     }

     const handlerRight = () => {
          const maxOffset = -(width * (data.length - 1))

          setOffset((currentOffset) => {
               const newOffset = currentOffset - width
               return Math.max(newOffset, maxOffset)
          })
     }

     return (
          <CarouselContext.Provider
               value={{
                    width,
                    height,
               }}>
               <div className='carousel'
                    ref={windowRef}
                    style={{
                         height: height,
                    }}
               >
                    <div className='carousel__window'
                    >
                         <div className='carousel__all-container'
                              style={{
                                   transform: `translateX(${offset}px)`,
                              }}
                         >
                              {data.map((url, index) => (
                                   <CarouselPage key={index}>
                                        <div className='carousel__item'>
                                             <img src={`${url}`} alt='dragon-1' />
                                        </div>
                                   </CarouselPage>
                              ))}
                         </div>
                    </div>
                    <IoIosArrowDropleftCircle className='arrow arrow_left' onClick={handlerLeft} />
                    <IoIosArrowDroprightCircle className='arrow arrow_right' onClick={handlerRight} />
               </div>
          </CarouselContext.Provider>
     );
};

export default Carousel;