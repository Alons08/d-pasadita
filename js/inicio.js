document.addEventListener('DOMContentLoaded', function() {
    // Menú mobile
    const menuToggle = document.getElementById('menuToggle');
    const navMobile = document.getElementById('navMobile');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMobile.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    
    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('#navMobile a').forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navMobile.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
    
    // Filtros del menú con scroll horizontal táctil
    const menuTabs = document.getElementById('menuTabs');
    let isDragging = false;
    let startX, scrollLeft;
    
    menuTabs.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - menuTabs.offsetLeft;
        scrollLeft = menuTabs.scrollLeft;
    });
    
    menuTabs.addEventListener('mouseleave', () => {
        isDragging = false;
    });
    
    menuTabs.addEventListener('mouseup', () => {
        isDragging = false;
    });
    
    menuTabs.addEventListener('mousemove', (e) => {
        if(!isDragging) return;
        e.preventDefault();
        const x = e.pageX - menuTabs.offsetLeft;
        const walk = (x - startX) * 2;
        menuTabs.scrollLeft = scrollLeft - walk;
    });
    
    // Touch events para móviles
    menuTabs.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].pageX - menuTabs.offsetLeft;
        scrollLeft = menuTabs.scrollLeft;
    });
    
    menuTabs.addEventListener('touchend', () => {
        isDragging = false;
    });
    
    menuTabs.addEventListener('touchmove', (e) => {
        if(!isDragging) return;
        e.preventDefault();
        const x = e.touches[0].pageX - menuTabs.offsetLeft;
        const walk = (x - startX) * 2;
        menuTabs.scrollLeft = scrollLeft - walk;
    });
    
    // Cambiar categorías del menú
    document.querySelectorAll('.menu-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            // Remover active de todos los tabs
            document.querySelectorAll('.menu-tab').forEach(t => {
                t.classList.remove('active');
            });
            
            // Agregar active al tab clickeado
            this.classList.add('active');
            
            const categoria = this.getAttribute('data-categoria');
            
            // Ocultar todas las categorías
            document.querySelectorAll('.menu-category').forEach(cat => {
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
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Efecto de carga suave
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.section-title, .nosotros-content, .menu-item, .info-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if(elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Configurar animaciones iniciales
    function setupAnimations() {
        const elements = document.querySelectorAll('.section-title, .nosotros-content, .menu-item, .info-card');
        
        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
        });
    }
    
    setupAnimations();
    window.addEventListener('scroll', animateOnScroll);
    
    // Cargar animaciones al inicio
    animateOnScroll();
});