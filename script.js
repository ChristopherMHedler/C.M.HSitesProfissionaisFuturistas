// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
    
    // Menu mobile toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Fecha o menu mobile ao clicar em um link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Scroll suave para links internos
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
    
    // Header transparente/opaco baseado no scroll
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(10, 10, 10, 0.98)';
            header.style.borderBottom = '1px solid rgba(0, 255, 255, 0.4)';
        } else {
            header.style.background = 'rgba(10, 10, 10, 0.95)';
            header.style.borderBottom = '1px solid rgba(0, 255, 255, 0.2)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Animação de entrada dos elementos ao fazer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observa elementos para animação
    document.querySelectorAll('.benefit-card, .plan-card, .portfolio-item, .testimonial-card').forEach(el => {
        observer.observe(el);
    });
    
    // Efeito de digitação no título hero
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        const neonTextSpan = heroTitle.querySelector('.neon-text');
        const neonText = neonTextSpan ? neonTextSpan.textContent : '';
        
        // Não aplicar efeito de digitação para manter o design original
        // Apenas adicionar classe de animação
        heroTitle.classList.add('fade-in-up');
    }
    
    // Partículas animadas no hero
    function createParticles() {
        const particlesContainer = document.querySelector('.particles');
        if (!particlesContainer) return;
        
        // Criar partículas adicionais dinamicamente
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 1}px;
                height: ${Math.random() * 4 + 1}px;
                background: ${getRandomNeonColor()};
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${Math.random() * 10 + 10}s linear infinite;
                box-shadow: 0 0 10px currentColor;
                opacity: ${Math.random() * 0.8 + 0.2};
            `;
            particlesContainer.appendChild(particle);
        }
    }
    
    function getRandomNeonColor() {
        const colors = ['#00ffff', '#0080ff', '#00ff80', '#8000ff'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    // Adicionar keyframes para animação das partículas
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% {
                transform: translateY(100vh) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) translateX(${Math.random() * 200 - 100}px);
                opacity: 0;
            }
        }
        
        .particle {
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);
    
    // Inicializar partículas
    createParticles();
    
    // Efeito de hover nos cards de planos
    document.querySelectorAll('.plan-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = this.classList.contains('featured') 
                ? 'scale(1.05) translateY(-15px)' 
                : 'translateY(-15px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = this.classList.contains('featured') 
                ? 'scale(1.05)' 
                : 'none';
        });
    });
    
    // Efeito de glitch no logo (ocasional)
    const logo = document.querySelector('.logo-text');
    if (logo) {
        setInterval(() => {
            if (Math.random() < 0.1) { // 10% de chance
                logo.style.textShadow = `
                    2px 0 #ff0000,
                    -2px 0 #00ffff,
                    0 0 20px var(--neon-cyan),
                    0 0 40px var(--neon-cyan)
                `;
                setTimeout(() => {
                    logo.style.textShadow = 'var(--neon-glow)';
                }, 100);
            }
        }, 3000);
    }
    
    // Contador animado nos preços
    function animateCounters() {
        document.querySelectorAll('.plan-price').forEach(price => {
            const finalValue = parseInt(price.textContent.replace(/\D/g, ''));
            const duration = 2000;
            const increment = finalValue / (duration / 16);
            let current = 0;
            
            const counter = setInterval(() => {
                current += increment;
                if (current >= finalValue) {
                    current = finalValue;
                    clearInterval(counter);
                }
                price.textContent = `R$ ${Math.floor(current)}`;
            }, 16);
        });
    }
    
    // Observar seção de planos para iniciar contador
    const plansSection = document.querySelector('.plans');
    if (plansSection) {
        const plansObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    plansObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        plansObserver.observe(plansSection);
    }
    
    // Efeito de cursor personalizado
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(0,255,255,0.8) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        transition: transform 0.1s ease;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    // Expandir cursor em elementos interativos
    document.querySelectorAll('a, button, .btn').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            cursor.style.background = 'radial-gradient(circle, rgba(0,255,255,1) 0%, transparent 70%)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'radial-gradient(circle, rgba(0,255,255,0.8) 0%, transparent 70%)';
        });
    });
    
    // Efeito de ondas no clique
    document.addEventListener('click', function(e) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: fixed;
            width: 100px;
            height: 100px;
            border: 2px solid rgba(0,255,255,0.6);
            border-radius: 50%;
            left: ${e.clientX - 50}px;
            top: ${e.clientY - 50}px;
            pointer-events: none;
            z-index: 9998;
            animation: ripple 0.6s ease-out forwards;
        `;
        
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
    
    // Adicionar keyframes para efeito de ondas
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            0% {
                transform: scale(0);
                opacity: 1;
            }
            100% {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
    
    // Lazy loading para imagens do portfólio
    const portfolioImages = document.querySelectorAll('.portfolio-image img');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                // Simular carregamento de imagem (placeholder)
                img.style.background = 'linear-gradient(45deg, #1a1a2e, #16213e)';
                img.alt = img.alt || 'Projeto em desenvolvimento';
                imageObserver.unobserve(img);
            }
        });
    });
    
    portfolioImages.forEach(img => imageObserver.observe(img));
    
    // Efeito de paralaxe sutil no hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground && scrolled < window.innerHeight) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Adicionar classe de carregamento completo
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
    
    console.log('🚀 WebNeon Landing Page carregada com sucesso!');
});

// Função para detectar dispositivos móveis
function isMobile() {
    return window.innerWidth <= 768;
}

// Otimizações para mobile
if (isMobile()) {
    // Reduzir animações em dispositivos móveis para melhor performance
    document.documentElement.style.setProperty('--animation-duration', '0.3s');
    
    // Desabilitar cursor personalizado em mobile
    const customCursor = document.querySelector('.custom-cursor');
    if (customCursor) {
        customCursor.style.display = 'none';
    }
}

// Preloader simples
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

