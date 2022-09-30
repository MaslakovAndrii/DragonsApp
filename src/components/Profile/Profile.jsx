
import { getAuth } from 'firebase/auth';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { GrEdit } from 'react-icons/gr'
import { MdOutlineDone } from 'react-icons/md'
import './Profile.scss'

const Profile = () => {
     const auth = getAuth();
     const user = auth.currentUser;
     const [rename, setRename] = useState(false)
     const [name, setName] = useState(user.displayName)


     const { register, handleSubmit } = useForm({
          defaultValues: {
               name: name,
          },
     })


     const editName = () => {
          setRename(true)
     }

     const onSubmit = (data) => {
          if(data.name) {
               setRename(false)
          }
          setName(data.name)
     }

     return (
          <div className='profile'>
               <div className='profile__name-area area-name'>
                    {!rename 
                         ? <>
                              <div className='area-name__name'>{name}</div>
                              <button onClick={() => editName()} className='area-name__btn area-name__btn_edit btn_null'>
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
                                                  maxLength: 30
                                             }
                                        )}
                                        placeholder={!user.displayName ? 'Введите имя' : user.displayName}
                                   />
                                   <button type='submit' className='area-name__btn area-name__btn_done btn_null'>
                                        <MdOutlineDone className='area-name__icon' />
                                   </button>
                              </form>
                         </>
                    }
               </div>
          </div>
     );
};

export default Profile;