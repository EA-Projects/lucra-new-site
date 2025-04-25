// Load the navigation HTML into the header
fetch('/utils/navigation.html')
    .then(res => res.text())
    .then(html => {
    document.getElementById('navigation').innerHTML = html;
});
// Load the footer HTML into the footer
fetch('/utils/footer.html')
    .then(res => res.text())
    .then(html => {
    document.getElementById('footer').innerHTML = html;
});

$(document).ready(function () {
    const $navigation = $('#navigation');
    const $dropdown = $('.dropdown');
    const $overlay = $('.overflow-dropdown');
    const $backgroundDropdown = $('.background-dropdown');
    
    $dropdown.hover(
      function () {
        // Mostramos el dropdown temporalmente fuera de vista para medirlo
        const $menu = $(this).find('.dropdown-menu');      
        const heightDropdown = $menu.outerHeight(); // Calcula el alto total
        const heightNavigation = $navigation.outerHeight(); // Calcula el alto total
          
        // Aplicamos el alto al background
        $backgroundDropdown.css('height', heightDropdown + heightNavigation + 'px');
    
        // Mostrar elementos
        $(this).addClass('show');
        $menu.addClass('show');
        $overlay.addClass('active');
        $backgroundDropdown.addClass('active');
      },
      function () {
        // Ocultar
        $(this).removeClass('show');
        $(this).find('.dropdown-menu').removeClass('show');
        $overlay.removeClass('active');
        $backgroundDropdown.removeClass('active');
        $backgroundDropdown.css('height', ''); // Limpiar el alto si querés
      }
    );
  
    // Mobile navigation
    $('button.navbar-toggler.is-open').on('click', function(){
      $(this).closest('#navigation').addClass('open');
    })
    $('button.navbar-toggler.is-close').on('click', function() {
      const $nav = $(this).closest('#navigation');
      $nav.removeClass('open');
    
      // Cerrar el menú colapsable de Bootstrap
      $nav.find('.navbar-collapse').removeClass('show').addClass('collapse');
    });
});