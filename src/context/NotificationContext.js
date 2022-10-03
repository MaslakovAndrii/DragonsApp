import { Children, createContext, useContext, useReducer } from "react";
import Notification from "../components/Notification/Notification";

export const NotificationContext = createContext()

const NotificationProvider = ({children, ...props}) => {

     const [state, dispatch_N] = useReducer((state, action) => {
          switch (action.type) {
               case 'SHOW_NOTIFICATION':
                    return state = action.payload;
               case 'HIDE_NOTIFICATION':
                    return state = null;
               default: return state
          }
     },
     {

     })

     return <NotificationContext.Provider value={dispatch_N}>
          <Notification dispatch_N={dispatch_N} {...state}/>
          {children}
     </NotificationContext.Provider>
}

export const useNotification = () => {
     return useContext(NotificationContext)
}

export default NotificationProvider;


