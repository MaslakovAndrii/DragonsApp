import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Favorite = () => {
     const [data, setData] = useState([])

     const favorites = useSelector(state => state.favorite)

     useEffect(() => {
          axios.post(`https://api.spacexdata.com/v4/dragons/query`,
               {
                    "query": {
                         "id": { "$in": favorites }
                    },
               }
          )
               .then(response => {
                    setData(response.data.docs)
               })
               .catch(err => {
                    console.log(err);
               })
     }, [])

     console.log(favorites);
     console.log(data);

     return (
          <div>
               {/* {favorites} */}
          </div>
     );
};

export default Favorite;