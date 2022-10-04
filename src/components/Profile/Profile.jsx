import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';

import './Profile.scss'
import { GrEdit } from 'react-icons/gr'
import { MdOutlineDone } from 'react-icons/md'


const Profile = () => {
     const {user, changeProfile } = UserAuth()
     const [rename, setRename] = useState(false)
     const dispatch_N = useNotification()

     const { register, handleSubmit, formState: { errors } } = useForm({
          defaultValues: {
               name: user.displayName,
          },
          mode: 'onChange'
     })


     const onSubmit = async (data) => {
          if (data.name) {
               try {
                    await changeProfile(data.name)
                    dispatch_N({
                         type: 'SHOW_NOTIFICATION',
                         payload: {
                              type: 'successful',
                              message: `Renaming done. `
                         }
                    })
                    
                    setRename(false)
               } catch (err) {
                    dispatch_N({
                         type: 'SHOW_NOTIFICATION',
                         payload: {
                              type: 'successful',
                              message: `${err}`
                         }
                    })
               }
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
                                                       required: 'Required field',
                                                       maxLength: { value: 30, message: "Maximum name length 30 characters" }
                                                  }
                                             )}
                                             // placeholder={user.displayName ? `${user.displayName}` : 'Enter name'}
                                             placeholder='Enter name'
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