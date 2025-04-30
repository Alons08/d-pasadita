document.addEventListener('DOMContentLoaded', function() {
    // Menú mobile
    const menuToggle = document.getElementById('menuToggle');
    const navMobile = document.getElementById('navMobile');
    
    menuToggle.addEventListener('click', function() {
        navMobile.classList.toggle('active');
        this.classList.toggle('active');
    });
    
    // Filtros del menú
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuCategories = document.querySelectorAll('.menu-category');
    
    menuTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remover clase active de todos los tabs
            menuTabs.forEach(t => t.classList.remove('active'));
            // Agregar clase active al tab clickeado
            this.classList.add('active');
            
            const categoria = this.getAttribute('data-categoria');
            
            // Ocultar todas las categorías
            menuCategories.forEach(cat => {
                cat.classList.remove('active');
            });
            
            // Mostrar la categoría seleccionada
            document.getElementById(categoria).classList.add('active');
        });
    });
    
    // Smooth scrolling para anclas
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Cerrar menú mobile si está abierto
            if (navMobile.classList.contains('active')) {
                navMobile.classList.remove('active');
                menuToggle.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Cambiar navbar al hacer scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Animaciones al hacer scroll
    const animateOnScroll = function() {
        const animatableElements = document.querySelectorAll('.section-title, .section-subtitle, .nosotros-content, .nosotros-image, .menu-item, .info-card');
        
        animatableElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Configurar animaciones iniciales
    function setupAnimations() {
        const animatableElements = document.querySelectorAll('.section-title, .section-subtitle, .nosotros-content, .nosotros-image, .menu-item, .info-card');
        
        animatableElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
        });
    }
    
    setupAnimations();
    window.addEventListener('scroll', animateOnScroll);
});