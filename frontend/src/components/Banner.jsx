import React from 'react'
import { bannerStyles as b } from '../assets/dummyStyles.js'
import { Calendar, Clock, Phone, Ribbon, ShieldUser, Star, Stethoscope, Users } from 'lucide-react';
import banner from '../assets/BannerImg.png'
import { useNavigate } from "react-router-dom";
const Banner = () => {
    const navigate = useNavigate();
    return (
        <div className={b.bannerContainer}>
            <div className={b.mainContainer}>
                <div className={b.borderOutline}>
                    <div className={b.outerAnimatedBand}></div>
                    <div className={b.innerWhiteBorder}></div>
                </div>

                <div className={b.contentContainer}>
                    <div className={b.flexContainer}>
                        <div className={b.leftContent}>
                            <div className={b.headerBadgeContainer}>
                                <div className={b.stethoscopeContainer}>
                                    <div className={b.stethoscopeInner}>
                                        <Stethoscope className={b.stethoscopeIcon} />
                                    </div>
                                </div>

                                <div className={b.titleContainer}>
                                    {/* FIXED: Changed from className={b.titleContainer} to className={b.title} */}
                                    <h1 className={b.title}>
                                        Medi
                                        <span className={b.titleGradient}>Care+</span>
                                    </h1>

                                    {/* stars */}
                                    <div className={b.starsContainer}>
                                        <div className={b.starsInner}>
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star key={star} className={b.starIcon} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* tagline */}
                            <p className={b.tagline}>
                                Premium Healthcare
                                <span className={`block ${b.taglineHighlight}`}>At Your Fingertips</span>
                            </p>

                            <div className={b.featuresGrid}>
                                {/* FIXED: Each feature item should have its own unique className */}
                                <div className={b.featureItem}>
                                    <Ribbon className={b.featureIcon} />
                                    <span className={b.featureText}>Certified Specialists</span>
                                </div>

                                <div className={b.featureItem}>
                                    <Clock className={b.featureIcon} />
                                    <span className={b.featureText}>24/7 Availability</span>
                                </div>

                                <div className={b.featureItem}>
                                    <ShieldUser className={b.featureIcon} />
                                    <span className={b.featureText}>Safe & Secure</span>
                                </div>

                                <div className={b.featureItem}>
                                    <Users className={b.featureIcon} />
                                    <span className={b.featureText}>500+ Doctors</span>
                                </div>
                            </div>

                            <div className={b.ctaButtonsContainer}><button
                                onClick={() => navigate("/doctors")}
                                className={`${b.bookButton} group relative before:content-[''] before:absolute before:inset-0 before:rounded-full before:bg-green-400/30 before:blur-xl before:opacity-0 hover:before:opacity-100 before:transition before:duration-500`}
                            >
                                <div className={b.bookButtonContent}>
                                    <Calendar className={b.bookButtonIcon} />
                                    <span>Book Appointment Now</span>
                                </div>
                            </button>

                            <button onClick={()=>(window.location.href = "tel: +91 8121270909")} 
                                className={b.emergencyButton}>
                                    <div className={b.emergencyButtonContent}>
                                        <Phone className={b.emergencyButtonIcon}/>
                                        <span>Emergency Call</span>
                                    </div>
                            </button>
                            </div>
                        </div>

                        <div className={b.rightImageSection}>
                            <div className={b.imageContainer}>
                                <div className={b.imageFrame}>
                                    <img src={banner} alt="banner" className={b.image}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner