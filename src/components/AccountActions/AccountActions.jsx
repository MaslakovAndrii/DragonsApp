import React, { useState } from 'react';
import { VscAccount } from 'react-icons/vsc';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeUser } from '../../store/slices/userSlice';
import { FAVORITE_ROUTE } from '../../utils/const';
import Modal from '../Modal/Modal'
import './AccountActions.scss'

const Profile = () => {
     const [visibleBottom, setVisibleBottom] = useState(false)
     const [modalActive, setModalActive] = useState(false)
     const dispatch = useDispatch()

     const handleProfile = () => {
          if (!visibleBottom) {
               setVisibleBottom(true)

          } else {
               setVisibleBottom(false)
          }
     }

     return (
          <div className='profile'>
               <div className='profile__top'>
                    <button onClick={handleProfile} className='profile__btn btn_null'>
                         <VscAccount className='profile__account-icon account-icon' />
                    </button>
               </div>
               <div className={`profile__bottom ${visibleBottom ? 'profile__bottom_visible' : null}`}>
                    <ul className='profile__list list-profile'>
                         <li className='list-profile__item'><button onClick={() => setModalActive(true)} className='list-profile__btn btn_null'>Profile</button></li>
                         <li className='list-profile__item'>
                              <Link className='list-profile__link link' to={FAVORITE_ROUTE}>Favorite</Link>
                         </li>
                    </ul>
                    <button className='header__logout logout btn' onClick={() => dispatch(removeUser())}>Выйти</button>
               </div>
               <Modal active={modalActive} setActive={setModalActive}>hello</Modal>
          </div>
     );
};

export default Profile;