import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import AdminDashboard from './pages/AdminDashboard'
import ProductList from './pages/ProductList'
import ProductEdit from './pages/ProductEdit'
import UserList from './pages/UserList'
import OrderList from './pages/OrderList'
import MyOrders from './pages/MyOrders'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/orders" element={<MyOrders />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/products" element={<ProductList />} />
              <Route path="/admin/product/:id/edit" element={<ProductEdit />} />
              <Route path="/admin/users" element={<UserList />} />
              <Route path="/admin/orders" element={<OrderList />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
