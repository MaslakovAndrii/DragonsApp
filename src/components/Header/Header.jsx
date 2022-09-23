import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { removeUser } from '../../store/slices/userSlice';
import { LIST_ROUTE } from '../../utils/const';


const Header = () => {
     const dispatch = useDispatch()

     return (
          <div>
               <div>Dragon</div>
               <nav>
                    <ul>
                         <li><NavLink to={LIST_ROUTE}>Список ракет</NavLink></li>
                    </ul>
               </nav>
               <button onClick={() => dispatch(removeUser())}>Выйти</button>
          </div>
     );
};

export default Header;