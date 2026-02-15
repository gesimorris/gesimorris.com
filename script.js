// ==================== START BUTTON & CHARACTER ANIMATION ====================
document.addEventListener('DOMContentLoaded', () => {
    // Prevent scrolling on load
    document.body.classList.add('no-scroll');
    
    const startButton = document.getElementById('start-button');
    const startScreen = document.getElementById('start-screen');
    const mainNavigation = document.getElementById('main-navigation');
    const pixelCharacter = document.getElementById('pixel-character');

    startButton.addEventListener('click', () => {
        // 1. Add jump animation to character
        pixelCharacter.classList.add('jumping');
        
        // 2. Wait for jump animation to complete (800ms)
        setTimeout(() => {
            // Hide start screen
            startScreen.style.display = 'none';
            
            // Show main navigation
            mainNavigation.classList.remove('hidden');
            
            // Enable scrolling
            document.body.classList.remove('no-scroll');
            
        }, 800); // Match this to the animation duration in CSS
    });

    // ==================== SCROLL PROGRESS BAR ====================
    const stickyNav = document.getElementById('sticky-nav');
    const progressBar = document.getElementById('progress-bar');
    const progressPercentage = document.getElementById('progress-percentage');

    window.addEventListener('scroll', () => {
        // Show sticky nav after scrolling past main navigation
        const mainNavBottom = mainNavigation.offsetTop + mainNavigation.offsetHeight;
        
        if (window.scrollY > mainNavBottom) {
            stickyNav.classList.add('visible');
        } else {
            stickyNav.classList.remove('visible');
        }

        // Update progress bar
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY;
        const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
        
        progressBar.style.width = scrollPercent + '%';
        progressPercentage.textContent = Math.round(scrollPercent) + '%';
    });

    // ==================== SMOOTH SCROLL FOR NAVIGATION LINKS ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ==================== PROJECT MODAL SYSTEM ====================
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalTechStack = document.getElementById('modal-tech-stack');
    const modalLinks = document.getElementById('modal-links');
    const closeButton = document.querySelector('.close-button');

    // Project data
    const projects = {
        opsready: {
            title: 'OpsReady AI Chatbot',
            description: `AI-powered chatbot for workplace operations management. Query tasks, work orders, deficiencies, and assets using natural language.
            
            <strong>Key Features:</strong>
            • 14+ OpsReady API tool integrations
            • Natural language processing with Claude Sonnet 4
            • Voice input with Web Speech API
            • Real-time data querying
            • Full-stack web application
            
            <strong>My Role:</strong>
            Led AI integration in team prototype, then independently rebuilt as production web app with FastAPI backend and React frontend.`,
            techStack: ['Python', 'FastAPI', 'React', 'Claude API', 'REST APIs', 'Web Speech API'],
            links: [
                { text: '🚀 Live Demo', url: 'https://opsready-chatbot.vercel.app', type: 'demo' },
                { text: '📂 GitHub', url: 'https://github.com/gesimorris/Opsready-Phase-2-', type: 'github' },
                { text: '📹 Original Demo', url: 'demo.mp4' , type: 'video' }
            ]
        },
        feelscape: {
            title: 'FeelScape',
            description: `AI-powered lo-fi music generator that creates chill beats based on image mood analysis.
            
            <strong>Features:</strong>
            • Image mood detection
            • Dynamic beat generation
            • Real-time audio synthesis`,
            techStack: ['Python', 'TensorFlow', 'Audio Processing'],
            links: [
                { text: '📂 GitHub', url: 'https://github.com/gesimorris/Lofi-Music-Generator/blob/main/Gesi%20T00686038%20Project%20Proposal.pdf', type: 'github' }
            ]
        },
        budgetflow: {
            title: 'BudgetFlow',
            description: `Personal finance tracking application with real-time budget monitoring and expense categorization.
            
            <strong>Features:</strong>
            • Real-time transaction tracking
            • Budget allocation and monitoring
            • Expense categorization
            • Financial insights dashboard`,
            techStack: ['React', 'Node.js', 'PostgreSQL', 'Chart.js'],
            links: [
                { text: '📂 GitHub', url: 'https://github.com/gesimorris/Personal-Finance-Tracker/blob/main/README.md', type: 'github' }
            ]
        },
        dosewise: {
            title: 'DoseWise',
            description: `Mindful medication tracking application for reliable dosing and health monitoring.
            
            <strong>Features:</strong>
            • Medication schedule tracking
            • Dose reminders
            • Health metrics logging`,
            techStack: ['Mobile Development', 'UI/UX Design'],
            links: [
                { text: '📹 Demo Video', url: 'https://youtube.com/shorts/E1wnRiF5-eI?feature=share', type: 'video' }
            ]
        },
        links: {
            title: 'Links',
            description: `Event aggregation platform for discovering and visualizing local events.
            
            <strong>Status:</strong> Currently under construction. Check back soon for updates!`,
            techStack: ['In Development'],
            links: []
        },
        asus: {
            title: 'ASUS ROG G551J Hardware Diagnostics',
            description: `Comprehensive hardware diagnostics for ASUS ROG G551J laptop.

            <strong>Features:</strong>
            • CPU, GPU, RAM, and storage health monitoring`,
            
            techStack: ['Hardware Diagnostics', 'System Monitoring'],
            links: [
                { text: '📂 Blog', url: 'https://gesilogbook.hashnode.dev/creation-science-documentary', type: 'blog' }
            ]
        }


    };

    // Open modal with project details
    function openProjectModal(projectId) {
        const project = projects[projectId];
        if (!project) return;

        modalTitle.textContent = project.title;
        modalDescription.innerHTML = `<p>${project.description.replace(/\n/g, '<br>')}</p>`;
        
        // Tech stack
        if (project.techStack && project.techStack.length > 0) {
            modalTechStack.innerHTML = `
                <div class="tech-stack">
                    <strong>Tech Stack:</strong>
                    <div class="tech-badges">
                        ${project.techStack.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
                    </div>
                </div>
            `;
        } else {
            modalTechStack.innerHTML = '';
        }
        
        // Links
        if (project.links && project.links.length > 0) {
            modalLinks.innerHTML = project.links.map(link => {
                const btnClass = link.type === 'demo' ? 'btn-demo' : 
                                 link.type === 'github' ? 'btn-github' : 'btn-video';
                return `<a href="${link.url}" target="_blank" rel="noopener noreferrer" class="modal-btn ${btnClass}">${link.text}</a>`;
            }).join('');
        } else {
            modalLinks.innerHTML = '<p style="opacity: 0.7; font-size: 12px;">Links coming soon...</p>';
        }
        
        modal.style.display = 'block';
    }

    // Add click listeners to project cards
    document.querySelectorAll('.project-link[data-project]').forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = card.getAttribute('data-project');
            openProjectModal(projectId);
        });
    });

    // Close modal
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });

    // ==================== BLOG POSTS FROM HASHNODE ====================
    const blogContainer = document.getElementById('blog-posts-container');
    const host = 'gesilogbook.hashnode.dev';

    const GET_ALL_POSTS_QUERY = `
        query GetAllPosts($host: String!) {
            publication(host: $host) {
                posts(first: 10) { 
                    edges {
                        node {
                            title
                            brief
                            slug
                            coverImage {
                                url
                            }
                        }
                    }
                }
            }
        }
    `;

    fetch('https://gql.hashnode.com/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            query: GET_ALL_POSTS_QUERY, 
            variables: { host: 'gesilogbook.hashnode.dev' }
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        const edges = data?.data?.publication?.posts?.edges;
        
        blogContainer.innerHTML = ''; 

        if (edges && edges.length > 0) {
            edges.forEach(edge => {
                const post = edge.node;
                const postElement = document.createElement('div');
                postElement.classList.add('blog-post-preview');

                const imageUrl = post.coverImage?.url || 'fallback-image-url.png'; 
                
                postElement.innerHTML = `
                    <img src="${imageUrl}" alt="${post.title}" class="post-cover-image">
                    <h3>${post.title}</h3>
                    <p>${post.brief}</p>
                    <a href="https://${host}/${post.slug}" target="_blank" rel="noopener noreferrer">Read More</a>
                `;
                
                blogContainer.appendChild(postElement);
            });
        } else {
            blogContainer.innerHTML = '<p>My latest blog post will appear here soon!</p>';
        }
    })
    .catch(error => {
        console.error('Error fetching blog posts:', error);
        blogContainer.innerHTML = `<p style="color: #ffcccc;"><strong>Error:</strong> Failed to load posts (${error.message}).</p>`;
    });

    // ==================== PROJECTS CAROUSEL ====================
    const carousel = document.getElementById('projects-carousel');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const indicatorsContainer = document.getElementById('carousel-indicators');
    const projectCards = document.querySelectorAll('.project-link');
    
    let currentIndex = 0;
    const cardWidth = 380; // 350px card + 30px gap
    const visibleCards = Math.floor(window.innerWidth / cardWidth) || 1;
    const maxIndex = Math.max(0, projectCards.length - visibleCards);
    
    // Create indicator dots
    for (let i = 0; i <= maxIndex; i++) {
        const dot = document.createElement('div');
        dot.classList.add('indicator-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => scrollToIndex(i));
        indicatorsContainer.appendChild(dot);
    }
    
    const indicators = document.querySelectorAll('.indicator-dot');
    
    function updateIndicators() {
        indicators.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    function scrollToIndex(index) {
        currentIndex = Math.max(0, Math.min(index, maxIndex));
        carousel.scrollTo({
            left: currentIndex * cardWidth,
            behavior: 'smooth'
        });
        updateIndicators();
    }
    
    prevBtn.addEventListener('click', () => {
        scrollToIndex(currentIndex - 1);
    });
    
    nextBtn.addEventListener('click', () => {
        scrollToIndex(currentIndex + 1);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') scrollToIndex(currentIndex - 1);
        if (e.key === 'ArrowRight') scrollToIndex(currentIndex + 1);
    });
    
    // Update on window resize
    window.addEventListener('resize', () => {
        scrollToIndex(currentIndex);
    });

    // ==================== GSAP ANIMATIONS ====================
    gsap.registerPlugin(ScrollTrigger);

    // Animate sections on scroll (but NOT project cards)
    document.querySelectorAll('section').forEach((section) => {
        // Skip animation for start screen and main navigation
        if (section.id === 'start-screen' || section.id === 'main-navigation') return;

        const pageTitle = section.querySelector('.page_title');
        // Exclude project cards from GSAP animations
        const contentElements = section.querySelectorAll('.extra.card, .contact_content > *, .nav-menu-item');

        if(pageTitle) {
            gsap.from(pageTitle, {
                opacity: 0,
                y: 30,
                duration: 0.6,
                scrollTrigger: {
                    trigger: section,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });
        }

        if(contentElements.length > 0) {
            gsap.from(contentElements, {
                opacity: 0,
                y: 30,
                duration: 0.5,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });
        }
    });
});