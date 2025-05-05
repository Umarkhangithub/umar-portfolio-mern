import React, { useState, useEffect, Suspense } from "react";
import { Mail, LogIn, Eye } from "lucide-react";
import InputField from "../UI/Input/InputField";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/auth/authSlice";
import {  useNavigate } from "react-router-dom";

import ContainerComponents from "../container/ContainerComponents";

const LoginComponents = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  // Redirect to dashboard if token exists
  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  return (
    <ContainerComponents>

    <section className="min-h-screen bg-transparent py-16 px-4 grid place-items-center">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full  ">
        {/* Form Section */}
        <div className="p-8 md:p-10">
          <h2 className="text-3xl font-bold text-[#1C1C1C] mb-6">
            <span className="flex items-center justify-center gap-2">
              <LogIn />
              Login
            </span>
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <InputField
              label="Email Address"
              name="email"
              type="email"
              placeholder='email'
              value={formData.email}
              onChange={handleChange}
              icon={Mail}
            />
            <InputField
              label="Password"
              name="password"
              type="password"
              placeholder='password'
              value={formData.password}
              onChange={handleChange}
              icon={Eye}
            />

            {loading && (
              <p className="text-sm text-[#BDC3C7] text-center">Logging in...</p>
            )}
            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-[#00A8E8]   text-white font-semibold py-2 px-4 rounded-lg hover:bg-primary-focus transition"
            >
              <span className="flex items-center justify-center gap-2">
                <LogIn />
                Login
              </span>
            </button>
          </form>
        </div>

        
      </div>
    </section>
    </ContainerComponents>

  );
};

export default LoginComponents;
