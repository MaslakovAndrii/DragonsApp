import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LIST_ROUTE } from '../../utils/const';

import Logo from '../../assets/image/logo.png'
import Profile from '../AccountActions/AccountActions';

import './Header.scss'
import { GiHamburgerMenu } from 'react-icons/gi';


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
               <img className='header__logo logo' src={Logo} onClick={() => navigate('/')} alt='logo'/>
               <div className={`header__body ${menuOpen ? 'menu-open' : ''}`}>
                    <nav className='header__menu menu'>
                         <ul className='menu__list'>
                              <li className='menu__item'><NavLink className='link link_dark' to={LIST_ROUTE}>Lists of dragons</NavLink></li>
                         </ul>
                    </nav>
                    <div className='header__container-profile'>
                         <Profile />
                    </div>
               </div>
               <GiHamburgerMenu onClick={() => handleMenuOpen()} className='header__burger burger' />
          </header>
     );
};

export default Header;