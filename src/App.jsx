import { Route, Routes } from 'react-router-dom'
import './App.css'
import MentorDashboardUIKit from './pages/MentorDashboardUIKit'
import NotificationsPage from './pages/NotificationsPage'

function App() {

  return (
    <section>
      <Routes>
        <Route path='/' element={<MentorDashboardUIKit/>}/>
        <Route path='/notifications' element={<NotificationsPage/>}/>
      </Routes>
    </section>
  )
}

export default App
