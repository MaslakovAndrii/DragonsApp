import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { LIST_ROUTE } from '../../utils/const';
import { GiHamburgerMenu } from 'react-icons/gi';

import Logo from '../../assets/image/logo.png'

import './Header.scss'
import Profile from '../AccountActions/AccountActions';


const Header = () => {
     const [menuOpen, setMenuOpen] = useState(false)
     const navigate = useNavigate()



     const handleMenuOpen = () => {
          if (!menuOpen) {
               setMenuOpen(true)

          } else {
               setMenuOpen(false)
          }
     }

     return (
          <header className='header'>
               <img className='header__logo logo' src={Logo} onClick={() => navigate('/')} />
               <div className={`header__body ${menuOpen ? 'menu-open' : ''}`}>
                    <nav className='header__menu menu'>
                         <ul className='menu__list'>
                              <li className='menu__item'><NavLink className='link link_dark' to={LIST_ROUTE}>Список ракет</NavLink></li>
                              <li className='menu__item'><NavLink className='link link_dark' to={LIST_ROUTE}>Список ракет</NavLink></li>
                         </ul>
                    </nav>
                    <div className='header__container-profile'>
                         <Profile />
                    </div>

                    {/* <button onClick={handleProfile} className='header__btn btn_null'>
                         <VscAccount className='header__account-icon account-icon'/>
                    </button> */}
                    {/* <button className='header__logout logout btn' onClick={() => dispatch(removeUser())}>Выйти</button> */}
               </div>
               <GiHamburgerMenu onClick={() => handleMenuOpen()} className='header__burger burger' />
          </header>
     );
};

export default Header;