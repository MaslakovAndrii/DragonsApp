import React from 'react';
import Container from '../../components/Container/Container';
import Registration from '../../components/Registration/Registration';
import './RegistrationPage.scss'

const RegistrationPage = () => {
     return (
          <Container>
               <div className='reg'>
                    <h1 className='reg__title main-page-title'>Зарегистрироваться</h1>
                    <Registration />
               </div>
          </Container>
     );
};

export default RegistrationPage;