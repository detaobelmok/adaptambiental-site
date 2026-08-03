// Scripts mínimos: ano do rodapé e smooth scroll
document.addEventListener('DOMContentLoaded', function() {
  // Ano do rodapé
  const y = new Date().getFullYear();
  const el = document.getElementById('year');
  if(el) el.textContent = y;

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const target = document.querySelector(this.getAttribute('href'));
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  // optional: simple form submit feedback (if using Formspree, it will handle)
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', function(){
      // show a quick feedback (you can customize)
      const btn = form.querySelector('button[type="submit"]');
      if(btn){ btn.disabled = true; btn.textContent = 'Enviando...'; }
    });
  }
});
