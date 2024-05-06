const load = () => {
  // 在背景圖片載入完成後執行的函數
  function backgroundLoaded() {
    // 在這裡可以執行進入頁面的相關程式碼

    document.body.style.opacity = 1;
  }

  // 取得所有的 .scene 元素
  const scenes = document.querySelectorAll('.scene *:not(#process-window .mask .forest)');

  // 計數載入完成的背景圖片數量
  let loadedBackgroundsCount = 0;

  scenes.forEach(scene => {
    const backgroundImage = new Image();
    const backgroundStyle = window.getComputedStyle(scene).backgroundImage;

    // 檢查是否為背景圖片
    if (backgroundStyle && backgroundStyle !== 'none' && !backgroundStyle.includes('linear-gradient')) {
      backgroundImage.src = backgroundStyle.replace('url("', '').replace('")', '');


      // 為背景圖片設定 'load' 事件監聽器
      backgroundImage.addEventListener('load', () => {
        loadedBackgroundsCount++;

        // 檢查是否所有背景圖片都已經載入完成
        if (loadedBackgroundsCount === scenes.length - 5) {
          // 所有背景圖片都已經載入完成，執行相應的處理程式碼
          backgroundLoaded();
        }
      });
    }
  });
}

load();


const swiper = new Swiper('.swiper', {
  centeredSlides: true,
  spaceBetween: 0,
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false
  },
  breakpoints: {
    301: {
      slidesPerView: 1.5
    },
    451: {
      slidesPerView: 2
    },
    601: {
      slidesPerView: 3
    },
    821: {
      slidesPerView: 4
    },
    1025: {
      slidesPerView: 5
    }
  }
});

let previousWidth = window.innerWidth;

const resizeAbout = () => {
  $('.about').css('--height', `${$('.about .border__line').height()}px`);

  const handScale = ( innerWidth *.55 ) / ( 8192 / 15 );

  $('#banner-human').css('--scale', `${handScale}`);
  $('#banner-cat').css('--scale', `${handScale *.5}`);

  $('.texture h2.name').css('--posTop', `${$('header .logo__box').innerHeight()}px`);

}

resizeAbout();


$(window).resize(() => {
  if (window.innerWidth !== previousWidth) {
    previousWidth = window.innerWidth;
    
    location.reload();
    window.scrollTo(0, 0);
    init();
    load();
  }
  resizeAbout();
});


