import { Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './features/login/login'
import Register from './features/register/register'
import Home from './features/home/home'
import Profile from './features/profile/profile'
import PageNotFound from './features/pageNotFound/pageNotFound'
import LoginGuard from './shared/guards/loginGuard'
import AuthGuard from './shared/guards/authGuard'
import Navigation from './shared/components/navigation/navigation'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <div className="app-container">
      <Navigation />
      <div className="main-content container">
        <Routes>
          <Route path="/" element={<LoginGuard><Login /></LoginGuard>} />
          <Route path="/login" element={<LoginGuard><Login /></LoginGuard>} />
          <Route path="/register" element={<LoginGuard><Register /></LoginGuard>} />
          <Route path="/home" element={<AuthGuard><Home /></AuthGuard>} />
          <Route path="/profile" element={<AuthGuard><Profile /></AuthGuard>} />
          <Route path="/user/:userId" element={<AuthGuard><Profile /></AuthGuard>} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
      
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
    </div>
  )
}

export default App