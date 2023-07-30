import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home/'
import { History } from './pages/History/'
import { DefaultLayout } from './layouts/DefaultLayout'

export function Router() {
  return (
    <Routes>
      {/* Chaining Route components allows elements to nest each other */}
      {/* Their path also chains i.e: /admin/products will display a*/}
      {/* Products component inside a Admin component */}
      <Route path="/" element={<DefaultLayout />}>

        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Route>

      {/* <Route path="/admin" element={<AdminLayout />}>
        <Route path="/products" element={<Products />} />
      </Route> */}

    </Routes>
  )
}
