import React from 'react';
import logo from '../assets/logo.png';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Activity, Stethoscope, Phone, Mail, MapPin, ArrowRight, Send } from 'lucide-react';
import {footerStyles as f} from '../assets/dummyStyles.js'

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Doctors", href: "/doctors" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
    { name: "Appointments", href: "/appointments" },
  ];

  const services = [
    { name: "Blood Pressure Check", href: "/services" },
    { name: "Blood Sugar Test", href: "/services" },
    { name: "Full Blood Count", href: "/services" },
    { name: "X-Ray Scan", href: "/services" },
  ];

  const socialLinks = [
    {
      Icon: Facebook,
      color: f.facebookColor,
      name: "Facebook",
      href: "https://www.facebook.com/people/Hexagon-Digital-Services/61567156598660/",
    },
    {
      Icon: Twitter,
      color: f.twitterColor,
      name: "Twitter",
      href: "https://twitter.com/yourprofile", // corrected URL
    },
    {
      Icon: Instagram,
      color: f.instagramColor,
      name: "Instagram",
      href: "http://instagram.com/hexagondigitalservices?igsh=MWp2NG1oNTlibWVnZA%3D%3D",
    },
    {
      Icon: Linkedin,
      color: f.linkedinColor,
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/hexagondigtial-services/",
    },
    {
      Icon: Youtube,
      color: f.youtubeColor,
      name: "YouTube",
      href: "https://youtube.com/@hexagondigitalservices?si=lxEFYNCP42t6AoDJ",
    },
  ];

  return (
    <footer className={f.footerContainer}>
      <div className="absolute top-0 left-0 w-72 h-72 bg-green-500/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full"></div>
      <div className={f.floatingIcon1}>
        <Stethoscope className={f.stethoscopeIcon} />
      </div>
      <div className={f.floatingIcon2} style={{ animationDelay: "3s" }}>
        <Activity className={f.activityIcon} />
      </div>

      <div className={f.mainContent}>
        <div className={f.gridContainer}>
          {/* Company Info */}
          <div className={f.companySection}>
            <div className={f.logoContainer}>
              <div className={f.logoWrapper}>
                <div className={f.logoImageContainer}>
                  <img src={logo} alt="logo" className={f.logoImage} />
                </div>
              </div>
              <div>
                <h2 className={f.companyName}>MediCare</h2>
                <p className={f.companyTagline}>HealthCare Solutions</p>
              </div>
            </div>

            <p className={f.companyDescription}>
              MediCare is a leading healthcare provider in the field of digital healthcare.
              We provide a wide range of healthcare services including medical consultation,
              diagnosis, treatment, and prevention. Our dedicated team of medical professionals
              are committed to providing the best possible quality of care to our patients.
            </p>

            <div className={f.contactContainer}>
              <div className={f.contactItem}>
                <div className={f.contactIconWrapper}>
                  <Phone className={f.contactIcon} />
                </div>
                <span className={f.contactText}>+91 9876543210</span>
              </div>

              <div className={f.contactItem}>
                <div className={f.contactIconWrapper}>
                  <Mail className={f.contactIcon} />
                </div>
                <span className={f.contactText}>medicaresolutions@gmail.com</span>
              </div>

              <div className={f.contactItem}>
                <div className={f.contactIconWrapper}>
                  <MapPin className={f.contactIcon} />
                </div>
                <span className={f.contactText}>Hyderabad, India</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className={f.linksSection}>
            <h3 className={f.sectionTitle}>Quick Links</h3>
            <ul className={f.linksList}>
              {quickLinks.map((link, index) => (
                <li key={link.name} className={f.linkItem}>
                  <a
                    href={link.href}
                    className={f.quickLink}
                    style={{ animationDelay: `${index * 60}ms` }}
                  >
                    <div className={f.quickLinkIconWrapper}>
                      <ArrowRight className={f.quickLinkIcon} />
                    </div>
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className={f.linksSection}>
            <h3 className={f.sectionTitle}>Our Services</h3>
            <ul className={f.linksList}>
              {services.map((service) => (
                <li key={service.name}>
                  <a href={service.href} className={f.serviceLink}>
                    <div className={f.serviceIcon}></div>
                    <span>{service.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div className={f.newsletterSection}>
            <h3 className={f.newsletterTitle}>Stay Connected</h3>
            <p className={f.newsletterDescription}>
              Subscribe for health tips, medical updates, and wellness insights delivered
              to your inbox.
            </p>

            <div className={f.newsletterForm}>
  {/* Mobile view - button below input */}
  <div className={f.mobileNewsletterContainer}>
    <input
      type="email"
      placeholder="Enter your email"
      className={f.emailInput}
    />
    <button className={f.mobileSubscribeButton}>
      <Send className={f.mobileButtonIcon} />
      Subscribe
    </button>
  </div>

  {/* Desktop view - button below input */}
  <div className={f.desktopNewsletterContainer}>
    <input
      type="email"
      placeholder="Enter your email"
      className={f.desktopEmailInput}
    />
    <button className={f.desktopSubscribeButton}>
      <Send className={f.desktopButtonIcon} />
      <span className={f.desktopButtonText}>Subscribe</span>
    </button>
  </div>

  <div className={f.socialContainer}>
    {socialLinks.map(({ Icon, color, name, href }, index) => (
      <a
        key={name}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={f.socialLink}
        style={{ animationDelay: `${index * 120}ms` }}
      >
        <div className={f.socialIconBackground} />
        <Icon className={`${f.socialIcon} ${color}`} />
      </a>
    ))}
  </div>
</div>
          </div>
        </div>

        {/* Bottom Section - moved outside the grid */}
        <div className={f.bottomSection}>
          <div className={f.copyright}>
            <span>&copy; {currentYear} MediCare HealthCare Solutions. All rights reserved.</span>
          </div>

          <div className={f.designerText}>
            <span>Designed & Developed by</span>
            <a
              href="https://github.com/puttirakesh"
              target="_blank"
              rel="noopener noreferrer"
              className={f.designerLink}
            >
              𝓜𝓻. 𝓡𝓪𝓴𝓮𝓼𝓱 𝓟𝓾𝓽𝓽𝓲
            </a>
          </div>
        </div>
      </div>

      <style>{f.animationf}</style>
    </footer>
  );
};

export default Footer;

