import { useContext } from 'react'
import { CarouselContext } from '../CarouselContecst'
import './CarouselPage'


export const CarouselPage = ({ children }) => {

     const { width, height } = useContext(CarouselContext)
     return <div
          className='carousel__page-container'
          style={{
               minWidth: `${width}px`,
               maxWidth: `${width}px`,
               minHeight: `${height}px`,
               maxHeight: `${height}px`,
          }}
     >
          {children}
     </div>
}