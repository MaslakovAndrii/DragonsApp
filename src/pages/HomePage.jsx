import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Carousel from '../components/Carousel/Carousel';

const HomePage = () => {
     const [cash, setCash] = useState(JSON.parse(localStorage.getItem('data')))

     useEffect(() => {
          axios.get('https://api.spacexdata.com/v4/dragons/5e9d058859b1ffd8e2ad5f90')
               .then(response => {
                    localStorage.setItem('data', JSON.stringify(response.data))
                    setCash(response.data)
               })
               .catch(err => {
                    console.log(err);
               })

     }, [])


     if (!cash) {
          return <div>Загрузка...</div>
     }

     return (
          <>
               <div>{cash.name}</div>
               <div>{cash.description}</div>
               <div>{cash.height_w_trunk.meters}</div>
               <div>{cash.first_flight}</div>
               <a href={cash.wikipedia} target="blank">Прочитать в википедии</a>

               <Carousel data={cash.flickr_images} height={300} />
          </>
     );
};

export default HomePage;