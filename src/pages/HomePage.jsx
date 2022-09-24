import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Carousel from '../components/Carousel/Carousel';

const HomePage = () => {
     const [info, setInfo] = useState()

     useEffect(() => {
          axios.get('https://api.spacexdata.com/v4/dragons/5e9d058759b1ff74a7ad5f8f')
               .then(response => {
                    console.log(response.data);
                    setInfo(response.data)
               })
               .catch(err => {
                    console.log(err);
               })
     }, [])



     if (!info) {
          return <div>Загрузка...</div>
     }

     return (
          <>
               <div>{info.name}</div>
               <div>{info.description}</div>
               <div>{info.height_w_trunk.meters}</div>
               <div>{info.first_flight}</div>
               <a href={info.wikipedia} target="blank">Прочитать в википедии</a>
               
               <Carousel data={info.flickr_images} height={300}/>
          </>
     );
};

export default HomePage;