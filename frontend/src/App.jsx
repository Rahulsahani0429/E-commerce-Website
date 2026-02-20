import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
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
import AdminCustomers from './pages/AdminCustomers'
import AdminReports from './pages/AdminReports'
import AdminStats from './pages/AdminStats'
import AdminNotifications from './pages/AdminNotifications'
import AdminHelp from './pages/AdminHelp'
import AdminSettings from './pages/AdminSettings'
import OrderList from './pages/OrderList'
import PaymentList from './pages/PaymentList'
import MyOrders from './pages/MyOrders'
import Shipping from './pages/Shipping'
import Payment from './pages/Payment'
import PlaceOrder from './pages/PlaceOrder'
import Success from './pages/Success'
import OrderTracking from './pages/OrderTracking'
import InfoPage from './pages/InfoPage'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </AuthProvider>
  )
}

function AppContent() {
  const location = useLocation()
  const isAdminPath = location.pathname.startsWith('/admin')

  return (
    <>
      {!isAdminPath && <Header />}
      <main className={isAdminPath ? 'admin-main' : ''}>
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
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<ProductList />} />
          <Route path="/admin/product/:id/edit" element={<ProductEdit />} />
          <Route path="/admin/users" element={<UserList />} />
          <Route path="/admin/customers" element={<AdminCustomers />} />
          <Route path="/admin/reports" element={<AdminReports />} />
          <Route path="/admin/stats" element={<AdminStats />} />
          <Route path="/admin/notifications" element={<AdminNotifications />} />
          <Route path="/admin/help" element={<AdminHelp />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/admin/orders" element={<OrderList />} />
          <Route path="/admin/payments" element={<PaymentList />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/placeorder" element={<PlaceOrder />} />
          <Route path="/success/:id" element={<Success />} />
          <Route path="/order/:id" element={<OrderTracking />} />
          <Route path="/info/:slug" element={<InfoPage />} />
        </Routes>
      </main>
      {!isAdminPath && <Footer />}
    </>
  )
}

export default App
