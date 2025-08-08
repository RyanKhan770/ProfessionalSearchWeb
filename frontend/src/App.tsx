import { Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './features/login/login'
import Register from './features/register/register'
import Home from './features/home/home'
import LoginGuard from './shared/guards/loginGuard'
import AuthGuard from './shared/guards/authGuard'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Profile from './features/profile/profile'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginGuard><Login /></LoginGuard>} />
        <Route path="/login" element={<LoginGuard><Login /></LoginGuard>} />
        <Route path="/register" element={<LoginGuard><Register /></LoginGuard>} />
        <Route path="/home" element={<AuthGuard><Home /></AuthGuard>} />
        <Route path="/profile" element={<AuthGuard><Profile /></AuthGuard>} />
      </Routes>
      
      {/* Toast notification container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default App