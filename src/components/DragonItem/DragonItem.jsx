import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DragonItem = () => {
     const { id } = useParams()
     const [ dragon, setDragon ] = useState(null)

     useEffect(() => {
          axios.get(`https://api.spacexdata.com/v4/dragons/${id}`)
               .then(response => {
                    setDragon(response.data)
               })
               .catch(err => {
                    console.log(err);
               })
     }, [id])

     return (
          <div>
               {dragon && (
                    <>
                         {dragon.wikipedia}
                    </>
               )}
          </div>
     );
};

export default DragonItem;