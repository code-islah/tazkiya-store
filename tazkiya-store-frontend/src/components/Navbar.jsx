import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Fragment } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-black text-white p-4 flex justify-between">
      <Link to="/" className="font-bold">
        Tazkiya Store
      </Link>
      <div className="space-x-4">
        {user?.role === "admin" && <Link to="admin/orders">Admin</Link>}

        {user?.role === "admin" && (
          <Fragment>
            <Link to="/admin/orders">Orders</Link>
            <Link to="/admin/products">Products</Link>
          </Fragment>
        )}

        {user ? (
          <Fragment>
            <Link to="/cart">Cart</Link>
            <Link to="/my-orders">My Orders</Link>
            <span>Hello, {user.name}</span>
            <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">
              Logout
            </button>
          </Fragment>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
