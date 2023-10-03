////// DISABLE ANIMATIONS ON MOBILE
if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) ||
  $(window).width() < 575
) {
  $('.animate').removeClass('animate'); // to remove transition
}

let previousY = {};
let previousRatio = {};

const thresholdArray = (steps) =>
  Array(steps + 1)
    .fill(0)
    .map((_, index) => index / steps || 0);

function handleIntersection(entries, observer) {
  entries.forEach((entry) => {
    const currentY = entry.boundingClientRect.y;
    const currentRatio = entry.intersectionRatio;
    const isIntersecting = true;

    if (entry.intersectionRatio > 0) {
      let output = '';

      // Scrolling down/up
      if (
        currentY < previousY[entry.target.id] ||
        (previousY[entry.target.id] === 0 && currentY > 0)
      ) {
        if (currentRatio > previousRatio[entry.target.id] && isIntersecting) {
          output = entry.target.id + ' Scrolling down enter';
          $(entry.target).addClass('animated-in');
        } else {
          output = entry.target.id + ' Scrolling down leave';
          $(entry.target).addClass('animated-out');
        }
      } else if (currentY > previousY[entry.target.id] && isIntersecting) {
        if (currentRatio < previousRatio[entry.target.id]) {
          output = entry.target.id + ' Scrolling up leave';
          $(entry.target).removeClass('animated-in');
        } else {
          output = entry.target.id + ' Scrolling up enter';
          $(entry.target).removeClass('animated-out');
        }
      }

      previousY[entry.target.id] = currentY;
      previousRatio[entry.target.id] = currentRatio;
    }
  });
}

