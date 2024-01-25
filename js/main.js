document.addEventListener("DOMContentLoaded", () => {
  const ourExpertiseItem = document.querySelectorAll(".our-expertise-item");

  ourExpertiseItem.forEach((item) => {
    const stripe = item.querySelector(".our-expertise-outside-stripe");

    const widthValue = stripe.style.width;

    stripe.setAttribute("data-percent", widthValue);
  });

  let mixer = mixitup(".portfolio-list");

  Fancybox.bind("[data-fancybox]", {});

  AOS.init();

  wow = new WOW({
    boxClass: "wow", // default
    animateClass: "animated", // default
    offset: 0, // default
    mobile: true, // default
    live: true, // default
  });
  wow.init();

  const swiper = new Swiper(".slider-promo-swiper", {
    // loop: true,

    // If we need pagination
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },

    // Navigation arrows
    navigation: {
      nextEl: ".slider-promo-button-next",
      prevEl: ".slider-promo-button-prev",
    },

    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
  });

  const scrollers = document.querySelectorAll(".partners-scroller");

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    addAnimation();
  }

  function addAnimation() {
    scrollers.forEach((scroller) => {
      scroller.setAttribute("data-scroller", "true");

      const scrollerList = scroller.querySelector(".partners-list");
      const scrollerContent = Array.from(scrollerList.children);

      scrollerContent.forEach((item) => {
        const duplicateItem = item.cloneNode(true);
        scrollerList.appendChild(duplicateItem);
      });
    });
  }

  const burger = document.querySelector(".burger");
  const bodyLock = document.querySelector("body");
  const menu = document.querySelector(".menu");

  const menuLinks = menu.querySelectorAll(".menu-link");

  burger.addEventListener("click", () => {
    menu.classList.toggle("menu-active");
    burger.classList.toggle("burger--active");
    bodyLock.classList.toggle("no-scroll");
  });

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("menu-active");
      burger.classList.remove("burger--active");
      bodyLock.classList.remove("no-scroll");
    });
  });

  const observerMenuLink = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute("id");
        if (entry.isIntersecting) {
          menuLinks.forEach((link) =>
            link.classList.remove("menu-link-active")
          );

          if (id) {
            const linkID = document.querySelector(`a[href="#${id}"]`);
            linkID.classList.add("menu-link-active");
          }
        }
      });
    },
    { rootMargin: "-50% 0px -50% 0px" }
  );

  document
    .querySelectorAll("section")
    .forEach((section) => observerMenuLink.observe(section));

  const counterUp = window.counterUp.default;

  const callback = (entries) => {
    entries.forEach((entry) => {
      const el = entry.target;
      if (entry.isIntersecting && !el.classList.contains("is-visible")) {
        counterUp(el, {
          duration: 4000,
          delay: 20,
        });
        el.classList.add("is-visible");
      }
    });
  };

  const IO = new IntersectionObserver(callback, { threshold: 1 });

  const statsNumber = document.querySelectorAll(".counter-number");
  statsNumber.forEach((el) => {
    IO.observe(el);
  });
});
