<<<<<<< HEAD
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import type { AxiosResponse, AxiosError } from "axios";
import { login } from "../../shared/config/api";
import { toast } from "react-toastify";
import "./login.css";

interface ILoginForm {
  username: string;
  password: string;
}

function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ILoginForm>();

  const onSubmit: SubmitHandler<ILoginForm> = async (data) => {
    try {
      const res: AxiosResponse = await login(data);

      // Save token & user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("currentUser", JSON.stringify(res.data.user));

      toast.success("Login successful!");
      reset();
      navigate("/home");
    } catch (err) {
      const error = err as AxiosError;
      const message =
        (error.response?.data as { message?: string })?.message || "Server error";
      toast.error(message);
    }
  };

  return (
    <div className="login-container card">
      <h1>Sign in</h1>
      <p className="login-subtitle">Stay updated on your professional network</p>

      <form onSubmit={handleSubmit(onSubmit)} className="login-form" noValidate>
        <div className="form-field">
          <label className="label-tag" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            className="input-tag"
            type="text"
            placeholder="Enter your username"
            {...register("username", { 
              required: "Username is required" 
            })}
            aria-invalid={errors.username ? "true" : "false"}
            aria-describedby={errors.username ? "username-error" : undefined}
          />
          {errors.username && (
            <div id="username-error" className="error-text">
              {errors.username.message}
            </div>
          )}
        </div>

        <div className="form-field">
          <label className="label-tag" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            className="input-tag"
            type="password"
            placeholder="Enter your password"
            {...register("password", { 
              required: "Password is required",
              minLength: { 
                value: 6, 
                message: "Password must be at least 6 characters" 
              }
            })}
            aria-invalid={errors.password ? "true" : "false"}
            aria-describedby={errors.password ? "password-error" : undefined}
          />
          {errors.password && (
            <div id="password-error" className="error-text">
              {errors.password.message}
            </div>
          )}
        </div>

        <button
          className="submit-button"
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <div className="divider">or</div>

      <p className="register-link">
        New to our platform? <Link to="/register">Join now</Link>
      </p>
    </div>
  );
=======
import { useState, type FormEvent } from "react";
import { useNavigate } from 'react-router-dom';
import { login } from '../../shared/config/api';
import type { AxiosResponse, AxiosError } from 'axios';
import './login.css';
import { toast } from 'react-toastify';

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value });
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (loading) {
          return;
        }

        setLoading(true);
        login(formData).then((res: AxiosResponse) => {
          // Save both token and user data
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("currentUser", JSON.stringify(res.data.user));
          
          toast.success("Login successful!");
          navigate("/home");
        })
        .catch((error: AxiosError) => {
            const message = (error.response?.data as { message?: string })?.message || "Server error";
            toast.error(message);
        })
        .finally(() => {
            setLoading(false);
        });
    }

    return (
        <div className="login-container">
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <label className="label-tag">
                    Username:
                    <input 
                        className="input-tag" 
                        onChange={handleChange} 
                        type="text" 
                        value={formData.username} 
                        name="username" 
                        required
                    />
                </label>
                <br />
                <label className="label-tag">
                    Password:
                    <input 
                        className="input-tag" 
                        onChange={handleChange} 
                        type="password" 
                        value={formData.password} 
                        name="password" 
                        required
                    />
                </label>
                <br />
                <button 
                    className="submit-button" 
                    type="submit" 
                    disabled={loading}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            <p className="register-link">
                Don't have an account? <a href="/register">Register here</a>
            </p>
        </div>
    );
>>>>>>> e383b20c27efaae52f850442894360ca316df6b6
}

export default Login;