$(document).ready(function () {
  // Load navigation and then initialize events
  fetch('/utils/navigation.html')
    .then(res => res.text())
    .then(html => {
      document.getElementById('navigation').innerHTML = html;
      
      // Trigger navigation events
      initNavigationEvents();
    });

  // Load footer
  fetch('/utils/footer.html')
    .then(res => res.text())
    .then(html => {
      document.getElementById('footer').innerHTML = html;
    });

  function initNavigationEvents() {
    const $navigation = $('#navigation');
    const $dropdown = $('.dropdown');
    const $overlay = $('.overflow-dropdown');
    const $backgroundDropdown = $('.background-dropdown');

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

    function hideDropdown($this) {
      $this.removeClass('show');
      $this.find('.dropdown-menu').removeClass('show');
      $overlay.removeClass('active');
      $backgroundDropdown.removeClass('active');
      $backgroundDropdown.css('height', '');
    }

    // Hover
    $dropdown.hover(
      function () {
        showDropdown($(this));
      },
      function () {
        hideDropdown($(this));
      }
    );

    // Click
    $dropdown.on('click', function (e) {
      e.stopPropagation();
      const $this = $(this);
      if ($this.hasClass('show')) {
        hideDropdown($this);
      } else {
        showDropdown($this);
      }
    });

    $(document).on('click', function () {
      $dropdown.each(function () {
        hideDropdown($(this));
      });
    });

    // Mobile navigation
    $('button.navbar-toggler.is-open').on('click', function(){
      $(this).closest('#navigation').addClass('open');
    });
    $('button.navbar-toggler.is-close').on('click', function() {
      const $nav = $(this).closest('#navigation');
      $nav.removeClass('open');
      $nav.find('.navbar-collapse').removeClass('show').addClass('collapse');
    });

    // console.log('Events initialized.');

    // Transparent navigation
    if ((window.location.href.includes("product")) || (window.location.href.includes("case-studies")))  {
      $("#navigation").addClass("is-transparent");
    } else {
      $("#navigation").removeClass("is-transparent");
    }

    // Navigation Active Links
    if (window.location.href.includes("product"))  {
      $("#navigation .nav-item.is-product").addClass("active");
    } else if (window.location.href.includes("case-studies")) {
      $("#navigation .nav-item.is-case-studies").addClass("active");
    } else if (window.location.href.includes("press")) {
      $("#navigation .nav-item.is-press").addClass("active");
    } else if (window.location.href.includes("about")) {
      $("#navigation .nav-item.is-about-us").addClass("active");
    }
  }
});