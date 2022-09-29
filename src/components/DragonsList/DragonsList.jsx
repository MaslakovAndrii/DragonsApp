import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../Container/Container'
import Loader from '../Loader/Loader';
import Pagination from '../Pagination/Pagination';
import { FcLike } from 'react-icons/fc'
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
          <div className='dragon-list'>
               {/* <Container size='max'> */}
                    <div className='dragon-list__inner'>
                         <div className='dragon-list__content'>
                              <ul className='dragon-list__list list-dragon'>
                                   {data.docs.map(dragon => (
                                        <li className='list-dragon__item' key={dragon.id}>
                                             <Link to={`${dragon.id}`} className='list-dragon__link link' key={dragon.id}>
                                                  <div className='list-dragon__img-container'><img className='list-dragon__img' src={dragon.flickr_images[0]} alt='картинки нет'/></div>
                                                  <h4 className='list-dragon__title'>{dragon.name}</h4>
                                                  <p className='list-dragon__description'>{dragon.description}</p>
                                             </Link>
                                             <button className='list-dragon__btn btn_null'>
                                                  <FcLike className='list-dragon__like' />
                                                  <span className='tooltip'>Add to favorites</span>
                                             </button>
                                        </li>
                                   ))}
                              </ul>
                         </div>
                         <Pagination pages={data.totalPages} handlePage={handlePage} pageActive={data.page} />
                    </div>
               {/* </Container> */}
          </div>
     );
};

export default DragonsList;