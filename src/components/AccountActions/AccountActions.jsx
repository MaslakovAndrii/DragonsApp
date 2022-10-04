import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AUTHORIZATION_ROUTE, FAVORITE_ROUTE } from '../../utils/const';

import { UserAuth } from '../../context/AuthContext';
import Modal from '../Modal/Modal'
import Profile from '../Profile/Profile';

import { VscAccount } from 'react-icons/vsc';
import './AccountActions.scss'

const AccountActions = () => {
     const [visibleBottom, setVisibleBottom] = useState(false)
     const [modalActive, setModalActive] = useState(false)
     const navigate = useNavigate()
     const { user, logout } = UserAuth()

     
     const handleProfile = () => {
          if (!visibleBottom) {
               setVisibleBottom(true)

          } else {
               setVisibleBottom(false)
          }
     }

     const handleLogout = async () => {
          try {
               await logout()
               navigate(AUTHORIZATION_ROUTE)
          } catch (e) {
               console.log(e);
          }
     }

     return (
          <div className='account-actions'>
               <div className='account-actions__top'>
                    <h3 className='account-actions__user-name'>{user.displayName}</h3>
                    <button onClick={handleProfile} className='account-actions__btn btn_null'>
                         <VscAccount className='account-actions__account-icon account-icon' />
                    </button>
               </div>
               <div className={`account-actions__bottom ${visibleBottom ? 'account-actions__bottom_visible' : ''}`}>
                    <ul className='account-actions__list list-account-actions'>
                         <li className='list-account-actions__item'><button onClick={() => setModalActive(true)} className='list-account-actions__btn btn_null'>Profile</button></li>
                         <li className='list-account-actions__item'>
                              <Link className='list-account-actions__link link' to={FAVORITE_ROUTE}>Favorite</Link>
                         </li>
                    </ul>
                    <button className='header__logout logout btn' onClick={handleLogout}>Logout</button>
               </div>
               <Modal active={modalActive} setActive={setModalActive}>
                    <Profile/>
               </Modal>
          </div>
     );
};

export default AccountActions;