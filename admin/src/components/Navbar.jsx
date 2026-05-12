import React, { useRef, useState, useEffect, useCallback, useLayoutEffect } from 'react';
import { navbarStyles as ns } from '../assets/dummyStyles.js';
import logoImg from '../assets/logo.png';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { X, Menu } from 'lucide-react';
import { useClerk, useAuth, useUser, UserButton } from '@clerk/clerk-react';
import {
    Home,
    UserPlus,
    Users,
    Calendar,
    Grid,
    PlusSquare,
    List
} from "lucide-react";

const Navbar = () => {
    // Helper components
    function CenterNavItem({ to, label, icon }) {
        return (
            <NavLink
                to={to}
                end
                className={({ isActive }) =>
                    `nav-item whitespace-nowrap ${isActive ? "active" : ""} ${ns.centerNavItemBase} 
                    ${isActive ? ns.centerNavItemActive : ns.centerNavItemInactive}`
                }
            >
                <span>{icon}</span>
                <span className="font-medium">{label}</span>
            </NavLink>
        );
    }

    function MobileItem({ to, label, icon, onClick }) {
        return (
            <NavLink
                to={to}
                onClick={onClick}
                className={({ isActive }) =>
                    `${ns.mobileItemBase} ${isActive ? ns.mobileItemActive : ns.mobileItemInactive}`
                }
            >
                <span>{icon}</span>
                <span className="font-medium">{label}</span>
            </NavLink>
        );
    }

    const [open, setOpen] = useState(false);
    const navInnerRef = useRef(null);
    const indicatorRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();

    // Clerk hooks
    const clerk = useClerk();
    const { getToken, isLoaded: authLoaded } = useAuth();
    const { isSignedIn, user, isLoaded: userLoaded } = useUser();

    // Move indicator (unchanged)
    const moveIndicator = useCallback(() => {
        const container = navInnerRef.current;
        const ind = indicatorRef.current;
        if (!container || !ind) return;

        const active = container.querySelector(".nav-item.active");
        if (!active) {
            ind.style.opacity = "0";
            return;
        }

        const containerRect = container.getBoundingClientRect();
        const activeRect = active.getBoundingClientRect();

        const left = activeRect.left - containerRect.left + container.scrollLeft;
        const width = activeRect.width;

        ind.style.transform = `translateX(${left}px)`;
        ind.style.width = `${width}px`;
        ind.style.opacity = "1";
    }, []);

    useLayoutEffect(() => {
        moveIndicator();
        const t = setTimeout(() => moveIndicator(), 120);
        return () => clearTimeout(t);
    }, [location.pathname, moveIndicator]);

    useEffect(() => {
        const container = navInnerRef.current;
        if (!container) return;

        const onScroll = () => moveIndicator();
        container.addEventListener("scroll", onScroll, { passive: true });

        const ro = new ResizeObserver(() => moveIndicator());
        ro.observe(container);
        if (container.parentElement) ro.observe(container.parentElement);

        window.addEventListener("resize", moveIndicator);

        moveIndicator();

        return () => {
            container.removeEventListener("scroll", onScroll);
            ro.disconnect();
            window.removeEventListener("resize", moveIndicator);
        };
    }, [moveIndicator]);

    // Close on Escape key
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Escape" && open) setOpen(false);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open]);

    // Close mobile menu on screen resize to desktop (768px)
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768 && open) {
                setOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [open]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [open]);

    // Store token in localStorage
    useEffect(() => {
        let mounted = true;
        const storeToken = async () => {
            if (!authLoaded || !userLoaded) return;
            if (!isSignedIn) {
                try {
                    localStorage.removeItem("clerk_token");
                } catch (error) {
                    // ignore
                }
                return;
            }
            try {
                if (getToken) {
                    const token = await getToken();
                    if (!mounted) return;
                    if (token) {
                        try {
                            localStorage.setItem("clerk_token", token);
                        } catch (error) {
                            console.warn("Failed to save token to local storage", error);
                        }
                    }
                }
            } catch (error) {
                console.warn("Failed to get token", error);
            }
        };
        storeToken();
        return () => { mounted = false; };
    }, [isSignedIn, authLoaded, userLoaded, getToken]);

    const handleOpenSignIn = () => {
        if (!clerk || !clerk.openSignIn) {
            console.warn("Clerk is not Available");
            return;
        }
        clerk.openSignIn();
    };

    const handleSignOut = async () => {
        if (!clerk || !clerk.signOut) {
            console.warn("Clerk is not Available");
            return;
        }
        try {
            await clerk.signOut();
        } catch (error) {
            console.error("Sign Out Failed", error);
        } finally {
            try {
                localStorage.removeItem("clerk_token");
            } catch (error) {
                // ignore
            }
            navigate("/");
        }
    };

    return (
        <header className={`${ns.header} ${open ? 'z-50' : ''} relative`}>
            <nav className={ns.navContainer}>
                {/* Responsive layout: stack on mobile, grid on desktop */}
                <div className="flex flex-col md:grid md:grid-cols-[auto_1fr_auto] items-center gap-2 md:gap-4">
                    
                    {/* Logo Section - Improved for mobile */}
                    <div className="flex items-center justify-between w-full md:w-auto">
                        <div className={ns.logoContainer}>
                            <img src={logoImg} alt="logo" className={ns.logoImage} />
                            <Link to="/" className="flex flex-col">
                                <div className={`${ns.logoLink} text-sm sm:text-base`}>
                                    MediCare
                                </div>
                                <div className={`${ns.logoSubtext} text-xs hidden sm:block`}>
                                    HealthCare Solutions
                                </div>
                            </Link>
                        </div>
                        
                        {/* Mobile menu toggle - moved inside logo section */}
                        <button
                            onClick={() => setOpen(v => !v)}
                            className="block md:hidden p-2 rounded-full bg-white shadow"
                            aria-label="Toggle menu"
                        >
                            {open ? <X size={18} color="black" /> : <Menu size={18} color="black" />}
                        </button>
                    </div>

                    {/* Desktop Navigation - Only visible on md and up */}
                    <div className="hidden md:flex justify-center min-w-0">
                        <div className={ns.glowEffect}>
                            <div className={ns.centerNavInner}>
                                <div
                                    ref={navInnerRef}
                                    tabIndex={0}
                                    className={`${ns.centerNavScrollContainer} overflow-x-auto scrollbar-hide`}
                                    style={{ 
                                        WebkitOverflowScrolling: "touch",
                                        scrollbarWidth: "thin"
                                    }}
                                >
                                    <div className="flex gap-1">
                                        <CenterNavItem to="/h" label="Dashboard" icon={<Home size={16} />} />
                                        <CenterNavItem to="/add" label="Add Doctor" icon={<UserPlus size={16} />} />
                                        <CenterNavItem to="/list" label="List Doctors" icon={<Users size={16} />} />
                                        <CenterNavItem to="/appointments" label="Appointments" icon={<Calendar size={16} />} />
                                        <CenterNavItem to="/service-dashboard" label="Service Dashboard" icon={<Grid size={16} />} />
                                        <CenterNavItem to="/add-service" label="Add Service" icon={<PlusSquare size={16} />} />
                                        <CenterNavItem to="/list-service" label="List Services" icon={<List size={16} />} />
                                        <CenterNavItem to="/service-appointments" label="Service Appointments" icon={<Calendar size={16} />} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Section: auth buttons - Hidden on mobile (moved to mobile menu) */}
                    <div className="hidden md:flex items-center justify-end gap-3">
                        {isSignedIn ? (
                            <UserButton afterSignOutUrl="/" />
                        ) : (
                            <div onClick={handleOpenSignIn} className={`${ns.loginButton} ${ns.cursorPointer}`}>
                                LogIn
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Menu - Improved with better positioning and animations */}
                {open && (
                    <>
                        {/* Backdrop */}
                        <div 
                            className="fixed inset-0 bg-black/50 z-40 md:hidden"
                            onClick={() => setOpen(false)}
                            style={{ backdropFilter: 'blur(4px)' }}
                        />
                        
                        {/* Menu Panel - Slide from left */}
                        <div
                            className="fixed top-0 left-0 w-70 max-w-[85vw] h-full bg-white z-50 flex flex-col gap-2 p-6 shadow-2xl md:hidden overflow-y-auto"
                            style={{
                                animation: 'slideIn 0.3s ease-out'
                            }}
                        >
                            {/* Close button at top */}
                            <div className="flex justify-end mb-4">
                                <button
                                    onClick={() => setOpen(false)}
                                    className="p-2 rounded-full hover:bg-gray-100"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            
                            {/* Navigation items */}
                            <div className="flex flex-col gap-2">
                                <MobileItem to="/h" label="Dashboard" icon={<Home size={18} />} onClick={() => setOpen(false)} />
                                <MobileItem to="/add" label="Add Doctor" icon={<UserPlus size={18} />} onClick={() => setOpen(false)} />
                                <MobileItem to="/list" label="List Doctors" icon={<Users size={18} />} onClick={() => setOpen(false)} />
                                <MobileItem to="/appointments" label="Appointments" icon={<Calendar size={18} />} onClick={() => setOpen(false)} />
                                <MobileItem to="/service-dashboard" label="Service Dashboard" icon={<Grid size={18} />} onClick={() => setOpen(false)} />
                                <MobileItem to="/add-service" label="Add Service" icon={<PlusSquare size={18} />} onClick={() => setOpen(false)} />
                                <MobileItem to="/list-service" label="List Services" icon={<List size={18} />} onClick={() => setOpen(false)} />
                                <MobileItem to="/service-appointments" label="Service Appointments" icon={<Calendar size={18} />} onClick={() => setOpen(false)} />
                            </div>

                            {/* Mobile auth buttons */}
                            <div className="pt-4 border-t mt-4">
                                {isSignedIn ? (
                                    <button
                                        onClick={() => {
                                            handleSignOut();
                                            setOpen(false);
                                        }}
                                        className="w-full py-2.5 rounded-full bg-red-500 hover:bg-red-600 text-white font-medium transition-colors"
                                    >
                                        Sign Out
                                    </button>
                                ) : (
                                    <div
                                        onClick={() => {
                                            handleOpenSignIn();
                                            setOpen(false);
                                        }}
                                        className="w-full cursor-pointer py-2.5 rounded-full border-2 border-emerald-500 bg-white text-emerald-600 font-medium text-center hover:bg-emerald-50 transition-colors"
                                    >
                                        Log In
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </nav>

            {/* Add CSS animation for slide-in */}
            <style>{`
                @keyframes slideIn {
                    from {
                        transform: translateX(-100%);
                    }
                    to {
                        transform: translateX(0);
                    }
                }
            `}</style>
        </header>
    );
};

export default Navbar;