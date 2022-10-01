import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Carousel from '../Carousel/Carousel';
import Loader from '../Loader/Loader';

import './DragonItem.scss'



const DragonItem = () => {
     const units = {
          ci: {
               weight: 'kg',
               volume: 'cubic_meters',
               length: 'meters'
          },
          imperial: {
               weight: 'lb',
               volume: 'cubic_feet',
               length: 'feet'
          }
     }

     const { id } = useParams()
     const [dragon, setDragon] = useState(null)
     const [thisUnits, setThisUnits] = useState(units.ci)

     const handleUnits = () => {
          if(thisUnits.length === units.ci.length) {
               setThisUnits(units.imperial)
          } else {
               setThisUnits(units.ci)
          }
     }

     useEffect(() => {

     }, [thisUnits])

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
          <>
               {dragon ? (
                    <div className='dragon-item'>
                         <div className='dragon-item__inner'>
                              <div className='dragon-item__top'>
                                   <h2 className='dragon-item__title'>{dragon.name}</h2>
                                   <p className='dragon-item__first-flight text'>First flight: {dragon.first_flight}</p>
                              </div>
                              <div className='dragon-item__other'>
                                   <div className='dragon-item__info info-dragon'>
                                        <div className='info-dragon__general'>
                                             <p className='info-dragon__text text'>Type: {dragon.type}</p>
                                             <p className='info-dragon__text text'>Crew: {dragon.crew_capacity}</p>
                                             <p className='info-dragon__text text'>Active: {`${dragon.active}`}</p>
                                             <p className='info-dragon__text text'>Orbit duration year: {dragon.orbit_duration_yr}</p>
                                             <p className='info-dragon__text text'>Dry Mass: {dragon[`dry_mass_${thisUnits.weight}`]}</p>
                                             <p className='info-dragon__text text'>Launch payload mass: {dragon.launch_payload_mass[thisUnits.weight]}</p>
                                             <p className='info-dragon__text text'>Return payload mass: {dragon.return_payload_mass[thisUnits.weight]}</p>
                                             <a className='info-dragon__link link' href={`${dragon.wikipedia}`} target='_blank'>Wikipedia</a>
                                             <button className='info-dragon__btn btn' onClick={() => handleUnits()}>{thisUnits.length === 'meters' ? 'CI' : 'Imperials'}</button>
                                        </div>
                                        <p className='info-dragon__description'>{dragon.description}</p>
                                        <ul className='info-dragon__details details'>
                                             <li className='details__trunk'>
                                                  <h4 className='details__title'>Trunk</h4>
                                                  <p className='details__text text'>Height: {dragon.height_w_trunk[thisUnits.length]}</p>
                                                  <p className='details__text text'>Diameter: {dragon.diameter[thisUnits.length]}</p>
                                                  <p className='details__text text'>Volume: {dragon.trunk.trunk_volume[thisUnits.volume]}</p>
                                                  <ul className='details__list text'>Cargo:
                                                       {Object.entries(dragon.trunk.cargo).map((item, index) =>
                                                            <li key={index} className='details__item text'>{item[0].replace('_', ' ')}: <span className='thrusters__text text'>{`${item[1]}`}</span>&#44;</li>
                                                       )}
                                                  </ul>
                                             </li>
                                             <li className='details__head-shields'>
                                                  <h4 className='details__title'>Head shields</h4>
                                                  <p className='details__text text'>Material: {dragon.heat_shield.material}</p>
                                                  <p className='details__text text'>Size: {dragon.heat_shield.size_meters}</p>
                                                  <p className='details__text text'>Temperature: {dragon.heat_shield.temp_degrees}</p>
                                                  <p className='details__text text'>Dev Partner: {dragon.heat_shield.dev_partner}</p>
                                             </li>
                                             <li className='details__thrusters'>
                                                  <h4 className='details__title'>Thrusters: </h4>
                                                  <ul className='details__list list-thrusters'>
                                                       {dragon.thrusters.map(item =>
                                                            <li key={item.type} className='list-thrusters__item'>
                                                                 <p className='list-thrusters__text text'>Type: {item.type}</p>
                                                                 <p className='list-thrusters__text text'>Amount: {item.amount}</p>
                                                                 <p className='list-thrusters__text text'>Pods: {item.pods}</p>
                                                                 <div className='list-thrusters__text text'>Fuel:
                                                                      <span className='list-thrusters__text text'>{item.fuel_1}</span>
                                                                      &#44;
                                                                      <span className='list-thrusters__text text'>{item.fuel_2}</span>
                                                                 </div>
                                                            </li>
                                                       )}
                                                  </ul>
                                             </li>
                                        </ul>
                                   </div>
                                   <div className='dragon-item__carousel'>
                                        <Carousel data={dragon.flickr_images} />
                                   </div>
                              </div>
                         </div>
                    </div>
               )
                    : <Loader />
               }
          </>
     );
};

export default DragonItem;