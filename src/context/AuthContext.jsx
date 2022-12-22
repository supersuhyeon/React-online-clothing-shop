import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { login, logout, onUserStateChange } from "../api/firebase";

const AuthContext = createContext()

export function AuthContextProvider({children}){

    const [user, setUser] = useState();

    useEffect(()=>{
        onUserStateChange((user)=>{return setUser(user)})
    },[])
    
    return <AuthContext.Provider value={{user, uid: user && user.uid, login:login, logout:logout }}>
        {children}
    </AuthContext.Provider>
}

export function useAuthContext(){
    return useContext(AuthContext)
}