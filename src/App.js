/*import logo from './logo.svg';
import './App.css';
import HomePage from './components/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import About from './components/About';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import UserProfile from './components/UserProfile';
import Product from './components/Product';
import Cart from './components/Cart';
import DeleteUsers from './components/DeleteUsers';
import AddProducts from './components/AddProducts';
import Payment from './components/Payment';
import UserManagement from './components/UserManagement';
import DeleteProducts from './components/DeleteProducts';
import ProductManagement from './components/ProductManagement';
import UserOrders from './components/UserOrders';
import AddtoCart from './components/AddtoCart';



function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<HomePage/>}/>
    <Route path='/SignUp' element={<SignUp/>}/>
    <Route path='/Login' element={<Login/>}/>
    <Route path='/About' element={<About/>}/>
    <Route path='/AdminLogin' element={<AdminLogin/>}/>
    <Route path='/Product' element={<Product/>}/>
    <Route path='/AdminDashboard' element={<AdminDashboard/>}/>
    <Route path='/UserProfile' element={<UserProfile/>}/>
    <Route path='/DeleteUsers' element={<DeleteUsers/>}/>
    <Route path='/AddProducts' element={<AddProducts/>}/>
    <Route path='/Payment' element={<Payment/>}/>
    <Route path='/UserManagement' element={<UserManagement/>}/>
    <Route path='/DeleteProducts' element={<DeleteProducts/>}/>
    <Route path='/ProductManagement' element={<ProductManagement/>}/>
    <Route path='/AddtoCart' element={<AddtoCart/>}/>
    <Route path='/Cart' element={<Cart/>}/>
    <Route path='/UserOrders' element={<UserOrders/>}/>
   </Routes>
   </BrowserRouter>
  );
}

export default App;*/
import logo from './logo.svg';
import './App.css';
import HomePage from './components/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import About from './components/About';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import UserProfile from './components/UserProfile';
import Product from './components/Product';
import Cart from './components/Cart';
import DeleteUsers from './components/DeleteUsers';
import AddProducts from './components/AddProducts';
import Payment from './components/Payment';
import UserManagement from './components/UserManagement';
import DeleteProducts from './components/DeleteProducts';
import ProductManagement from './components/ProductManagement';
import UserOrders from './components/UserOrders';
import AddtoCart from './components/AddtoCart';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';  // Change this to named import
import PaymentHistory from './components/PaymentHistory';
import AdminPage from './components/AdminPage';
import AdminAddDiet from './components/AdminAddDiet';
import ViewDiet from './components/ViewDiet';
import AddDetails from './components/AddDetails';
import AdminVerify from './components/AdminVerify';
import BplProducts from './components/BplProducts';
import BplLogin from './components/BplLogin';
import BPLProfile from './components/BPLProfile';
import BPLDietPlan from './components/BPLDietPlan';
import AddBPLProducts from './components/AddBPLProducts';
import ProductSalesAnalysis from './components/ProductSalesAnalysis';
import ViewBPLOrders from './components/ViewBPLOrders';
import Feedback from './components/Feedback';
import AdminFeedbackViewer from './components/AdminFeedbackViewer';




function App() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');  // Assuming you're using JWT for authentication
    if (token) {
      try {
        const decoded = jwtDecode(token);  // Decode the token to extract the user ID
        setUserId(decoded.userId);
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path="*" element={<HomePage />} />
        <Route path='/SignUp' element={<SignUp />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/About' element={<About />} />
        <Route path='/AdminLogin' element={<AdminLogin />} />
        <Route path='/Product' element={<Product />} />
        <Route path='/AdminDashboard' element={<AdminDashboard />} />
        <Route path='/UserProfile' element={<UserProfile />} />
        <Route path='/DeleteUsers' element={<DeleteUsers />} />
        <Route path='/AddProducts' element={<AddProducts />} />
        <Route path='/Payment' element={<Payment />} />
        <Route path='/UserManagement' element={<UserManagement />} />
        <Route path='/DeleteProducts' element={<DeleteProducts />} />
        <Route path='/ProductManagement' element={<ProductManagement />} />
        <Route path='/AddtoCart' element={<AddtoCart />} />
        <Route path='/Cart' element={<Cart userId={userId} />} />
        <Route path='/UserOrders' element={<UserOrders />} />
        <Route path='/PaymentHistory' element={<PaymentHistory/>}/>
        <Route path='/BPLProfile' element={<BPLProfile/>}/>
        <Route path='/BPLDietPlan' element={<BPLDietPlan/>}/>
        <Route path='/AdminPage' element={<AdminPage/>}/>
        <Route path='/AdminAddDiet' element={<AdminAddDiet/>}/>
        <Route path='/ViewDiet' element={<ViewDiet/>}/>
        <Route path='/AdminVerify' element={<AdminVerify/>}/>
        <Route path='/AddDetails' element={<AddDetails/>}/>
        <Route path='/BplProducts' element={<BplProducts/>}/>
        <Route path='/BplLogin' element={<BplLogin/>}/>
        <Route path='/AddBPLProducts' element={<AddBPLProducts/>}/>
        <Route path='/ProductSalesAnalysis' element={<ProductSalesAnalysis/>}/>
        <Route path='/ViewBPLOrders' element={<ViewBPLOrders/>}/>
        <Route path='/Feedback' element={<Feedback/>}/>
        <Route path='/AdminFeedbackViewer' element={<AdminFeedbackViewer/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
