document.addEventListener('DOMContentLoaded', function() {
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
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Menu filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('.menu-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            menuItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Sample menu data (in a real project, this would come from an API or database)
    const menuData = [
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
        }
    ];
    
    // Function to generate menu items from data
    function generateMenuItems() {
        const menuContainer = document.querySelector('.menu-items');
        
        menuData.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.className = 'menu-item';
            menuItem.setAttribute('data-category', item.category);
            
            const availabilityClass = item.available ? 'available' : 'not-available';
            const availabilityText = item.available ? 'Disponible' : 'Agotado';
            
            menuItem.innerHTML = `
                <div class="item-image">
                    <img src="${item.image}" alt="${item.name}">
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
    }
    
    // Call the function to generate menu items
    generateMenuItems();
    
    // Add scroll animation
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
});