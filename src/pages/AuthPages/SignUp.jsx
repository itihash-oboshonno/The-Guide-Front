import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast, Toaster } from "sonner";
import AuthContext from "../../contexts/authContext/AuthContext";
import Swal from "sweetalert2";

const SignUp = () => {
  const {
    currentUser,
    createUser,
    loginViaGoogle,
    updateUser,
    setCurrentUser,
    setLoading,
  } = useContext(AuthContext);

  const navigate = useNavigate();

  const [errMessage, setErrMessage] = useState("");

  const [showPass, setShowPass] = useState(false);
  const handleShowPass = () => {
    setShowPass(!showPass);
  };
  
  if (currentUser) {
    navigate("/");
    return;
  }

 const handleLoginGoogle = (e) => {
   e.preventDefault();
   loginViaGoogle()
     .then((result) => {
      toast.success(`${result.user.displayName} signed in successfully!`);
       navigate("/");
     })
     .catch((error) => {
       setErrMessage(error.message);
     });
 };

  const checkSix = /^(?=.{6,})/;
  const checkUpper = /^(?=.*[A-Z])/;
  const checkSpecial = /(?=.*[!@#$%^&*(),.?":{}|<>_ ])/;
  const checkNumber = /^(?=.*\d)/;

  const handleSignUp = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const pic = e.target.photo.value;

    if (!checkNumber.test(password)) {
      setErrMessage("Password must have at least one number.");
      toast.error("Password must have at least one number.");
      return;
    }

    if (!checkSpecial.test(password)) {
        setErrMessage("Password must have at least one special character.");
        toast.error("Password must have at least one special character.");
        return;
    }

    if (!checkUpper.test(password)) {
      setErrMessage("Password must have at least 1 uppercase letter.");
      toast.error("Password must have at least 1 uppercase letter.");
      return;
    }

    if (!checkSix.test(password)) {
      setErrMessage("Password must be at least 6 characters long.");
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    createUser(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setCurrentUser(user);
        updateUser({
          displayName: name,
          photoURL: pic,
        })
          .then(() => {
            setLoading(true);
            setCurrentUser((user) => ({
              ...user,
              displayName: name,
              photoURL: pic,
            }));
            Swal.fire({
              title: "Signup Successful",
              text: `${name} has registered successfully!`,
              icon: "success"
            });
            navigate("/");
            setLoading(false);
          })
          .catch((error) => {
            setErrMessage(error.message);
            toast.error(error.message);
          });
      })
      .catch((error) => {
        setErrMessage(error.message);
        toast.error(error.message);
      });
  };

  return (
    <div>
      <div className="bg-prim2 text-white text-center">
        <h2 className="py-16 text-2xl md:text-4xl font-bold">Sign Up</h2>
      </div>

      <div className="flex flex-col items-center justify-center my-8 text-dark">
        <div className="text-center grid gap-4 px-4">
          <p className="text-prim2">Register</p>
          <p className="font-bold text-2xl md:text-4xl">Start for free Today</p>
          <p>Access to all features. No credit card required.</p>
          <button onClick={handleLoginGoogle} className="font-semibold flex items-center justify-center gap-4 border border-gray-200 rounded-full hover:shadow transition-all px-4 py-2 my-4">
            <FcGoogle className="text-lg md:text-2xl" /> Sign up with Google
          </button>
          <div className="flex items-center justify-center gap-2">
            <hr className="flex-grow" />
            <p className="text-sm">or continue with</p>
            <hr className="flex-grow" />
          </div>
        </div>
        <div className="grid min-w-80 md:min-w-96 my-4 px-4">
          <form
            onSubmit={handleSignUp}
            className="flex flex-col justify-center w-full"
          >
            <div>
              <p className="my-2 ml-4 font-medium">Name</p>
              <input
                className="rounded-full px-4 py-2 border w-full"
                type="text"
                name="name"
                placeholder="Enter Your Name"
                required
              />
            </div>
            <div>
              <p className="my-2 ml-4 font-medium">Email</p>
              <input
                className="rounded-full px-4 py-2 border w-full"
                type="email"
                name="email"
                placeholder="Email Address"
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
              <div onClick={handleShowPass} className="absolute right-3 top-11 p-2 cursor-pointer">
                {showPass ? <FaEye/> : <FaEyeSlash/>}
              </div>
            </div>
            <div>
              <p className="my-2 ml-4 font-medium">Photo</p>
              <input
                className="rounded-full px-4 py-2 border w-full"
                type="url"
                name="photo"
                placeholder="Photo-URL"
                required
              />
            </div>
            <input
              className="rounded-full px-4 py-2 border my-5 cursor-pointer text-white font-semibold bg-prim2 hover:bg-primary transition-all"
              type="submit"
              value="Sign Up"
            />
          </form>
          <p className="text-center text-sm">
            Already have an account? Please{" "}
            <Link to="/login" className="underline hover:text-prim2 font-medium">
              Login Here
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

export default SignUp;
