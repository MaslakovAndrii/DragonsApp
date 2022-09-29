import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../Container/Container'
import Loader from '../Loader/Loader';
import './DragonList.scss'

const DragonsList = () => {
     const [data, setData] = useState()
     const [page, setPage] = useState(1)

     const handlePage = (countPage) => {
          setPage(countPage)
     }


     useEffect(() => {
          axios.post(`https://api.spacexdata.com/v4/dragons/query`,
               {
                    "options": {
                         "limit": 1,
                         "page": page
                    }
               })
               .then(response => {
                    setData(response.data)
               })
               .catch(err => {
                    console.log(err);
               })
     }, [page])



     if (!data?.docs) {
          return <Loader />
     }

     return (
          <Container size='small'>
               <div className='content'>
                    <dl className='dragon-list'>
                         {data.docs.map(dragon => (
                              <Link to={`${dragon.id}`} className='dragon-list__link' key={dragon.id}>
                                   <dt className='dragon-list__title'><img className='dragon-list__img' src={dragon.flickr_images[0]} alt='картинки нет'></img></dt>
                                   <dd className='dragon-list__description'>{dragon.name}</dd>
                              </Link>
                         ))}
                    </dl>
               </div>
               <div style={{display: 'flex'}}>
                    {data.totalPages > 1 ? [...Array(data.totalPages)].map((item, index) => <button key={index} onClick={() => handlePage(index+1)}>{index+1}</button> ) : null}
               </div>
          </Container>
     );
};

export default DragonsList;