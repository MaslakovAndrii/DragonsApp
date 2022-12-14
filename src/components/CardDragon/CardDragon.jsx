import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFavorite, setFavorite } from '../../store/slices/favoriteSlice';
import { Link } from 'react-router-dom';

import InteractiveButton from '../InteractiveButton/InteractiveButton';

import './CardDragon.scss'
import { AiOutlineClose } from 'react-icons/ai'
import { FcLike } from 'react-icons/fc'

const CardDragon = ({ data, typeButton }) => {
     const dispatch = useDispatch()

     const addToFavorites = (id) => {
          dispatch(setFavorite(id))
     }

     const removeFromFavorites = (id) => {
          dispatch(removeFavorite(id))
     }

     let Button = null;
     switch (typeButton) {
          case 'favorite':
               Button = <InteractiveButton
                    id={data.id}
                    actionHandler={addToFavorites}
                    textTooltip='Add to favorites'
               >
                    <FcLike className='card-dragon__like' />
               </InteractiveButton>
               break
          case 'remove':
               Button = <InteractiveButton
                    id={data.id}
                    actionHandler={removeFromFavorites}
                    textTooltip='Remove from favorites'
               >
                    <AiOutlineClose className='card-dragon__like' />
               </InteractiveButton>
               break
          default:  return null
     }

     return (
          <article className='card-dragon'>
               <Link to={`${data.id}`} className='card-dragon__link link' >
                    <div className='card-dragon__img-container'><img className='card-dragon__img' src={data.flickr_images[0]} alt='' /></div>
                    <h4 className='card-dragon__title'>{data.name}</h4>
                    <p className='card-dragon__description'>{data.description}</p>
               </Link>
                    {Button}
          </article>
     );
};

export default CardDragon;