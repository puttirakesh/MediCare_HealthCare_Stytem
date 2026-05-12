import React, { useRef, useState, useEffect } from 'react'
import { testimonialStyles as t } from '../assets/dummyStyles.js'

import { Star } from 'lucide-react'
const Testimonial = () => {

    const scrollRefLeft = useRef(null);
    const scrollRefRight = useRef(null);
    const [isPaused, setIsPaused] = useState(false);

    const testimonials = [
        {
            id: 1,
            name: "Dr. Sarah Johnson",
            role: "Cardiologist",
            rating: 5,
            text: "The appointment booking system is incredibly efficient. It saves me valuable time and helps me focus on patient care.",
            image:
                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80",
            type: "doctor",
        },
        {
            id: 2,
            name: "Michael Chen",
            role: "Patient",
            rating: 5,
            text: "Scheduling appointments has never been easier. The interface is intuitive and reminders are very helpful!",
            image:
                "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=80",
            type: "patient",
        },
        {
            id: 3,
            name: "Dr. Robert Martinez",
            role: "Pediatrician",
            rating: 4,
            text: "This platform has streamlined our clinic operations significantly. Patient management is much more organized.",
            image:
                "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=80",
            type: "doctor",
        },
        {
            id: 4,
            name: "Emily Williams",
            role: "Patient",
            rating: 5,
            text: "Booking appointments online 24/7 is a game-changer. The confirmation system gives me peace of mind.",
            image:
                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80",
            type: "patient",
        },
        {
            id: 5,
            name: "Dr. Amanda Lee",
            role: "Dermatologist",
            rating: 5,
            text: "Excellent platform for managing appointments. Automated reminders reduce no-shows dramatically.",
            image:
                "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=80",
            type: "doctor",
        },
        {
            id: 6,
            name: "David Thompson",
            role: "Patient",
            rating: 5,
            text: "The wait time has reduced significantly since using this platform. Very convenient and user-friendly!",
            image:
                "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=80",
            type: "patient",
        },
    ];

    const leftTestimonials = testimonials.filter((t) => t.type === "doctor");
    const rightTestimonials = testimonials.filter((t) => t.type === "patient");

    useEffect(() => {
        const scrollLeft = scrollRefLeft.current;
        const scrollRight = scrollRefRight.current;
        if (!scrollLeft || !scrollRight) return;

        let scrollSpeed = 0.5; 
        let rafId;

        const smoothScroll = () => {
            if (!isPaused) {
                scrollLeft.scrollTop += scrollSpeed;
                scrollRight.scrollTop -= scrollSpeed;

                // seamless infinite loop
                if (scrollLeft.scrollTop >= scrollLeft.scrollHeight / 2) {
                    scrollLeft.scrollTop = 0;
                }
                if (scrollRight.scrollTop <= 0) {
                    scrollRight.scrollTop = scrollRight.scrollHeight / 2;
                }
            }
            rafId = requestAnimationFrame(smoothScroll);
        };

        rafId = requestAnimationFrame(smoothScroll);
        return () => cancelAnimationFrame(rafId);
    }, [isPaused]);

    const renderStars = (rating) =>
        Array.from({ length: 5 }, (_, i) => (
            <span
                key={i}
                className={
                    i < rating
                        ? t.activeStar
                        : t.inactiveStar
                }
            >
                <Star className={t.star} />
            </span>
        ));

    const TestimonialCard = ({ testimonial, direction }) => (
        <div
            className={`${t.testimonialCard} ${direction === "left"
                    ? t.leftCardBorder
                    : t.rightCardBorder
                }`}
        >
            <div className={t.cardContent}>
                <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className={t.avatar}
                />
                <div className={t.textContainer}>
                    <div className={t.nameRoleContainer}>
                        <div>
                            <h4
                                className={`${t.name} ${direction === "left"
                                        ? t.leftName
                                        : t.rightName
                                    }`}
                            >
                                {testimonial.name}
                            </h4>
                            <p className={t.role}>{testimonial.role}</p>
                        </div>
                        <div className={t.starsContainer}>
                            {renderStars(testimonial.rating)}
                        </div>
                    </div>

                    <p className={t.quote}>"{testimonial.text}"</p>

                    {/* Stars on small screens beneath text */}
                    <div className={t.mobileStarsContainer}>
                        {renderStars(testimonial.rating)}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className={t.container}>
            <div className={t.headerContainer}>
                <h2 className={t.title}>Voices of Trust</h2>
                <p className={t.subtitle}>Real Stories from doctors, patients, and family members sharing their experiences with Medicare.</p>
            </div>
            <div
                className={t.grid}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                {/* LEFT COLUMN */}
                <div className={`${t.columnContainer} ${t.leftColumnBorder}`}>
                    <div className={`${t.columnHeader} ${t.leftColumnHeader}`}>
                        👩‍⚕️ Medical Professionals
                    </div>

                    <div
                        ref={scrollRefLeft}
                        onTouchStart={() => setIsPaused(true)}
                        onTouchEnd={() => setIsPaused(false)}
                        className={t.scrollContainer}
                    >
                        {[...leftTestimonials, ...leftTestimonials].map((item, i) => (
                            <TestimonialCard key={`L-${i}`} testimonial={item} direction="left" />
                        ))}
                    </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className={`${t.columnContainer} ${t.rightColumnBorder}`}>
                    <div className={`${t.columnHeader} ${t.rightColumnHeader}`}>
                        🧑‍💼 Patients
                    </div>

                    <div
                        ref={scrollRefRight}
                        onTouchStart={() => setIsPaused(true)}
                        onTouchEnd={() => setIsPaused(false)}
                        className={t.scrollContainer}
                    >
                        {[...rightTestimonials, ...rightTestimonials].map((item, i) => (
                            <TestimonialCard key={`R-${i}`} testimonial={item} direction="right" />
                        ))}
                    </div>
                </div>
            </div>
            <style>{t.animationStyles}</style>
        </div>
    )
}

export default Testimonial