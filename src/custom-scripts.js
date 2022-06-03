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
