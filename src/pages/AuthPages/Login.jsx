import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast, Toaster } from "sonner";
import AuthContext from "../../contexts/authContext/AuthContext";

const Login = () => {
  const { currentUser, userLogin, loginViaGoogle, setLoading } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [errMessage, setErrMessage] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [inputMail, setInputMail] = useState("");
  
  // if (currentUser) {
  //   navigate("/");
  //   return;
  // }
  // Had to comment it out to keep the other navigation functionality (look at: const from)
  
  const handleShowPass = () => {
    setShowPass(!showPass);
  };
  
  const handleFPass = () => {
    setForgotpassEmail(inputMail);
    navigate("/forgotpassword");
  }

  const handleLoginGoogle = (e) => {
    e.preventDefault();
    loginViaGoogle()
      .then((result) => {
        toast.success(`${result.user.displayName} signed in successfully!`);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setErrMessage(error.message);
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    userLogin(email, password)
      .then((result) => {
        toast.success(`${result.user.displayName} logged in successfully!`);
        setLoading(true);
        navigate(from, { replace: true });
        setLoading(false);
      })
      .catch((error) => {
        setErrMessage(error.message);
        toast.error(error.message);
      });
  };

  return (
    <div>
      <div className="bg-prim2 text-white text-center">
        <h2 className="py-16 text-2xl md:text-4xl font-bold">Login</h2>
      </div>

      <div className="flex flex-col items-center justify-center my-8 text-dark">
        <div className="text-center grid gap-4 px-4">
          <p className="text-prim2">Welcome Back!</p>
          <p className="font-bold text-2xl md:text-4xl">Member Login</p>
          <p>Access to all features. No credit card required.</p>
          <button
            onClick={handleLoginGoogle}
            className="font-semibold flex items-center justify-center gap-4 border border-gray-200 rounded-full hover:shadow transition-all px-4 py-2 my-4"
          >
            <FcGoogle className="text-lg md:text-2xl" /> Sign in with Google
          </button>
          <div className="flex items-center justify-center gap-2">
            <hr className="flex-grow" />
            <p className="text-sm">or continue with</p>
            <hr className="flex-grow" />
          </div>
        </div>
        <div className="grid min-w-80 md:min-w-96 my-4 px-4">
          <form
            onSubmit={handleLogin}
            className="flex flex-col justify-center w-full"
          >
            <div>
              <p className="my-2 ml-4 font-medium">Email</p>
              <input
                className="rounded-full px-4 py-2 border w-full"
                type="email"
                name="email"
                placeholder="Email Address"
                onChange={(e) => setInputMail(e.target.value)}
                required
              />
            </div>
            <div className="relative">
              <p className="my-2 ml-4 font-medium">Password</p>
              <input
                className="rounded-full px-4 py-2 border w-full"
                type={showPass ? "text" : "password"}
                name="password"
                placeholder="Password"
                required
              />
              <div
                onClick={handleShowPass}
                className="absolute right-3 top-11 p-2 cursor-pointer"
              >
                {showPass ? <FaEye /> : <FaEyeSlash />}
              </div>
              <div className="flex justify-between text-xs md:text-sm my-3 px-4">
                <div className="flex items-center gap-2">
                  <input type="checkbox" name="rememberMe" />
                  <label for="rememberMe">Remember Me</label>
                </div>
                <p onClick={handleFPass} className="hover:underline cursor-pointer">Forgot Password?</p>
              </div>
            </div>
            <input
              className="rounded-full px-4 py-2 border my-5 cursor-pointer text-white font-semibold bg-prim2 hover:bg-primary transition-all"
              type="submit"
              value="Login"
            />
          </form>
          <p className="text-center text-sm">
            Don't have an account? Please{" "}
            <Link
              to="/signup"
              className="underline hover:text-prim2 font-medium"
            >
              Register Here
            </Link>
          </p>
          <p className="my-2 text-center text-sm font-semibold text-[#b8001f]">
            {errMessage}
          </p>
        </div>
      </div>
      <Toaster position="top-center" expand={false} richColors />
    </div>
  );
};

export default Login;
