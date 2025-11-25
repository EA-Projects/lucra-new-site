$(document).ready(function () {
  // Team Cards
  $(".team-card").on("click", function() {
    $(this).toggleClass("active");
  });

  $(".team-card").on("mouseleave", function() {
    $(this).removeClass("active");
  });

  // Tilt effect to Team Cards only on Desktop 
  if (window.matchMedia('(min-width: 575px)').matches) {
    if ($('.team-card').length) {
      $('.team-card').tilt({
        glare: true,
        maxTilt: 3,
        speed: 700,
        transition: true,
        maxGlare: 0.1
      });
    }
  }

  // Password page trigger
  $("#password-page form").submit(function(e){
    e.preventDefault();
    var password = $('input#password').val();
    // Compare entered password with the correct password
    if (password === 'Lucra2025') {
      
      // Save the password at localStorage
      localStorage.setItem("password", password);

      // Redirect to page
      window.location.replace("/pages/terms-and-conditions.html");

    } else {
      // Error message when the user fail
      $('.error-message').fadeIn();
    }
  });

  // If is a protected page
  if ($('.is-protected-page').length) {
    // Check if the password exist in the localStorage
    var storedPassword = localStorage.getItem("password");
    // If the password doesn't exist, redirect to the password page
    if(!storedPassword) {
        window.location.href = "/tc-access.html";
    } else{
      $('.overlay-protect').fadeOut();
    }
  }

    //PRODUCT PAGE
   $slideshow = $('.why-lucra-slider').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    centerMode: false,
    centerPadding: '0',
    draggable: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 575,
        settings: {
          centerMode: true,
          infinite: true,
        }
      },
    ]
  });

  $('.why-lucra-slider').click(function() {
    $slideshow.slick('slickGoTo', parseInt($slideshow.slick('slickCurrentSlide'))+1);
  });

  $('.slider-products').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding:'20px',
    focusOnSelect: false,
    arrows: false,
    autoplay: false,
    pauseOnHover: false,
    draggable: true,
    infinite: false,
    dots: true,
  });

  $('.values-cards-slide').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding:'0',
    focusOnSelect: false,
    arrows: false,
    autoplay: false,
    pauseOnHover: false,
    draggable: false,
    infinite: false,
    dots: false,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          centerPadding:'20px',
          slidesToShow: 1,
          centerMode: true,
          draggable: true,
          dots: true,
        }
      },
    ]
  });

  $('.market-slider').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding:'0',
    focusOnSelect: false,
    arrows: false,
    autoplay: false,
    pauseOnHover: false,
    draggable: false,
    infinite: false,
    dots: false,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          centerPadding:'20px',
          slidesToShow: 1,
          centerMode: true,
          draggable: true,
          dots: true,
        }
      },
    ]
  });

  $('.slider-platform-capabilities').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding:'20px',
    focusOnSelect: false,
    arrows: false,
    autoplay: false,
    pauseOnHover: false,
    draggable: true,
    infinite: false,
    dots: true,
  });

  const wrapper = document.querySelector(".press-list")
const pagination = document.querySelector(".pagination")
const items = Array.from(document.querySelectorAll(".release"))
let filteredItems = items;
let currPage = 1;

const filters = document.getElementById('filters');

// ⭐ Función para aplicar filtro por tipo
function applyFilter(type) {
  // Quitar "active" de todos los botones
  filters.querySelectorAll('.filter').forEach(btn => btn.classList.remove('active'));

  // Marcar el botón correspondiente como activo
  const btn = filters.querySelector(`.filter[data-filter="${type}"]`);
  if (btn) btn.classList.add('active');

  // Filtrar elementos
  if (type === 'all') {
    filteredItems = items;
  } else {
    filteredItems = items.filter(el => el.classList.contains(type));
  }

  currPage = 1;

  if (filteredItems.length !== 0) {
    pagination.style.display = "flex";
    setHTML(filteredItems);
  } else {
    pagination.style.display = "none";
    wrapper.innerHTML = "<p>No Data Found.</p>";
  }
}

