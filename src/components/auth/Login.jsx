import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/slices/authslice"; 
import LoadingIndicator from "../common/LoadingIndicator";
import { toast } from "react-toastify"; 

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { isAuthenticated, role } = useSelector((state) => state.auth);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isAuthenticated) {
      if (role === "student") {
        navigate("/student/dashboard"); 
      } else {
        navigate("/access-denied");
      }
    }
  }, [isAuthenticated, role, navigate]);

  const submitHandler = async (formData) => {
    setIsLoading(true);
    try {
      // Dispatch login action
      const response = await dispatch(login(formData));
      
      // Assuming the response contains success or failure message
      if (response?.payload?.message) {
        toast.success(response.payload.message); // Show success toast
      }
    } catch (err) {
      // Enhanced error handling
      if (err.response && err.response.data && err.response.data.message) {
        // Display the specific error message from the response
        toast.error(err.response.data.message);
      } else {
        // Generic error message if no specific error message is available
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-400 uppercase">
          Log in to your account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-black py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-orange-400">
          <form className="space-y-6" onSubmit={handleSubmit(submitHandler)}>
            <div>
              <label
                htmlFor="email"
                className="block text-xs mb-4 font-medium text-gray-400 uppercase"
              >
                Email ID
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="email"
                  autoComplete="email"
                  id="email"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-orange-500 sm:text-sm"
                  {...register("email", {
                    required: "Please enter your email ID",
                  })}
                />
                {errors.email && (
                  <div className="text-red-500">{errors.email.message}</div>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-xs mb-4 font-medium text-gray-400 uppercase"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:border-orange-500 sm:text-sm"
                  {...register("password", {
                    required: "Please enter your password",
                  })}
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
              {errors.password && (
                <div className="text-red-500">{errors.password.message}</div>
              )}
            </div>

            <div>
              {isLoading ? (
                <LoadingIndicator />
              ) : (
                <button
                  type="submit"
                  className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600"
                >
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
