
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/user/Login'
import Signup from './pages/user/Signup'
import { ToastContainer } from 'react-toastify';
import UserHome from './pages/user/UserHome';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLogin from './pages/admin/AdminLogin';
import { Provider } from 'react-redux';
import store from './store/store';
import UserProfile from './pages/user/UserProfile';


function App() {

  const router = createBrowserRouter([
    {path : '/',
      element: <UserHome/>
    },
    {path: '/login',
      element: <Login/>
    },{
      path: '/signup',
      element: <Signup/>
    },{
      path: '/userprofile',
      element: <UserProfile/>
    },{
      path:'/admin',
      element: <AdminDashboard/>
    },{
      path:'/admin/login',
      element:<AdminLogin/>
    }
  ])
  return (
    <>
    <Provider store={store}>

    <ToastContainer theme='dark'/>
     <RouterProvider router={router}/>
    </Provider>
    </>
  )
}

export default App
