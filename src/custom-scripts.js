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

// About page animations
// Only trigger the animation on Tablet and Desktop
if (window.matchMedia('(min-width: 575px)').matches) {
// HERO Section
  if ($('#hero-about').length) {
    let slideElements = gsap.timeline();
    slideElements
    // Show main image and cards
    .from("#hero-about .hero-about-content img",{
      opacity: 0,
      duration: 1,
    })
    .from("#hero-about .hero-about-content h6",{
      opacity: 0,
      duration: .5,
      y: -50
    }, "-=.3")
    .from("#hero-about .hero-about-content h1 span",{
      duration: .6,
      yPercent: 110,
      opacity: 0,
      stagger:  0.06,
      rotationZ: 5,
    }, "-=.6")
  }

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
    .from("#the-team .top-area img",{
      opacity: 0,
      duration: .3,
    })
    .from("#the-team .team-grid-desktop .team-card",{
      opacity: 0,
      duration: .3,
      stagger: .2,
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

// Fix navbar when scroll
$(window).scroll(function () {
  var scroll = $(window).scrollTop();
  if (scroll >= 60) {
    $('#header-nav').addClass('fixed');
    $('#anchors-nav').addClass('fixed');
  } 
  else {
    $('#header-nav').removeClass('fixed');
    $('#anchors-nav').removeClass('fixed');
  }

  // Anchors Navigation , to trigger active class between sections
  var cutoff = $(window).scrollTop();
  $('.with-sticky-anchors section').each(function () {
      if ($(this).offset().top + $(this).height() > cutoff) {
          var currSection = $(this).attr('id');

          $('.anchors-nav a').removeClass('active');
          $('.anchors-nav a[data-id=' + currSection + ']').addClass('active');
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

if ($('.product-page').length) {
  // Tilt effect to Product Cards only on Desktop 
  if (window.matchMedia('(min-width: 575px)').matches) {
    if ($('.product-card').length) {
      $('.product-card').tilt({
        glare: true,
        maxTilt: 3,
        speed: 700,
        transition: true,
        maxGlare: 0.1
      });
    }
  }

  // HERO Product on scroll 
  let heroProduct = gsap.timeline({
    scrollTrigger: {
      trigger: '#hero-product',
      start: '25% 0%',
      end: '100% 40%',
      scrub: 0.5,
      // markers: true,
    }
  })

    // Prevent animation on mobile
    let mediaQueryHeroProduct = gsap.matchMedia();
    mediaQueryHeroProduct.add("(min-width: 991px)", () => {
      heroProduct.fromTo('#hero-product .hero-images .product-card', {
        y: 0,
        opacity: 1,
      },{
        y: -100,
        opacity: 0,
        stagger: {
          amount: 2,
          from: "random"
        }
      }).to('#hero-product .hero-images .hero-phone',{
        y: -100,
        opacity: 0,
      })
    })

  // WHAT MAKES marquee boxs animation 
  let innerBoxBlue = gsap.timeline({
    scrollTrigger: {
      trigger: '#what-makes',
      start: '10% 50%',
      end: '65% 50%',
      scrub: 0.5,
      // markers: true,
    }
  });

  innerBoxBlue.fromTo('#what-makes .outline-boxes .inner-box', {
    y: 100,
    opacity: 0,
  },{
    y: 0,
    opacity: 1,
    stagger: .1
  });

  // KEY PRODUCT marquee boxs animation 
  let innerBoxGreen = gsap.timeline({
    scrollTrigger: {
      trigger: '#key-product',
      start: '10% 50%',
      end: '65% 50%',
      scrub: 0.5,
      // markers: true,
    }
  });

  innerBoxGreen.fromTo('#key-product .outline-boxes .inner-box', {
    y: 100,
    opacity: 0,
  },{
    y: 0,
    opacity: 1,
    stagger: .1
  });

  // LUCRA’S WHITE-LABEL WAGERING TECHNOLOGY section change tabs on scroll
  function createTabAnimation(element, index, startPercentage, endPercentage, stepClass, onLeave, onLeaveBack) {
    return gsap.fromTo(
      element,
      { opacity: 1 },
      {
        opacity: 1,
        scrollTrigger: {
          trigger: "#lucra-technology",
          start: `${startPercentage}% 20%`,
          end: `${endPercentage}% 20%`,
          scrub: 0.5,
          // markers: true,
          onEnter: function () {
            element.addClass("active viewed");
            $(`.screen-tab.${stepClass}`).addClass("active");
          },
          onEnterBack: function () {
            element.addClass("active");
            $(`.screen-tab.${stepClass}`).addClass("active");
          },
          onLeave: function () {
            element.removeClass("active");
            if(onLeave != true){
              $(`.screen-tab.${stepClass}`).removeClass("active");
            } 
          },
          onLeaveBack: function () {
            element.removeClass("active");
            if(onLeaveBack != true){
              $(`.screen-tab.${stepClass}`).removeClass("active");
            }
          },
        },
      }
    );
  }

  // Functions to trigger tabs animation on LUCRA’S WHITE-LABEL WAGERING TECHNOLOGY section
  $(".tab-content-inner.top-left").each(function (index, element) {
    createTabAnimation($(element), index, 0, 15, "first-step", false, true);
  });

  $(".tab-content-inner.top-right").each(function (index, element) {
    createTabAnimation($(element), index, 15, 30, "second-step", false, false);
  });

  $(".tab-content-inner.bottom-left").each(function (index, element) {
    createTabAnimation($(element), index, 30, 45, "third-step", false, false);
  });

  $(".tab-content-inner.bottom-right").each(function (index, element) {
    createTabAnimation($(element), index, 45, 65, "fourth-step", true, false);
  });

  // OUR VALUE PROPOSITION section change accordions on scroll
  function createAccordionAnimation(element, index, startPercentage, endPercentage, stepClass, onLeave, onLeaveBack) {
    return gsap.from(
      element,
      {
        scrollTrigger: {
          trigger: "#our-value-proposition",
          start: `${startPercentage}% 50%`,
          end: `${endPercentage}% 50%`,
          scrub: 0.5,
          // markers: true,
          onEnter: function () {
            element.addClass("active");
            // $(`.apps-accordion.${stepClass}`).addClass("active");
          },
          onEnterBack: function () {
            element.addClass("active");
            // $(`.apps-accordion.${stepClass}`).addClass("active");
          },
          onLeave: function () {
            if(onLeave != true){
              element.removeClass("active");
              // $(`.apps-accordion.${stepClass}`).removeClass("active");
            }
          },
          onLeaveBack: function () {
            if(onLeaveBack != true){
              element.removeClass("active");
            // $(`.apps-accordion.${stepClass}`).removeClass("active");
            }
          },
        },
      }
    );
  }

  // Functions to trigger accordions animation on OUR VALUE PROPOSITION section
  $(".apps-phone.first-step").each(function (index, element) {
    createAccordionAnimation($(element), index, 15, 25, "first-step", false, true);
  });

  $(".apps-phone.second-step").each(function (index, element) {
    createAccordionAnimation($(element), index, 25, 40, "second-step", false, false);
  });

  $(".apps-phone.third-step").each(function (index, element) {
    createAccordionAnimation($(element), index, 40, 50, "third-step", false, false);
  });

  $(".apps-phone.fourth-step").each(function (index, element) {
    createAccordionAnimation($(element), index, 50, 70, "fourth-step", false, false);
  });

  $(".apps-phone.fifth-step").each(function (index, element) {
    createAccordionAnimation($(element), index, 70, 90, "fifth-step", true, false);
  });

  // CLIENT CATEGORIES section animation 
  let clientCategories = gsap.timeline({
    scrollTrigger: {
      trigger: '#client-categories',
      start: '0% 50%',
      end: '35% 50%',
      scrub: 0.5,
      markers: true,
    }
  });

  // Prevent animation on mobile
  let mediaQueryClientCategories = gsap.matchMedia();
  mediaQueryClientCategories.add("(min-width: 991px)", () => {
    clientCategories.fromTo("#client-categories .category-card",{
      scale: .95,
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
      start: '60% 50%',
      end: '100% 50%',
      scrub: 1,
      // markers: true,
    }
  });
  mediaQueryClientCategories.add("(min-width: 991px)", () => {
  clientCategoriesScroll.to("#client-categories .category-card:not(.delay)",{
    y: 50,
    stagger: {
      amount: 1,
      from: "random"
    }
  })
  .to("#client-categories .category-card.delay",{
    y: 70,
    stagger: {
      amount: 1,
      from: "random"
    }
  }, "<");
})


  // RISK AND COMPLIANCE section animation 
  let riskCompliance = gsap.timeline({
    scrollTrigger: {
      trigger: '#risk-and-compliance',
      start: '5% 50%',
      end: '15% 50%',
      scrub: 0.5,
      // markers: true,
    }
  });
  // Prevent animation on mobile
  let mediaQueryRiskCompliance = gsap.matchMedia();
  mediaQueryRiskCompliance.add("(min-width: 991px)", () => {
      riskCompliance.to("#risk-and-compliance .grid-boxs .inner-box",{
        y: 0,
        x: 0,
        rotate: 0,
        duration: .3,
        stagger: {
          amount: 4,
          from: "random"
        }
      });
  });
}
////////////////////////////
////// SOLUTIONS PAGE //////
////////////////////////////

if ($('.solutions-page').length) {
  // PROFESSIONAL SPORTS SDK section change tabs on scroll
  function createTabAnimationProSports(element, index, startPercentage, endPercentage, stepClass, onLeave, onLeaveBack, haveIconStep) {
    return gsap.fromTo(
      element,
      { opacity: 1 },
      {
        opacity: 1,
        scrollTrigger: {
          trigger: "#pro-sports",
          start: `${startPercentage}% 20%`,
          end: `${endPercentage}% 20%`,
          scrub: 0.5,
          // markers: true,
          onEnter: function () {
            element.addClass("active viewed");
            $(`#pro-sports .screen-tab.${stepClass}`).addClass("active");
            if(haveIconStep != false){
              $("#pro-sports .icons-step").addClass("active");
            }
          },
          onEnterBack: function () {
            element.addClass("active");
            $(`#pro-sports .screen-tab.${stepClass}`).addClass("active");
            if(haveIconStep != false){
              $("#pro-sports .icons-step").addClass("active");
            }
          },
          onLeave: function () {
            element.removeClass("active");
            $("#pro-sports .icons-step").removeClass("active");
            if(onLeave != true){
              $(`#pro-sports .screen-tab.${stepClass}`).removeClass("active");
            } 
          },
          onLeaveBack: function () {
            element.removeClass("active");
            $("#pro-sports .icons-step").removeClass("active");
            if(onLeaveBack != true){
              $(`#pro-sports .screen-tab.${stepClass}`).removeClass("active");
            }
          },
        },
      }
    );
  }
  
  // Functions to trigger tabs animation on PROFESSIONAL SPORTS SDK section
  $("#pro-sports .tab-content-inner.first-tab").each(function (index, element) {
    createTabAnimationProSports($(element), index, 0, 25, "first-step", false, true, false);
  });
  
  $("#pro-sports .tab-content-inner.second-tab").each(function (index, element) {
    createTabAnimationProSports($(element), index, 25, 50, "second-step", false, false, true);
  });
  
  $("#pro-sports .tab-content-inner.third-tab").each(function (index, element) {
    createTabAnimationProSports($(element), index, 50, 70, "third-step", true, false, false);
  });
  
  
  // RECREATIONAL GAMES SDK section change tabs on scroll
  function createTabAnimationRecGames(element, index, startPercentage, endPercentage, stepClass, onLeave, onLeaveBack) {
    return gsap.fromTo(
      element,
      { opacity: 1 },
      {
        opacity: 1,
        scrollTrigger: {
          trigger: "#rec-games",
          start: `${startPercentage}% 20%`,
          end: `${endPercentage}% 20%`,
          scrub: 0.5,
          // markers: true,
          onEnter: function () {
            element.addClass("active viewed");
            $(`#rec-games .screen-tab.${stepClass}`).addClass("active");
          },
          onEnterBack: function () {
            element.addClass("active");
            $(`#rec-games .screen-tab.${stepClass}`).addClass("active");
          },
          onLeave: function () {
            element.removeClass("active");
            if(onLeave != true){
              $(`#rec-games .screen-tab.${stepClass}`).removeClass("active");
            } 
          },
          onLeaveBack: function () {
            element.removeClass("active");
            if(onLeaveBack != true){
              $(`#rec-games .screen-tab.${stepClass}`).removeClass("active");
            }
          },
        },
      }
    );
  }
  
  // Functions to trigger tabs animation on RECREATIONAL GAMES SDK section
  $("#rec-games .tab-content-inner.first-tab").each(function (index, element) {
    createTabAnimationRecGames($(element), index, 0, 25, "first-step", false, true);
  });
  
  $("#rec-games .tab-content-inner.second-tab").each(function (index, element) {
    createTabAnimationRecGames($(element), index, 25, 50, "second-step", false, false);
  });
  
  $("#rec-games .tab-content-inner.third-tab").each(function (index, element) {
    createTabAnimationRecGames($(element), index, 50, 70, "third-step", true, false);
  });

  // RISK AND COMPLIANCE section animation 
  let riskCompliance = gsap.timeline({
    scrollTrigger: {
      trigger: '#risk-and-compliance',
      start: '10% 50%',
      end: '20% 50%',
      scrub: 0.5,
      // markers: true,
    }
  });
  // Prevent animation on mobile
  let mediaQueryRiskCompliance = gsap.matchMedia();
  mediaQueryRiskCompliance.add("(min-width: 991px)", () => {
      riskCompliance.to("#risk-and-compliance .grid-boxs .inner-box",{
        y: 0,
        x: 0,
        rotate: 0,
        duration: .3,
        stagger: {
          amount: 4,
          from: "random"
        }
      });
  });

  // TIMELINE section change steps on scroll
  function createTabAnimationTimeLine(element, index, startPercentage, endPercentage, onEnterBack) {
    return gsap.fromTo(
      element,
      { opacity: 1 },
      {
        opacity: 1,
        scrollTrigger: {
          trigger: "#timeline",
          start: `${startPercentage}% 20%`,
          end: `${endPercentage}% 20%`,
          scrub: 0.5,
          // markers: true,
          onEnter: function () {
            element.addClass("active viewed");
          },
          onEnterBack: function () {
            element.addClass("active viewed");
            if(onEnterBack != true){
              element.removeClass("active");
            }
          },
          onLeave: function(){
            element.removeClass("viewed");
          },
          onLeaveBack: function(){
            element.removeClass("viewed");
          }
        },
      }
    );
  }
  
  // Functions to trigger steps animation on TIMELINE section
  $("#timeline .timeline-block.week .timeline-row.row-one").each(function (index, element) {
    createTabAnimationTimeLine($(element), index, 0, 20, true);
  });
  
  $("#timeline .timeline-block.week .timeline-row.row-two").each(function (index, element) {
    createTabAnimationTimeLine($(element), index, 20, 35, false);
  });
  
  $("#timeline .timeline-block.week .timeline-row.row-three").each(function (index, element) {
    createTabAnimationTimeLine($(element), index, 35, 50, false);
  });
    
  $("#timeline .timeline-block.week .timeline-row.row-four").each(function (index, element) {
    createTabAnimationTimeLine($(element), index, 50, 55, false);
  });


  // TIMELINE section change steps on scroll
  function createTabAnimationTimeLine(element, index, startPercentage, endPercentage, onEnterBack) {
    return gsap.fromTo(
      element,
      { opacity: 1 },
      {
        opacity: 1,
        scrollTrigger: {
          trigger: "#timeline",
          start: `${startPercentage}% 20%`,
          end: `${endPercentage}% 20%`,
          scrub: 0.5,
          // markers: true,
          onEnter: function () {
            element.addClass("active viewed");
          },
          onEnterBack: function () {
            element.addClass("active viewed");
            if(onEnterBack != true){
              element.removeClass("active");
            }
          },
          onLeave: function(){
            element.removeClass("viewed");
          },
          onLeaveBack: function(){
            element.removeClass("viewed");
          }
        },
      }
    );
  }
  
  // Functions to trigger steps animation on TIMELINE section
  $("#timeline .timeline-block.month .timeline-row.row-one").each(function (index, element) {
    createTabAnimationTimeLine($(element), index, 0, 30, true);
  });
  
  $("#timeline .timeline-block.month .timeline-row.row-two").each(function (index, element) {
    createTabAnimationTimeLine($(element), index, 30, 50, false);
  });
  
  $("#timeline .timeline-block.month .timeline-row.row-three").each(function (index, element) {
    createTabAnimationTimeLine($(element), index, 50, 70, false);
  });
    
  $("#timeline .timeline-block.month .timeline-row.row-four").each(function (index, element) {
    createTabAnimationTimeLine($(element), index, 70, 75, false);
  });

  const solutionsDashboard = document.querySelectorAll('#dashboard .dashboard-area');
  const observerSolutionsDashboard = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        $("#dashboard .dashboard-area").addClass("animated");
      }
      // Unobserve trigger
      if (entry.intersectionRatio > 0) {
        observerSolutionsDashboard.unobserve(entry.target);
      }
    });
  });
  solutionsDashboard.forEach((animation) => {
    observerSolutionsDashboard.observe(animation);
  });

  // End Solutions Conditional
}

if ($('#particles-dashboard').length) {
  particlesJS("particles-dashboard", {
      particles: {
        number: { value: 1500, density: { enable: true, value_area: 2000 } },
        color: { value: "#0EF169" },
        shape: {
          type: "circle",
          stroke: { width: 0, color: "#000000" },
          polygon: { nb_sides: 3 },
        },
        opacity: {
          value: 1,
          random: true,
          anim: { enable: false, speed: 3, opacity_min: 0.1, sync: false },
        },
        size: {
          value: 1,
          random: true,
          anim: { enable: true, speed: 2, size_min: 0.1, sync: false },
        },
        line_linked: {
          enable: false,
          distance: 50,
          color: "#ffffff",
          opacity: 0.6,
          width: 1,
        },
        move: {
          enable: true,
          speed: 0.7,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: { enable: false, rotateX: 600, rotateY: 1200 },
        },
      },
      retina_detect: true,
  });
}