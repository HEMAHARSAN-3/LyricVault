import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './components/Home'
import { Search } from './components/Search'
import { AddSong } from './components/AddSong'
import { SongView } from './components/SongView'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { ProtectedRoute } from './components/ProtectedRoute'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={
           <ProtectedRoute>
              <Layout />
           </ProtectedRoute>
        }>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="add" element={<AddSong />} />
          <Route path="song/:id" element={<SongView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
