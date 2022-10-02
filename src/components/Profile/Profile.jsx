import React, { useState } from 'react';
import { updateProfile } from 'firebase/auth';
import { useForm } from 'react-hook-form';

// import Notification from '../../components/Notification/Notification';

import './Profile.scss'
import { GrEdit } from 'react-icons/gr'
import { MdOutlineDone } from 'react-icons/md'
import { auth } from '../../firebase';
import { UserAuth } from '../../context/AuthContext';



const Profile = () => {
     const [rename, setRename] = useState(false)
     const { user } = UserAuth()
     // const [notification, setNotification] = useState(false)


     const { register, handleSubmit, formState: { errors} } = useForm({
          defaultValues: {
               name: user.displayName,
          },
          mode: 'onChange'
     })

     const onSubmit = (data) => {
          if (data.name) {
               updateProfile(auth.currentUser, {
                    displayName: data.name
               })
                    .then(() => {
                         // setNotification({ type: 'successful', message: 'Вы упешно поменяли имя' })
                    })
                    .catch(() => {
                         // setNotification({ type: 'error', message: 'Не удалось сохранить имя пользователя.' })
                    })
               setRename(false)
          }
     }

     return (
          <>
               <div className='profile'>
                    <div className='profile__name-area area-name'>
                         {!rename
                              ? <>
                                   <div className='area-name__name'>{user.displayName}</div>
                                   <button onClick={() => setRename(true)} className='area-name__btn area-name__btn_edit btn_null'>
                                        <GrEdit className='area-name__icon' />
                                   </button>
                              </>
                              : <>
                                   <form className='area-name__form' onSubmit={handleSubmit(onSubmit)} >
                                        <input
                                             className='area-name__input form__input'
                                             type='name'
                                             {...register('name',
                                                  {
                                                       required: 'Обязательное поле',
                                                       maxLength: 30
                                                  }
                                             )}
                                             placeholder='Введите имя'
                                        />
                                        {errors?.name && <div className='form__error'>{errors.name.message}</div>}
                                        <button type='submit' className='area-name__btn area-name__btn_done btn_null'>
                                             <MdOutlineDone className='area-name__icon' />
                                        </button>
                                   </form>
                              </>
                         }
                    </div>
               </div>
          </>
     );
};

export default Profile;