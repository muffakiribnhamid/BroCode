import { useState } from 'react'
import './App.css'
import Login from './Auth/Login'
import GridBackground from './components/GridBackground'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainPage from './pages/MainPage'
import SignUp from './Auth/SignUp'
import WelcomeScreen from './pages/WelcomeScreen'
import { UserProvider } from './context/UserContext'
import MainScreen from './pages/MainScreen'
import ProfileCreate from './pages/ProfileCreate'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainPage />,
      errorElement : <div>404</div>,
      children : [
        {
          path: "/",
          element: <WelcomeScreen />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signUp",
          element: <SignUp />,
        },
        {
          path: "/main",
          element: <MainScreen />,
        },
        {
          path: '/profileCreate',
          element: <ProfileCreate />,
        }
      ]
    }
  ])

  return (
    <>

    <UserProvider>
      <GridBackground />
      <div className="App">
        <RouterProvider router={router} />
        
      </div>
    </UserProvider>

    </>
  )
}

export default App
