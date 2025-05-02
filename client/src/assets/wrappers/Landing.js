import styled from "styled-components";

const Wrapper = styled.section`
  margin: 0 !important;
  padding: 0 !important;
  font-size: 18px;

  /*--------------------------------------------------------------
# Additional CSS
--------------------------------------------------------------*/
  /* HERO SECTION */
  .hidden {
    display: none;
  }

  .hero .carousel {
    height: 100vh;
  }

  .hero p span {
    color: var(--accent-color);
    font-size: 24px;
    font-family: var(--heading-font);
  }

  .carousel-container.carousel-details-left {
    align-items: flex-start;
    margin-left: 36px;
  }

  .carousel-item p {
    font-family: var(--secondary-font);
  }

  /* CAROUSEL REACT BOOTSTRAP */
  .carousel-caption {
    position: unset;
  }

  .hero .carousel-control-prev,
  .hero .carousel-control-next {
    opacity: 5;
  }

  /* ABOUT SECTION */
  .about {
    background-color: var(--secondary);
    color: var(--bg-secondary);
    height: 100vh;
  }

  .about h2 {
    text-align: center;
    margin-bottom: 100px;
    font-weight: 700;
  }

  .about h2 span {
    color: var(--accent-color);
  }

  .about .content h3 span {
    color: var(--bg-primary);
  }

  /* PRODUCT SECTION */
  .menu {
    background-color: var(--bg-primary);
  }

  .menu span {
    color: var(--primary);
  }

  .section-title div .description-title {
    color: var(--accent-color);
  }

  .menu .menu-filters li {
    color: color-mix(in srgb, var(--primary), transparent 25%);
    font-family: var(--secondary-font);
  }

  .menu .menu-content a {
    background: transparent;
    color: var(--primary);
    font-family: var(--secondary-font);
    font-size: 18px;
  }

  .menu .menu-img {
    width: 100px;
    height: 100px;
  }

  .menu .menu-content span {
    background: transparent;
    /* color: var(--primary); */
  }

  .menu .menu-ingredients {
    color: color-mix(in srgb, var(--primary), transparent 25%);
    font-size: 20px;
  }

  /* BRANDS SECTION  */
  .brands {
    background-color: var(--secondary);
  }

  .brands span {
    color: var(--bg-secondary);
  }

  .section-title div .description-title {
    color: var(--accent-color);
  }

  .brands .brand {
    position: relative;
  }

  .brands .brand .pic {
    overflow: hidden;
    margin-bottom: 50px;
  }

  .brands .brand .brand-info {
    background-color: var(--bg-primary);
    /* box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.1); */
    box-shadow: var(--drkShadow);
    position: absolute;
    bottom: -50px;
    left: 20px;
    right: 20px;
    padding: 20px 15px;
    overflow: hidden;
    transition: 0.5s;
  }

  .brands .brand h4 {
    font-weight: 700;
    margin-bottom: 10px;
    font-size: 18px;
    position: relative;
    padding-bottom: 10px;
    font-family: var(--secondary-font);
    color: var(--primary);
  }

  .brands .brand h4::after {
    content: "";
    position: absolute;
    display: block;
    width: 50px;
    height: 1px;
    background: color-mix(in srgb, var(--primary), transparent 60%);
    bottom: 0;
    left: 0;
  }

  /* TESTIMONIALS SECTION */
  .testimonials .testimonial-item h3 {
    color: var(--primary);
  }

  .testimonials .testimonial-item h4 {
    color: var(--secondary);
  }

  .testimonials .testimonial-item p span {
    color: var(--secondary);
    font-family: var(--secondary-font);
  }

  /* RECIPES SECTION */
  .recipes {
    overflow: hidden;
    background-color: var(--secondary);
    height: 100vh;
  }

  .recipes span {
    color: var(--bg-secondary);
  }

  .recipes div .section-title {
    margin-bottom: 50px;
  }

  .recipes .nav-link {
    border: 0;
    padding: 12px 15px 12px 0;
    transition: 0.3s;
    color: var(--bg-secondary);
    border-radius: 0;
    border-right: 2px solid
      color-mix(in srgb, var(--bg-secondary), transparent 90%);
    font-weight: 600;
    font-size: 15px;
    padding-left: 14px;
  }

  .recipes .nav-link:hover {
    color: var(--accent-color);
  }

  .recipes .nav-link.active {
    color: var(--accent-color);
    border-color: var(--accent-color);
    background-color: var(--background-color);
  }

  .recipes .tab-pane.active {
    animation: fadeIn 0.5s ease-out;
  }

  .recipes .details h3 {
    font-size: 26px;
    font-weight: 600;
    margin-bottom: 20px;
  }

  .recipes .details p {
    color: color-mix(in srgb, var(--bg-secondary), transparent 20%);
  }

  .recipes .details p:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 992px) {
    .recipes .nav-link {
      border: 0;
      padding: 15px;
    }

    .recipes .nav-link.active {
      color: var(--accent-color);
      background: var(--accent-color);
    }
  }

  /* CONTACT SECTION */
  .contact {
    background-color: var(--bg-primary);
    color: var(--primary);
  }

  .contact span {
    color: var(--primary);
  }

  .section-title div .description-title {
    color: var(--accent-color);
  }

  .contact .info {
    background-color: var(--secondary);
    box-shadow: var(--lgtShadow);
  }

  .contact .info h4,
  h3 {
    color: var(--bg-primary);
  }

  .contact .info-item i {
    color: var(--bg-secondary);
  }

  .contact .info p {
    color: var(--bg-secondary);
  }

  .contact .php-email-form button.contact-submit {
    background: var(--primary);
    color: var(--bg-primary);
    box-shadow: var(--lgtShadow);
  }

  .contact .php-email-form button.contact-submit:hover {
    background: var(--secondary);
    color: var(--bg-secondary);
  }

  /* RESPONSIVE */
  /* HEADER/NAVBAR SECTION */
  @media (max-width: 1199px) {
    .mobile-nav-active .navmenu {
      width: 50vw;
      height: 50vh;
      justify-self: flex-end;
    }
  }

  @media (max-width: 992px) {
    .recipes .nav-link.active {
      background: var(--wht);
    }
  }

  @media (max-width: 768px) {
    .hero .carousel {
      min-height: unset;
      height: 74vh;
    }
  }

  @media (max-width: 475px) {
    .mobile-nav-active .navmenu {
      width: 100vw;
      height: 50vh;
      justify-self: flex-end;
    }

    .hero .carousel {
      height: 40vh;
    }

    .hero .carousel-container {
      justify-content: unset;
    }

    .carousel-container.carousel-details-left {
      align-items: unset;
      margin-left: unset;
    }

    .carousel-container p {
      display: none;
    }
  }

  @media (max-width: 376px) {
    .carousel {
      display: none;
    }

    .hidden {
      display: block;
      text-align: center;
    }

    /* .hero-mobile-toggle img {
      background-image: linear-gradient(
        to top,
        rgba(245, 246, 252, 0.1),
        rgb(116 35 35 / 75%)
      );
    } */
  }

  @media (max-width: 320px) {
    .nav-links .nav-link {
      color: var(--bg-primary);
    }
  }
`;

export default Wrapper;