filters.addEventListener('click', e => {
  if (e.target.classList.contains('filter')) {
    const type = e.target.getAttribute('data-filter');
    applyFilter(type);

    // ⭐ Actualizar la URL con el filtro
    const url = new URL(window.location);
    url.searchParams.set('filter', type);
    window.history.replaceState({}, '', url);
  }
});

function paginate(totalItems, currentPage = 1, pageSize = 2, maxPages = 3) {
  let totalPages = Math.ceil(totalItems / pageSize);
  if (currentPage < 1) currentPage = 1;
  else if (currentPage > totalPages) currentPage = totalPages;

  let startPage, endPage;
  if (totalPages <= maxPages) {
    startPage = 1;
    endPage = totalPages;
  } else {
    let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
    let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
    if (currentPage <= maxPagesBeforeCurrentPage) {
      startPage = 1;
      endPage = maxPages;
    } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
      startPage = totalPages - maxPages + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - maxPagesBeforeCurrentPage;
      endPage = currentPage + maxPagesAfterCurrentPage;
    }
  }

  let startIndex = (currentPage - 1) * pageSize;
  let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
  let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

  return { totalItems, currentPage, pageSize, totalPages, startPage, endPage, startIndex, endIndex, pages };
}

function setHTML(items) {
  wrapper.innerHTML = ""
  pagination.innerHTML = ""
  const { currentPage, pageSize, pages, endPage } = paginate(items.length, currPage, 9, 5)

  const nav = document.createElement("nav")
  nav.classList.add(...['relative', 'z-0', 'inline-flex', 'rounded-md', 'shadow-sm', '-space-x-px'])

  let paginationHTML = ""
  paginationHTML += `<button ${currentPage === 1 && 'disabled'} class="${currentPage === 1 ? 'cursor-not-allowed' : 'prev'} d-none">Prev</button>`

  pages.forEach(page => {
    if (currentPage === page) {
      paginationHTML += `<button class="button z-10" page="${page}" ${currentPage === page && 'disabled'}>${page}</button>`
    } else {
      paginationHTML += `<button class="page button" page="${page}">${page}</button>`
    }
  })

  paginationHTML += `<button ${currentPage === endPage && 'disabled'} class="${currentPage === endPage ? 'cursor-not-allowed' : 'next'} d-none">Next</button>`

  nav.innerHTML = paginationHTML
  pagination.append(nav)

  const start = (currentPage - 1) * pageSize, end = currentPage * pageSize;
  items.slice(start, end).forEach(el => wrapper.append(el))
}

document.addEventListener('click', function (e) {
  const $this = e.target
  if ($this.classList.contains("page")) {
    currPage = parseInt($this.getAttribute("page"))
    setHTML(filteredItems)
  }
  if ($this.classList.contains("next")) {
    currPage += 1;
    setHTML(filteredItems)
  }
  if ($this.classList.contains("prev")) {
    currPage -= 1;
    setHTML(filteredItems)
  }
});

// ⭐ Al cargar la página, leer parámetro "filter"
const params = new URLSearchParams(window.location.search);
const filterParam = params.get('filter') || 'all';
applyFilter(filterParam);


  // End of document ready
});

// Fix navbar when scroll
$(window).scroll(function () {
  var scroll = $(window).scrollTop();
  if (scroll >= 60) {
    $('#header-nav').addClass('fixed');
    $('#navigation').addClass('fixed');
  } 
  else {
    $('#header-nav').removeClass('fixed');
    $('#navigation').removeClass('fixed');
  }

  // Anchors Navigation , to trigger active class between sections
  var cutoff = $(window).scrollTop();
  $('.with-sticky-anchors section').each(function () {
      if ($(this).offset().top + $(this).height() > cutoff) {
          var currSection = $(this).attr('id');
          return false;
      }
  });
});

