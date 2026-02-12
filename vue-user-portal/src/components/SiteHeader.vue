<template>
  <header class="header_area">
    <div class="header-top">
      <div class="container">
        <div class="d-flex align-items-center">
          <div id="logo">
            <router-link to="/">
              <img src="/src/assets/Logo.png" alt="" title="">
            </router-link>
          </div>
          <div class="ml-auto d-none d-md-block d-md-flex">
            <div class="media header-top-info">
              <span class="header-top-info__icon"><i class="fas fa-phone-volume"></i></span>
              <div class="media-body">
                <p>Have any question?</p>
                <p>
                  Free:
                  <a href="tel:+12 365 5233">+12 365 5233</a>
                </p>
              </div>
            </div>
            <div class="media header-top-info">
              <span class="header-top-info__icon"><i class="ti-email"></i></span>
              <div class="media-body">
                <p>Have any question?</p>
                <p>
                  Free:
                  <a href="tel:+12 365 5233">+12 365 5233</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="main_menu">
      <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container">
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>

          <div class="collapse navbar-collapse offset" id="navbarSupportedContent">
            <ul class="nav navbar-nav menu_nav">
              <li class="nav-item">
                <router-link class="nav-link" to="/">Home</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/rooms">Rooms</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/my-bookings">My Bookings</router-link>
              </li>
               <li class="nav-item">
                <router-link class="nav-link" to="/abouts">About</router-link>
              </li>
               <li class="nav-item">
                <router-link class="nav-link" to="/properties">Properties</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/gallerys">Gallery</router-link>
              </li>
              <li class="nav-item submenu dropdown">
                <router-link class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
                aria-expanded="false">Blog</router-link>
                <ul class="dropdown-menu">
                  <li class="nav-item"><router-link class="nav-link" to="/blogs">Blog</router-link></li>
                  <li class="nav-item"><router-link class="nav-link" to="/blogs-single">Blog Details</router-link></li>
                </ul>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/contacts">Contact</router-link>
              </li>
            </ul>
          </div>

          <ul class="social-icons ml-auto">
            <li>
              <a href="#"><i class="fab fa-facebook-f"></i></a>
            </li>
            <li>
              <a href="#"><i class="fab fa-linkedin-in"></i></a>
            </li>
            <li>
              <a href="#"><i class="fab fa-twitter"></i></a>
            </li>
            <li>
              <a href="#"><i class="fab fa-google-plus-g"></i></a>
            </li>
            <li>
              <a href="#"><i class="fas fa-rss"></i></a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'SiteHeader',
};
</script>

