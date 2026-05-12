import React, { useMemo, useState } from 'react'
import { navbarStylesDr as n } from '../assets/dummyStyles.js'
import { NavLink, useLocation, useParams, useNavigate } from "react-router-dom";
import { Home, Calendar, Edit, LogOut, X, Menu } from 'lucide-react';
import logo from '../assets/logo.png';

const DoctorNavbar = () => {
    const [open, setOpen] = useState(false);
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const doctorId = useMemo(() => {
        if (params?.id) return params.id;
        const m = location.pathname.match(/\/doctor-admin\/([^/]+)/);
        if (m) return m[1];
        return null;
    }, [params, location.pathname]);

    const basePath = doctorId
        ? `/doctor-admin/${doctorId}`
        : "/doctor-admin/login";

    const navItems = [
        { name: "Dashboard", to: `${basePath}`, Icon: Home },
        { name: "Appointments", to: `${basePath}/appointments`, Icon: Calendar },
        { name: "Edit Profile", to: `${basePath}/profile/edit`, Icon: Edit },
    ];

    const handleLogout = () => {
        localStorage.removeItem('doctorToken_v1');
        navigate('/doctor-admin/login');
    };

    return (
        <>
            <nav className={n.navContainer}>
                <div className={n.leftBrand}>
                    <div className={n.logoContainer}>
                        <img src={logo} alt="logo" className={n.logoImage} />
                    </div>

                    <div className={n.brandTextContainer}>
                        <div className={n.brandTitle}>MediCare</div>
                        <div className={n.brandSubtitle}>HealthCare Solutions</div>
                    </div>
                </div>

                {/* Desktop navigations */}
                <div className={n.desktopMenu}>
                    <div className={n.desktopMenuItems}>
                        {navItems.map(({ name, to, Icon }) => (
                            <NavLink
                                key={to}
                                to={to}
                                end={to === basePath}
                                className={({ isActive }) =>
                                    `${n.baseLink} ${isActive ? n.activeLink : n.inactiveLink}`
                                }
                                onClick={() => setOpen(false)}
                            >
                                <span className={n.linkContent}>
                                    <Icon className={n.linkIcon} size={16} />
                                    <span className={n.linkText}>{name}</span>
                                </span>
                            </NavLink>
                        ))}
                    </div>
                </div>

                <div className={n.rightActions}>
                    <button
                        onClick={handleLogout}
                        className={n.logoutButtonDesktop}
                    >
                        <LogOut size={16} />
                        <span>Logout</span>
                    </button>

                    {/* Mobile menu toggler - visible on tablet and mobile */}
                    <button 
                        onClick={() => setOpen((s) => !s)} 
                        className={n.hamburgerButtonMd}
                    >
                        {open ? (
                            <X size={20} />
                        ) : (
                            <Menu size={20} />
                        )}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu - Using your function-based style */}
<div className={n.mobileMenuContainer(open)}>
    <div className={n.mobileMenuContent}>
        {navItems.map(({ name, to, Icon }) => (
            <NavLink 
                key={to} 
                to={to} 
                end={to === basePath} 
                className={({ isActive }) => 
                    `${n.mobileBaseLink} ${isActive ? n.mobileActiveLink : n.mobileInactiveLink}`
                } 
                onClick={() => setOpen(false)}
            >
                <Icon size={18} />
                <span>{name}</span>
            </NavLink>
        ))}
        
        {/* Mobile Logout Button - Fixed */}
        <button 
            onClick={() => {
                setOpen(false);
                localStorage.removeItem('doctorToken_v1');
                navigate('/doctor-admin/login');
            }}
            className={n.mobileLogoutButton}
        >
            <div className={n.mobileLogoutContent}>
                <LogOut size={18} />
                <span>Logout</span>
            </div>
        </button>
    </div>
</div>

            {/* Spacer to prevent content from hiding under fixed navbar */}
            <div className={n.spacer}></div>
        </>
    );
};

export default DoctorNavbar;