window.addEventListener('load', function () {
  (function ($) {
  })(jQuery);

// About page animations
// Only trigger the animation on Tablet and Desktop
if (window.matchMedia('(min-width: 575px)').matches) {
  // VALUES Section
  if ($('.card-values').length) {
    let valuesAnimation = gsap.timeline({paused: true, delay: .2});
    valuesAnimation
    // Show main image and cards
    .from("#values .top-area h6",{
      opacity: 0,
      duration: .5,
      y: -50
    })
    .from("#values .image-our-values",{
      opacity: 0,
      duration: 1
    }, "-=.3")
    .from("#values .card-values",{
      opacity: 0,
      duration: .3,
      stagger: .2,
      y: 50
    }, "-=.5")

    const cardValuesTrigger = document.querySelectorAll('#values .card-values');
    const observerCardValues = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          valuesAnimation.play();
        }
        // Unobserve trigger
        if (entry.intersectionRatio > 0) {
          observerCardValues.unobserve(entry.target);
        }
      });
    });
    cardValuesTrigger.forEach((animation) => {
      observerCardValues.observe(animation);
    });
  }

  // THE TEAM section
  if ($('#the-team').length) {
    let theTeamAnimation = gsap.timeline({paused: true, delay: .4});
    theTeamAnimation
    // Show main image and cards
    .from("#the-team .top-area h6",{
      onStart: function(){
        $("#the-team .team-grid-desktop .pulse-card").addClass("active");
      },
      opacity: 0,
      duration: .5,
      y: -50
    })
    .from("#the-team .team-grid-desktop .team-card",{
      opacity: 0,
      duration: .3,
      stagger: .15,
      y: 50,
      onComplete: function(){
        $("#the-team .team-grid-desktop .team-card").addClass("visible-card");
      }
    }, "-=.5")
    .from("#the-team .team-grid-desktop .pulse-card",{
      duration: 1,
      onComplete: function(){
        $(this).removeClass("active");
      }
    })


    const theTeamTrigger = document.querySelectorAll('#the-team .team-grid-desktop');
    const observerTheTeam = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          theTeamAnimation.play();
        }
        // Unobserve trigger
        if (entry.intersectionRatio > 0) {
          observerTheTeam.unobserve(entry.target);
        }
      });
    });
    theTeamTrigger.forEach((animation) => {
      observerTheTeam.observe(animation);
    });
  }

  // INVESTORS section
  if ($('#investors').length) {
    let investorsAnimation = gsap.timeline({paused: true, delay: .4});
    investorsAnimation
    // Show main image and cards
    .from("#investors .top-area h6",{
      opacity: 0,
      duration: .5,
      y: -50
    })
    .from("#investors .investor-item",{
      opacity: 0,
      duration: .3,
      stagger: .2,
      y: 50
    }, "-=.5")

    const investorsTrigger = document.querySelectorAll('#investors .investor-item');
    const observerInvestors = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          investorsAnimation.play();
        }
        // Unobserve trigger
        if (entry.intersectionRatio > 0) {
          observerInvestors.unobserve(entry.target);
        }
      });
    });
    investorsTrigger.forEach((animation) => {
      observerInvestors.observe(animation);
    });
  }

  // CAREERS section
  if ($('#careers').length) {
    let careersAnimation = gsap.timeline({paused: true, delay: .4});
    careersAnimation
    // Show main image and cards
    .from("#careers .top-area h6",{
      opacity: 0,
      duration: .5,
      y: -50
    })
    .from("#careers .top-area p",{
      opacity: 0,
      duration: .4,
      y: -30
    }, "-=.2")
    .from("#careers .careers-card",{
      opacity: 0,
      duration: .3,
      stagger: .2,
      y: 50
    }, "-=.5")
  
    const careersTrigger = document.querySelectorAll('#careers .careers-card');
    const observerCareers = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          careersAnimation.play();
        }
        // Unobserve trigger
        if (entry.intersectionRatio > 0) {
          observerCareers.unobserve(entry.target);
        }
      });
    });
    careersTrigger.forEach((animation) => {
      observerCareers.observe(animation);
    });
  }
  // END conditional query
}
//  end window onload
});