const init = () => {




const checkNav = () => {
  const navBtn = $('header .nav-btn');
  const navMain = $('header .nav-main');

  navBtn.on('click', (e) => {
    e.stopPropagation();
    if (!navBtn.hasClass('active')) {
      navMain.fadeIn(800);
      navBtn.addClass('active');
    } else {
      navMain.fadeOut(400);
      navBtn.removeClass('active');
    }
  });

  $('body').on('click', (e) => {
    const isNavMainClicked = $(e.target).closest('.nav-main').length > 0;
  
    if (!isNavMainClicked) {
      navMain.fadeOut(400);
      navBtn.removeClass('active');
    }
  })
}

checkNav();

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({
  toggleActions: 'restart pause resume none',
  // markers: true
});

const toggleAnimationPlayState = (elements, state) => {
  elements.forEach(element => {
    element.css('animation-play-state', state);
  });
};

const bannerAnimation = [
  $(".banner .scene .cloud"),
  $("#banner-light"),
  $(".banner .hand")
];

ScrollTrigger.create({
  trigger: ".panel:nth-of-type(1)",
  start: "top top",
  end: "bottom top",
  onEnter: () => {
    toggleAnimationPlayState(bannerAnimation, "running");
  },
  onEnterBack: () => {
    toggleAnimationPlayState(bannerAnimation, "running");
  },
  onLeave: () => {
    toggleAnimationPlayState(bannerAnimation, "paused");
  },
});

const aboutAnimation = [
  $(".about .title__box h2"),
  $(".about .title__box h2 span:last-of-type"),
  $(".butterfly"),
  $("#about-cloud")
];

ScrollTrigger.create({
  trigger: ".panel:nth-of-type(2)",
  start: "top bottom",
  end: "bottom top",
  onEnter: () => {
    toggleAnimationPlayState(aboutAnimation, "running");
  },
  onEnterBack: () => {
    toggleAnimationPlayState(aboutAnimation, "running");
  },
  onLeave: () => {
    toggleAnimationPlayState(aboutAnimation, "paused");
  },
  onLeaveBack: () => {
    toggleAnimationPlayState(aboutAnimation, "paused");
  },
});

const serviceAnimation = [
  $(".group__box .title__box h2"),
  $(".group__box .title__box h2 span:last-of-type"),
  $(".group__box .cloud"),
  $("#service-light"),
  $("#process-pointLight"),
  $(".process .container ul"),
  $(".process .container ul .shine")
];

ScrollTrigger.create({
  trigger: ".panel:nth-of-type(3)",
  start: "top bottom",
  end: "bottom top",
  onEnter: () => {
    toggleAnimationPlayState(serviceAnimation, "running");
  },
  onEnterBack: () => {
    toggleAnimationPlayState(serviceAnimation, "running");
  },
  onLeave: () => {
    toggleAnimationPlayState(serviceAnimation, "paused");
  },
  onLeaveBack: () => {
    toggleAnimationPlayState(serviceAnimation, "paused");
  },
});

const talkAnimation = [
  $(".talk .title__box h2"),
  $(".talk .title__box h2 span:last-of-type"),
  $(".talk .container"),
  $(".talk .seabed")
];


ScrollTrigger.create({
  trigger: ".panel:nth-of-type(4)",
  start: "top bottom",
  end: "bottom top",
  onEnter: () => {
    toggleAnimationPlayState(talkAnimation, "running");
  },
  onEnterBack: () => {
    toggleAnimationPlayState(talkAnimation, "running");
  },
  onLeave: () => {
    toggleAnimationPlayState(talkAnimation, "paused");
  },
  onLeaveBack: () => {
    toggleAnimationPlayState(talkAnimation, "paused");
  },
});

const mm = gsap.matchMedia();


const tl_1 = gsap.timeline();

ScrollTrigger.create({
    animation: tl_1,
    trigger: ".banner",
    start: "top top",
    end: "+=" + document.querySelector('.panel').offsetHeight * .5,
    scrub: 1,
});

tl_1.to('#banner-castle', { yPercent: -20 })
      .from('#banner-grove-2', { yPercent: 10, backgroundSize: "110% 100%" }, 0)
      .from('#banner-grove-1', { yPercent: 10, backgroundSize: "110% 100%" })
      .from('#banner-tree-1', { yPercent: 20 }, 0.5)
      .from('#banner-tree-2', { yPercent: 15 }, 0)
      .from('#banner-tree-3', { yPercent: 30 }, 0.75)
      .from('#banner-tree-4', { yPercent: 50 }, 0.5)
      .to('#banner-moon', { yPercent: -40 }, 0.75)
      .from('#banner-mountain-2', { yPercent: 10 }, 0.5)
      .from('#banner-mountain-4', { yPercent: 10 }, 0.75)
      .from('#banner-human', { xPercent: -100, yPercent: 100 }, 0.5)
      .from('#banner-cat', { xPercent: 100, yPercent: 100 }, 1)
      .to('#banner-light', { opacity: 1 }, 1.5)
      ;


const tl_2 = gsap.timeline();

ScrollTrigger.create({
    animation: tl_2,
    trigger: ".about",
    start: "top top",
    end: "+=" + document.querySelector('.panel').offsetHeight * .6,
    scrub: 1,
});


mm.add("(orientation: landscape)", () => {
  if ($('.about .container').innerHeight() > $('.about').innerHeight()) {
    $('.about .container').css('height', '90vh');
    $('.about .wrap:nth-of-type(1)').css('translate', '0 -30%');
    $('.about .wrap:nth-of-type(2)').css('translate', '0 15%');
    $('.panel').css('min-height', '600vh');
    $('.panel:nth-of-type(3)').css('min-height', '1200vh');
    tl_2.from('.about .wrap:nth-of-type(1)', { yPercent: "+=50", duration: 1 }, .25)
    .from('#about-grace-1', { yPercent: 20 }, .5)
    .from('#about-grace-2', { yPercent: 30 }, .5)
    ;
  } else {
    tl_2.from('.about .wrap:nth-of-type(1)', { yPercent: 10 }, .25)
    .from('.about .wrap:nth-of-type(2)', { yPercent: 10 }, .1)
    .from('#about-grace-1', { yPercent: 30 }, 1)
    .from('#about-grace-2', { yPercent: 50 }, 1)
    ;
  }
})

mm.add("(orientation: portrait)", () => {
  if ($('.about .container').innerHeight() *.9 > $('.about').innerHeight()) {
    tl_2.to('.about .container', { yPercent: "-=50", duration: 1 }, .5);
  }
  
  tl_2
  .from('#about-grace-1', { yPercent: 30 }, 1)
  .from('#about-grace-2', { yPercent: 50 }, 1)
  ;
})


const tl_3 = gsap.timeline();

ScrollTrigger.create({
    animation: tl_3,
    trigger: ".service",
    start: "top top",
    end: "+=" + document.querySelector('.panel:nth-of-type(3)').offsetHeight * .8,
    scrub: 1,
});


tl_3
.from('.service .mountain', { yPercent: 20, duration: 1.5 }, .15)
.to('#service-light', { opacity: 1 })
.from('#service-floor', { yPercent: 5, duration: 1.5 }, .1)
.to('.process', { visibility: 'visible', duration: 0 }, 4)
.to('.service', { opacity: 0, duration: 1 }, 4)
.to('.service', { visibility: 'hidden', duration: 0 }, 4.5)
.from('.process .container ul li:nth-of-type(1)', { yPercent: -10 }, 5)
.from('.process .container ul li:nth-of-type(2)', { yPercent: -15 }, 5.1)
.from('.process .container ul li:nth-of-type(3)', { yPercent: -17.5 }, 5.2)
.from('.process .container ul li:nth-of-type(4)', { yPercent: -15 }, 5.3)
.from('.process .container ul li:nth-of-type(5)', { yPercent: -12.5 }, 5.4)
.to('.service', { visibility: 'visible', duration: 0 }, 6)
.to('.service', { opacity: 1, duration: 1 }, 6.5)
.to('.process', { visibility: 'hidden', duration: 0 }, 7.5)
;


if ($('.service .container').innerHeight() > $('.service').innerHeight()) {
  tl_3
  .from('.service .item:nth-of-type(1)', { yPercent: 200, duration: 1 }, 1.75)
  .from('.service .item:nth-of-type(2)', { yPercent: 200, duration: 1 }, 2.75)
  .to('.service .item:nth-of-type(2)', { yPercent: "-=200", duration: 1 }, 7.5)
  ;
} else {
  tl_3
  .from('.service .wrap', { yPercent: 200, duration: 1 }, 2)
  ;
}


mm.add("(orientation: landscape)", () => {
  if ($('.service .container').innerHeight() > $('.service').innerHeight()) {
    $('.service .item').addClass('single');
    $('.service .item div span').addClass('single');
  }

  tl_3
  .from('#service-pet', { yPercent: 75, backgroundSize: "100%", duration: 1.5 }, .1)
  .from('#service-left-shadow', { yPercent: -5, duration: 1.5 }, .1)
  .from('#service-right-shadow', { yPercent: -5, duration: 1.5 }, .1)
  .from('#service-left-trees', { backgroundSize: "105% 95%", duration: 1.5 }, .2)
  .from('#service-right-trees', { backgroundSize: "105% 95%", duration: 1.5 }, .2)
  .to('#service-pet', { yPercent: "-=20", backgroundSize: "40%", duration: .5 }, 4)
  .to('#service-pet', { yPercent: "+=20", backgroundSize: "50%", duration: .5 }, 6.5)
;
})

mm.add("(orientation: portrait)", () => {
  if ($('.service .container').innerHeight() > $('.service').innerHeight()) {
    $('.service .item').addClass('single');
  }

  tl_3
  .from('#service-pet', { yPercent: 75, duration: 1.5 }, .1)
  .from('#service-left-shadow', { yPercent: -10, duration: 1.5 }, .1)
  .from('#service-right-shadow', { yPercent: -10, duration: 1.5 }, .1)
  .to('#service-left-trees', { xPercent: "-=10",
  yPercent: "+=5", duration: 1.5 }, .2)
  .to('#service-right-trees', { xPercent: "+=10",
  yPercent: "+=5", duration: 1.5 }, .2)
  .to('#service-pet', { yPercent: "-=20", duration: .5 }, 4)
  .to('#service-pet', { yPercent: "+=20", duration: .5 }, 6.5)
;
})


$('.service .item div').css('height', `${$('.service .item:nth-of-type(2) div').innerHeight()}px`);



const tl_4 = gsap.timeline();

ScrollTrigger.create({
    animation: tl_4,
    trigger: ".talk",
    start: "top top",
    end: "+=" + document.querySelector('.panel').offsetHeight * .6,
    scrub: 1,
});


tl_4.from('#talk-leaf-1', { y: -200, backgroundSize: "100%" }, 0)
    .from('#talk-leaf-2', { y: -200, backgroundSize: "100%" }, 0)
    .from('#talk-seabed-3', { backgroundSize: "110% 110%" }, .35)
    .from('#talk-seabed-2', { backgroundSize: "110% 110%" }, .25)
    .from('#talk-seabed-1', { backgroundSize: "110% 110%" }, .15);


if ($('.talk .group').innerHeight() * 1.25 > $('.talk').innerHeight()) {
  $('.talk .group').addClass('single');
}

}



init();