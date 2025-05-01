document.addEventListener('DOMContentLoaded', function() {
    // Función para ajustar el hero section
    function adjustHero() {
        const navbar = document.querySelector('.navbar');
        const hero = document.querySelector('.hero');
        const navbarHeight = navbar.offsetHeight;
        
        hero.style.height = `calc(100vh - ${navbarHeight}px)`;
        
        setTimeout(() => {
            hero.classList.add('hero-loaded');
        }, 100);
    }

    // Ajustar inicialmente
    adjustHero();
    
    // Ajustar al cambiar tamaño de ventana
    window.addEventListener('resize', adjustHero);
    
    // Menu toggle para móviles
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    
    // Cerrar menú al hacer clic en un enlace
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    });
    
    // Scroll suave para enlaces
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - navbarHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Filtrado del menú
    let menuItems;
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Datos del menú
    const menuData = [
        // Platos principales
        {
            name: "Pollo Broaster",
            description: "Crocante pollo broaster acompañado de papas fritas y ensalada fresca",
            price: 11.00,
            category: "platos-principales",
            image: "images/pollo-broaster.jpg",
            available: true
        },
        {
            name: "Mostrito",
            description: "Delicioso mostrito con carne, papas y salsa especial de la casa",
            price: 13.00,
            category: "platos-principales",
            image: "images/mostrito.jpg",
            available: true
        },
        {
            name: "Lomito de Carne",
            description: "Jugoso lomito de res a la parrilla con guarnición al gusto",
            price: 14.00,
            category: "platos-principales",
            image: "images/lomito-carne.jpg",
            available: true
        },
        {
            name: "Lomito de Pollo",
            description: "Tierno lomito de pollo grillado con acompañamiento",
            price: 13.00,
            category: "platos-principales",
            image: "images/lomito-pollo.jpg",
            available: true
        },
        {
            name: "Chaufa",
            description: "Arroz chaufa tradicional preparado con ingredientes frescos",
            price: 14.00,
            category: "platos-principales",
            image: "images/chaufa.jpg",
            available: true
        },
        {
            name: "Pollo a la Plancha",
            description: "Pechuga de pollo a la plancha con vegetales salteados",
            price: 13.00,
            category: "platos-principales",
            image: "images/pollo-plancha.jpg",
            available: true
        },
        {
            name: "Tallarín Criollo",
            description: "Tallarines al estilo peruano con salsa criolla y carne",
            price: 14.00,
            category: "platos-principales",
            image: "images/tallarin-criollo.jpg",
            available: true
        },
        {
            name: "Caldo de Gallina",
            description: "Reconfortante caldo preparado con gallina de corral",
            price: 10.00,
            category: "platos-principales",
            image: "images/caldo-gallina.jpg",
            available: true
        },
        
        // Hamburguesas
        {
            name: "Hamburguesa Simple",
            description: "Clásica hamburguesa con carne, lechuga, tomate y salsa",
            price: 5.00,
            category: "hamburguesas",
            image: "images/hamburguesa-simple.jpg",
            available: true
        },
        {
            name: "Hamburguesa Royal",
            description: "Doble carne con queso, tocino y salsa especial",
            price: 6.00,
            category: "hamburguesas",
            image: "images/hamburguesa-royal.jpg",
            available: true
        },
        {
            name: "Hamburguesa Completa",
            description: "Incluye carne, jamón, queso, huevo y todos los aderezos",
            price: 8.00,
            category: "hamburguesas",
            image: "images/hamburguesa-completa.jpg",
            available: true
        },
        {
            name: "Hamburguesa Filete de Pollo",
            description: "Filete de pollo empanizado con vegetales frescos",
            price: 8.00,
            category: "hamburguesas",
            image: "images/hamburguesa-pollo.jpg",
            available: true
        },
        {
            name: "Salchicono",
            description: "Especial salchipapa con salchichas premium y toppings",
            price: 8.00,
            category: "hamburguesas",
            image: "images/salchicono.jpg",
            available: true
        },
        
        // Postres
        {
            name: "Ensalada de Frutas",
            description: "Mezcla de frutas frescas de temporada",
            price: 8.00,
            category: "postres",
            image: "images/ensalada-frutas.jpg",
            available: true
        },
        {
            name: "Copa de Helado",
            description: "Deliciosa copa con tres sabores de helado a elección",
            price: 5.00,
            category: "postres",
            image: "images/copa-helado.jpg",
            available: true
        },
        {
            name: "Waffles",
            description: "Crujientes waffles con toppings de tu preferencia",
            price: 9.00,
            category: "postres",
            image: "images/waffles.jpg",
            available: false
        },
        
        // Bebidas
        {
            name: "Jugo Surtido",
            description: "Refrescante mezcla de frutas de temporada",
            price: 3.00,
            category: "bebidas",
            image: "images/jugo-surtido.jpg",
            available: true
        },
        {
            name: "Jugo de Papaya",
            description: "Natural jugo de papaya rico en fibra",
            price: 5.00,
            category: "bebidas",
            image: "images/jugo-papaya.jpg",
            available: true
        },
        {
            name: "Jugo de Piña",
            description: "Jugo natural de piña refrescante",
            price: 5.00,
            category: "bebidas",
            image: "images/jugo-pina.jpg",
            available: true
        },
        {
            name: "Café",
            description: "Café pasado o espresso al gusto",
            price: 3.00,
            category: "bebidas",
            image: "images/cafe.jpg",
            available: true
        },
        {
            name: "Infusión",
            description: "Variedad de infusiones herbales",
            price: 2.00,
            category: "bebidas",
            image: "images/infusion.jpg",
            available: true
        }
    ];
    
    // Generar ítems del menú
    function generateMenuItems() {
        const menuContainer = document.querySelector('.menu-items');
        menuContainer.innerHTML = '';
        
        menuData.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.className = 'menu-item';
            menuItem.setAttribute('data-category', item.category);
            
            // Mostrar solo platos principales inicialmente
            menuItem.style.display = item.category === 'platos-principales' ? 'block' : 'none';
            
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
                    <span class="price">S/${item.price.toFixed(2)}</span>
                </div>
            `;
            
            menuContainer.appendChild(menuItem);
        });
        
        menuItems = document.querySelectorAll('.menu-item');
    }
    
    // Generar ítems iniciales
    generateMenuItems();
    
    // Filtrar menú
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Agregar clase active al botón clickeado
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Mostrar/ocultar ítems según categoría
            menuItems.forEach(item => {
                item.style.display = item.getAttribute('data-category') === filterValue ? 'block' : 'none';
            });
        });
    });
    
    // Efecto de sombra en navbar al hacer scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 20) {
            navbar.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 1px 6px rgba(0, 0, 0, 0.1)';
        }
    });
});