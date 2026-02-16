import {Link} from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {Fragment} from "react";

const Navbar = () => {
   const {user, logout}= useAuth();
   
   return (
   <nav className="bg-black text-white p-4 flex justify-between">
   <Link to="/" className="font-bold">
   Tazkiya Store
   </Link>
   <div className="space-x-4">
   {user ? <Fragment>
   <span>Hello, {user.name}</span>
   <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
   </Fragment> :(<Link to="/login">Login</Link>)}
   </div>
   </nav>
   );
}

export default Navbar;