// FAQs collapsible
$('.faq-heading').click(function () {
  $(this)
    .parent('li')
    .toggleClass('the-active')
    .find('.faq-text')
    .slideToggle();
});

// About Team Sliders
if ($('.wrapper-team-cards').length) {
  const slickSettings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0',
    focusOnSelect: false,
    arrows: false,
    autoplay: false,
    pauseOnHover: true,
    draggable: true,
    infinite: false,
    dots: true,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 575,
        settings: "unslick"
      }
    ]
  };

  // Initialize all sliders that match the indicated classes
  const sliderClasses = ['.is-leadership', '.is-team', '.is-investors', '.is-advisors'];

  sliderClasses.forEach(cls => {
    $(`.wrapper-team-cards${cls}`).slick(slickSettings);
  });
}

// Refresh Slick sliders inside tabs when shown (only on mobile)
if (window.matchMedia('(max-width: 575px)').matches) {
  $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    var target = $(e.target).attr('href');
    $(target).find('.wrapper-team-cards').slick('refresh'); // a veces ayuda más que setPosition
  });
}

if ($('.slider-team').length) {
  $('.slider-team').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    focusOnSelect: false,
    arrows: false,
    autoplay: false,
    autoplaySpeed: 6000,
    pauseOnHover: false,
    draggable: true,
    infinite: false,
    dots: true,
    dotsClass: 'custom_paging',
    customPaging: function (slider, i) {
        return  '<span>' + (i + 1)+ '</span>' + ' of ' + slider.slideCount;
    }
  });
}

// Check Browsers
var ua = navigator.userAgent.toLowerCase(); 
if (ua.indexOf('safari') != -1) { 
  if (ua.indexOf('chrome') > -1) {
    // Chrome
  } else {
    // Safari
    // Fix tilt on safari browsers
    $(".tilt").addClass("safari").removeAttr("data-tilt");
  }
}

if ($('.product-page').length) {
  // CLIENT CATEGORIES section animation 
  let clientCategories = gsap.timeline({
    scrollTrigger: {
      trigger: '#client-categories',
      start: '0% 50%',
      end: '35% 50%',
      scrub: 0.5,
    }
  });

  // Prevent animation on mobile
  let mediaQueryClientCategories = gsap.matchMedia();
  mediaQueryClientCategories.add("(min-width: 991px)", () => {
    clientCategories.fromTo("#client-categories .category-card",{
      scale: .90,
    },{
      scale: 1,
      duration: 1,
      stagger: {
        amount: 1,
        from: "random"
      }
    })
  })

  let clientCategoriesScroll = gsap.timeline({
    scrollTrigger: {
      trigger: '#client-categories',
      start: '40% 50%',
      end: '90% 50%',
      scrub: 1,
    }
  });
  mediaQueryClientCategories.add("(min-width: 991px)", () => {
    clientCategoriesScroll.to("#client-categories .category-card.rotate",{
      y: 70,
      stagger: {
        amount: 1,
        from: "random"
      }
    }, "<")
    .to("#client-categories .category-card.rotate-right",{
      y: 70,
      stagger: {
        amount: 1,
        from: "random"
      }
    }, "<")
  })
}
////////////////////////////
////// CATEGORIES PAGE //////
////////////////////////////
if ($('.categories-page').length) {
 
  // CLIENT CATEGORIES section animation 
  let clientCategories = gsap.timeline({
    scrollTrigger: {
      trigger: '#client-categories',
      start: '0% 50%',
      end: '35% 50%',
      scrub: 0.5,
    }
  });

  // Prevent animation on mobile
  let mediaQueryClientCategories = gsap.matchMedia();
  mediaQueryClientCategories.add("(min-width: 991px)", () => {
    clientCategories.fromTo("#client-categories .category-card",{
      scale: .90,
    },{
      scale: 1,
      duration: 1,
      stagger: {
        amount: 1,
        from: "random"
      }
    })
  })

  let clientCategoriesScroll = gsap.timeline({
    scrollTrigger: {
      trigger: '#client-categories',
      start: '40% 50%',
      end: '90% 50%',
      scrub: 1,
    }
  });
  mediaQueryClientCategories.add("(min-width: 991px)", () => {
  clientCategoriesScroll.to("#client-categories .category-card.rotate",{
    y: 70,
    stagger: {
      amount: 1,
      from: "random"
    }
  }, "<")
  .to("#client-categories .category-card.rotate-right",{
    y: 70,
    stagger: {
      amount: 1,
      from: "random"
    }
  }, "<")
})
}
////////////////////////////
////// HOME-NEW PAGE //////
////////////////////////////

