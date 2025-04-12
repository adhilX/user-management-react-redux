
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/user/Login'
import Signup from './pages/user/Signup'


function App() {

  const router = createBrowserRouter([
    {path: '/login',
      element: <Login/>
    },{
      path: '/signup',
      element: <Signup/>
    }
  ])
  return (
    <>
     <RouterProvider router={router}/>
    </>
  )
}

export default App
