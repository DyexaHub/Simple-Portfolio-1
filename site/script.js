
    // ========================================
    // LOADING SCREEN ANIMATION
    // ========================================
    (function() {
      const loadingScreen = document.getElementById('loadingScreen');
      const loadingBar = document.getElementById('loadingBar');
      const loadingPercentage = document.getElementById('loadingPercentage');
      const loadingStatus = document.getElementById('loadingStatus');
      
      let progress = 0;
      const loadingSteps = [
        { percent: 15, status: 'Loading assets...', duration: 300 },
        { percent: 30, status: 'Initializing components...', duration: 400 },
        { percent: 45, status: 'Loading animations...', duration: 350 },
        { percent: 60, status: 'Setting up interactions...', duration: 400 },
        { percent: 75, status: 'Preparing experience...', duration: 350 },
        { percent: 90, status: 'Almost ready...', duration: 300 },
        { percent: 100, status: 'Welcome!', duration: 200 }
      ];
      
      let currentStep = 0;
      
      function updateProgress() {
        if (currentStep < loadingSteps.length) {
          const step = loadingSteps[currentStep];
          progress = step.percent;
          
          loadingBar.style.width = progress + '%';
          loadingPercentage.textContent = progress + '%';
          loadingStatus.textContent = step.status;
          
          currentStep++;
          setTimeout(updateProgress, step.duration);
        } else {
          // Loading complete - smooth transition
          setTimeout(() => {
            loadingScreen.classList.add('fade-out');
            setTimeout(() => {
              loadingScreen.classList.add('hidden');
              document.body.classList.remove('loading');
              document.body.classList.add('loaded');
              document.body.style.overflow = 'visible';
            }, 600);
          }, 500);
        }
      }
      
      // Prevent scrolling during loading
      document.body.classList.add('loading');
      document.body.style.overflow = 'hidden';
      
      // Start loading animation after a brief delay
      setTimeout(updateProgress, 500);
    })();
    
    // ========================================
    // CONFIG & INITIALIZATION
    // ========================================
    const defaultConfig = {
      bg_primary: '#0a0e27',
      bg_secondary: '#1a1f3a',
      accent_primary: '#6366f1',
      accent_secondary: '#ec4899',
      text_color: '#e2e8f0',
      font_family: 'Inter',
      font_size: 16,
      hero_name: 'Dyexa Rahardika',
      hero_title: 'Full Stack Developer & UI/UX Designer',
      hero_tagline: 'Crafting Digital Excellence Through Code & Design',
      about_heading: 'About Me',
      skills_heading: 'Technical Arsenal',
      projects_heading: 'Featured Work',
      contact_heading: "Let's Connect"
    };

    // ========================================
    // SCROLL PROGRESS
    // ========================================
    function updateScrollProgress() {
      const scrollProgress = document.getElementById('scrollProgress');
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.pageYOffset / windowHeight;
      scrollProgress.style.transform = `scaleX(${scrolled})`;
    }
    
    window.addEventListener('scroll', updateScrollProgress);

    // ========================================
    // TYPING EFFECT
    // ========================================
    const heroNameElement = document.getElementById('heroName');
    const nameText = defaultConfig.hero_name;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150;
    
    function typeEffect() {
      if (!isDeleting && charIndex < nameText.length) {
        heroNameElement.textContent = nameText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 150;
      } else if (isDeleting && charIndex > 0) {
        heroNameElement.textContent = nameText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 100;
      } else if (!isDeleting && charIndex === nameText.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        typingSpeed = 500; // Pause before retyping
      }
      
      setTimeout(typeEffect, typingSpeed);
    }
    
    typeEffect();

    // ========================================
    // TOP NAVIGATION
    // ========================================
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section');
    
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        const sectionId = item.getAttribute('data-section');
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
    
    // Active navigation on scroll
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
          current = section.getAttribute('id');
        }
      });
      
      navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-section') === current) {
          item.classList.add('active');
        }
      });
    });

    // ========================================
    // SHOW/HIDE SKILLS
    // ========================================
    let skillsExpanded = false;
    const toggleSkillsBtn = document.getElementById('toggleSkillsBtn');
    const toggleSkillsText = document.getElementById('toggleSkillsText');
    const skillsGrid = document.getElementById('skillsGrid');
    
    function toggleSkills() {
      const allSkillCategories = skillsGrid.querySelectorAll('.skill-category');
      const icon = toggleSkillsBtn.querySelector('i');
      
      if (skillsExpanded) {
        // Hide extra skills - show only first 8
        allSkillCategories.forEach((cat, index) => {
          if (index >= 8) {
            cat.style.opacity = '1';
            cat.style.transform = 'scale(1)';
            setTimeout(() => {
              cat.style.transition = 'opacity 0.3s ease, transform 0.3s ease, max-height 0.4s ease';
              cat.style.opacity = '0';
              cat.style.transform = 'scale(0.95)';
              cat.style.maxHeight = '0';
              cat.style.overflow = 'hidden';
              cat.style.marginBottom = '0';
              setTimeout(() => {
                cat.style.display = 'none';
              }, 400);
            }, index * 30);
          }
        });
        toggleSkillsText.innerHTML = 'Show All Skills (150+)';
        icon.className = 'fas fa-chevron-down';
        icon.style.transform = 'rotate(0deg)';
        skillsExpanded = false;
      } else {
        // Show all skills with stagger animation
        allSkillCategories.forEach((cat, index) => {
          if (index >= 8) {
            cat.style.display = 'block';
            cat.style.maxHeight = 'none';
            cat.style.overflow = 'visible';
            cat.style.marginBottom = '30px';
            setTimeout(() => {
              cat.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
              cat.style.opacity = '1';
              cat.style.transform = 'scale(1)';
            }, (index - 8) * 50);
          }
        });
        toggleSkillsText.innerHTML = 'Show Less Skills';
        icon.className = 'fas fa-chevron-up';
        icon.style.transform = 'rotate(180deg)';
        skillsExpanded = true;
      }
    }
    
    toggleSkillsBtn.addEventListener('click', toggleSkills);
    
    // Initially hide skills beyond the first 8
    window.addEventListener('load', () => {
      const allSkillCategories = skillsGrid.querySelectorAll('.skill-category');
      allSkillCategories.forEach((cat, index) => {
        if (index >= 8) {
          cat.style.display = 'none';
          cat.style.opacity = '0';
          cat.style.transform = 'scale(0.95)';
        }
      });
    });

    // ========================================
    // SKILL BARS ANIMATION
    // ========================================
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const skillFills = entry.target.querySelectorAll('.skill-fill');
          skillFills.forEach(fill => {
            const progress = fill.getAttribute('data-progress');
            setTimeout(() => {
              fill.style.width = progress + '%';
            }, 200);
          });
          skillObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('.skill-category').forEach(category => {
      skillObserver.observe(category);
    });

    // ========================================
    // STATS COUNTER ANIMATION
    // ========================================
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const statNumber = entry.target.querySelector('.stat-number');
          const target = parseInt(statNumber.getAttribute('data-target'));
          let count = 0;
          const increment = target / 100;
          
          const updateCount = () => {
            if (count < target) {
              count += increment;
              statNumber.textContent = Math.ceil(count);
              setTimeout(updateCount, 20);
            } else {
              statNumber.textContent = target;
            }
          };
          
          updateCount();
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-card').forEach(card => {
      statsObserver.observe(card);
    });

    // ========================================
    // FORM SUBMISSION
    // ========================================
    document.getElementById('contactForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = e.target.querySelector('button[type="submit"]');
      const originalHTML = submitBtn.innerHTML;
      
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        
        setTimeout(() => {
          submitBtn.innerHTML = originalHTML;
          submitBtn.disabled = false;
          e.target.reset();
        }, 2000);
      }, 1500);
    });

    // ========================================
    // SMOOTH SCROLL FOR LINKS
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    // ========================================
    // NEWSLETTER FORM
    // ========================================
    document.getElementById('newsletterForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = e.target.querySelector('button');
      const originalHTML = submitBtn.innerHTML;
      
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
        
        setTimeout(() => {
          submitBtn.innerHTML = originalHTML;
          submitBtn.disabled = false;
          e.target.reset();
        }, 2000);
      }, 1500);
    });

    // ========================================
    // PARALLAX EFFECTS FOR ORBS
    // ========================================
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const orb1 = document.querySelector('.orb-1');
      const orb2 = document.querySelector('.orb-2');
      const orb3 = document.querySelector('.orb-3');
      
      if (orb1) orb1.style.transform = `translate(${scrolled * 0.1}px, ${scrolled * 0.15}px)`;
      if (orb2) orb2.style.transform = `translate(${-scrolled * 0.1}px, ${-scrolled * 0.1}px)`;
      if (orb3) orb3.style.transform = `translate(${scrolled * 0.08}px, ${-scrolled * 0.12}px)`;
    });

    // ========================================
    // BACK TO TOP BUTTON
    // ========================================
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });
    
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // ========================================
    // CARD TILT EFFECT ON MOUSE MOVE
    // ========================================
    const cards = document.querySelectorAll('.glass-card');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.02)`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
    
    // ========================================
    // COUNT UP ANIMATION
    // ========================================
    const countUpObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.getAttribute('data-target'));
          const decimals = parseInt(entry.target.getAttribute('data-decimals')) || 0;
          const duration = 2000;
          const increment = target / (duration / 16);
          let count = 0;
          
          const updateCount = () => {
            if (count < target) {
              count += increment;
              if (count > target) count = target;
              entry.target.textContent = decimals ? count.toFixed(decimals) : Math.ceil(count);
              requestAnimationFrame(updateCount);
            } else {
              entry.target.textContent = decimals ? target.toFixed(decimals) : target;
            }
          };
          
          updateCount();
          countUpObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.count-up').forEach(element => {
      countUpObserver.observe(element);
    });

    // ========================================
    // CONFIG CHANGE HANDLER
    // ========================================
    async function onConfigChange(config) {
      const customFont = config.font_family || defaultConfig.font_family;
      const baseFontStack = 'system-ui, -apple-system, sans-serif';
      const baseSize = config.font_size || defaultConfig.font_size;
      
      const bgPrimary = config.bg_primary || defaultConfig.bg_primary;
      const bgSecondary = config.bg_secondary || defaultConfig.bg_secondary;
      const accentPrimary = config.accent_primary || defaultConfig.accent_primary;
      const accentSecondary = config.accent_secondary || defaultConfig.accent_secondary;
      const textColor = config.text_color || defaultConfig.text_color;

      // Apply font
      document.body.style.fontFamily = `${customFont}, ${baseFontStack}`;
      document.body.style.fontSize = `${baseSize}px`;

      // Apply colors
      document.body.style.color = textColor;
      document.body.style.background = bgPrimary;
      
      document.querySelector('.bg-wrapper').style.background = 
        `linear-gradient(135deg, ${bgPrimary} 0%, ${bgSecondary} 25%, ${bgPrimary} 100%)`;

      // Navigation dots
      document.querySelectorAll('.nav-dot').forEach(el => {
        el.style.background = `rgba(226, 232, 240, 0.3)`;
      });
      
      document.querySelectorAll('.nav-dot.active, .nav-dot:hover').forEach(el => {
        el.style.background = accentPrimary;
      });

      // Buttons
      document.querySelectorAll('.btn-primary').forEach(btn => {
        btn.style.background = `linear-gradient(135deg, ${accentPrimary}, ${accentSecondary})`;
      });
      
      document.querySelectorAll('.btn-secondary').forEach(btn => {
        btn.style.color = accentPrimary;
        btn.style.borderColor = accentPrimary;
      });

      // Tech items
      document.querySelectorAll('.tech-item').forEach(el => {
        el.style.color = accentPrimary;
      });

      // Skill fills
      document.querySelectorAll('.skill-fill').forEach(el => {
        el.style.background = `linear-gradient(90deg, ${accentPrimary}, ${accentSecondary})`;
      });
      
      document.querySelectorAll('.skill-percentage').forEach(el => {
        el.style.color = accentPrimary;
      });

      // Contact icons
      document.querySelectorAll('.contact-icon').forEach(el => {
        el.style.background = `linear-gradient(135deg, ${accentPrimary}, ${accentSecondary})`;
      });

      // Social links
      document.querySelectorAll('.social-link').forEach(el => {
        el.style.color = accentPrimary;
        el.style.borderColor = accentPrimary;
      });

      // Tech badges
      document.querySelectorAll('.tech-badge').forEach(el => {
        el.style.color = accentPrimary;
        el.style.borderColor = accentPrimary;
      });

      // Apply text content
      document.getElementById('heroName').textContent = config.hero_name || defaultConfig.hero_name;
      document.getElementById('heroTitle').textContent = config.hero_title || defaultConfig.hero_title;
      document.getElementById('heroTagline').textContent = config.hero_tagline || defaultConfig.hero_tagline;
      document.getElementById('aboutHeading').textContent = config.about_heading || defaultConfig.about_heading;
      document.getElementById('skillsHeading').textContent = config.skills_heading || defaultConfig.skills_heading;
      document.getElementById('projectsHeading').textContent = config.projects_heading || defaultConfig.projects_heading;
      document.getElementById('contactHeading').textContent = config.contact_heading || defaultConfig.contact_heading;
    }

    // ========================================
    // ELEMENT SDK INITIALIZATION
    // ========================================
    if (window.elementSdk) {
      window.elementSdk.init({
        defaultConfig: defaultConfig,
        onConfigChange: onConfigChange,
        mapToCapabilities: (config) => ({
          recolorables: [
            {
              get: () => config.bg_primary || defaultConfig.bg_primary,
              set: (value) => {
                window.elementSdk.config.bg_primary = value;
                window.elementSdk.setConfig({ bg_primary: value });
              }
            },
            {
              get: () => config.bg_secondary || defaultConfig.bg_secondary,
              set: (value) => {
                window.elementSdk.config.bg_secondary = value;
                window.elementSdk.setConfig({ bg_secondary: value });
              }
            },
            {
              get: () => config.accent_primary || defaultConfig.accent_primary,
              set: (value) => {
                window.elementSdk.config.accent_primary = value;
                window.elementSdk.setConfig({ accent_primary: value });
              }
            },
            {
              get: () => config.accent_secondary || defaultConfig.accent_secondary,
              set: (value) => {
                window.elementSdk.config.accent_secondary = value;
                window.elementSdk.setConfig({ accent_secondary: value });
              }
            },
            {
              get: () => config.text_color || defaultConfig.text_color,
              set: (value) => {
                window.elementSdk.config.text_color = value;
                window.elementSdk.setConfig({ text_color: value });
              }
            }
          ],
          borderables: [],
          fontEditable: {
            get: () => config.font_family || defaultConfig.font_family,
            set: (value) => {
              window.elementSdk.config.font_family = value;
              window.elementSdk.setConfig({ font_family: value });
            }
          },
          fontSizeable: {
            get: () => config.font_size || defaultConfig.font_size,
            set: (value) => {
              window.elementSdk.config.font_size = value;
              window.elementSdk.setConfig({ font_size: value });
            }
          }
        }),
        mapToEditPanelValues: (config) => new Map([
          ['hero_name', config.hero_name || defaultConfig.hero_name],
          ['hero_title', config.hero_title || defaultConfig.hero_title],
          ['hero_tagline', config.hero_tagline || defaultConfig.hero_tagline],
          ['about_heading', config.about_heading || defaultConfig.about_heading],
          ['skills_heading', config.skills_heading || defaultConfig.skills_heading],
          ['projects_heading', config.projects_heading || defaultConfig.projects_heading],
          ['contact_heading', config.contact_heading || defaultConfig.contact_heading]
        ])
      });
    }
  