if ($('.home-new-page').length) {  
  // What We Do section animation
  const whatWeDoTrigger = document.querySelectorAll('#what-we-do .is-trigger');
  const observerWhatWeDo = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        whatWeDo.play();
      }
      // Unobserve trigger
      if (entry.intersectionRatio > 0) {
        observerWhatWeDo.unobserve(entry.target);
      }
    });
  });
  whatWeDoTrigger.forEach((animation) => {
    observerWhatWeDo.observe(animation);
  });
  
  let whatWeDo  = gsap.timeline({ duration: 0.6, ease: "power3.out", paused: true });
  
  let mediaQuerywhatWeDo = gsap.matchMedia();
  mediaQuerywhatWeDo.add("(min-width: 575px)", () => {
    whatWeDo
    .from('#what-we-do .inner-phone.is-medium.left', {
      // opacity: 0,
      x: 100,
      delay: 0.1,
    },'<')
    .from('#what-we-do .inner-phone.is-medium.right', {
      // opacity: 0,
      x: -100,
    },'<')
    .from('#what-we-do .inner-phone.is-small.left', {
      // opacity: 0,
      x: 200,
      delay: 0.1,
    },'<')
    .from('#what-we-do .inner-phone.is-small.right', {
      // opacity: 0,
      x: -200,
    },'<');
  });

  // How We Do It section animation
  gsap.registerPlugin(ScrollTrigger);
  gsap.fromTo("#how-we-do-it .how-we-do-it-block .inner-how-we-do-it-block img", {
    y: -20
    },
  {
    y: 30,
    ease: "none",
    scrollTrigger: {
      trigger: "#how-we-do-it",
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    }
  });

  // Notable Brands Who Trust Us section animation
  const brandsWhoTrustUsTrigger = document.querySelectorAll('#brands-who-trust-us .inner-brand-wrapper');
  const observerBrandsWhoTrustUs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        brandsWhoTrustUs.play();
      }
      // Unobserve trigger
      if (entry.intersectionRatio > 0) {
        observerBrandsWhoTrustUs.unobserve(entry.target);
      }
    });
  });
  brandsWhoTrustUsTrigger.forEach((animation) => {
    observerBrandsWhoTrustUs.observe(animation);
  });

  let brandsWhoTrustUs  = gsap.timeline({ duration: .5, ease: "power3.out", paused: true });
  let mediaQueryBrandsWhoTrustUs = gsap.matchMedia();
  mediaQueryBrandsWhoTrustUs.add("(min-width: 575px)", () => {
    brandsWhoTrustUs
    .from('#brands-who-trust-us .top-area > *', {
      opacity: 0,
      y: 10,
      stagger: 0.4,
    })
    .from('#brands-who-trust-us .inner-brand-wrapper', {
      opacity: 0,
      scale: 0.99,
      y: 10,
      filter: 'blur(5px)',
      stagger: 0.1,
    },'<+.5')
    .from('#brands-who-trust-us .text-center', {
      opacity: 0,
    },'<');
  });

  $('#brands-who-trust-us .inner-brand-wrapper img').on('mouseenter', function() {
    $('#brands-who-trust-us .inner-brand-wrapper img').addClass('hover');
    $(this).removeClass('hover');
  })
  $('#brands-who-trust-us .inner-brand-wrapper img').on('mouseleave', function() {
    $('#brands-who-trust-us .inner-brand-wrapper img').removeClass('hover');
  })

  // How Brands Benefit section animation
  $('.slider-brands').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding:'20px',
    focusOnSelect: false,
    arrows: false,
    autoplay: false,
    pauseOnHover: false,
    draggable: true,
    infinite: false,
    dots: true,
  });

  // We Power Play section animation
  const wePowerPlayTrigger = document.querySelectorAll('#we-power-play .is-trigger');
  const observerWePowerPlay = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        wePowerPlay.play();
      }
      // Unobserve trigger
      if (entry.intersectionRatio > 0) {
        observerWePowerPlay.unobserve(entry.target);
      }
    });
  });
  wePowerPlayTrigger.forEach((animation) => {
    observerWePowerPlay.observe(animation);
  });

  let wePowerPlay  = gsap.timeline({ paused: true, ease: "power2.out" });
  
  let mediaQuerywePowerPlay = gsap.matchMedia();
  mediaQuerywePowerPlay.add("(min-width: 575px)", () => {
    // Split the text into characters
    let splitText = new SplitType("#we-power-play .all-h1", { types: "chars" });
  
    // Hide the text before animating it
    gsap.set("#we-power-play .all-h1 .char", { 
      opacity: 0,
    });
    // Typing animation
    wePowerPlay.to("#we-power-play .all-h1 .char", {
        opacity: 1,
        duration: 0.5,
        stagger: 0.05,
    })
    .from("#we-power-play .text-center", {
      opacity: 0,
      y: 20,
    });

  });

  // End of new homepage
}



