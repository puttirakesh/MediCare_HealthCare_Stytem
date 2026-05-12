import React, { useState } from 'react'
import { loginPageStyles as l, toastStyles } from '../assets/dummyStyles.js'
import logo from '../assets/logo.png'
import doctorBanner from '../assets/BannerImg.png' 
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { ArrowLeft, Shield, Lock, Mail, Eye, EyeOff, Users,Sparkles, Heart, Activity, Stethoscope, Calendar, Clock, ChevronRight } from 'lucide-react'

const STORAGE_KEY = 'doctorToken_v1'

const LoginPage = () => {
    const API_BASE = "http://localhost:5000"
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [busy, setBusy] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState({ email: false, password: false });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData((s) => ({
            ...s, [e.target.name]: e.target.value
        }));
    }

    const handleFocus = (field) => {
        setIsFocused(prev => ({ ...prev, [field]: true }));
    }

    const handleBlur = (field) => {
        setIsFocused(prev => ({ ...prev, [field]: false }));
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            toast.error("Please enter email and password", { style: toastStyles.errorToast });
            return;
        }

        setBusy(true);
        try {
            const res = await fetch(`${API_BASE}/api/doctors/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            });
            
            const json = await res.json().catch(() => (null));
            
            if (!res.ok) {
                toast.error(json?.message || "Login failed", { duration: 4000 });
                setBusy(false);
                return;
            }
            
            const token = json?.token || json?.data?.token;
            if (!token) {
                toast.error("Authentication token missing");
                setBusy(false);
                return;
            }

            const doctorId = json?.data?._id || json?.doctor?._id || json?.data?.doctor?._id;
            if (!doctorId) {
                toast.error("Doctor ID missing from server response");
                setBusy(false);
                return;
            }

            localStorage.setItem(STORAGE_KEY, token);
            window.dispatchEvent(
                new StorageEvent("storage", { key: STORAGE_KEY, newValue: token }),
            );
            
            toast.success("Login successful — redirecting...", {
                style: toastStyles.successToast,
            });
            
            setTimeout(() => {
                navigate(`/doctor-admin/${doctorId}`);
            }, 700);
        }
        catch (err) {
            console.error("login error", err);
            toast.error("Network error during login");
        } finally {
            setBusy(false);
        }
    }

    return (
        <div className={l.mainContainer}>
            <Toaster position='top-right' reverseOrder={false} />
            
            {/* Professional Background Pattern */}
            <div className={l.bgPattern}></div>
            
            {/* Animated Background Elements */}
            <div className={l.bgGradient}></div>
            <div className={l.bgBlur1}></div>
            <div className={l.bgBlur2}></div>
            
            {/* Floating Medical Icons */}
            <div className={l.floatingIcon1}>
                <Stethoscope className={l.floatingIconSvg} />
            </div>
            <div className={l.floatingIcon2}>
                <Heart className={l.floatingIconSvg} />
            </div>
            <div className={l.floatingIcon3}>
                <Activity className={l.floatingIconSvg} />
            </div>
            <div className={l.floatingIcon4}>
                <Calendar className={l.floatingIconSvg} />
            </div>

            {/* Professional Banner with Image */}
            <div className={l.bannerOverlay}>
                <div className={l.bannerImageContainer}>
                    <img 
                        src={doctorBanner} 
                        alt="Medical Professionals" 
                        className={l.bannerImage}
                    />
                    <div className={l.bannerGradient}></div>
                </div>
                <div className={l.bannerContent}>
                    <div className={l.badge}>
                        <Sparkles className={l.badgeIcon} />
                        <span>Welcome Back</span>
                    </div>
                    <h1 className={l.bannerTitle}>
                        Doctor's Portal
                        <span className={l.titleHighlight}>Secure Access</span>
                    </h1>
                    <p className={l.bannerSubtitle}>
                        Access your comprehensive medical dashboard to manage patients, 
                        appointments, and clinical workflows efficiently.
                    </p>
                    
                    <div className={l.statsContainer}>
                        <div className={l.statItem}>
                            <div className={l.statIconWrapper}>
                                <Users className={l.statIcon} />
                            </div>
                            <div>
                                <div className={l.statValue}>10,000+</div>
                                <div className={l.statLabel}>Happy Patients</div>
                            </div>
                        </div>
                        <div className={l.statItem}>
                            <div className={l.statIconWrapper}>
                                <Clock className={l.statIcon} />
                            </div>
                            <div>
                                <div className={l.statValue}>24/7</div>
                                <div className={l.statLabel}>Support Available</div>
                            </div>
                        </div>
                    </div>

                    <div className={l.featureList}>
                        <div className={l.featureItem}>
                            <div className={l.featureIcon}>✓</div>
                            <span>Real-time Appointment Management</span>
                        </div>
                        <div className={l.featureItem}>
                            <div className={l.featureIcon}>✓</div>
                            <span>Patient Medical Records Access</span>
                        </div>
                        <div className={l.featureItem}>
                            <div className={l.featureIcon}>✓</div>
                            <span>Schedule & Availability Updates</span>
                        </div>
                        <div className={l.featureItem}>
                            <div className={l.featureIcon}>✓</div>
                            <span>Prescription Management System</span>
                        </div>
                    </div>

                    <div className={l.testimonial}>
                        <div className={l.testimonialQuote}>
                            "This platform has streamlined my practice management significantly."
                        </div>
                        <div className={l.testimonialAuthor}>
                            <div className={l.authorAvatar}></div>
                            <div>
                                <div className={l.authorName}>Dr. Sarah Johnson</div>
                                <div className={l.authorTitle}>Cardiologist</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Login Card */}
            <div className={l.loginCard}>
                <button onClick={() => navigate("/")} className={l.backButton}>
                    <ArrowLeft className={l.backButtonIcon} />
                    Back to Home
                </button>

                <div className={l.logoContainer}>
                    <img src={logo} alt="Medicare" className={l.logo} />
                    <div className={l.logoText}>
                        <span className={l.logoName}>MediCare</span>
                        <span className={l.logoTagline}>Healthcare Solutions</span>
                    </div>
                </div>

                <h2 className={l.title}>Welcome Back</h2>
                <p className={l.subtitle}>Sign in to access your medical dashboard</p>

                <form onSubmit={handleLogin} className={l.form}>
                    <div className={l.inputGroup}>
                        <div className={l.inputWrapper}>
                            <Mail className={l.inputIcon} />
                            <input 
                                type="email" 
                                name="email" 
                                placeholder="Email Address"
                                value={formData.email} 
                                onChange={handleChange}
                                onFocus={() => handleFocus('email')}
                                onBlur={() => handleBlur('email')}
                                className={`${l.input} ${isFocused.email ? l.inputFocused : ''}`}
                                required
                            />
                        </div>
                    </div>

                    <div className={l.inputGroup}>
                        <div className={l.inputWrapper}>
                            <Lock className={l.inputIcon} />
                            <input 
                                type={showPassword ? "text" : "password"} 
                                name="password" 
                                placeholder="Password"
                                value={formData.password} 
                                onChange={handleChange}
                                onFocus={() => handleFocus('password')}
                                onBlur={() => handleBlur('password')}
                                className={`${l.input} ${isFocused.password ? l.inputFocused : ''}`}
                                required
                            />
                            <button 
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className={l.eyeButton}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <div className={l.formFooter}>
                        <label className={l.rememberMe}>
                            <input type="checkbox" className={l.checkbox} />
                            <span>Remember me</span>
                        </label>
                        <a href="#" className={l.forgotLink}>Forgot Password?</a>
                    </div>

                    <button 
                        type='submit' 
                        disabled={busy} 
                        className={l.submitButton}
                    >
                        {busy ? (
                            <>
                                <div className={l.spinner}></div>
                                Signing In...
                            </>
                        ) : (
                            <>
                                <Lock size={18} />
                                Sign In to Dashboard
                                <ChevronRight size={16} className={l.buttonArrow} />
                            </>
                        )}
                    </button>
                </form>

                <div className={l.divider}>
                    <span className={l.dividerText}>Secure Access</span>
                </div>

                <div className={l.footer}>
                    <div className={l.securityBadge}>
                        <Shield size={12} />
                        <span>256-bit SSL Encrypted</span>
                    </div>
                    <p className={l.footerText}>Protected by enterprise-grade security</p>
                </div>
            </div>
        </div>
    );
}

export default LoginPage