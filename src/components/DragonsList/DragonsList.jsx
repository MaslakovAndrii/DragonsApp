import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../Container/Container'
import Loader from '../Loader/Loader';
import Pagination from '../Pagination/Pagination';
import './DragonList.scss'
import CardDragon from '../CardDragon/CardDragon';

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
                                        <CardDragon key={dragon.id} id={dragon.id} image={dragon.flickr_images[0]} name={dragon.name} description={dragon.description}/>
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