// Global Products Tabs
if ($('.tab-pane').length) {  
  let tabTexts = $('.tab-text');
  let currentIndex = 0;
  let animatedTabs = new Set(); // Track which tabs have been animated

  // Animate stat values for initially active tab on scroll
  const initialTab = $('.tab-pane.active');
  if (initialTab.length) {
    const initialTabId = initialTab.attr('id');
    
    ScrollTrigger.create({
      trigger: initialTab[0],
      start: "top 80%",
      once: true,
      onEnter: () => {
        animatedTabs.add(initialTabId);
        
        const statValues = initialTab.find('#stat-value');
        if (statValues.length) {
          statValues.each(function() {
            const statElement = this;
            const startValue = parseInt(statElement.innerText.replace(/\D/g, ''));
            const finalValue = parseInt($(statElement).data('final-animation')) || startValue;
            
            gsap.fromTo(statElement, 
              { innerText: startValue }, 
              { 
                innerText: finalValue, 
                duration: 3, 
                ease: 'power2.out',
                snap: { innerText: 1 },
                onUpdate: function() {
                  statElement.innerText = Math.floor(this.targets()[0].innerText).toLocaleString();
                }
              }
            );
          });
        }
      }
    });
  }

  function showTab(index) {
    const target = tabTexts.eq(index).data('tab');
    const nextTab = $('#' + target);

    // If the next tab is already active, do nothing
    if (nextTab.hasClass('active')) return;

    // Update active classes on buttons
    tabTexts.removeClass('active');
    tabTexts.eq(index).addClass('active');

    const currentTab = $('.tab-pane.active');

    gsap.to(currentTab.find('.inner-tab-content img'), {
      opacity: 0,
      y: 20,
      duration: 0.3,
      stagger: 0.005,
      ease: "power2.in",
      onComplete() {
        gsap.to(currentTab, {
          duration: 0.2,
          opacity: 0,
          y: 20,
          onComplete() {
            currentTab.removeClass('active');

            // Prepare next tab
            gsap.set(nextTab.find('.inner-tab-content img'), { opacity: 0 });
            nextTab.addClass('active');

            gsap.fromTo(nextTab, { opacity: 0, y: -20 }, {
              duration: 0.2,
              opacity: 1,
              y: 0,
              onComplete() {
                // Animate stat values only on first time (at start of image animation)
                const tabId = nextTab.attr('id');
                if (!animatedTabs.has(tabId)) {
                  animatedTabs.add(tabId);
                  
                  const statValues = nextTab.find('#stat-value');
                  if (statValues.length) {
                    statValues.each(function() {
                      const statElement = this;
                      const startValue = parseInt(statElement.innerText.replace(/\D/g, ''));
                      const finalValue = parseInt($(statElement).data('final-animation')) || startValue;
                      
                      gsap.fromTo(statElement, 
                        { innerText: startValue }, 
                        { 
                          innerText: finalValue, 
                          duration: 3, 
                          ease: 'power2.out',
                          snap: { innerText: 1 },
                          onUpdate: function() {
                            statElement.innerText = Math.floor(this.targets()[0].innerText).toLocaleString();
                          }
                        }
                      );
                    });
                  }
                }
 
                // Animate images
                gsap.fromTo(
                  nextTab.find('.inner-tab-content img'),
                  { opacity: 0, y: -20 },
                  {
                    opacity: 1,
                    y: 0,
                    duration: 0.3,
                    stagger: 0.1,
                    ease: "back.out(2)"
                  }
                );
              }
            });
          }
        });
      }
    });
  }

  tabTexts.on('click', function () {
    currentIndex = tabTexts.index(this);
    showTab(currentIndex);
  });
}

