import React, { useState, useEffect } from 'react'
import { contactPageStyles as c } from '../assets/dummyStyles.js'
import {
    Mail, User, Phone, MapPin, Stethoscope, MessageSquare,
    SendHorizonal, Clock, Calendar, Heart, Shield, Award,
    ChevronRight, Sparkles, CheckCircle2, ExternalLink
} from 'lucide-react';

const ContactPage = () => {
    const initial = {
        name: "",
        email: "",
        phone: "",
        department: "",
        service: "",
        message: "",
    };

    const [form, setForm] = useState(initial);
    const [errors, setErrors] = useState({});
    const [sent, setSent] = useState(false);
    const [focusedField, setFocusedField] = useState(null);

    const departments = [
        "General Physician",
        "Cardiology",
        "Orthopedics",
        "Dermatology",
        "Pediatrics",
        "Gynecology",
    ];

    const servicesMapping = {
        "General Physician": [
            "General Consultation",
            "Adult Checkup",
            "Vaccination",
            "Health Screening",
        ],
        Cardiology: [
            "ECG",
            "Echocardiography",
            "Stress Test",
            "Heart Consultation",
        ],
        Orthopedics: ["Fracture Care", "Joint Pain Consultation", "Physiotherapy"],
        Dermatology: ["Skin Consultation", "Allergy Test", "Acne Treatment"],
        Pediatrics: ["Child Checkup", "Vaccination (Child)", "Growth Monitoring"],
        Gynecology: ["Antenatal Care", "Pap Smear", "Ultrasound"],
    };

    const genericServices = [
        "General Consultation",
        "ECG",
        "Blood Test",
        "X-Ray",
        "Ultrasound",
        "Physiotherapy",
        "Vaccination",
    ];

    function validate() {
        const e = {};
        if (!form.name.trim()) e.name = "Full name is required";
        if (!form.email.trim()) e.email = "Email is required";
        else if (!/^\S+@\S+\.\S+$/.test(form.email))
            e.email = "Enter a valid email";
        if (!form.phone.trim()) e.phone = "Phone number is required";
        else if (!/^[0-9]{10}$/.test(form.phone))
            e.phone = "Phone number must be exactly 10 digits";

        if (!form.department && !form.service) {
            e.department = "Please choose a department or service";
            e.service = "Please choose a department or service";
        }

        if (!form.message.trim()) e.message = "Please write a short message";
        setErrors(e);
        return Object.keys(e).length === 0;
    }

    function handleChange(e) {
        const { name, value } = e.target;
        if (name === "department") {
            setForm((prev) => ({ ...prev, department: value, service: "" }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }

        setErrors((prev) => ({ ...prev, [name]: undefined }));

        if (name === "department" || name === "service") {
            setErrors((prev) => {
                const copy = { ...prev };
                if (
                    (name === "department" && value) ||
                    (name === "service" && value) ||
                    form.department ||
                    form.service
                ) {
                    delete copy.department;
                    delete copy.service;
                }
                return copy;
            });
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!validate()) return;

        const text = `🏥 *New Contact Request* 🏥\n\n👤 *Name:* ${form.name}\n📧 *Email:* ${form.email}\n📞 *Phone:* ${form.phone}\n🏢 *Department:* ${form.department || "N/A"}\n🩺 *Service:* ${form.service || "N/A"}\n💬 *Message:* ${form.message}`;

        const url = `https://wa.me/8121270909?text=${encodeURIComponent(text)}`;
        window.open(url, "_blank");

        setForm(initial);
        setErrors({});
        setSent(true);
        setTimeout(() => setSent(false), 4000);
    }

    const availableServices = form.department
        ? servicesMapping[form.department] || []
        : genericServices;

    // Stats data
    const stats = [
        { icon: Heart, value: "10,000+", label: "Happy Patients", color: "text-rose-500" },
        { icon: Shield, value: "50+", label: "Expert Doctors", color: "text-emerald-500" },
        { icon: Award, value: "15+", label: "Years of Excellence", color: "text-amber-500" },
        { icon: Clock, value: "24/7", label: "Emergency Support", color: "text-blue-500" },
    ];

    return (
        <div className={c.pageContainer}>
            {/* Animated Background Elements */}
            <div className={c.bgAccent1}></div>
            <div className={c.bgAccent2}></div>
            <div className={c.bgAccent3}></div>
            <div className={c.bgAccent4}></div>

            {/* Floating particles */}
            <div className={c.particle1}></div>
            <div className={c.particle2}></div>
            <div className={c.particle3}></div>

            <div className={c.gridContainer}>
                {/* Left Side - Form with Hours */}
                <div className={c.formContainer}>
                    <div className={c.badgeContainer}>
                        <Sparkles className={c.badgeIcon} />
                        <span className={c.badgeText}>Get in Touch</span>
                    </div>

                    <h2 className={c.formTitle}>
                        Let's Start a Conversation
                        <div className={c.titleUnderline}></div>
                    </h2>
                    <p className={c.formSubtitle}>
                        We'll reach out to you on WhatsApp within 24 hours
                    </p>

                    <form onSubmit={handleSubmit} className={c.formSpace}>
                        <div className={c.formGrid}>
                            <div className={c.inputGroup}>
                                <label className={c.label}>
                                    <User size={16} className={c.labelIcon} />
                                    Full Name
                                </label>
                                <input
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField('name')}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder="John Doe"
                                    className={`${c.input} ${focusedField === 'name' ? c.inputFocused : ''}`}
                                />
                                {errors.name && (
                                    <p className={c.error}>{errors.name}</p>
                                )}
                            </div>

                            <div className={c.inputGroup}>
                                <label className={c.label}>
                                    <Mail size={16} className={c.labelIcon} />
                                    Email Address
                                </label>
                                <input
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField('email')}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder="john@example.com"
                                    className={`${c.input} ${focusedField === 'email' ? c.inputFocused : ''}`}
                                />
                                {errors.email && (
                                    <p className={c.error}>{errors.email}</p>
                                )}
                            </div>
                        </div>

                        <div className={c.formGrid}>
                            <div className={c.inputGroup}>
                                <label className={c.label}>
                                    <Phone size={16} className={c.labelIcon} />
                                    Phone Number
                                </label>
                                <input
                                    name="phone"
                                    type="tel"
                                    value={form.phone}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField('phone')}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder="9876543210"
                                    className={`${c.input} ${focusedField === 'phone' ? c.inputFocused : ''}`}
                                    maxLength="10"
                                    aria-invalid={!!errors.phone}
                                />
                                {errors.phone && (
                                    <p className={c.error}>{errors.phone}</p>
                                )}
                            </div>

                            <div className={c.inputGroup}>
                                <label className={c.label}>
                                    <Stethoscope size={16} className={c.labelIcon} />
                                    Department
                                </label>
                                <select
                                    name="department"
                                    value={form.department}
                                    onChange={handleChange}
                                    onFocus={() => setFocusedField('department')}
                                    onBlur={() => setFocusedField(null)}
                                    className={`${c.input} ${focusedField === 'department' ? c.inputFocused : ''}`}
                                >
                                    <option value="">Select Department</option>
                                    {departments.map((d) => (
                                        <option key={d} value={d}>
                                            {d}
                                        </option>
                                    ))}
                                </select>
                                {errors.department && (
                                    <p className={c.error}>
                                        {errors.department}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className={c.inputGroup}>
                            <label className={c.label}>
                                <Sparkles size={16} className={c.labelIcon} />
                                Service Required
                            </label>
                            <select
                                name="service"
                                value={form.service}
                                onChange={handleChange}
                                onFocus={() => setFocusedField('service')}
                                onBlur={() => setFocusedField(null)}
                                className={`${c.input} ${focusedField === 'service' ? c.inputFocused : ''}`}
                            >
                                <option value="">
                                    Select Service (or choose a department above)
                                </option>
                                {availableServices.map((s) => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                            {errors.service && (
                                <p className={c.error}>
                                    {errors.service}
                                </p>
                            )}
                        </div>

                        <div className={c.inputGroup}>
                            <label className={c.label}>
                                <MessageSquare size={16} className={c.labelIcon} />
                                Your Message
                            </label>
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                onFocus={() => setFocusedField('message')}
                                onBlur={() => setFocusedField(null)}
                                placeholder="Describe your concern briefly..."
                                rows={4}
                                className={`${c.textarea} ${focusedField === 'message' ? c.textareaFocused : ''}`}
                            />
                            {errors.message && (
                                <p className={c.error}>
                                    {errors.message}
                                </p>
                            )}
                        </div>

                        <div className={c.buttonContainer}>
                            <button type='submit' className={c.button}>
                                <SendHorizonal size={18} className={c.buttonIcon} />
                                <span>Send via WhatsApp</span>
                                <ChevronRight size={16} className={c.buttonArrow} />
                            </button>
                            {sent && (
                                <div className={c.sentMessage}>
                                    <CheckCircle2 size={16} />
                                    Opening WhatsApp & clearing form...
                                </div>
                            )}
                        </div>
                    </form>

                    {/* Hours Section - MOVED TO LEFT SIDE */}
                    <div className={c.hoursContainer}>
                        <div className={c.hoursHeader}>
                            <Clock size={20} className={c.hoursIcon} />
                            <h4 className={c.hoursTitle}>Clinic Hours</h4>
                        </div>
                        <div className={c.hoursContent}>
                            <div className={c.hoursRow}>
                                <span>Monday - Saturday</span>
                                <span className={c.hoursTime}>9:00 AM - 11:00 PM</span>
                            </div>
                            <div className={c.hoursRow}>
                                <span>Sunday</span>
                                <span className={c.hoursTime}>10:00 AM - 6:00 PM</span>
                            </div>
                            <div className={c.hoursNote}>
                                <ExternalLink size={12} />
                                <span>Emergency services available 24/7</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Info & Stats */}
                <div className={c.infoContainer}>
                    {/* Contact Card */}
                    <div className={c.infoCard}>
                        <div className={c.cardDecoration}></div>
                        <h3 className={c.infoTitle}>
                            <MapPin size={22} className="inline-block mr-2 text-emerald-600" />
                            Visit Our Clinic
                        </h3>
                        <div className={c.infoDivider}></div>

                        <div className={c.infoItems}>
                            <div className={c.infoItem}>
                                <div className={c.infoIconWrapper}>
                                    <MapPin size={18} />
                                </div>
                                <div>
                                    <p className={c.infoItemLabel}>Address</p>
                                    <p className={c.infoItemValue}>Hyderabad, Telangana, India</p>
                                </div>
                            </div>

                            <div className={c.infoItem}>
                                <div className={c.infoIconWrapper}>
                                    <Phone size={18} />
                                </div>
                                <div>
                                    <p className={c.infoItemLabel}>Phone</p>
                                    <p className={c.infoItemValue}>+91 8121270909</p>
                                </div>
                            </div>

                            <div className={c.infoItem}>
                                <div className={c.infoIconWrapper}>
                                    <Mail size={18} />
                                </div>
                                <div>
                                    <p className={c.infoItemLabel}>Email</p>
                                    <p className={c.infoItemValue}>medicaresolutions@gmail.com</p>
                                </div>
                            </div>
                        </div>

                        <div className={c.emergencyBadge}>
                            <Heart size={16} className="animate-pulse" />
                            <span>24/7 Emergency Support Available</span>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className={c.statsGrid}>
                        {stats.map((stat, idx) => (
                            <div key={idx} className={c.statCard}>
                                <stat.icon className={`${c.statIcon} ${stat.color}`} />
                                <div className={c.statValue}>{stat.value}</div>
                                <div className={c.statLabel}>{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Map */}
                    <div className={c.mapContainer}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.099198178222!2d78.37003887504841!3d17.454965583443823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x27f23417d9aeb8b%3A0x2a61b39108e88acb!2sPMTS%20Private%20Limited!5e0!3m2!1sen!2sin!4v1775022350452!5m2!1sen!2sin"
                            className={c.map}
                            title="PMTS Private Limited, Hyderabad"
                            loading="lazy"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </div>
            <style>{c.animationKeyframes}</style>
        </div>
    )
}

export default ContactPage