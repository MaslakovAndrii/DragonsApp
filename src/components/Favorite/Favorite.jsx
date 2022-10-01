import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import CardDragon from '../CardDragon/CardDragon';
import Pagination from '../Pagination/Pagination';
import './Favorite.scss'

const Favorite = () => {
     const [data, setData] = useState([])
     // const [page, setPage] = useState(1)

     // const handlePage = (countPage) => {
     //      setPage(data.page)
     // }

     const favorites = useSelector(state => state.favorite)

     useEffect(() => {
          axios.post(`https://api.spacexdata.com/v4/dragons/query`,
               {
                    "query": {
                         "_id": { "$in": favorites }
                    },
               }
          )
               .then(response => {
                    console.log(response.data);
                    setData(response.data)
               })
               .catch(err => {
                    console.log(err);
               })
     }, [favorites])


     return (
          <div className='favorite-list'>
               <div className='favorite-list__inner'>
                    <div className='favorite-list__content'>
                         <ul className='favorite-list__list list-favorite'>
                              {data?.docs?.map(dragon => (
                                   <CardDragon key={dragon.id} data={dragon} typeButton='remove' />
                              ))}
                         </ul>
                    </div>
                    {/* <Pagination pages={data?.totalPages} handlePage={handlePage} pageActive={data?.page} /> */}
               </div>
          </div>
     );
};

export default Favorite;