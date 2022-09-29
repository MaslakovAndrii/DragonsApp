import React from 'react';
import { Link } from 'react-router-dom';
import { FcLike } from 'react-icons/fc'
import './CardDragon.scss'

const CardDragon = ({ id, image, name, description }) => {
     return (
          <article className='card-dragon'>
               <Link to={`${id}`} className='card-dragon__link link' >
                    <div className='card-dragon__img-container'><img className='card-dragon__img' src={image} alt='картинки нет' /></div>
                    <h4 className='card-dragon__title'>{name}</h4>
                    <p className='card-dragon__description'>{description}</p>
               </Link>
               <button className='card-dragon__btn btn_null'>
                    <FcLike className='card-dragon__like' />
                    <span className='tooltip'>Add to favorites</span>
               </button>
          </article>
     );
};

export default CardDragon;