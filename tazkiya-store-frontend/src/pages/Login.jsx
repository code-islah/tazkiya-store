import {useState} from "react";
import {useAuth} from "../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";


const Login = ()=>{
  const {login} = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const submitHandler = async (e) => {
  e.preventDefault();
  try{
  await login(email, password);
  navigate("/");
  } catch(err) {
  alert("Login failed");
  }
  }
  
  return (
  <div className="flex justify-center items-center h-screen">
  <form onSubmit={submitHandler} className="border p-6 rounded w-80">
      <h2 className="text-xl font-bold mb-4">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-black text-white w-full py-2 rounded">
          Login
        </button>  </form>
  </div>
  )
}

export default Login;
