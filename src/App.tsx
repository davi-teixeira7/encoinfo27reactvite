import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom"
import Home from "./pages/Home"
import Loja from "./pages/Loja"
import Navbar from "./components/Navbar"

function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="loja/:lojaId" element={<Loja />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