window.addEventListener('load', function () {
  $('#header').addClass('animated');

  const elements = document.querySelectorAll('[data-animable]');
  const options = {
    root: null,
    threshold: [0.25, 0.75],
  };
  const observer = new IntersectionObserver(handleIntersection, options);
  elements.forEach((el) => {
    previousY[el.id] = 0;
    previousRatio[el.id] = 0;
    observer.observe(el);
  });

  (function ($) {
    $(document).ready(function () {
      var elementTop, elementBottom, viewportTop, viewportBottom;

      function isScrolledIntoView(elem) {
        elementTop = $(elem).offset().top;
        elementBottom = elementTop + $(elem).outerHeight();
        viewportTop = $(window).scrollTop();
        viewportBottom = viewportTop + $(window).height();
        return elementBottom > viewportTop && elementTop < viewportBottom;
      }

      if ($('video').length) {
        var loadVideo;

        $('video').each(function () {
          $(this).attr('webkit-playsinline', '');
          $(this).attr('playsinline', '');
          $(this).attr('muted', 'muted');

          $(this).attr('id', 'loadvideo');
          loadVideo = document.getElementById('loadvideo');
          loadVideo.load();
        });

        $(window).scroll(function () {
          // video to play when is on viewport

          $('video').each(function () {
            if (isScrolledIntoView(this) == true) {
              $(this)[0].play();
            } else {
              $(this)[0].pause();
            }
          });
        }); // video to play when is on viewport
      } // end .field--name-field-video

      $(".team-card").on("click", function() {
        $(this).addClass("active");
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
    });
  })(jQuery);

  // Ambassadors University and Games
  if ($('#games').length) {
    const gamesLogos = anime.timeline({
      direction: 'normal',
      autoplay: true,
      loop: true,
    });

    gamesLogos
      .add({
        targets: '#games .container-blocks .blocks',
        translateY: [0, 30],
        opacity: [0, 1],
        easing: 'easeInQuad',
        duration: 400,
        delay: anime.stagger(50),
      })
      .add({
        targets: '#games .container-blocks .blocks',
        translateY: 30,
        opacity: 1,
        easing: 'easeInQuad',
        duration: 2500,
        changeComplete: () => {
          $('#games .container-blocks.first').addClass('hide');
          $('#games .container-blocks.second').removeClass('hide');
        },
      })
      .add({
        targets: '#games .container-blocks .blocks',
        translateY: [0, 30],
        opacity: [0, 1],
        easing: 'easeInQuad',
        duration: 400,
        delay: anime.stagger(50),
      })
      .add({
        targets: '#games .container-blocks .blocks',
        translateY: 30,
        opacity: 1,
        easing: 'easeInQuad',
        duration: 2500,
        changeComplete: () => {
          $('#games .container-blocks.first').removeClass('hide');
          $('#games .container-blocks.second').addClass('hide');
        },
      });
    }
    // Form Variables, like Actions to the form
    var greenhouseAction = 'https://www.linkedin.com/jobs/view/3566908844/';
    var californiaAction = 'https://www.linkedin.com/jobs/view/3430512566/?eBP=JOB_SEARCH_ORGANIC&recommendedFlavor=IN_NETWORK&refId=G50fpkbGhNNLn3sug3eRlA%3D%3D&trackingId=3IpRdQFPy%2F6P4iAy1VswyQ%3D%3D&trk=flagship3_search_srp_jobs';
    var pennsylvaniaAction = 'https://www.linkedin.com/jobs/view/3431737768/?eBP=JOB_SEARCH_ORGANIC&recommendedFlavor=IN_NETWORK&refId=G50fpkbGhNNLn3sug3eRlA%3D%3D&trackingId=chJhbG4eDtQgGGABW2PVsQ%3D%3D&trk=flagship3_search_srp_jobs';
    
    // Ambassadors States Select
  $('#states-select').change(function () {
    if ($(this).val() == 'select') {
      $('#submit-state').prop('disabled', true);
      $('.option-display.games').addClass('hide');
      $('.option-display.sports').addClass('hide');
      $('.option-display.full').addClass('hide');
      $('.option-display.not-offered').addClass('hide');
      $(".contact-mail").addClass("hide");
      $('#states-form').attr('action', greenhouseAction);
      $(".disclaimer").removeClass("show");
    } else if (
      $(this).val() == 'AZ' ||
      $(this).val() == 'WA' ||
      $(this).val() == 'NV' ||
      $(this).val() == 'CO' ||
      $(this).val() == 'IA' ||
      $(this).val() == 'MI' ||
      $(this).val() == 'OH' ||
      $(this).val() == 'VA' ||
      $(this).val() == 'MD' ||
      $(this).val() == 'NJ' ||
      $(this).val() == 'NH' ||
      $(this).val() == 'SC' ||
      $(this).val() == 'VT'
    ) {
      $('.option-display.games').removeClass('hide');
      $('.option-display.sports').addClass('hide');
      $('.option-display.full').addClass('hide');
      $('.option-display.not-offered').addClass('hide');
      $('#submit-state').prop('disabled', false);
      $(".contact-mail").addClass("hide");
      $('#states-form').attr('action', greenhouseAction);
      $(".disclaimer").removeClass("show");
    } else if ($(this).val() == 'SD' || $(this).val() == 'DE') {
      $('.option-display.sports').removeClass('hide');
      $('.option-display.games').addClass('hide');
      $('.option-display.full').addClass('hide');
      $('.option-display.not-offered').addClass('hide');
      $('#submit-state').prop('disabled', false);
      $(".contact-mail").addClass("hide");
      $('#states-form').attr('action', greenhouseAction);
      $(".disclaimer").removeClass("show");
    } else if (
      $(this).val() == 'MT' ||
      $(this).val() == 'AR' ||
      $(this).val() == 'LA' ||
      $(this).val() == 'TN' ||
      $(this).val() == 'CT'
    ) {
      $('.option-display.sports').addClass('hide');
      $('.option-display.games').addClass('hide');
      $('.option-display.full').addClass('hide');
      $('.option-display.not-offered').removeClass('hide');
      $('#submit-state').prop('disabled', true);
      $(".contact-mail").addClass("hide");
      $('#states-form').attr('action', greenhouseAction);
      $(".disclaimer").removeClass("show");
    }
    // California Option
    else if (
      $(this).val() == 'CA'
    ) {
      $('.option-display.full').removeClass('hide');
      $('.option-display.sports').addClass('hide');
      $('.option-display.games').addClass('hide');
      $('.option-display.not-offered').addClass('hide');
      $('#submit-state').prop('disabled', false);
      $('#states-form').attr('action', californiaAction);
      $(".contact-mail").addClass("hide");
      $(".disclaimer").addClass("show");
      $(".contact-mail.california").removeClass("hide");
    }
    // Pennsylvania Option
    else if (
      $(this).val() == 'PA'
    ) {
      $('.option-display.full').removeClass('hide');
      $('.option-display.sports').addClass('hide');
      $('.option-display.games').addClass('hide');
      $('.option-display.not-offered').addClass('hide');
      $('#submit-state').prop('disabled', false);
      $('#states-form').attr('action', pennsylvaniaAction);
      $(".contact-mail").addClass("hide");
      $(".disclaimer").addClass("show");
      $(".contact-mail.pennsylvania").removeClass("hide");
    } else {
      $('.option-display.full').removeClass('hide');
      $('.option-display.sports').addClass('hide');
      $('.option-display.games').addClass('hide');
      $('.option-display.not-offered').addClass('hide');
      $('#submit-state').prop('disabled', false);
      $(".contact-mail").addClass("hide");
      $('#states-form').attr('action', greenhouseAction);
      $(".disclaimer").removeClass("show");
    }
  });

// Homepage animations, features section
// Feature one || COMMUNITY BUILDING
  if ($('.feature-one').length) {
    var featOne = gsap.timeline({  
      duration: 1,
      ease: "power2.out",
      delay: 0,
      paused: true,
    });

    featOne
    .from(".feature-graphic.feature-one .world-image", {
        duration: 1,
        ease: "none",
        opacity: 0,
    }, "-=.5")

    const featOneTrigger = document.querySelectorAll('#product-features .feature-one .trigger');
    const observerFeatOne = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          featOne.play();
        }
        // Unobserve trigger
        if (entry.intersectionRatio > 0) {
          observerFeatOne.unobserve(entry.target);
        }
      });
    });
    featOneTrigger.forEach((animation) => {
      observerFeatOne.observe(animation);
    });
  }

  // Feature three || USER EXPERIENCE
  if ($('.feature-three').length) {
    var featThree = gsap.timeline({  
      duration: 1,
      ease: "power2.out",
      delay: 0,
      paused: true,
    });

    featThree
    .from(".feature-graphic.feature-three .vs-image", {
        duration: .6,
        ease: "back",
        y: 120,
        opacity: 0,
        onComplete: function(){
          $(".feature-graphic.feature-three .vs-image").addClass("floating");
        }
    }, "-=.5")

    const featThreeTrigger = document.querySelectorAll('#product-features .feature-three .trigger');
    const observerFeatThree = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          featThree.play();
        }
        // Unobserve trigger
        if (entry.intersectionRatio > 0) {
          observerFeatThree.unobserve(entry.target);
        }
      });
    });
    featThreeTrigger.forEach((animation) => {
      observerFeatThree.observe(animation);
    });
  }

  // Feature four || RISK MANAGEMENT
  if ($('.feature-four').length) {
    var featFour = gsap.timeline({  
      duration: 1,
      ease: "power2.out",
      delay: 0,
      paused: true,
    });

  featFour
    .from(".feature-graphic.feature-four .card-feature", {
        duration: .6,
        ease: "back",
        y: 120,
        opacity: 0,
        onComplete: function(){
          $(".feature-graphic.feature-four .card-feature").addClass("floating");
        }
    }, "-=.5")

    const featFourTrigger = document.querySelectorAll('#product-features .feature-four .trigger');
    const observerFeatFour = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          featFour.play();
        }
        // Unobserve trigger
        if (entry.intersectionRatio > 0) {
          observerFeatFour.unobserve(entry.target);
        }
      });
    });
    featFourTrigger.forEach((animation) => {
      observerFeatFour.observe(animation);
    });
  }


  // Animation the background image for Case Study and Get in Touch blocks
  // When the user hovers on the button, we trigger the animation
  if ($('.animated-background').length) {
    let buttonHover = gsap.timeline({repeat: -1, paused: true});
    buttonHover
    .from("#get-in-touch, #case-study-block", {
      backgroundPosition: "200% 0",
      duration: 25,
      ease: Linear.easeNone
    });

    // Hover event to trigger background image
    $("#get-in-touch .button, #case-study-block .button").on("mouseenter", function() {
      buttonHover.play();
    });
    $("#get-in-touch .button, #case-study-block .button").on("mouseleave", function() {
      buttonHover.pause();
    });
  }

  //Prefooter animation, stagger words
  if ($('#prefooter').length) {
    let prefooterAnimation = gsap.timeline({paused: true});
    prefooterAnimation
    .from("#prefooter p span", {
      duration: .7,
      opacity: 0,
      y: 30,
      stagger: .3,
      ease: "power2.out",
    });

    const prefooterTrigger = document.querySelectorAll('#prefooter p span');
    const observerPrefooter = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          prefooterAnimation.play();
        }
        // Unobserve trigger
        if (entry.intersectionRatio > 0) {
          observerPrefooter.unobserve(entry.target);
        }
      });
    });
    prefooterTrigger.forEach((animation) => {
      observerPrefooter.observe(animation);
    });
  }

  if ($('.watch-area').length) {
    let buttonVideoHover = gsap.timeline({paused: true});
    buttonVideoHover
    .fromTo(".watch-area .video-play", {
      duration: .4,
      ease: "power1.out",
      scale: .2,
      opacity: 0,
      xPercent: -17,
      yPercent: -35
    }, {
      duration: .4,
      scale: 1,
      opacity: 1,
      xPercent: -17,
      yPercent: -115
    })

    // Hover event to trigger video preview
    $(".watch-area .button").on("mouseenter", function() {
      buttonVideoHover.play();
    });
    $(".watch-area .button").on("mouseleave", function() {
      buttonVideoHover.reverse();
    });
  }

  // Hero Case Studies
  if ($('#hero-case-studies').length) {
    let heroCaseStudiesAnimation = gsap.timeline();
    heroCaseStudiesAnimation
    // Show phones
    .fromTo(".animation-graphic .phones .phone-left",{
      opacity: 0,
      duration: 1,
      yPercent: -25
    },{
      opacity: 1,
      yPercent: -32,
    })
    .fromTo(".animation-graphic .phones .phone-right",{
      opacity: 0,
      duration: 1,
      yPercent: -50,
    },{
      opacity: 1,
      yPercent: -59,
    }, "<.2")
    // Move phones
    .fromTo(".animation-graphic .phones .phone-left", {
      xPercent: -70,
      yPercent: -32,
    },
    {
      xPercent: -80,
      yPercent: -40,
    }
    )
    .fromTo(".animation-graphic .phones .phone-right", {
      xPercent: -37,
      yPercent: -59,
    },
    {
      xPercent: -24,
      yPercent: -45,
    }, '<')
    .fromTo(".animation-graphic .ball", {
      opacity: 0,
      yPercent: 15
    },{
      opacity: 1,
      yPercent: 0,
    }, "<.2")
    .fromTo(".animation-graphic .dupr-x-lucra", {
      opacity: 0,
    },{
      opacity: 1,
    }, "<.2");
  }