// Features Block section animation on Product pages
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".features-block").forEach(block => {
  const image = block.querySelector(".wrapper-image img.is-features-bubble");
  if (image) {
    // 1. Fade-in 
    gsap.fromTo(image,
      { opacity: 0 },
      {
        opacity: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: block,
          start: "top 40%", 
          toggleActions: "play none none none"
        }
      }
    );
    // 2. Parallax 
    gsap.fromTo(image,
      { y: 50 },
      {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: block,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      }
    );
  }
});

////////////////////////////
//////// PRESS PAGE ////////
////////////////////////////
if ($('.press-page').length) { 
  
  if (window.matchMedia('(min-width: 575px)').matches) {


    }
}

///////////////////////////////////
//////// CASE STUDY PAGES ////////
/////////////////////////////////

// Only trigger the animation on Tablet and Desktop
if (window.matchMedia('(min-width: 575px)').matches) {
  // MARKET OPTIONS
  if ($('#market-options').length) {
    let marketCardAnimation = gsap.timeline({paused: true, delay: .4});
    marketCardAnimation
    // Show cards
    .from("#market-options .market-card",{
      opacity: 0,
      duration: .4,
      scale: .95,
      stagger: .1,
    });

    const cardMarketTrigger = document.querySelectorAll('#market-options .trigger-animation');
    const observerCardMarket = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          marketCardAnimation.play();
        }
        // Unobserve trigger
        if (entry.intersectionRatio > 0) {
          observerCardMarket.unobserve(entry.target);
        }
      });
    });
    cardMarketTrigger.forEach((animation) => {
      observerCardMarket.observe(animation);
    });
  }

  // VALUES
  if ($('#case-study-values').length) {
    let valueCardAnimation = gsap.timeline({paused: true, delay: .4});
    valueCardAnimation
    // Show cards
    .from("#case-study-values h2",{
      opacity: 0,
      duration: .4,
      y: 30,
    })
    .from("#case-study-values .value-card",{
      opacity: 0,
      duration: .4,
      scale: .95,
      stagger: .1,
    });

    const cardValueTrigger = document.querySelectorAll('#case-study-values .trigger-animation');
    const observerCardValue = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          valueCardAnimation.play();
        }
        // Unobserve trigger
        if (entry.intersectionRatio > 0) {
          observerCardValue.unobserve(entry.target);
        }
      });
    });
    cardValueTrigger.forEach((animation) => {
      observerCardValue.observe(animation);
    });
  }
}