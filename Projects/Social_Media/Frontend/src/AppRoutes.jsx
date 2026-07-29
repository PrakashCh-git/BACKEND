import {createBrowserRouter} from "react-router"
import Login from "./features/auth/pages/Login"
import Register from "./features/auth/pages/Register"

export const router = createBrowserRouter([
  {
    path: "/Login",
    element: <Login/>
  },
  {
    path: "/Register",
    element: <Register/>
  },
  {
    path: "/",
    element: <h1>Welcome to Homepage. Hope you are doing well. <br></br> Thanking You! </h1>
  }

])