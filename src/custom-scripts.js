$(document).ready(function () {
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

    if (window.location.href.includes("product")) {
      $("#navigation").addClass("is-transparent");
    } else {
      $("#navigation").removeClass("is-transparent");
    }

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
          slidesToShow: 1,
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

  // End of document ready
});

// Fix navbar when scroll
$(window).scroll(function () {
  var scroll = $(window).scrollTop();
  if (scroll >= 60) {
    $('#header-nav').addClass('fixed');
    $('#navigation').addClass('fixed');
    $('#anchors-nav').addClass('fixed');
  } 
  else {
    $('#header-nav').removeClass('fixed');
    $('#navigation').removeClass('fixed');
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

window.addEventListener('load', function () {
  (function ($) {
  })(jQuery);

  // Hero Case Studies
  if ($('#hero-case-studies.dpr').length) {
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
    }
  })

    // Prevent animation on mobile
    let mediaQueryHeroProduct = gsap.matchMedia();
    mediaQueryHeroProduct.add("(min-width: 991px)", () => {
      heroProduct.fromTo('#hero-product .hero-images .hero-screen:not(.center-images)', {
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


$(".tab-content-inner").on("click", function() {
  var tabClass = $(this).attr("class").split(" ")[1]; // Get class of steps

  console.log(tabClass);

  // Realizar la animación correspondiente al bloque clicado
  switch (tabClass) {
    case "top-left":
      $('html, body').animate({
        scrollTop: $("#lucra-technology").offset().top + (window.innerHeight) * 0.30
      }, 100);
      break;

    case "top-right":
      $('html, body').animate({
        scrollTop: $("#lucra-technology").offset().top + (window.innerHeight) * 0.50
      }, 100);
      break;

    case "bottom-left":
      $('html, body').animate({
        scrollTop: $("#lucra-technology").offset().top + (window.innerHeight) * 1.1
      }, 100);
      break;

    case "bottom-right":
      $('html, body').animate({
        scrollTop: $("#lucra-technology").offset().top + (window.innerHeight) * 1.8
      }, 100);
      break;
  }
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


  // RISK AND COMPLIANCE section animation 
  let riskCompliance = gsap.timeline({
    scrollTrigger: {
      trigger: '#risk-and-compliance',
      start: '5% 50%',
      end: '15% 50%',
      scrub: 0.5,
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

  function showTab(index) {
    const target = tabTexts.eq(index).data('tab');
    const nextTab = $('#' + target);

    // Si ya está activo, no hacer nada
    if (nextTab.hasClass('active')) return;

    // Actualizar clases activas en los botones
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

            // Preparar nuevo tab
            gsap.set(nextTab.find('.inner-tab-content img'), { opacity: 0 });
            nextTab.addClass('active');

            gsap.fromTo(nextTab, { opacity: 0, y: -20 }, {
              duration: 0.2,
              opacity: 1,
              y: 0,
              onComplete() {
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
};

////////////////////////////
///// DUPR CASE STUDY //////
////////////////////////////
if ($('.is-dupr').length) {

// Hero Animations
let heroAnimations = gsap.timeline({});

heroAnimations.fromTo('.logo-image', {
  opacity: 0,
}, {
  opacity: 1,
  duration: 0.5,
  top: '14%',
  delay: 0.2,
  ease: 'power2.out'
});
heroAnimations.fromTo('.ball', {
  opacity: 0,
}, {
  opacity: 1,
  bottom: -10,
  duration: 0.4,
  ease: 'power2.out'
});

  function createTabAnimation(element, index, startPercentage, endPercentage, stepClass, onLeave, onLeaveBack) {
    var video =  $(`#lucra-technology .screen-tab video`);
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
          onEnter: function () {
            element.addClass("active viewed");
            $(`.screen-tab.${stepClass}`).addClass("active");
            video.trigger('play'); // Play video on entering the section
          },
          onEnterBack: function () {
            element.addClass("active");
            video.trigger('play'); // Play video on entering the section
            $(`.screen-tab.${stepClass}`).addClass("active");
          },
          onLeave: function () {
            element.removeClass("active");
            video.trigger('pause'); // Play video on entering the section
            if (onLeave != true) {
              $(`.screen-tab.${stepClass}`).removeClass("active");
            }
          },
          onLeaveBack: function () {
            element.removeClass("active");
            video.trigger('pause'); // Play video on entering the section
            if (onLeaveBack != true) {
              $(`.screen-tab.${stepClass}`).removeClass("active");
            }
          },
        },
      }
    );
  }
 
  $(".tab-content-inner.top-left").each(function (index, element) {
    createTabAnimation($(element), index, 0, 20, "first-step", false, true);
  });
  
  $(".tab-content-inner.top-right").each(function (index, element) {
    createTabAnimation($(element), index, 20, 35, "second-step", false, false);
  });
  
  $(".tab-content-inner.mid-right").each(function (index, element) {
    createTabAnimation($(element), index, 35, 50, "third-step", false, false);
  });
  
  $(".tab-content-inner.bottom-right").each(function (index, element) {
    createTabAnimation($(element), index, 50, 65, "fourth-step", true, false);
  });
  
  $(".tab-content-inner").on("click", function () {
    var tabClass = $(this).attr("class").split(" ")[1]; // Get class of steps
    console.log(tabClass);
    // Realizar la animación correspondiente al bloque clicado
    switch (tabClass) {
     
      case "top-right":
        $('html, body').animate({
          scrollTop: $("#lucra-technology").offset().top + (window.innerHeight) * 0.70
        }, 100);
        break;
  
      case "mid-right":
        $('html, body').animate({
          scrollTop: $("#lucra-technology").offset().top + (window.innerHeight) * 1.1
        }, 100);
        break;
  
      case "bottom-right":
        $('html, body').animate({
          scrollTop: $("#lucra-technology").offset().top + (window.innerHeight) * 1.8
        }, 100);
        break;
    }

  });
  

// Initialize Phones Slide
$('.phones-slider').slick({
  centerMode: true,
  centerPadding: '25vh',
  slidesToShow: 3,
  draggable: false,
  initialSlide: 2,
  swipe: false,
  autoplay: true,
  autoplaySpeed: 2000,
  pauseOnHover: false,
  responsive: [
    {
      breakpoint: 991,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '0px',
        slidesToShow: 3
      }
    },
    {
      breakpoint: 575,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 1,
        draggable: true,
        swipe: true
      }
    }
  ]
});

let imageAnimation = gsap.timeline({
  scrollTrigger: {
    trigger: '#integration',
    start: 'top-=20vh bottom',
    end: '65% 50%',
    scrub: 0.5,
  }
});

imageAnimation.fromTo('#integration .outlined.first', {
  x: '50%',
},{
  x: '-50%',
  stagger: 0.1
});

// About Section Box Items
let aboutItemsAnimation = gsap.timeline({
  scrollTrigger: {
    trigger: '#about',
    start: '10% 50%',
    end: '65% 50%',
    scrub: 0.5,
    once: true,
  }
});

const aboutItems = document.querySelectorAll('#about .items-wrapper .about-item');

aboutItemsAnimation.fromTo(
  aboutItems,
  {
    y: 100,
    opacity: 0,
  },
  {
    y: 0,
    opacity: 1,
    stagger: 0.1,
  }
);
}

////////////////////////////
/// TOUCHTUNES CASE STUDY ///
////////////////////////////
if ($('.is-touchtunes').length) {
// Hero Animations
let heroAnimations = gsap.timeline({});

heroAnimations.fromTo('.logo-image', {
  opacity: 0,
}, {
  opacity: 1,
  top: '12%',
  duration: 1,
  delay: 0.2,
  ease: 'power2.out'
});

let phoneAnimations = gsap.timeline({});

phoneAnimations
  .fromTo('.right-phone-wrapper', {
    opacity: 0,
    y: 50
  }, {
    opacity: 1,
    y: 0,
    duration: 0.66,
    ease: 'power2.out'
  })
  .fromTo('.middle-phone-wrapper', {
    opacity: 0,
    x: 50
  }, {
    opacity: 1,
    x: 0,
    duration: 0.66,
    ease: 'power2.out'
  }, "-=0.33") 
  .fromTo('.left-phone-wrapper', {
    opacity: 0,
    x: 50
  }, {
    opacity: 1,
    x: 0,
    duration: 0.66,
    ease: 'power2.out'
  }, "-=0.33"); 

  function createTabAnimation(element, index, startPercentage, endPercentage, stepClass, onLeave, onLeaveBack) {
    var video =  $(`#lucra-technology .screen-tab video`);
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
          onEnter: function () {
            element.addClass("active viewed");
            video.trigger('play'); // Play video on entering the section
            $(`.screen-tab.${stepClass}`).addClass("active");
          },
          onEnterBack: function () {
            element.addClass("active");
            video.trigger('play'); // Play video on entering the section
            $(`.screen-tab.${stepClass}`).addClass("active");
          },
          onLeave: function () {
            element.removeClass("active");
            video.trigger('pause'); // Play video on entering the section
            if (onLeave != true) {
              $(`.screen-tab.${stepClass}`).removeClass("active");
            }
          },
          onLeaveBack: function () {
            element.removeClass("active");
            video.trigger('pause'); // Play video on entering the section
            if (onLeaveBack != true) {
              $(`.screen-tab.${stepClass}`).removeClass("active");
            }
          },
        },
      }
    );
  }
  
 
  $(".tab-content-inner.top-left").each(function (index, element) {
    createTabAnimation($(element), index, 0, 20, "first-step", false, true);
  });
  
  $(".tab-content-inner.top-right").each(function (index, element) {
    createTabAnimation($(element), index, 20, 35, "second-step", false, false);
  });
  
  $(".tab-content-inner.mid-right").each(function (index, element) {
    createTabAnimation($(element), index, 35, 50, "third-step", false, false);
  });
  
  $(".tab-content-inner.bottom-right").each(function (index, element) {
    createTabAnimation($(element), index, 50, 65, "fourth-step", true, false);
  });
  
  $(".tab-content-inner").on("click", function () {
    var tabClass = $(this).attr("class").split(" ")[1]; // Get class of steps
    console.log(tabClass);
  });
  
  $(".tab-content-inner").on("click", function() {
    var tabClass = $(this).attr("class").split(" ")[1]; // Get class of steps
  
    console.log(tabClass);
   
    // Realizar la animación correspondiente al bloque clicado
    switch (tabClass) {
     
      case "top-right":
        $('html, body').animate({
          scrollTop: $("#lucra-technology").offset().top + (window.innerHeight) * 0.70
        }, 100);
        break;
  
      case "mid-right":
        $('html, body').animate({
          scrollTop: $("#lucra-technology").offset().top + (window.innerHeight) * 1.1
        }, 100);
        break;
  
      case "bottom-right":
        $('html, body').animate({
          scrollTop: $("#lucra-technology").offset().top + (window.innerHeight) * 1.8
        }, 100);
        break;
    }
  });
// Initialize Phones Slide
$('.phones-slider').slick({
  centerMode: true,
  centerPadding: '25vh',
  slidesToShow: 3,
  draggable: false,
  initialSlide: 0,
  swipe: false,
  autoplay: true,
  autoplaySpeed: 2000,
  pauseOnHover: false,
  responsive: [
    {
      breakpoint: 991,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '0px',
        slidesToShow: 3
      }
    },
    {
      breakpoint: 575,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 1,
        draggable: true,
        swipe: true
      }
    }
  ]
});

let imageAnimation = gsap.timeline({
  scrollTrigger: {
    trigger: '#integration',
    start: 'top-=20vh bottom',
    end: '65% 50%',
    scrub: 0.5,
  }
});

imageAnimation.fromTo('#integration .outlined.first', {
  x: '50%',
},{
  x: '-50%',
  stagger: 0.1
});

// About Section Box Items
let aboutItemsAnimation = gsap.timeline({
  scrollTrigger: {
    trigger: '#about',
    start: '10% 50%',
    end: '65% 50%',
    scrub: 0.5,
    once: true,
  }
});

const aboutItems = document.querySelectorAll('#about .items-wrapper .about-item');

aboutItemsAnimation.fromTo(
  aboutItems,
  {
    y: 100,
    opacity: 0,
  },
  {
    y: 0,
    opacity: 1,
    stagger: 0.1,
  }
);

  // Lucra Tech Tabs section animation 
  let lucraTech = gsap.timeline({
    scrollTrigger: {
      trigger: '#lucra-technology',
      start: '15% 50%',
      end: '15% 50%',
      scrub: 0.2,
    }
  });
  // Prevent animation on mobile
  let mediaQueryRiskCompliance = gsap.matchMedia();
  mediaQueryRiskCompliance.add("(min-width: 991px)", () => {
      lucraTech.to("#lucra-technology .grid-boxs .inner-box",{
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
/// TENNISONE CASE STUDY ///
////////////////////////////
if ($('.is-tennisone').length) {
// Hero Animations
let heroAnimations = gsap.timeline({});

heroAnimations.fromTo('.logo-image', {
  opacity: 0,
}, {
  opacity: 1,
  top: '12%',
  duration: 1,
  delay: 0.2,
  ease: 'power2.out'
});

  function createTabAnimation(element, index, startPercentage, endPercentage, stepClass, onLeave, onLeaveBack) {
    var video =  $(`#lucra-technology .screen-tab video`);
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
          onEnter: function () {
            element.addClass("active viewed");
            video.trigger('play'); // Play video on entering the section
            $(`.screen-tab.${stepClass}`).addClass("active");
          },
          onEnterBack: function () {
            element.addClass("active");
            video.trigger('play'); // Play video on entering the section
            $(`.screen-tab.${stepClass}`).addClass("active");
          },
          onLeave: function () {
            element.removeClass("active");
            video.trigger('pause'); // Play video on entering the section
            if (onLeave != true) {
              $(`.screen-tab.${stepClass}`).removeClass("active");
            }
          },
          onLeaveBack: function () {
            element.removeClass("active");
            video.trigger('pause'); // Play video on entering the section
            if (onLeaveBack != true) {
              $(`.screen-tab.${stepClass}`).removeClass("active");
            }
          },
        },
      }
    );
  }
  
 
  $(".tab-content-inner.top-left").each(function (index, element) {
    createTabAnimation($(element), index, 0, 20, "first-step", false, true);
  });
  
  $(".tab-content-inner.top-right").each(function (index, element) {
    createTabAnimation($(element), index, 20, 35, "second-step", false, false);
  });
  
  $(".tab-content-inner.mid-right").each(function (index, element) {
    createTabAnimation($(element), index, 35, 50, "third-step", false, false);
  });
  
  $(".tab-content-inner.bottom-right").each(function (index, element) {
    createTabAnimation($(element), index, 50, 65, "fourth-step", true, false);
  });
  
  $(".tab-content-inner").on("click", function () {
    var tabClass = $(this).attr("class").split(" ")[1]; // Get class of steps
    console.log(tabClass);
  });
  
  $(".tab-content-inner").on("click", function() {
    var tabClass = $(this).attr("class").split(" ")[1]; // Get class of steps
  
    console.log(tabClass);
   
    // Realizar la animación correspondiente al bloque clicado
    switch (tabClass) {
     
      case "top-right":
        $('html, body').animate({
          scrollTop: $("#lucra-technology").offset().top + (window.innerHeight) * 0.70
        }, 100);
        break;
  
      case "mid-right":
        $('html, body').animate({
          scrollTop: $("#lucra-technology").offset().top + (window.innerHeight) * 1.1
        }, 100);
        break;
  
      case "bottom-right":
        $('html, body').animate({
          scrollTop: $("#lucra-technology").offset().top + (window.innerHeight) * 1.8
        }, 100);
        break;
    }
  });
// Initialize Phones Slide
$('.phones-slider').slick({
  centerMode: true,
  centerPadding: '25vh',
  slidesToShow: 3,
  draggable: false,
  initialSlide: 2,
  swipe: false,
  autoplay: true,
  autoplaySpeed: 2000,
  pauseOnHover: false,
  responsive: [
    {
      breakpoint: 991,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '0px',
        slidesToShow: 3
      }
    },
    {
      breakpoint: 575,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 1,
        draggable: true,
        swipe: true
      }
    }
  ]
});

let imageAnimation = gsap.timeline({
  scrollTrigger: {
    trigger: '#integration',
    start: 'top-=20vh bottom',
    end: '65% 50%',
    scrub: 0.5,
  }
});

imageAnimation.fromTo('#integration .outlined.first', {
  x: '50%',
},{
  x: '-50%',
  stagger: 0.1
});

// About Section Box Items
let aboutItemsAnimation = gsap.timeline({
  scrollTrigger: {
    trigger: '#about',
    start: '10% 50%',
    end: '65% 50%',
    scrub: 0.5,
    once: true,
  }
});

const aboutItems = document.querySelectorAll('#about .items-wrapper .about-item');

aboutItemsAnimation.fromTo(
  aboutItems,
  {
    y: 100,
    opacity: 0,
  },
  {
    y: 0,
    opacity: 1,
    stagger: 0.1,
  }
);

}

////////////////////////////
//////// PRESS PAGE ////////
////////////////////////////
if ($('.press-page').length) { 
  
  if (window.matchMedia('(min-width: 575px)').matches) {
      const releaseItems = document.querySelectorAll('#press-releases .release:not(.is-first)');

      releaseItems.forEach((release, index) => {
        // Create a timeline for each release item
        let riskCompliance = gsap.timeline({
          scrollTrigger: {
            trigger: release,
            start: 'top bottom',
            end: '50% 80%',
            scrub: 0.5,
            once: true, 
          }
        });
      
        // Prevent animation on mobile
        let mediaQueryRiskCompliance = gsap.matchMedia();
        mediaQueryRiskCompliance.add("(min-width: 991px)", () => {
          riskCompliance.from(release, {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0,
          });
        });
      });

    }
}

///////////////////////////////////////
////// DAVE & BUSTERS CASE STUDY //////
///////////////////////////////////////


if ($('.is-dave-and-busters').length) {
  let daveAnimations = gsap.timeline({});
  daveAnimations.fromTo('.dave-logo', {
    opacity: 0,
  }, {
    opacity: 1,
    top: '12%',
    duration: 1,
    delay: 0.2,
    ease: 'power2.out'
  });
  

  ['.first-image', '.second-image', '.third-image', '.fourth-image'].forEach((image, index) => {
    gsap.from(image, {
      opacity: 0,
      y: 10, // Adjusting y position based on index
      duration: 1,
      ease: "power2.out",
      delay: index * 0.2 // Staggering the delay by 0.2s * index
    });
  });
}


////////////////////////////
////// SOLUTIONS PAGE //////
////////////////////////////


if ($('.solutions-page').length) {
  //Why Lucra Animation
  let whyLucra = gsap.timeline ({})

  whyLucra.from('.lucra-holder', {
    opacity: 0,
    y: -10,
    duration: 0.8,
    delay: 0.2,
    ease: "power2.out"
  });
  whyLucra.from('.graph-wrapper', {
    opacity: 0,
    duration: 1,
    delay: 0,
    ease: "power2.out"
  });
  gsap.from('.bottom-wrapper .image-wrapper', {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.2,
    delay: 1.2,
    ease: "power2.out"
  });
  gsap.from('.bottom-wrapper-mobile .image-wrapper', {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.2,
    delay: 1.2,
    ease: "power2.out"
  });

//Circles Animation 
  const circles = document.querySelectorAll('.circle-flex .circle');
  circles.forEach((circle, index) => {
    gsap.from(circle, {
      opacity: 0,
      duration: 0.2,
      delay: 0.3 * index + 0.2, // Adding 0.2 per circle
      ease: "power2.out"
    });
  });
  
  // PROFESSIONAL SPORTS SDK section change tabs on scroll
  function createTabAnimationProSports(element, index, startPercentage, endPercentage, stepClass, onLeave, onLeaveBack, haveIconStep) {
    var video =  $(`#pro-sports .screen-tab.${stepClass} video`);
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
          onEnter: function () {
            element.addClass("active viewed");
            $(`#pro-sports .screen-tab.${stepClass}`).addClass("active");
            // Play the video if the container has the class "active".
            if (element.hasClass("active")) {
              video.trigger('play');
            }
          },
          onEnterBack: function () {
            element.addClass("active");
            $(`#pro-sports .screen-tab.${stepClass}`).addClass("active");
            // Play the video if the container has the class "active".
            if (element.hasClass("active")) {
              video.trigger('play');
            }
          },
          onLeave: function () {
            element.removeClass("active");
            if(onLeave != true){
              $(`#pro-sports .screen-tab.${stepClass}`).removeClass("active");
              // Play the video if the container has the class "active".
              if (!element.hasClass("active")) {
                video.trigger('pause');
              }
            } 
          },
          onLeaveBack: function () {
            element.removeClass("active");
            if(onLeaveBack != true){
              $(`#pro-sports .screen-tab.${stepClass}`).removeClass("active");
              // Play the video if the container has the class "active".
              if (!element.hasClass("active")) {
                video.trigger('pause');
              }
            }
          },
        },
      }
    );
  }
  
  // Functions to trigger tabs animation on PROFESSIONAL SPORTS SDK section
  $("#pro-sports .tab-content-inner.first-tab").each(function (index, element) {
    createTabAnimationProSports($(element), index, 0, 50, "first-step", false, true, false);
  });
  
  $("#pro-sports .tab-content-inner.second-tab").each(function (index, element) {
    createTabAnimationProSports($(element), index, 50, 70, "second-step", true, false, false);
  });
  
  // $("#pro-sports .tab-content-inner.third-tab").each(function (index, element) {
  //   createTabAnimationProSports($(element), index, 50, 70, "third-step", true, false, false);
  // });
  
  
  // RECREATIONAL GAMES SDK section change tabs on scroll
  function createTabAnimationRecGames(element, index, startPercentage, endPercentage, stepClass, onLeave, onLeaveBack) {
    var video =  $(`#rec-games .screen-tab.${stepClass} video`);

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
            // Play the video if the container has the class "active".
            if (element.hasClass("active")) {
              video.trigger('play');
            }
          },
          onEnterBack: function () {
            element.addClass("active");
            $(`#rec-games .screen-tab.${stepClass}`).addClass("active");
            // Play the video if the container has the class "active".
            if (element.hasClass("active")) {
              video.trigger('play');
            }
          },
          onLeave: function () {
            element.removeClass("active");
            if(onLeave != true){
              $(`#rec-games .screen-tab.${stepClass}`).removeClass("active");
              // Play the video if the container has the class "active".
              if (!element.hasClass("active")) {
                  video.trigger('pause');
              }
            } 
          },
          onLeaveBack: function () {
            element.removeClass("active");
            if(onLeaveBack != true){
              $(`#rec-games .screen-tab.${stepClass}`).removeClass("active");
              // Play the video if the container has the class "active".
              if (!element.hasClass("active")) {
                  video.trigger('pause');
              }
            }
          },
        },
      }
    );
  }
  
  // Functions to trigger tabs animation on RECREATIONAL GAMES SDK section
  $("#rec-games .tab-content-inner.first-tab").each(function (index, element) {
    createTabAnimationRecGames($(element), index, 0, 50, "first-step", false, true);
  });
  
  $("#rec-games .tab-content-inner.second-tab").each(function (index, element) {
    createTabAnimationRecGames($(element), index, 50, 70, "second-step", true, false);
  });
  
  // $("#rec-games .tab-content-inner.third-tab").each(function (index, element) {
  //   createTabAnimationRecGames($(element), index, 50, 70, "third-step", true, false);
  // });

  // RISK AND COMPLIANCE section animation 
  let riskCompliance = gsap.timeline({
    scrollTrigger: {
      trigger: '#risk-and-compliance',
      start: '10% 50%',
      end: '20% 50%',
      scrub: 0.5,
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
    createTabAnimationTimeLine($(element), index, 0, 0, true);
  });
  
  $("#timeline .timeline-block.week .timeline-row.row-two").each(function (index, element) {
    createTabAnimationTimeLine($(element), index, 30, 30, false);
  });
  
  $("#timeline .timeline-block.week .timeline-row.row-three").each(function (index, element) {
    createTabAnimationTimeLine($(element), index, 45, 45, false);
  });
    
  $("#timeline .timeline-block.week .timeline-row.row-four").each(function (index, element) {
    createTabAnimationTimeLine($(element), index, 55, 55, false);
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
    createTabAnimationTimeLine($(element), index, 0, 10, true);
  });
  
  $("#timeline .timeline-block.month .timeline-row.row-two").each(function (index, element) {
    createTabAnimationTimeLine($(element), index, 40, 50, false);
  });
  
  $("#timeline .timeline-block.month .timeline-row.row-three").each(function (index, element) {
    createTabAnimationTimeLine($(element), index, 50, 60, false);
  });
    
  $("#timeline .timeline-block.month .timeline-row.row-four").each(function (index, element) {
    createTabAnimationTimeLine($(element), index, 60, 60, false);
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

// Clickable solution tabs
const proSportsContainer = document.getElementById('pro-sports');
const recGamesContainer = document.getElementById('rec-games');

if (proSportsContainer) {
  const proSportsTabContentInner = proSportsContainer.querySelectorAll('.tab-content-inner');

  proSportsTabContentInner.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      proSportsTabContentInner.forEach((tab) => {
        tab.classList.remove('active');
      });

      tab.classList.add('active');

      const proSportsScreenTabs = proSportsContainer.querySelectorAll('.screen-tab');
      proSportsScreenTabs.forEach((screenTab) => {
        screenTab.classList.remove('active');
        const video = screenTab.querySelector('video');
        if (video) {
          video.pause();
        }
      });

      const selectedProSportsScreenTab = proSportsContainer.querySelector(`.screen-tab:nth-child(${index + 1})`);
      if (selectedProSportsScreenTab) {
        selectedProSportsScreenTab.classList.add('active');
        const video = selectedProSportsScreenTab.querySelector('video');
        if (video) {
          video.play();
        }
      }
    });
  });
}

if (recGamesContainer) {
  const recGamesTabContentInner = recGamesContainer.querySelectorAll('.tab-content-inner');

  recGamesTabContentInner.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      recGamesTabContentInner.forEach((tab) => {
        tab.classList.remove('active');
      });

      tab.classList.add('active');

      const recGamesScreenTabs = recGamesContainer.querySelectorAll('.screen-tab');

      recGamesScreenTabs.forEach((screenTab) => {
        screenTab.classList.remove('active');
        const video = screenTab.querySelector('video');
        if (video) {
          video.pause();
        }
      });

      const selectedRecGamesScreenTab = recGamesContainer.querySelector(`.screen-tab:nth-child(${index + 1})`);
      if (selectedRecGamesScreenTab) {
        selectedRecGamesScreenTab.classList.add('active');
        const video = selectedRecGamesScreenTab.querySelector('video');
        if (video) {
          video.play();
        }
      }
    });
  });
}

