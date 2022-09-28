import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../Container/Container'
import './DragonList.scss'

const DragonsList = () => {
     const [dragonsList, setDragonsList] = useState()


     useEffect(() => {
          axios.get('https://api.spacexdata.com/v4/dragons')
               .then(response => {
                    setDragonsList(response.data)
               })
               .catch(err => {
                    console.log(err);
               })
     }, [])



     if (!dragonsList) {
          return <div>Загрузка...</div>
     }

     return (
          <Container size='small'>
               <div className='content'>
                    <dl className='dragon-list'>
                         {dragonsList.map((dragon, index) => (
                              <Link to={`${dragon.id}`} className='dragon-list__link' key={index}>
                                   <dt className='dragon-list__title'><img className='dragon-list__img' src={dragon.flickr_images[0]} alt='картинки нет'></img></dt>
                                   <dd className='dragon-list__description'>{dragon.name}</dd>
                              </Link>
                         ))}
                    </dl>
               </div>
          </Container>
     );
};

export default DragonsList;