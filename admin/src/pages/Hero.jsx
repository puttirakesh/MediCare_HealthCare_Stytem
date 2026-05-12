import React, { useMemo, useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import { heroStyles } from '../assets/dummyStyles.js';
import logoImg from '../assets/logo.png';
import { 
  Shield, Activity, LayoutDashboard, Calendar, 
  Users, FileText, ChevronRight, ChevronLeft,
  Stethoscope, Pill, Clock, TrendingUp, 
  Bell, Sparkles, Heart, Microscope, Ambulance,
  Award, Target, Zap, Star, CheckCircle,
  Download, Share2, Settings, HelpCircle,
  Video, Lock, Rocket, Crown, Gem, Flame,
  Thermometer, Trophy, Command
} from 'lucide-react';

const Hero = ({ role = "admin", userName = "Doctor" }) => {
  const isDoctor = role === "doctor";
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Live stats with auto-update simulation
  const [liveStats, setLiveStats] = useState({
    responseTime: 1.2,
    serverLoad: 42
  });

  // Mouse move effect for parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    const statsTimer = setInterval(() => {
      setLiveStats(prev => ({
        ...prev,
        responseTime: Number((Math.random() * 0.5 + 0.8).toFixed(1)),
        serverLoad: Math.min(100, Math.max(20, prev.serverLoad + Math.floor(Math.random() * 6) - 3))
      }));
    }, 5000);
    return () => {
      clearInterval(timer);
      clearInterval(statsTimer);
    };
  }, []);

  // Carousel announcements
  const announcements = [
    { text: "🎉 New Telemedicine Feature Now Available!", type: "success", icon: Video },
    { text: "📊 Monthly Report: Patient satisfaction up 12%", type: "info", icon: TrendingUp },
    { text: "🏥 Flu Season Protocol Updated", type: "info", icon: Thermometer }
  ];

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(slideTimer);
  }, [announcements.length]);

  // Format current date and time
  const formattedDate = currentTime.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  const formattedTime = currentTime.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit'
  });

  // Memoized content
  const heroContent = useMemo(() => ({
    heading: isDoctor ? `Welcome back, Dr. ${userName}` : "MediCare Admin Portal",
    subheading: isDoctor 
      ? "Your comprehensive healthcare management dashboard"
      : "Complete Hospital Management System",
    description: isDoctor 
      ? "Access patient records, manage appointments, review medical reports, and provide exceptional care with our advanced medical dashboard."
      : "Manage hospital operations, doctors, staff, patient records, and system analytics from a centralized, secure control panel.",
    cards: isDoctor ? [
      {
        title: "Today's Appointments",
        description: "8 scheduled appointments • Next in 30 mins",
        icon: Calendar,
        color: "emerald",
        action: "View schedule",
        progress: 65
      },
      {
        title: "Patient Records",
        description: "Access 1,248 patient histories with AI summaries",
        icon: FileText,
        color: "blue",
        action: "View records",
        progress: 100
      },
      {
        title: "Prescriptions",
        description: "Quick e-prescribe with drug interaction checker",
        icon: Pill,
        color: "purple",
        action: "Write prescription",
        progress: 45
      },
      {
        title: "Real-time Updates",
        description: "Critical lab results & patient alerts",
        icon: Activity,
        color: "orange",
        action: "View alerts",
        progress: 80
      }
    ] : [
      {
        title: "Hospital Analytics",
        description: "Real-time metrics & operational efficiency",
        icon: TrendingUp,
        color: "emerald",
        action: "View insights",
        metric: "+23%",
        progress: 78
      },
      {
        title: "Staff Management",
        description: "24 active doctors • 156 total staff",
        icon: Users,
        color: "blue",
        action: "Manage team",
        metric: "+5",
        progress: 92
      },
      {
        title: "System Security",
        description: "Role-based access & audit logs",
        icon: Shield,
        color: "purple",
        action: "Security center",
        metric: "99.9%",
        progress: 100
      },
      {
        title: "Department Oversight",
        description: "8 departments • Real-time occupancy",
        icon: LayoutDashboard,
        color: "rose",
        action: "View departments",
        metric: "78%",
        progress: 65
      }
    ],
    stats: isDoctor ? [
      { label: "Today's Patients", value: "18", icon: Users, change: "+2", trend: "up" },
      { label: "Pending Reports", value: "7", icon: FileText, change: "-3", trend: "down" },
      { label: "Response Rate", value: "94%", icon: Activity, change: "+5%", trend: "up" },
      { label: "On Call", value: "3 hrs", icon: Clock, change: "1 hr left", trend: "warning" }
    ] : [
      { label: "Total Patients", value: "12.4K", icon: Users, change: "+8.2%", trend: "up" },
      { label: "Bed Occupancy", value: "78%", icon: Activity, change: "-3%", trend: "down" },
      { label: "Revenue MTD", value: "$284K", icon: TrendingUp, change: "+12%", trend: "up" },
      { label: "Satisfaction", value: "96%", icon: Shield, change: "+2%", trend: "up" }
    ]
  }), [isDoctor, userName]);

  // Quick actions
  const quickActions = useMemo(() => isDoctor ? [
    { label: "New Prescription", icon: Pill, shortcut: "⌘P", color: "purple" },
    { label: "Schedule Follow-up", icon: Calendar, shortcut: "⌘F", color: "blue" },
    { label: "View Lab Results", icon: FileText, shortcut: "⌘L", color: "emerald" },
    { label: "AI Diagnosis Assistant", icon: Sparkles, shortcut: "⌘A", color: "orange", isNew: true },
    { label: "Telehealth Call", icon: Video, shortcut: "⌘T", color: "indigo" }
  ] : [
    { label: "Add New Doctor", icon: Stethoscope, shortcut: "⌘D", color: "blue" },
    { label: "Approve Leaves", icon: Calendar, shortcut: "⌘A", color: "emerald" },
    { label: "Generate Report", icon: FileText, shortcut: "⌘R", color: "purple" },
    { label: "System Settings", icon: Settings, shortcut: "⌘S", color: "gray" },
    { label: "Export Data", icon: Download, shortcut: "⌘E", color: "orange" },
    { label: "Audit Logs", icon: Lock, shortcut: "⌘L", color: "red" }
  ]);

  // Features list
  const features = [
    { icon: Heart, label: "Patient Care", description: "24/7 monitoring", color: "rose" },
    { icon: Microscope, label: "Lab Integration", description: "Real-time results", color: "blue" },
    { icon: Ambulance, label: "Emergency", description: "Rapid response", color: "red" },
    { icon: Award, label: "Certified", description: "HIPAA compliant", color: "emerald" },
    { icon: Video, label: "Telehealth", description: "Virtual visits", color: "purple" },
    { icon: Shield, label: "Secure", description: "End-to-end encryption", color: "cyan" }
  ];

  // Achievement badges
  const achievements = [
    { label: "5 Years Excellence", icon: Crown, color: "yellow", progress: 100 },
    { label: "10K+ Patients", icon: Users, color: "blue", progress: 85 },
    { label: "Security Certified", icon: Shield, color: "green", progress: 100 },
    { label: "Top Rated", icon: Star, color: "orange", progress: 95 }
  ];

  return (
    <div className={`${heroStyles.container} relative overflow-x-hidden`}>
      <Navbar />

      {/* Simple Background - No glowing effects */}
      <div className="fixed inset-0 -z-30 bg-gradient-to-br from-emerald-50 via-white to-teal-50"></div>

      {/* Simple floating particles - subtle, no green glow */}
      <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-emerald-100/20 animate-float-slow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 15}s`
            }}
          />
        ))}
      </div>

      <div className={heroStyles.mainContainer}>
        <section className={heroStyles.section}>
          <div className={heroStyles.decorativeBg.container}>
            <div className={heroStyles.decorativeBg.blurBackground}>
              <div className={heroStyles.decorativeBg.blurShape} />
            </div>

            <div 
              className={heroStyles.contentBox}
              style={{ transform: `translate(${mousePosition.x * 0.05}px, ${mousePosition.y * 0.05}px)` }}
            >
              {/* Announcement Carousel */}
              <div className="mb-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-3 border border-emerald-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell size={16} className="text-emerald-600" />
                    <span className="text-sm font-medium text-emerald-700">Announcements</span>
                  </div>
                  <div className="flex gap-1">
                    <button 
                      onClick={() => setCurrentSlide((prev) => (prev - 1 + announcements.length) % announcements.length)}
                      className="p-1 hover:bg-white rounded transition-all"
                    >
                      <ChevronLeft size={14} />
                    </button>
                    <button 
                      onClick={() => setCurrentSlide((prev) => (prev + 1) % announcements.length)}
                      className="p-1 hover:bg-white rounded transition-all"
                    >
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mt-1 font-medium">
                  {announcements[currentSlide].text}
                </p>
              </div>

              {/* Date and Time Badge */}
              <div className="flex justify-center items-center gap-3 mb-6">
                <div className="inline-flex items-center gap-2 bg-emerald-100/80 px-4 py-2 rounded-full text-emerald-700 text-sm font-semibold border border-emerald-200">
                  <Clock size={14} />
                  <span>{formattedDate}</span>
                  <span className="w-px h-4 bg-emerald-300 mx-2"></span>
                  <span className="font-mono">{formattedTime}</span>
                </div>
              </div>

              {/* Logo */}
              <div className={heroStyles.logoContainer}>
                <img 
                  src={logoImg} 
                  alt="MediCare Healthcare Solutions Logo" 
                  className={`${heroStyles.logo} opacity-0 transition-opacity duration-500`}
                  onLoad={(e) => e.target.classList.add('opacity-100')}
                  loading="eager"
                />
              </div>

              {/* Heading */}
              <div className="relative">
                <h1 className={heroStyles.heading}>
                  {heroContent.heading}
                </h1>
              </div>
              
              {/* Subheading */}
              <p className="text-emerald-600 font-medium mb-2">
                {heroContent.subheading}
              </p>
              
              <p className={heroStyles.description}>
                {heroContent.description}
              </p>

              {/* Stats Section */}
              <div className={heroStyles.statsContainer}>
                {heroContent.stats.map((stat, idx) => {
                  const IconComponent = stat.icon;
                  const trendColor = stat.trend === 'up' ? 'text-green-600' : stat.trend === 'down' ? 'text-red-600' : 'text-yellow-600';
                  const trendIcon = stat.trend === 'up' ? '↑' : stat.trend === 'down' ? '↓' : '●';
                  return (
                    <div key={idx} className={`${heroStyles.statCard} hover:scale-105 transition-transform cursor-pointer`}>
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <IconComponent size={16} className="text-emerald-500" />
                        <span className={heroStyles.statValue}>{stat.value}</span>
                      </div>
                      <p className={heroStyles.statLabel}>{stat.label}</p>
                      {stat.change && (
                        <span className={`text-xs ${trendColor} mt-1 inline-block font-medium`}>
                          {trendIcon} {stat.change}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Info Cards */}
              <div className={heroStyles.infoCards.container}>
                {heroContent.cards.map((card, index) => {
                  const IconComponent = card.icon;
                  return (
                    <div 
                      key={card.title}
                      className={`${heroStyles.infoCards.card} animate-fadeInUp group relative overflow-hidden cursor-pointer`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {card.metric && (
                        <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                          {card.metric}
                        </div>
                      )}
                      <div className={`${heroStyles.infoCards.iconWrapper} ${heroStyles.infoCards[`icon${card.color}`]} group-hover:scale-110 transition-transform`}>
                        <IconComponent size={24} />
                      </div>
                      <div>
                        <h3 className={heroStyles.infoCards.cardTitle}>
                          {card.title}
                        </h3>
                        <p className={heroStyles.infoCards.cardText}>
                          {card.description}
                        </p>
                        {card.progress && (
                          <div className="mt-3">
                            <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full transition-all duration-1000"
                                style={{ width: `${card.progress}%` }}
                              />
                            </div>
                          </div>
                        )}
                        {card.action && (
                          <div className="mt-3 flex items-center gap-1 text-xs font-medium text-emerald-600 group-hover:text-emerald-700 transition-colors cursor-pointer group/action">
                            <span>{card.action}</span>
                            <ChevronRight size={12} className="group-hover/action:translate-x-1 transition-transform" />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Achievements Section */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-emerald-800 mb-4 text-center flex items-center justify-center gap-2">
                  <Trophy size={20} className="text-yellow-500" />
                  Achievements & Milestones
                  <Flame size={18} className="text-orange-500" />
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {achievements.map((achievement, idx) => {
                    const IconComponent = achievement.icon;
                    return (
                      <div key={idx} className="text-center p-3 rounded-xl bg-white/50 hover:bg-white transition-all cursor-pointer group">
                        <div className={`w-12 h-12 mx-auto mb-2 rounded-full bg-${achievement.color}-100 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <IconComponent size={20} className={`text-${achievement.color}-600`} />
                        </div>
                        <p className="text-xs font-bold text-gray-700">{achievement.label}</p>
                        <div className="mt-2 w-full bg-gray-100 rounded-full h-1">
                          <div 
                            className={`h-full bg-${achievement.color}-400 rounded-full transition-all duration-1000`}
                            style={{ width: `${achievement.progress}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Features Grid */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-emerald-800 mb-4 text-center">Platform Features</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  {features.map((feature, idx) => {
                    const IconComponent = feature.icon;
                    return (
                      <div key={idx} className="text-center p-3 rounded-xl bg-white/50 hover:bg-white transition-all cursor-pointer group hover:shadow-lg">
                        <div className={`w-10 h-10 mx-auto mb-2 rounded-full bg-${feature.color}-100 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <IconComponent size={18} className={`text-${feature.color}-600`} />
                        </div>
                        <p className="text-xs font-bold text-gray-700">{feature.label}</p>
                        <p className="text-xs text-gray-400">{feature.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quick Actions */}
              <div className={heroStyles.quickActions.container}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className={heroStyles.quickActions.title}>
                    Quick Actions
                  </h3>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Command size={12} /> Shortcuts available
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                  {quickActions.map((action, idx) => {
                    const IconComponent = action.icon;
                    return (
                      <div key={idx} className={`${heroStyles.quickActions.action} relative group hover:scale-105 transition-transform`}>
                        <IconComponent size={16} />
                        <span className="text-sm font-medium">{action.label}</span>
                        {action.shortcut && (
                          <span className="absolute -top-2 -right-2 text-[10px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                            {action.shortcut}
                          </span>
                        )}
                        {action.isNew && (
                          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className={heroStyles.ctaContainer}>
                <button className={`${heroStyles.ctaButton} group relative overflow-hidden`}>
                  <span className="relative z-10 flex items-center gap-2">
                    {isDoctor ? "Go to Dashboard" : "Launch Admin Panel"}
                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                <button className={`${heroStyles.secondaryButton} group flex items-center gap-2`}>
                  <HelpCircle size={16} className="group-hover:rotate-12 transition-transform" />
                  {isDoctor ? "View Tutorial" : "System Overview"}
                </button>
                <button className="px-6 py-3 bg-transparent text-gray-600 font-semibold rounded-xl border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-300 flex items-center gap-2 group">
                  <Share2 size={16} className="group-hover:rotate-12 transition-transform" />
                  Share Report
                </button>
              </div>

              {/* Trust Badge */}
              <div className="mt-8 pt-6 border-t border-emerald-100">
                <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <Shield size={14} className="text-emerald-600" />
                    <span>HIPAA Compliant</span>
                    <CheckCircle size={12} className="text-green-500" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity size={14} className="text-emerald-600" />
                    <span>99.9% Uptime SLA</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award size={14} className="text-emerald-600" />
                    <span>ISO 27001 Certified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target size={14} className="text-emerald-600" />
                    <span>99% Patient Satisfaction</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Custom CSS */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float-slow {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(20px, -20px);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.05);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out forwards;
          opacity: 0;
        }
        
        .animate-float-slow {
          animation: float-slow 15s ease-in-out infinite;
        }
        
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #10b981;
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #059669;
        }
      `}</style>
    </div>
  );
};

export default Hero;