// Hover on ball (Case Studies)
if ($('#hero-case-studies .animation-graphic .ball').length) {
  let hoverBall = gsap.timeline({paused: true, duration: 1});
  hoverBall.to("#hero-case-studies .animation-graphic .ball", {
    rotate: 55,
    xPercent: 20,
    yPercent: 20,
  }, "-=.4");

  $("#hero-case-studies .animation-graphic .ball").on("mouseenter", function() {
    hoverBall.play();
  });
  $("#hero-case-studies .animation-graphic .ball").on("mouseleave", function() {
    hoverBall.reverse();
  });
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

// Button to mute and unmuted the video
$('#video .volume').on('click', function () {
  if ($('#video .placeholder').prop('muted')) {
    $('#video .placeholder').prop('muted', false);
    $('#video .volume').removeClass('muted');
  } else {
    $('#video .placeholder').prop('muted', true);
    $('#video .volume').addClass('muted');
  }
});

// Videos pre footer
var videos = [
  `<iframe
      id="video-0"
      class="video-iframe"
      width="100%"
      height="300"
      allowscriptaccess="always"
      src="https://www.youtube.com/embed/DjZWyOPQJcU?start=1"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>`,
  `<iframe
      id="video-1"
      class="video-iframe"
      src="//content.jwplatform.com/players/ZppCgNir-YrbGYzGZ.html"
      width="100%"
      height="300"
      allowscriptaccess="always"
      frameborder="0"
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>`,
  `<iframe
      id="video-2"
      class="video-iframe"
      src="https://www.youtube.com/embed/amHTD3bF1Zo"
      width="100%"
      height="300"
      allowscriptaccess="always"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
  ></iframe>`,
  `<iframe
      id="video-3"
      class="video-iframe"
      src="https://www.bloomberg.com/multimedia/api/embed/iframe?id=b2d1e5d1-4198-41d4-a6bf-03d3d7f3d86d"
      width="100%"
      height="300"
      allowscriptaccess="always"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>`,
];

$(function () {
  // Play video pre footer
  $('.playvideo').on('click', function () {
    $(this).next('.video-holder').css('display', 'none');
    $(this).css('display', 'none');
    //As noted in addendum, check for querystring exitence
    var symbol =
      $(this).prev('.video-iframe').attr('src').indexOf('?') > -1 ? '&' : '?';
    //Modify source to autoplay and start video
    $(this)
      .prev('.video-iframe')
      .attr(
        'src',
        $(this).prev('.video-iframe').attr('src') + symbol + 'autoplay=1'
      );
  });

  $('#carouselExampleCaption').on('slide.bs.carousel', function (e) {
    $(`#video-${e.from}`).replaceWith(videos[e.from]);
  });
});

//////////////////////////////////////////////////
////////// About page animation scene ////////////
//////////////////////////////////////////////////
//Init Scrollmagic
var controllerAbout = new ScrollMagic.Controller();

// Pin the intro
var pinIntroSceneAbout = new ScrollMagic.Scene({
  triggerElement: '#hero.hero-about',
  triggerHook: 0,
  duration: 1500,
})
  .setPin('#hero.hero-about')
  // .addIndicators()
  .addTo(controllerAbout);

//Create a scene
var ourScene3 = new ScrollMagic.Scene({
  duration: 3500,
  triggerElement: '#hero.hero-about',
  triggerHook: 0,
  offset: 300,
})
  .setClassToggle('.container-screens.col-one.about', 'move-up')
  // .addIndicators({ name: 'Trigger About Col 1', colorEnd: '#000' })
  .addTo(controllerAbout);

//Create a scene 2
var ourScene4 = new ScrollMagic.Scene({
  duration: 3500,
  triggerElement: '#hero.hero-about',
  triggerHook: 0,
  offset: 300,
})
  .setClassToggle('.container-screens.col-two.about', 'move-down')
  // .addIndicators({ name: 'Trigger About Col 2', colorEnd: '#000' })
  .addTo(controllerAbout);

// Fix navbar when scroll
$(window).scroll(function () {
  var scroll = $(window).scrollTop();
  if (scroll >= 60) {
    $('#header-nav').addClass('fixed');
    $('#about-nav').addClass('fixed');
  } 
  else {
    $('#header-nav').removeClass('fixed');
    $('#about-nav').removeClass('fixed');
  }

  // About Navigation , to trigger active class between sections
  var cutoff = $(window).scrollTop();
  $('.about-body section').each(function () {
      if ($(this).offset().top + $(this).height() > cutoff) {
          // $('.about-body section').removeClass('current');
          // $(this).addClass('current');

          var currSection = $(this).attr('id');

          $('#about-nav a').removeClass('active');
          $('#about-nav a[data-id=' + currSection + ']').addClass('active');
          return false;
      }
  });
});

// Values Slider on About page
if ($('.slider-nav').length) {
  $('.slider-nav').slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    dots: false,
    centerMode: false,
    focusOnSelect: false,
    arrows: true,
    autoplay: false,
    autoplaySpeed: 6000,
    pauseOnHover: false,
    draggable: true,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });
}

