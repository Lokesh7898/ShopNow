import './Assets/Style/index.css';

// Bootstrap.....................
import 'bootstrap/dist/css/bootstrap.min.css';

// toastify......................
import 'react-toastify/dist/ReactToastify.css';

// Routing......................
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


// Pages........................
import Navbar from './Assets/Jsx/Components/Navbar';
import Wishlist from './Assets/Jsx/Pages/Wishlist';
import Home from './Assets/Jsx/Pages';
import Cart from './Assets/Jsx/Pages/Cart';
import CheckoutSuccessModal from './Assets/Jsx/Components/CheckoutSuccessModal';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <ToastContainer autoClose={1000} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout-success" element={<CheckoutSuccessModal />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
