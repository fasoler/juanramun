// Animación de introducción
document.addEventListener('DOMContentLoaded', () => {
    const introSection = document.getElementById('intro');
    const logo = document.getElementById('logo');
    const header = document.getElementById('header');

    // Ocultar header inicialmente
    header.style.display = 'none';

    gsap.fromTo(logo,
        { opacity: 0, scale: 0.8 },
        {
            opacity: 1, 
            scale: 1, 
            duration: 1.5, 
            ease: "power2.out",
            onComplete: () => {
                logo.style.cursor = 'pointer';
                logo.addEventListener('click', () => {
                    gsap.to(introSection, {
                        opacity: 0, 
                        duration: 1, 
                        onComplete: () => {
                            introSection.style.display = 'none';
                            header.style.display = 'flex';
                            
                            // Mostrar contenido principal con animación
                            gsap.fromTo('section:not(.intro)', 
                                { opacity: 0, y: 50 },
                                { opacity: 1, y: 0, duration: 1, stagger: 0.2 }
                            );
                        }
                    });
                });
            }
        }
    );

    // Menú móvil
    const toggle = document.getElementById('toggle');
    const menu = document.getElementById('menu');

    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            menu.classList.toggle('active');
        });

        // Cerrar menú al hacer clic en un enlace
        const menuLinks = menu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
            });
        });
    }

    // Navegación suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});