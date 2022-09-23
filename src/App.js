import { Provider } from 'react-redux';
import store from './store';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { AUTHORIZATION_ROUTE, REGISTRATION_ROUTE, START_ROUTE, LIST_ROUTE } from './utils/const';
import './firebase';

import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import Layout from './components/Layout/Layout';
import DragonsList from './components/DragonsList/DragonsList';
import DragonItem from './components/DragonItem/DragonItem';

function App() {
     return (
          <HashRouter>
               <Provider store={store}>
                    <Routes>
                         <Route path={AUTHORIZATION_ROUTE} element={<LoginPage />} />
                         <Route path={REGISTRATION_ROUTE} element={<RegistrationPage />} />
                         <Route path={START_ROUTE} element={<Layout />}>
                              <Route index element={<HomePage />} />
                              <Route path={LIST_ROUTE} element={<DragonsList />} />
                              <Route path={`${LIST_ROUTE}/:id`} element={<DragonItem />} />
                              <Route path='*' element={<div>страница не найдена</div>} />
                         </Route>
                    </Routes>
               </Provider>
          </HashRouter>
     );
}

export default App;

