<<<<<<< HEAD
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import type { AxiosError } from "axios";
import { register as apiRegister } from "../../shared/config/api";
import { toast } from "react-toastify";
import "./register.css";

interface IRegisterForm {
  username: string;
  email: string;
  password: string;
}

function Register(){
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IRegisterForm>({ mode: "onTouched" });

  const onSubmit: SubmitHandler<IRegisterForm> = async (data) => {
    try {
      await apiRegister(data);
      toast.success("Registration successful! Please login.");
      reset();
      navigate("/login");
    } catch (err) {
      const error = err as AxiosError;
      const message =
        (error.response?.data as { message?: string })?.message ||
        "Registration failed";
      toast.error(message);
    }
  };

  return (
    <div className="register-container card">
      <h1>Join our network</h1>
      <p className="register-subtitle">Make the most of your professional journey</p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="register-form"
        noValidate
        aria-live="polite"
      >
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
              required: "Username is required",
              minLength: { value: 3, message: "Username must be at least 3 characters" },
            })}
            aria-invalid={errors.username ? "true" : "false"}
            aria-describedby={errors.username ? "username-error" : undefined}
          />
          {errors.username && (
            <div id="username-error" className="error-text" role="status">
              {errors.username.message}
            </div>
          )}
        </div>

        <div className="form-field">
          <label className="label-tag" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            className="input-tag"
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" },
            })}
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <div id="email-error" className="error-text" role="status">
              {errors.email.message}
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
            placeholder="6+ characters"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters" },
            })}
            aria-invalid={errors.password ? "true" : "false"}
            aria-describedby={errors.password ? "password-error" : undefined}
          />
          {errors.password && (
            <div id="password-error" className="error-text" role="status">
              {errors.password.message}
            </div>
          )}
        </div>

        <p className="terms-text">
          By clicking Join, you agree to our Terms of Service, Privacy Policy, and Cookie Policy.
        </p>

        <button
          className="submit-button"
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting ? "Creating account..." : "Join now"}
        </button>
      </form>

      <div className="divider">or</div>

      <p className="login-link">
        Already on our platform? <Link to="/login">Sign in</Link>
      </p>
    </div>
  );
}

export default Register;
=======
import { useState, type ChangeEvent, type FormEvent } from "react";
import './register.css';
import { register } from '../../shared/config/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [formData, setFormData] = useState({username: '', password: '', email: ''});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (loading) {
            return;
        }
        
        setLoading(true);
        register(formData).then((res) => {
            toast.success("Registration successful! Please login.");
            navigate("/login");
        })
        .catch((error) => {
            const message = error.response?.data?.message || "Registration failed";
            toast.error(message);
        })
        .finally(() => {
            setLoading(false);
        });
    }

    return (
        <div className="register-container">
            <h1>Register Page</h1>
            <form onSubmit={handleSubmit} className="register-form">
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
                    Email:
                    <input 
                        className="input-tag" 
                        onChange={handleChange} 
                        type="email" 
                        value={formData.email} 
                        name="email" 
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
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>
            <p className="login-link">
                Already have an account? <a href="/login">Login here</a>
            </p>
        </div>
    );
}

export default Register;
>>>>>>> e383b20c27efaae52f850442894360ca316df6b6
