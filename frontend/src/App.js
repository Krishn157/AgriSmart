import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import HomeScreen from "./screens/HomeScreen";
import InventoryHomeScreen from "./screens/InventoryHomeScreen";
import InProgressScreen from "./screens/InProgressScreen";
import AllLandsScreen from "./screens/contract/AllLandsScreen";
import PrivateRoute from "./components/PrivateRoute";
import LandEditScreen from "./screens/contract/LandEditScreen";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route
              path="/inventory/search/:keyword"
              element={<InventoryHomeScreen />}
              exact
            />
            <Route
              path="/inventory/page/:pageNumber"
              element={<InventoryHomeScreen />}
              exact
            />
            <Route
              path="/inventory/search/:keyword/page/:pageNumber"
              element={<InventoryHomeScreen />}
              exact
            />
            <Route path="/inventory" element={<InventoryHomeScreen />} exact />
            <Route
              path="/contract"
              element={
                <PrivateRoute>
                  <AllLandsScreen />
                </PrivateRoute>
              }
              exact
            />
            <Route
              path="/contract/land/:id/edit"
              element={<LandEditScreen />}
            />
            <Route path="/bazaar" element={<InProgressScreen />} exact />
            <Route path="/detector" element={<InProgressScreen />} exact />
            <Route path="/" element={<HomeScreen />} exact />

            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/inventory/shipping" element={<ShippingScreen />} />
            <Route path="/inventory/payment" element={<PaymentScreen />} />
            <Route
              path="/inventory/placeorder"
              element={<PlaceOrderScreen />}
            />
            <Route path="/inventory/profile" element={<ProfileScreen />} />
            <Route path="/inventory/product/:id" element={<ProductScreen />} />
            <Route path="/inventory/cart">
              <Route path="/inventory/cart/:id" element={<CartScreen />} />
              <Route path="" element={<CartScreen />} />
            </Route>
            <Route path="/inventory/order/:id" element={<OrderScreen />} />
            <Route
              path="/inventory/admin/userlist"
              element={<UserListScreen />}
            />
            <Route
              path="/inventory/admin/productlist"
              element={<ProductListScreen />}
              exact
            />
            <Route
              path="/inventory/admin/productlist/:pageNumber"
              element={<ProductListScreen />}
              exact
            />
            <Route
              path="/inventory/admin/orderlist"
              element={<OrderListScreen />}
            />
            <Route
              path="/inventory/admin/user/:id/edit"
              element={<UserEditScreen />}
            />
            <Route
              path="/inventory/admin/product/:id/edit"
              element={<ProductEditScreen />}
            />
          </Routes>
        </Container>
      </main>

      <Footer />
    </Router>
  );
};

export default App;
