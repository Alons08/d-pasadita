document.addEventListener('DOMContentLoaded', function() {
    // Función para ajustar el hero
    function adjustHero() {
        const navbar = document.querySelector('.navbar');
        const hero = document.querySelector('.hero');
        
        // Calcular altura del navbar
        const navbarHeight = navbar.offsetHeight;
        
        // Aplicar los ajustes
        hero.style.marginTop = `${navbarHeight}px`;
        hero.style.height = `calc(100vh - ${navbarHeight}px)`;
    }

    // Ajustar inicialmente
    adjustHero();
    
    // Ajustar cuando cambia el tamaño de la ventana
    window.addEventListener('resize', adjustHero);
    
    // Ajustar después de que todo esté completamente cargado
    window.addEventListener('load', function() {
        adjustHero();
        // Mostrar el hero después de los cálculos
        document.querySelector('.hero').classList.add('hero-loaded');
    });
    
    // Solución para Safari (puede necesitar un pequeño retraso)
    setTimeout(adjustHero, 100);

    // Menu toggle functionality
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Menu filtering functionality
    let menuItems;
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Sample menu data
    const menuData = [
        {
            name: "Ceviche Clásico",
            description: "Pescado fresco marinado en limón con cebolla, ají y cilantro. Acompañado de camote y choclo.",
            price: 12.99,
            category: "entradas",
            image: "images/ceviche.jpg",
            available: true
        },
        {
            name: "Lomo Saltado",
            description: "Trozos de lomo de res salteados con cebolla, tomate y papas fritas. Servido con arroz blanco.",
            price: 15.99,
            category: "platos-fuertes",
            image: "images/lomo-saltado.jpg",
            available: true
        },
        {
            name: "Pollo a la Brasa",
            description: "Pollo marinado en especias y cocido a la brasa. Acompañado de papas fritas y ensalada fresca.",
            price: 14.50,
            category: "platos-fuertes",
            image: "images/pollo-brasa.jpg",
            available: true
        },
        {
            name: "Causa Limeña",
            description: "Deliciosa causa rellena de pollo o atún con palta. Decorada con huevo y aceitunas.",
            price: 9.99,
            category: "entradas",
            image: "images/causa.jpg",
            available: true
        },
        {
            name: "Suspiro Limeño",
            description: "Postre tradicional peruano a base de manjar blanco y merengue.",
            price: 7.50,
            category: "postres",
            image: "images/suspiro.jpg",
            available: false
        },
        {
            name: "Chicha Morada",
            description: "Refrescante bebida hecha de maíz morado, con toques de canela y clavo de olor.",
            price: 4.50,
            category: "bebidas",
            image: "images/chicha.jpg",
            available: true
        },
        {
            name: "Arroz con Mariscos",
            description: "Arroz cocido con una mezcla de mariscos frescos y especias.",
            price: 16.99,
            category: "platos-fuertes",
            image: "images/arroz-mariscos.jpg",
            available: true
        },
        {
            name: "Tiradito",
            description: "Finas láminas de pescado fresco con salsa de ají amarillo.",
            price: 13.50,
            category: "entradas",
            image: "images/tiradito.jpg",
            available: true
        }
    ];
    
    // Function to generate menu items
    function generateMenuItems() {
        const menuContainer = document.querySelector('.menu-items');
        
        // Clear container first
        menuContainer.innerHTML = '';
        
        menuData.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.className = 'menu-item';
            menuItem.setAttribute('data-category', item.category);
            
            const availabilityClass = item.available ? 'available' : 'not-available';
            const availabilityText = item.available ? 'Disponible' : 'Agotado';
            
            menuItem.innerHTML = `
                <div class="item-image">
                    <img src="${item.image}" alt="${item.name}" loading="lazy">
                    <span class="availability ${availabilityClass}">${availabilityText}</span>
                </div>
                <div class="item-info">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <span class="price">$${item.price.toFixed(2)}</span>
                </div>
            `;
            
            menuContainer.appendChild(menuItem);
        });
        
        // Update menu items list after generating them
        menuItems = document.querySelectorAll('.menu-item');
    }
    
    // Generate initial menu items
    generateMenuItems();
    
    // Filter menu items
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            menuItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                } else {
                    if (item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                }
            });
        });
    });
    
    // Add scroll animation to navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 20) {
            navbar.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
});