import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { StoreProvider } from './context/Store'
import { Layout } from './components/Layout'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductPage from './pages/Product'
import { About, Cart, Contact, Location, NotFound, Occasions, Services } from './pages/Others'

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="product/:slug" element={<ProductPage />} />
            <Route path="occasions" element={<Occasions />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="location" element={<Location />} />
            <Route path="contact" element={<Contact />} />
            <Route path="cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  )
}
