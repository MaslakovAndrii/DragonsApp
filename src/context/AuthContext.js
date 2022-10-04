import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

const UserContext = createContext()

export const AuthContextProvider = ({ children }) => {
     const [user, setUser] = useState({})

     const createUser = (email, password) => {
          return createUserWithEmailAndPassword(auth, email, password)
     }

     const singIn = (email, password) => {
          return signInWithEmailAndPassword(auth, email, password)
     }

     const logout = () => {
          return signOut(auth)
     }

     // добавил только изменение имени пользователя, но есть еще функционал
     const changeProfile = (name) => {
          return updateProfile(auth.currentUser, {
               displayName: name,
          })
     }


     useEffect(() => {
          const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
               setUser(currentUser)
          })
          return () => {
               unsubscribe()
          }
     }, [])

     return (
          <UserContext.Provider value={{ createUser, singIn, user, logout, changeProfile }}>
               {children}
          </UserContext.Provider>
     )
}

export const UserAuth = () => {
     return useContext(UserContext)
}