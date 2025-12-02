import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    avatar: null,
  });

  const navigate = useNavigate();

  const [formError, setFormError] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading,setLoading]=useState(false);

  const validation = () => {
    const errors = { name: "", email: "", password: "" };

    if (!form.name.trim()) errors.name = "Name cannot be empty";
    if (!form.email.includes("@")) errors.email = "Please enter a valid email";
    if (!form.password.trim() || form.password.length < 6)
      errors.password = "Password must be at least 6 characters";

    setFormError(errors);
    return !errors.name && !errors.email && !errors.password;
  };

  const register = async () => {
    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("password", form.password);

    if (form.avatar) {
      formData.append("avatar", form.avatar);
    }
    
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/register`,
        formData
      );
      console.log(form);
      console.log(data);
    
  };

  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      if (validation()) {
        await register();
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center">Register</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block mb-1 font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
            {formError.name && (
              <p className="text-red-600 text-sm mt-1">{formError.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
            {formError.email && (
              <p className="text-red-600 text-sm mt-1">{formError.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
            {formError.password && (
              <p className="text-red-600 text-sm mt-1">{formError.password}</p>
            )}
          </div>

          <div>
            <label htmlFor="image" className="form-label">
              Profile image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setForm({ ...form, avatar: e.target.files[0] })}
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="image"
            />
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-xl text-lg font-semibold hover:bg-blue-700 active:scale-95 transition"
          >
          {loading? "Registering please wait..." :"Register"}
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm sm:text-base">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
