$(document).ready(function () {
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

  setTimeout(() => {
    const $navigation = $('#navigation');
    const $dropdown = $('.dropdown');
    const $overlay = $('.overflow-dropdown');
    const $backgroundDropdown = $('.background-dropdown');
    
    // Function to show the dropdown
    function showDropdown($this) {
      const $menu = $this.find('.dropdown-menu');
      const heightDropdown = $menu.outerHeight();
      const heightNavigation = $navigation.outerHeight();
    
      $backgroundDropdown.css('height', heightDropdown + heightNavigation + 'px');
    
      $this.addClass('show');
      $menu.addClass('show');
      $overlay.addClass('active');
      $backgroundDropdown.addClass('active');
    }
    
    // Function to hide the dropdown
    function hideDropdown($this) {
      $this.removeClass('show');
      $this.find('.dropdown-menu').removeClass('show');
      $overlay.removeClass('active');
      $backgroundDropdown.removeClass('active');
      $backgroundDropdown.css('height', '');
    }
    
    // On Hover
    $dropdown.hover(
      function () {
        showDropdown($(this));
      },
      function () {
        hideDropdown($(this));
      }
    );
    
    // On Click
    $dropdown.on('click', function (e) {
      e.stopPropagation(); // Para evitar que se cierre de inmediato
      //e.preventDefault(); // Prevent default link behavior
      const $this = $(this);
      if ($this.hasClass('show')) {
        hideDropdown($this);
      } else {
        showDropdown($this);
      }
    });
   
    // Hide dropdown when clicking outside
    $(document).on('click', function () {
      $dropdown.each(function () {
        hideDropdown($(this));
      });
    });  
  
    // Mobile navigation
    $('button.navbar-toggler.is-open').on('click', function(){
      $(this).closest('#navigation').addClass('open');
    })
    $('button.navbar-toggler.is-close').on('click', function() {
      const $nav = $(this).closest('#navigation');
      $nav.removeClass('open');
    
      // Close the Bootstrap collapsible menu
      $nav.find('.navbar-collapse').removeClass('show').addClass('collapse');
    });
  }, 100);
});