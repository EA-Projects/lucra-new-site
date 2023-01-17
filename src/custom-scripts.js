////// DISABLE ANIMATIONS ON MOBILE
if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) ||
  $(window).width() < 575
) {
  $('.animate').removeClass('animate'); // to remove transition
}

// estas variables deberían estar dentro de un objeto para poder trackear de varios elementos observados
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
    });
  })(jQuery);

  // Ambassadors University and Games
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

    
    // Form Variables, like Actions to the form
    var greenhouseAction = 'https://boards.greenhouse.io/lucrasports/jobs/4744909004';
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
      $(this).val() == 'AZ' ||
      $(this).val() == 'MT' ||
      $(this).val() == 'AR' ||
      $(this).val() == 'LA' ||
      $(this).val() == 'TN' ||
      $(this).val() == 'SC' ||
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
////////// Homepage page animation scene ////////////
//////////////////////////////////////////////////

//Init Scrollmagic
var controller = new ScrollMagic.Controller();

// Pin the intro
var pinIntroScene = new ScrollMagic.Scene({
  triggerElement: '#hero.hero-homepage',
  triggerHook: 0,
  duration: 1200,
})
  .setPin('#hero.hero-homepage')
  // .addIndicators()
  .addTo(controller);

//Create a scene
var ourScene = new ScrollMagic.Scene({
  duration: 3000,
  triggerElement: '#hero.hero-homepage',
  triggerHook: 0,
  offset: 300,
})
  .setClassToggle('.container-screens.col-one.home', 'move-up')
  // .addIndicators({ name: 'Start home', colorEnd: '#000' })
  .addTo(controller);

//Create a scene 2
var ourScene2 = new ScrollMagic.Scene({
  duration: 3000,
  triggerElement: '#hero.hero-homepage',
  triggerHook: 0,
  offset: 300,
})
  .setClassToggle('.container-screens.col-two.home', 'move-down')
  // .addIndicators()
  .addTo(controller);

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
  } else {
    $('#header-nav').removeClass('fixed');
  }
});

// Values Slider on About page
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
  draggable: false,
  responsive: [
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
});

// Team Slider on About page
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

// Check when slider is visible
$(document).ready(function () {
  var inner = $('#slider-app');
  var elementPosTop = inner.position().top;
  var viewportHeight = $(window).height();
  $(window).on('scroll', function () {
    var scrollPos = $(window).scrollTop();
    var elementFromTop = elementPosTop - scrollPos;

    if (elementFromTop > 0 && elementFromTop < elementPosTop + viewportHeight) {
      // $('#carouselExampleIndicators').attr('data-interval', '100');
      //console.log('visible');
    } else {
      //console.log('no visible');
    }
  });
});
