// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const nav = document.querySelector('.nav');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    document.querySelectorAll('.nav a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    });
}

// Form Validation and Submission
const formContato = document.getElementById('formContato');

if (formContato) {
    formContato.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form values
        const nome = document.getElementById('nome').value.trim();
        const empresa = document.getElementById('empresa').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefone = document.getElementById('telefone').value.trim();
        const mensagem = document.getElementById('mensagem').value.trim();

        // Clear previous errors
        document.getElementById('erroNome').textContent = '';
        document.getElementById('erroEmail').textContent = '';
        document.getElementById('erroMensagem').textContent = '';

        let isValid = true;

        // Validation
        if (!nome) {
            document.getElementById('erroNome').textContent = 'Nome é obrigatório';
            isValid = false;
        }

        if (!email) {
            document.getElementById('erroEmail').textContent = 'E-mail é obrigatório';
            isValid = false;
        } else if (!isValidEmail(email)) {
            document.getElementById('erroEmail').textContent = 'E-mail inválido';
            isValid = false;
        }

        if (!mensagem) {
            document.getElementById('erroMensagem').textContent = 'Mensagem é obrigatória';
            isValid = false;
        }

        if (!isValid) return;

        // Show loading state
        const btnSubmit = document.getElementById('btnSubmit');
        const formStatus = document.getElementById('formStatus');
        btnSubmit.disabled = true;
        btnSubmit.textContent = 'Enviando...';
        formStatus.innerHTML = '';

        try {
            // Send via WhatsApp as fallback (works offline)
            sendViaWhatsApp(nome, email, telefone, empresa, mensagem);
            
            formStatus.className = 'form-status success';
            formStatus.textContent = '✓ Mensagem enviada com sucesso! Entraremos em contato em breve.';
            formContato.reset();
        } catch (error) {
            formStatus.className = 'form-status error';
            formStatus.textContent = '✗ Erro ao enviar. Tente novamente.';
        } finally {
            btnSubmit.disabled = false;
            btnSubmit.textContent = 'Enviar Mensagem';
        }
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Send via WhatsApp
function sendViaWhatsApp(nome, email, telefone, empresa, mensagem) {
    const text = encodeURIComponent(
        `Olá!\n\nNome: ${nome}\nEmpresa: ${empresa || 'Não informada'}\nTelefone: ${telefone || 'Não informado'}\nE-mail: ${email}\n\nMensagem:\n${mensagem}`
    );
    window.open(`https://wa.me/5521960190309?text=${text}`, '_blank');
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Simple Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animation = 'fadeInUp 0.6s ease-out';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add fade-in animation to cards
document.querySelectorAll('.servico-card, .diferencial, .setor-card, .fundamento').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

console.log('✓ Site Adapt Ambiental carregado com sucesso!');