import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
          <ul>
               {dragonsList.map((dragon, index) => <li key={index}><Link to={`${dragon.id}`}>{dragon.name}</Link></li>)}
          </ul>
     );
};

export default DragonsList;