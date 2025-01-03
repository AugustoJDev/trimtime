document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.menu-item');
    const contentSections = document.querySelectorAll('.content-section');
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggle-btn');
  
    // Função para mostrar a seção de conteúdo correspondente
    function showContentSection(sectionId) {
      contentSections.forEach(section => {
        section.style.display = section.id === sectionId ? 'block' : 'none';
      });
    }
  
    // Adicionar evento de clique aos itens do menu
    menuItems.forEach(item => {
      item.addEventListener('click', function() {
        const contentId = this.getAttribute('data-content');
        showContentSection(contentId);
      });
    });
  
    // Mostrar a seção "Agendar Corte" por padrão
    showContentSection('agendar-corte');
  
    // Adicionar evento de clique ao botão de alternância
    toggleBtn.addEventListener('click', function() {
      sidebar.classList.toggle('hidden');
    });
  });