// About Team Slider
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

// Team Slider on About page
if ($('.team-slider').length) {
  $('.team-slider').slick({
    centerMode: true,
    centerPadding: '50px',
    slidesToShow: 2,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: false,
    arrows: true,
    draggable: false,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1,
        },
      },
    ],
  });
}

// Add class to de prev and next Team Slider for move position
$('.team-slider').on(
  'beforeChange',
  function (event, { slideCount: count }, currentSlide, nextSlide) {
    let selectors = [nextSlide, nextSlide - count, nextSlide + count]
      .map((n) => `[data-slick-index="${n}"]`)
      .join(', ');
    $('.slick-now').removeClass('slick-now');
    $(selectors).next().addClass('slick-now');
    $('.prev-now').removeClass('prev-now');
    $(selectors).prev().addClass('prev-now');
  }
);

$('[data-slick-index="0"]').addClass('slick-now');
$('[data-slick-index="0"]').prev().addClass('prev-now');

if ($('#info-cards').length) {
  var $slider = $('.slider');
  var $progressBar = $('.progress');
  var $progressBarLabel = $('.slider__label');
  
  $slider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {   
    var calc = ( (nextSlide) / (slick.slideCount-1) ) * 100;
    
    $progressBar
      .css('background-size', calc + '% 100%')
      .attr('aria-valuenow', calc );
    
    $progressBarLabel.text( calc + '% completed' );
  });
  
  $slider.slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    // infinite: false,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: false,
    speed: 1000,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          dots: true
        }
      }
    ]
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