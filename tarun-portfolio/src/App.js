import React, { useState, useEffect } from 'react';
import { ChevronDown, Mail, Phone, MapPin, ExternalLink, Github, Linkedin, Menu, X, Code, Database, Cloud, Star, Calendar, Award, Briefcase, GraduationCap, User, MessageCircle, Coffee } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import './App.css';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all'); // ADD THIS LINE

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ['hero', 'about', 'experience', 'projects', 'skills', 'education', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const projects = [
    {
      id: 1,
      title: "NutriVision AI",
      tech: ["Deep Learning", "Computer Vision", "TensorFlow", "Python"],
      description: "AI-powered nutrition analysis system using computer vision to identify food items and provide detailed nutritional information and dietary recommendations.",
      metrics: "Real-time food recognition, Nutritional analysis",
      icon: <Code className="w-8 h-8" />,
      category: "ml"
    },
    {
      id: 2,
      title: "Context-Aware Recommendation System",
      tech: ["Machine Learning", "Data Science", "Python", "API Integration"],
      description: "Intelligent recommendation engine that provides personalized suggestions based on user context, preferences, and behavioral patterns using advanced ML algorithms.",
      metrics: "Personalized recommendations, Context analysis",
      icon: <Database className="w-8 h-8" />,
      category: "ml"
    },
    {
      id: 3,
      title: "Driver Drowsiness Detection",
      tech: ["Data Science", "OpenCV", "Machine Learning", "Python"],
      description: "Real-time drowsiness detection system using computer vision and data science techniques to monitor driver alertness and prevent accidents.",
      metrics: "Real-time monitoring, Safety enhancement",
      icon: <Star className="w-8 h-8" />,
      category: "ml"
    },
    {
      id: 4,
      title: "Airline Passenger Satisfaction Predictor",
      tech: ["Data Analytics", "Machine Learning", "Python", "Predictive Modeling"],
      description: "Data-intensive system that predicts passenger satisfaction levels based on airline services, ratings, and customer feedback using advanced analytics.",
      metrics: "Satisfaction prediction, Data-driven insights",
      icon: <Award className="w-8 h-8" />,
      category: "analytics"
    },
    {
      id: 5,
      title: "Secrets & Authentication System",
      tech: ["Node.js", "Express.js", "MongoDB", "Backend Development"],
      description: "Secure backend application for storing and managing personal secrets with robust authentication, encryption, and session management capabilities.",
      metrics: "128-bit encryption, Secure authentication",
      icon: <Cloud className="w-8 h-8" />,
      category: "backend"
    }
  ];

  // ADD THIS FILTERING LOGIC
  const filteredProjects = projects.filter(project => {
    if (activeFilter === 'all') return true;
    return project.category === activeFilter;
  });

  const skills = {
    languages: ["Python", "JavaScript", "C++", "SQL"],
    frameworks: ["React.js", "Node.js", "Express.js", "Bootstrap"],
    cloud: ["Microsoft Azure", "MongoDB"],
    tools: ["Git", "RESTful API", "Postman", "JIRA", "Eclipse", "Visual Studio"]
  };

  const certifications = [
    "Full Stack Web Development with React - Hong Kong University",
    "Google UX Design - Google",
    "Google Cloud Fundamentals: Core Infrastructure",
    "Introduction to Big Data with Spark and Hadoop - IBM"
  ];

  return (
    <div className="portfolio">
      {/* Floating Bottom Navigation */}
      <nav className="floating-nav">
        <div className="floating-nav-container">
          <button
            onClick={() => scrollToSection('hero')}
            className={`floating-nav-item ${activeSection === 'hero' ? 'active' : ''}`}
            title="Home"
          >
            <User size={20} />
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className={`floating-nav-item ${activeSection === 'about' ? 'active' : ''}`}
            title="About"
          >
            <MessageCircle size={20} />
          </button>
          <button
            onClick={() => scrollToSection('projects')}
            className={`floating-nav-item ${activeSection === 'projects' ? 'active' : ''}`}
            title="Projects"
          >
            <Code size={20} />
          </button>
          <button
            onClick={() => scrollToSection('skills')}
            className={`floating-nav-item ${activeSection === 'skills' ? 'active' : ''}`}
            title="Skills"
          >
            <Star size={20} />
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className={`floating-nav-item ${activeSection === 'contact' ? 'active' : ''}`}
            title="Contact"
          >
            <Mail size={20} />
          </button>
        </div>
      </nav>

      {/* Hero Section - CLEAN NO ANIMATIONS */}
      <section id="hero" className="hero">
        <div className="hero-content">
          <div className="hero-layout">
            <div className="hero-text">
              <h1 className="hero-title">
                <span className="hero-intro">Hello Guys! This is </span>
                <span className="gradient-text">Tarun</span>
              </h1>
              <p className="hero-subtitle">I'm a Developer & Engineer</p>
              <p className="hero-description">
                <TypeAnimation
                  sequence={[
                    "I code",
                    1500,
                    "I solve problems", 
                    1500,
                    "and I build solutions",
                    1500,
                    "and I code again 😉",
                    1500,
                  ]}
                  speed={60}
                  repeat={Infinity}
                  style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: '#64748b' }}
                />
              </p>
              
              <div className="hero-buttons">
                <a 
                  href="https://drive.google.com/file/d/16Tt9OPay9og0DpJJCxOeMOw76TyT3FNN/view?usp=share_link"
                  download="Tarun_Badana_Resume.pdf"
                  className="btn btn-primary"
                >
                  Wanna see my CV?
                </a>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="btn btn-secondary"
                >
                  Let's Talk
                </button>
              </div>

              <div className="hero-social">
                <a href="https://linkedin.com/in/tarunbadana" className="social-link">
                  <Linkedin size={24} />
                </a>
                <a href="https://github.com/tarunbad" className="social-link">
                  <Github size={24} />
                </a>
                <a href="mailto:tarunbad@buffalo.edu" className="social-link">
                  <Mail size={24} />
                </a>
              </div>
            </div>
            
            <div className="hero-image">
              <div className="hero-image-container">
                <img 
                  src="/me.jpg" 
                  alt="Tarun Badana" 
                  className="hero-photo"
                />
                <div className="hero-image-glow"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="hero-scroll" onClick={() => scrollToSection('about')}>
          <ChevronDown size={32} className="scroll-icon" />
        </div>
      </section>

      {/* About Section - FIXED ROTATING CIRCLES */}
      <section id="about" className="about-new">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Get to know</h2>
            <h3 className="section-subtitle">About Me</h3>
            <div className="section-line"></div>
          </div>
          
          <div className="about-layout-new">
            {/* Left Side - Code Window */}
            <div className="about-visual-new">
              <div className="code-window">
                <div className="window-header">
                  <div className="window-dots">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                  </div>
                  <span className="window-title">portfolio.js</span>
                </div>
                <div className="code-content">
                  <div className="code-line">
                    <span className="keyword">const</span> 
                    <span className="variable"> developer</span> 
                    <span className="operator"> = </span>
                    <span className="string">"Tarun"</span>
                  </div>
                  <div className="code-line">
                    <span className="keyword">if</span>
                    <span className="bracket">(</span>
                    <span className="variable">problem</span>
                    <span className="bracket">)</span>
                    <span className="bracket"> {'{'}</span>
                  </div>
                  <div className="code-line indent">
                    <span className="variable">developer</span>
                    <span className="method">.solve</span>
                    <span className="bracket">()</span>
                  </div>
                  <div className="code-line">
                    <span className="bracket">{'}'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Rotating Circles */}
              <div className="rotating-circles-container">
                <div className="orbit-system">
                  <div className="center-circle">
                    <User size={40} />
                    <span>ME</span>
                  </div>
                  
                  <div className="orbit-circle orbit-1">
                    <div className="circle-content">
                      <Code size={20} />
                      <div className="circle-value">15+</div>
                      <div className="circle-title">Projects</div>
                    </div>
                  </div>
                  
                  <div className="orbit-circle orbit-2">
                    <div className="circle-content">
                      <Star size={20} />
                      <div className="circle-value">99.9%</div>
                      <div className="circle-title">Uptime</div>
                    </div>
                  </div>
                  
                  <div className="orbit-circle orbit-3">
                    <div className="circle-content">
                      <Award size={20} />
                      <div className="circle-value">4+</div>
                      <div className="circle-title">Certifications</div>
                    </div>
                  </div>
                  
                  <div className="orbit-circle orbit-4">
                    <div className="circle-content">
                      <Coffee size={20} />
                      <div className="circle-value">∞</div>
                      <div className="circle-title">Coffee Powered</div>
                    </div>
                  </div>
                  
                  <div className="orbit-path"></div>
                </div>
              </div>
          </div>

          {/* Bottom Center Content */}
          <div className="about-content-center">
            <div className="about-description-new">
              <h3>Who am I?</h3>
              <p>
                I'm that guy who gets excited about clean code and perfect APIs. 
                Currently mastering my CS degree while building projects that actually work (99.9% uptime, thank you very much!). 
                I code, I solve problems, and yes, I probably drink too much coffee. Let's build something awesome together!
              </p>
            </div>
            
            <div className="philosophy-new">
              <div className="philosophy-icon">
                <MessageCircle size={24} />
              </div>
              <h4>Life Rule #1</h4>
              <p className="philosophy-quote">
                "If it's working, Don't touch it 😉"
              </p>
            </div>

            <div className="interests-new">
              <h4>What drives me</h4>
              <div className="interests-grid">
                <div className="interest-item">
                  <Code size={20} />
                  <span>Building innovative applications</span>
                </div>
                <div className="interest-item">
                  <Database size={20} />
                  <span>Data-driven decision making</span>
                </div>
                <div className="interest-item">
                  <Star size={20} />
                  <span>Machine learning challenges</span>
                </div>
                <div className="interest-item">
                  <MessageCircle size={20} />
                  <span>User-centered design</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


        {/* Education Section */}
        <section id="experience" className="education-timeline">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Education</h2>
              <div className="section-line"></div>
            </div>
            
            <div className="timeline-new">
              {/* Masters - Left Content, Right Logo */}
              <div className="timeline-item-new timeline-left">
                <div className="timeline-content-new">
                  <h3>Master of Science in Computer Science</h3>
                  <p className="timeline-company">State University of New York at Buffalo</p>
                  <p className="timeline-subtitle">#36 Public University (US News 2025) • #53 Computer Science Nationally</p>
                  <p className="timeline-date">January 2025 - Present</p>
                  <p className="timeline-location">Buffalo, NY</p>
                  <div className="timeline-achievements">
                    <li>Advanced coursework in Machine Learning and AI</li>
                    <li>Part of SUNY system - New York's flagship university</li>
                    <li>Research focus on data-driven applications and emerging technologies</li>
                    <li>13:1 student-faculty ratio with personalized attention</li>
                  </div>
                </div>
                <div className="timeline-marker">
                  <GraduationCap size={24} />
                </div>
                <div className="timeline-logo">
                  <div className="logo-placeholder">
                    <img src="/ub-logo.png" alt="University at Buffalo" className="edu-logo" />
                  </div>
                </div>
              </div>

              {/* Undergrad - Right Content, Left Logo */}
              <div className="timeline-item-new timeline-right">
                <div className="timeline-logo">
                  <div className="logo-placeholder">
                    <img src="/avv-logo.png" alt="Amrita Vishwa Vidyapeetham" className="edu-logo" />
                  </div>
                </div>
                <div className="timeline-marker">
                  <GraduationCap size={24} />
                </div>
                <div className="timeline-content-new">
                  <h3>Bachelor of Technology in Computer Science</h3>
                  <p className="timeline-company">Amrita Vishwa Vidyapeetham</p>
                  <p className="timeline-subtitle">#7 Best University in India (NIRF 2024) • #23 Engineering Nationally</p>
                  <p className="timeline-date">June 2020 - July 2024</p>
                  <p className="timeline-location">Coimbatore, TN</p>
                  <div className="timeline-achievements">
                    <li>Strong foundation in programming, algorithms, and software engineering</li>
                    <li>NAAC A++ accredited institution with world-class facilities</li>
                    <li>Part of #1 ranked university in India for UN Sustainability Goals (THE 2025)</li>
                    <li>Completed 15+ projects including ML applications and web development</li>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      {/* Projects Section - NEW MOVING TRAIN */}
      <section id="projects" className="projects">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Projects</h2>
            <div className="section-line"></div>
          </div>
          
          {/* Filter Tabs */}
          <div className="project-filters">
            <button 
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All Projects
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'ml' ? 'active' : ''}`}
              onClick={() => setActiveFilter('ml')}
            >
              AI & Machine Learning
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'analytics' ? 'active' : ''}`}
              onClick={() => setActiveFilter('analytics')}
            >
              Data Analytics
            </button>
            <button 
              className={`filter-btn ${activeFilter === 'backend' ? 'active' : ''}`}
              onClick={() => setActiveFilter('backend')}
            >
              Backend Development
            </button>
          </div>

          {/* Moving Train Container */}
          <div className="train-container">
            <div className="train-track"></div>
            <div className="train-wrapper">
              <div className="project-train">
                {filteredProjects.concat(filteredProjects).map((project, index) => (
                  <div key={`${project.id}-${index}`} className="train-card">
                    <div className="project-icon">
                      {project.icon}
                    </div>
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                    <div className="project-metrics">{project.metrics}</div>
                    <div className="project-tech">
                      {project.tech.map((tech, i) => (
                        <span key={i} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                    <div className="project-links">
                      <button className="project-btn">
                        <Github size={16} />
                        Code
                      </button>
                      <button className="project-btn">
                        <ExternalLink size={16} />
                        Demo
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section - TERMINAL THEME */}
      <section id="skills" className="skills-terminal">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Skills</h2>
            <div className="section-line"></div>
          </div>
          
          {/* Mobile scroll hint */}
          <div className="mobile-scroll-hint">
            ← Swipe to explore all skills →
          </div>
          
          <div className="terminal-container">
            {/* Languages Terminal */}
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="terminal-dots">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <span className="terminal-title">languages.sh</span>
              </div>
              <div className="terminal-content">
                <div className="command-line">
                  <span className="prompt">tarun@portfolio:~$</span>
                  <span className="command">cat programming_languages.txt</span>
                </div>
                <div className="command-line">
                  <div className="skill-output">
                    ✓ Python <span className="skill-level">Expert</span>
                    <div className="progress-bar"><div className="progress-fill progress-90"></div></div>
                  </div>
                </div>
                <div className="command-line">
                  <div className="skill-output">
                    ✓ JavaScript <span className="skill-level">Advanced</span>
                    <div className="progress-bar"><div className="progress-fill progress-85"></div></div>
                  </div>
                </div>
                <div className="command-line">
                  <div className="skill-output">
                    ✓ C++ <span className="skill-level">Intermediate</span>
                    <div className="progress-bar"><div className="progress-fill progress-75"></div></div>
                  </div>
                </div>
                <div className="command-line">
                  <div className="skill-output">
                    ✓ SQL <span className="skill-level">Advanced</span>
                    <div className="progress-bar"><div className="progress-fill progress-80"></div></div>
                  </div>
                </div>
                <div className="command-line">
                  <span className="prompt">tarun@portfolio:~$</span>
                  <span className="cursor"></span>
                </div>
              </div>
            </div>

            {/* Frameworks Terminal */}
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="terminal-dots">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <span className="terminal-title">frameworks.sh</span>
              </div>
              <div className="terminal-content">
                <div className="command-line">
                  <span className="prompt">tarun@portfolio:~$</span>
                  <span className="command">npm list --depth=0</span>
                </div>
                <div className="command-line">
                  <div className="success-output">
                    📦 react@18.2.0 <span className="skill-level">Expert</span>
                    <div className="progress-bar"><div className="progress-fill progress-90"></div></div>
                  </div>
                </div>
                <div className="command-line">
                  <div className="success-output">
                    📦 node.js@20.x <span className="skill-level">Advanced</span>
                    <div className="progress-bar"><div className="progress-fill progress-85"></div></div>
                  </div>
                </div>
                <div className="command-line">
                  <div className="success-output">
                    📦 express@4.x <span className="skill-level">Advanced</span>
                    <div className="progress-bar"><div className="progress-fill progress-80"></div></div>
                  </div>
                </div>
                <div className="command-line">
                  <div className="success-output">
                    📦 tensorflow@2.x <span className="skill-level">Intermediate</span>
                    <div className="progress-bar"><div className="progress-fill progress-75"></div></div>
                  </div>
                </div>
                <div className="command-line">
                  <span className="prompt">tarun@portfolio:~$</span>
                  <span className="cursor"></span>
                </div>
              </div>
            </div>

            {/* Tools Terminal */}
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="terminal-dots">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <span className="terminal-title">tools.sh</span>
              </div>
              <div className="terminal-content">
                <div className="command-line">
                  <span className="prompt">tarun@portfolio:~$</span>
                  <span className="command">which --all dev-tools</span>
                </div>
                <div className="command-line">
                  <div className="output">
                    🛠️ Git <span className="skill-level">Expert</span>
                    <div className="progress-bar"><div className="progress-fill progress-90"></div></div>
                  </div>
                </div>
                <div className="command-line">
                  <div className="output">
                    🛠️ VS Code <span className="skill-level">Expert</span>
                    <div className="progress-bar"><div className="progress-fill progress-90"></div></div>
                  </div>
                </div>
                <div className="command-line">
                  <div className="output">
                    🛠️ Postman <span className="skill-level">Advanced</span>
                    <div className="progress-bar"><div className="progress-fill progress-80"></div></div>
                  </div>
                </div>
                <div className="command-line">
                  <div className="output">
                    🛠️ JIRA <span className="skill-level">Intermediate</span>
                    <div className="progress-bar"><div className="progress-fill progress-70"></div></div>
                  </div>
                </div>
                <div className="command-line">
                  <span className="prompt">tarun@portfolio:~$</span>
                  <span className="cursor"></span>
                </div>
              </div>
            </div>

            {/* Cloud/Database Terminal */}
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="terminal-dots">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <span className="terminal-title">cloud-db.sh</span>
              </div>
              <div className="terminal-content">
                <div className="command-line">
                  <span className="prompt">tarun@portfolio:~$</span>
                  <span className="command">docker ps --format table</span>
                </div>
                <div className="command-line">
                  <div className="skill-output">
                    ☁️ Microsoft Azure <span className="skill-level">Advanced</span>
                    <div className="progress-bar"><div className="progress-fill progress-80"></div></div>
                  </div>
                </div>
                <div className="command-line">
                  <div className="skill-output">
                    🗄️ MongoDB <span className="skill-level">Advanced</span>
                    <div className="progress-bar"><div className="progress-fill progress-85"></div></div>
                  </div>
                </div>
                <div className="command-line">
                  <div className="skill-output">
                    🗄️ MySQL <span className="skill-level">Intermediate</span>
                    <div className="progress-bar"><div className="progress-fill progress-75"></div></div>
                  </div>
                </div>
                <div className="command-line">
                  <div className="skill-output">
                    🔗 RESTful APIs <span className="skill-level">Expert</span>
                    <div className="progress-bar"><div className="progress-fill progress-90"></div></div>
                  </div>
                </div>
                <div className="command-line">
                  <span className="prompt">tarun@portfolio:~$</span>
                  <span className="cursor"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Get In Touch</h2>
            <div className="section-line"></div>
          </div>
          
          <div className="contact-content">
            <div className="contact-info">
              <h3>Let's Connect!</h3>
              <p>
                I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology. 
                Feel free to reach out!
              </p>
              
              <div className="contact-items">
                <div className="contact-item">
                  <Mail size={24} />
                  <span>tarunbad@buffalo.edu</span>
                </div>
                <div className="contact-item">
                  <Phone size={24} />
                  <span>+1 (716) 426-9727</span>
                </div>
                <div className="contact-item">
                  <MapPin size={24} />
                  <span>Buffalo, NY</span>
                </div>
              </div>
              
              <div className="contact-social">
                <a href="https://linkedin.com/in/tarunbadana" className="social-link">
                  <Linkedin size={24} />
                </a>
                <a href="https://github.com/tarunbad" className="social-link">
                  <Github size={24} />
                </a>
                <a href="mailto:tarunbad@buffalo.edu" className="social-link">
                  <Mail size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 Tarun Badana • Certified in Google UX Design, Full Stack React, Google Cloud, IBM Big Data</p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;