import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Carousel from '../../components/Carousel/Carousel';
import Loader from '../../components/Loader/Loader';

import './HomePage.scss'

const HomePage = () => {
     const [cash, setCash] = useState(JSON.parse(localStorage.getItem('data')))
     

     useEffect(() => {
          axios.get('https://api.spacexdata.com/v4/dragons/5e9d058759b1ff74a7ad5f8f')
               .then(response => {
                    localStorage.setItem('data', JSON.stringify(response.data))
                    setCash(response.data)
               })
               .catch(err => {
                    console.log(err);
               })
     }, [])


     if (!cash) {
          return <Loader/>
     }
     

     return (
          <main className='main main-page'>
               <div className='main-page__content'>
                    <h2 className='main-page__title'>{cash.name}</h2>
                    <p className='main-page__text'>Первый полет: {cash.first_flight}</p>
                    <p className='main-page__text'>Высота: {cash.height_w_trunk.meters} м</p>
                    <p className='main-page__text'>{cash.description}</p>
                    <a className='main-page__link link' href={cash.wikipedia} target="blank">Википедия</a>
               </div>
               <div className='main-page__carousel'>
                    <Carousel data={cash.flickr_images} />
               </div>

          </main>
     );
};

export default HomePage;