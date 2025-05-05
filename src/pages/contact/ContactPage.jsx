import React, { useEffect, useState, lazy, Suspense, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Mail, Phone, User, MessageSquareText } from "lucide-react";
import {
  sendContactRequest,
  clearContactStatus,
} from "../../features/contact/contactSlice";
import ContainerComponents from "../../components/container/ContainerComponents";
import { Link } from "react-router-dom";

// Lazy-loaded components
const InputField = lazy(() => import("../../components/UI/Input/InputField"));
const ContactFormSkeleton = lazy(() =>
  import("../../components/UI/skeleton/ContactFormSkeleton")
);
const SocialLinksPage = lazy(() => import("../socialLinks/SocialLinksPage"));
const ResumeDownload = lazy(() =>
  import("../../components/UI/Resume/ResumeDownload")
);
const AvatarCard = lazy(() => import("../../components/UI/avatar/AvatarCard"));

const initialFormState = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

const ERROR_MESSAGES = {
  REQUIRED: "Please fill in all fields.",
  VALIDATION_FAILED: "Validation failed, please check your input.",
};

const ContactPage = () => {
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector((state) => state.contact);
  const [formData, setFormData] = useState(initialFormState);
  const [showMessage, setShowMessage] = useState("");

  useEffect(() => {
    if (message || error) {
      setShowMessage(message || error);
      const timer = setTimeout(() => {
        setShowMessage("");
        dispatch(clearContactStatus());
      }, 3000);
      return () => clearTimeout(timer);
    }

    if (message && !error) {
      setFormData(initialFormState);
    }
  }, [message, error, dispatch]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const validateForm = () => {
    const { name, email, phone, message } = formData;
    if (!name || !email || !phone || !message) {
      return ERROR_MESSAGES.REQUIRED;
    }
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errorMessage = validateForm();
    if (errorMessage) {
      setShowMessage(errorMessage);
      return;
    }

    dispatch(sendContactRequest(formData));
  };

  const parseErrorMessage = (err) => {
    if (err?.includes("validation failed")) {
      return err.split(":").slice(2).join(":").trim();
    }
    return err;
  };

  return (
    <ContainerComponents>
      <section className="min-h-screen bg-[#0F0F0F] py-16 px-4 grid place-items-center">
        <div className="bg-[#1C1C1C] rounded-2xl shadow-xl max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden">
          {/* Form Section */}
          <div className="p-8 md:p-10">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
              <Phone className="text-[#00A8E8]" />
              Contact Us
            </h2>

            {showMessage && (
              <div
                className={`mb-4 p-3 rounded-md ${
                  error
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {error ? parseErrorMessage(error) : showMessage}
              </div>
            )}

            <Suspense fallback={<ContactFormSkeleton />}>
              <form onSubmit={handleSubmit} className="space-y-5">
                <InputField
                  label="Full Name"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  icon={User}
                />
                <InputField
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="Enter your Email"
                  value={formData.email}
                  onChange={handleChange}
                  icon={Mail}
                />
                <InputField
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  icon={Phone}
                />

                <div>
                  <label className="block text-sm font-semibold text-[#BDC3C7] mb-2">
                    Message
                  </label>
                  <div className="relative">
                    <MessageSquareText className="absolute left-3 top-3 text-[#BDC3C7] w-5 h-5" />
                    <textarea
                      name="message"
                      rows="4"
                      value={formData.message}
                      placeholder="Type your message..."
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border text-gray-300 bg-transparent border-[#BDC3C7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00A8E8] transition"
                      required
                    ></textarea>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#00A8E8] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#008FC7] transition disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </Suspense>
          </div>

          {/* Contact Info Section */}
          <div className="hidden md:block bg-[#BDC3C7] text-[#1C1C1C] p-10">
            <div className="flex flex-col justify-center items-center w-full h-full gap-4">
              <Suspense
                fallback={
                  <div className="w-16 h-16 bg-[#BDC3C7] rounded-full animate-pulse" />
                }
              >
                <AvatarCard size="w-16 h-16" />
              </Suspense>

              <div className="text-center text-sm space-y-1">
                <div>
                  Phone:{" "}
                  <a
                    href="tel:9628787975"
                    className="text-blue-700 hover:underline"
                  >
                    9628787975
                  </a>
                </div>
                <div>
                  Email:{" "}
                  <a
                    href="mailto:uk1941404@gmail.com"
                    className="text-blue-700 hover:underline"
                  >
                    uk1941404@gmail.com
                  </a>
                </div>
              </div>

              <Suspense
                fallback={
                  <div className="w-24 h-6 bg-[#BDC3C7] rounded-full animate-pulse mt-4" />
                }
              >
                <div className="flex justify-center mt-2">
                  <SocialLinksPage />
                </div>
              </Suspense>

              <div className="flex gap-4 justify-center mt-4">
                <Suspense
                  fallback={
                    <div className="w-24 h-6 bg-[#BDC3C7] rounded-full animate-pulse mt-4" />
                  }
                >
                  <ResumeDownload />
                </Suspense>

                <Link
                  to="/contact-us"
                  className="border border-[#1C1C1C] text-[#1C1C1C] font-medium px-4 py-2 rounded-lg hover:bg-[#2C2C2C] hover:text-[#BDC3C7] hover:border-[#2C2C2C] transition"
                >
                  Contact Me
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ContainerComponents>
  );
};

export default ContactPage;
