import { createContext, useState, useEffect } from "react";
import { register,login } from "./services/auth.api";

export const AuthContext = createContext()

export function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (userName,password) => {
        setLoading(true)
        try {
            const response = await login(userName,password)
        }
        catch(err) {
            console.log(err)
        }
        finally {
            setLoading(false)
        }
        console.log("User logged in:", userName)
    }

    const handleRegister = async (userName,email,password) => {
        setLoading(true)

        try {
            const response = await register(userName,email,password)
            setUser(response.user)
            console.log("User registered successfully");
        }
        catch(err) {
            console.log(err)
        }
        finally {
            setLoading(false)
        }
    }


    return <AuthContext.Provider value={{user,setUser,loading,setLoading,handleLogin,handleRegister}}>
        {children}
    </AuthContext.Provider>
}