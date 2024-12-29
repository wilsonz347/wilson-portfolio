document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    const navSlide = () => {
        burger.addEventListener('click', () => {
            // Toggle Nav
            nav.classList.toggle('nav-active');

            // Animate Links
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });

            // Burger Animation
            burger.classList.toggle('toggle');
        });
    };

    navSlide();

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });


    // Project Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (!filterButtons.length || !projectCards.length) {
        console.warn('Project filtering elements not found');
    } else {
        const filterProjects = (filter) => {
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                const shouldShow = filter === 'all' || category === filter;

                // Toggle visibility classes
                if (shouldShow) {
                    card.classList.remove('hidden');
                    card.classList.add('visible');
                } else {
                    card.classList.remove('visible');
                    card.classList.add('hidden');
                }
            });
        };

        // Event Listeners for Filter Buttons
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');

                // Update active button state
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Filter projects
                filterProjects(filter);
            });
        });

        // Initialize with 'all' filter
        filterProjects('all');
    }

    // Form Submission (replace with actual form submission logic)
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.section');
    const revealElementsOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (elementTop < windowHeight - 150) {
                element.classList.add('reveal');
            }
        });
    };

    window.addEventListener('scroll', revealElementsOnScroll);
    revealElementsOnScroll(); // Initial check on page load

    // Navbar visibility and background change on scroll
    const header = document.querySelector('header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
            if (scrollTop > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.9)';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'transparent';
                header.style.boxShadow = 'none';
            }
        }

        lastScrollTop = scrollTop;
    });

    // Skill level animation
    const skillItems = document.querySelectorAll('.skill-item');
    const animateSkills = () => {
        skillItems.forEach(item => {
            const level = item.querySelector('.skill-level');
            level.style.width = level.getAttribute('style').split(':')[1];
        });
    };

    // Trigger skill animation when skills section is in view
    const skillsSection = document.getElementById('skills');
    const skillsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateSkills();
            skillsObserver.unobserve(skillsSection);
        }
    }, {threshold: 0.5});

    skillsObserver.observe(skillsSection);

    // Navbar active state
    const sections = document.querySelectorAll('.section');
    const navItems = document.querySelectorAll('.nav-item');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').slice(1) === current) {
                item.classList.add('active');
            }
        });
    });

    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').slice(1);
            const targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({behavior: 'smooth'});
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
        });
    });
});