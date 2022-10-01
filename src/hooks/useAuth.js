import { useSelector } from "react-redux";

export  function useAuth() {
     const {email, token, id, isAuth} = useSelector(state => state.user)

     return {
          isAdmin: email === 'web.work.mv@gmail.com',
          isAuth: !!email,
          email,
          token,
          id,
     }
}

