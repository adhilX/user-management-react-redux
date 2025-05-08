
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/user/Login'
import Signup from './pages/user/Signup'
import { ToastContainer } from 'react-toastify';
import UserHome from './pages/user/UserHome';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLogin from './pages/admin/AdminLogin';
import { Provider } from 'react-redux';
import ProtectedRoute from './components/Protected';
import { store } from './store/store';
import { lazy, Suspense } from 'react';
const UserProfile = lazy(()=> import ('./pages/user/UserProfile'));


function App() {

  const router = createBrowserRouter([
    {path : '/',
      element: <ProtectedRoute>
        <UserHome/>
      </ProtectedRoute>
    },
    {path: '/login',
      element: <Login/>
    },{
      path: '/signup',
      element: <Signup/>
    },{
      path: '/userprofile',
      element: <ProtectedRoute >
        <Suspense fallback={<div className='grid place-items-center h-dvh text-2xl'><p>Loading.....</p></div>}>
        <UserProfile/>
        </Suspense>
      </ProtectedRoute>
    },{
      path:'/admin',
      element:<ProtectedRoute isAdmin={true}>
        <AdminDashboard/>
      </ProtectedRoute>

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
