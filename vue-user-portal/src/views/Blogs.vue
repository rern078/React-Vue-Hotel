<template>
  <div>
	<!-- ================ start banner area ================= -->
  <section class="blog-banner-area" id="blog">
    <div class="container h-100">
        <div class="blog-banner">
            <div class="text-center">
                <h1>Our Blog</h1>
                <nav aria-label="breadcrumb" class="banner-breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><router-link to="#">Home</router-link></li>
                        <li class="breadcrumb-item active" aria-current="page">Blog</li>
                    </ol>
                </nav>
            </div>
        </div>
    </div>
</section>
<!-- ================ end banner area ================= -->


<!--================Blog Categorie Area =================-->
<section class="blog_categorie_area">
    <div class="container">
        <div class="row">
            <div class="col-sm-6 col-lg-4 mb-4 mb-lg-0">
                <div class="categories_post">
                    <img class="card-img rounded-0" src="/src/assets/blog/cat-post/cat-post-3.jpg" alt="post">
                    <div class="categories_details">
                        <div class="categories_text">
                            <router-link to="blog-single.html">
                                <h5>Social Life</h5>
                            </router-link>
                            <div class="border_line"></div>
                            <p>Enjoy your social life together</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-6 col-lg-4 mb-4 mb-lg-0">
                <div class="categories_post">
                    <img class="card-img rounded-0" src="/src/assets/blog/cat-post/cat-post-2.jpg" alt="post">
                    <div class="categories_details">
                        <div class="categories_text">
                            <router-link to="blog-single.html">
                                <h5>Politics</h5>
                            </router-link>
                            <div class="border_line"></div>
                            <p>Be a part of politics</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-6 col-lg-4 mb-4 mb-lg-0">
                <div class="categories_post">
                    <img class="card-img rounded-0" src="/src/assets/blog/cat-post/cat-post-1.jpg" alt="post">
                    <div class="categories_details">
                        <div class="categories_text">
                            <router-link to="blog-single.html">
                                <h5>Food</h5>
                            </router-link>
                            <div class="border_line"></div>
                            <p>Let the food be finished</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<!--================Blog Categorie Area =================-->

<!--================Blog Area =================-->
<section class="blog_area">
    <div class="container">
        <div class="row">
            <div class="col-lg-8">
                <div class="blog_left_sidebar">
                    <article class="row blog_item">
                        <div class="col-md-3">
                            <div class="blog_info text-right">
                                <div class="post_tag">
                                    <router-link to="#">Food,</router-link>
                                    <router-link class="active" to="#">Technology,</router-link>
                                    <router-link to="#">Politics,</router-link>
                                    <router-link to="#">Lifestyle</router-link>
                                </div>
                                <ul class="blog_meta list">
                                    <li>
                                        <router-link to="#">Mark wiens
                                            <i class="lnr lnr-user"></i>
                                        </router-link>
                                    </li>
                                    <li>
                                        <router-link to="#">12 Dec, 2017
                                            <i class="lnr lnr-calendar-full"></i>
                                        </router-link>
                                    </li>
                                    <li>
                                        <router-link to="#">1.2M Views
                                            <i class="lnr lnr-eye"></i>
                                        </router-link>
                                    </li>
                                    <li>
                                        <router-link to="#">06 Comments
                                            <i class="lnr lnr-bubble"></i>
                                        </router-link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-md-9">
                            <div class="blog_post">
                                <img src="/src/assets/blog/main-blog/m-blog-1.jpg" alt="">
                                <div class="blog_details">
                                    <router-link to="blog-single.html">
                                        <h2>Astronomy Binoculars A Great Alternative</h2>
                                    </router-link>
                                    <p>MCSE boot camps have its supporters and its detractors. Some people do not
                                        understand
                                        why you should have to spend money on boot camp when you can get the MCSE
                                        study
                                        materials yourself at a fraction.</p>
                                    <router-link class="button button-blog" to="blog-single.html">View More</router-link>
                                </div>
                            </div>
                        </div>
                    </article>
                    <article class="row blog_item">
                        <div class="col-md-3">
                            <div class="blog_info text-right">
                                <div class="post_tag">
                                    <router-link to="#">Food,</router-link>
                                    <router-link class="active" to="#">Technology,</router-link>
                                    <router-link to="#">Politics,</router-link>
                                    <router-link to="#">Lifestyle</router-link>
                                </div>
                                <ul class="blog_meta list">
                                    <li>
                                        <router-link to="#">Mark wiens
                                            <i class="lnr lnr-user"></i>
                                        </router-link>
                                    </li>
                                    <li>
                                        <router-link to="#">12 Dec, 2017
                                            <i class="lnr lnr-calendar-full"></i>
                                        </router-link>
                                    </li>
                                    <li>
                                        <router-link to="#">1.2M Views
                                            <i class="lnr lnr-eye"></i>
                                        </router-link>
                                    </li>
                                    <li>
                                        <router-link to="#">06 Comments
                                            <i class="lnr lnr-bubble"></i>
                                        </router-link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-md-9">
                            <div class="blog_post">
                                <img src="/src/assets/blog/main-blog/m-blog-2.jpg" alt="">
                                <div class="blog_details">
                                    <router-link to="blog-single.html">
                                        <h2>The Basics Of Buying A Telescope</h2>
                                    </router-link>
                                    <p>MCSE boot camps have its supporters and its detractors. Some people do not
                                        understand
                                        why you should have to spend money on boot camp when you can get the MCSE
                                        study
                                        materials yourself at a fraction.</p>
                                    <router-link to="blog-single.html" class="button button-blog">View More</router-link>
                                </div>
                            </div>
                        </div>
                    </article>
                    <article class="row blog_item">
                        <div class="col-md-3">
                            <div class="blog_info text-right">
                                <div class="post_tag">
                                    <router-link to="#">Food,</router-link>
                                    <router-link class="active" to="#">Technology,</router-link>
                                    <router-link to="#">Politics,</router-link>
                                    <router-link to="#">Lifestyle</router-link>
                                </div>
                                <ul class="blog_meta list">
                                    <li>
                                        <router-link to="#">Mark wiens
                                            <i class="lnr lnr-user"></i>
                                        </router-link>
                                    </li>
                                    <li>
                                        <router-link to="#">12 Dec, 2017
                                            <i class="lnr lnr-calendar-full"></i>
                                        </router-link>
                                    </li>
                                    <li>
                                        <router-link to="#">1.2M Views
                                            <i class="lnr lnr-eye"></i>
                                        </router-link>
                                    </li>
                                    <li>
                                        <router-link to="#">06 Comments
                                            <i class="lnr lnr-bubble"></i>
                                        </router-link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-md-9">
                            <div class="blog_post">
                                <img src="/src/assets/blog/main-blog/m-blog-3.jpg" alt="">
                                <div class="blog_details">
                                    <router-link to="blog-single.html">
                                        <h2>The Glossary Of Telescopes</h2>
                                    </router-link>
                                    <p>MCSE boot camps have its supporters and its detractors. Some people do not
                                        understand
                                        why you should have to spend money on boot camp when you can get the MCSE
                                        study
                                        materials yourself at a fraction.</p>
                                    <router-link to="blog-single.html" class="button button-blog">View More</router-link>
                                </div>
                            </div>
                        </div>
                    </article>
                    <article class="row blog_item">
                        <div class="col-md-3">
                            <div class="blog_info text-right">
                                <div class="post_tag">
                                    <router-link to="#">Food,</router-link>
                                    <router-link class="active" to="#">Technology,</router-link>
                                    <router-link to="#">Politics,</router-link>
                                    <router-link to="#">Lifestyle</router-link>
                                </div>
                                <ul class="blog_meta list">
                                    <li>
                                        <router-link to="#">Mark wiens
                                            <i class="lnr lnr-user"></i>
                                        </router-link>
                                    </li>
                                    <li>
                                        <router-link to="#">12 Dec, 2017
                                            <i class="lnr lnr-calendar-full"></i>
                                        </router-link>
                                    </li>
                                    <li>
                                        <router-link to="#">1.2M Views
                                            <i class="lnr lnr-eye"></i>
                                        </router-link>
                                    </li>
                                    <li>
                                        <router-link to="#">06 Comments
                                            <i class="lnr lnr-bubble"></i>
                                        </router-link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-md-9">
                            <div class="blog_post">
                                <img src="/src/assets/blog/main-blog/m-blog-4.jpg" alt="">
                                <div class="blog_details">
                                    <router-link to="blog-single.html">
                                        <h2>The Night Sky</h2>
                                    </router-link>
                                    <p>MCSE boot camps have its supporters and its detractors. Some people do not
                                        understand
                                        why you should have to spend money on boot camp when you can get the MCSE
                                        study
                                        materials yourself at a fraction.</p>
                                    <router-link to="blog-single.html" class="button button-blog">View More</router-link>
                                </div>
                            </div>
                        </div>
                    </article>
                    <article class="row blog_item">
                        <div class="col-md-3">
                            <div class="blog_info text-right">
                                <div class="post_tag">
                                    <router-link to="#">Food,</router-link>
                                    <router-link class="active" to="#">Technology,</router-link>
                                    <router-link to="#">Politics,</router-link>
                                    <router-link to="#">Lifestyle</router-link>
                                </div>
                                <ul class="blog_meta list">
                                    <li>
                                        <router-link to="#">Mark wiens
                                            <i class="lnr lnr-user"></i>
                                        </router-link>
                                    </li>
                                    <li>
                                        <router-link to="#">12 Dec, 2017
                                            <i class="lnr lnr-calendar-full"></i>
                                        </router-link>
                                    </li>
                                    <li>
                                        <router-link to="#">1.2M Views
                                            <i class="lnr lnr-eye"></i>
                                        </router-link>
                                    </li>
                                    <li>
                                        <router-link to="#">06 Comments
                                            <i class="lnr lnr-bubble"></i>
                                        </router-link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-md-9">
                            <div class="blog_post">
                                <img src="/src/assets/blog/main-blog/m-blog-5.jpg" alt="">
                                <div class="blog_details">
                                    <router-link to="blog-single.html">
                                        <h2>Telescopes 101</h2>
                                    </router-link>
                                    <p>MCSE boot camps have its supporters and its detractors. Some people do not
                                        understand
                                        why you should have to spend money on boot camp when you can get the MCSE
                                        study
                                        materials yourself at a fraction.</p>
                                    <router-link to="blog-single.html" class="button button-blog">View More</router-link>
                                </div>
                            </div>
                        </div>
                    </article>
                    <nav class="blog-pagination justify-content-center d-flex">
                        <ul class="pagination">
                            <li class="page-item">
                                <router-link to="#" class="page-link" aria-label="Previous">
                                    <span aria-hidden="true">
                                        <span class="lnr lnr-chevron-left"></span>
                                    </span>
                                </router-link>
                            </li>
                            <li class="page-item">
                                <router-link to="#" class="page-link">01</router-link>
                            </li>
                            <li class="page-item active">
                                <router-link to="#" class="page-link">02</router-link>
                            </li>
                            <li class="page-item">
                                <router-link to="#" class="page-link">03</router-link>
                            </li>
                            <li class="page-item">
                                <router-link to="#" class="page-link">04</router-link>
                            </li>
                            <li class="page-item">
                                <router-link to="#" class="page-link">09</router-link>
                            </li>
                            <li class="page-item">
                                <router-link to="#" class="page-link" aria-label="Next">
                                    <span aria-hidden="true">
                                        <span class="lnr lnr-chevron-right"></span>
                                    </span>
                                </router-link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="blog_right_sidebar">
                    <aside class="single_sidebar_widget search_widget">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="Search Posts">
                            <span class="input-group-btn">
                                <button class="btn btn-default" type="button">
                                    <i class="lnr lnr-magnifier"></i>
                                </button>
                            </span>
                        </div>
                        <!-- /input-group -->
                        <div class="br"></div>
                    </aside>
                    <aside class="single_sidebar_widget author_widget">
                        <img class="author_img rounded-circle" src="/src/assets/blog/author.png" alt="">
                        <h4>Charlie Barber</h4>
                        <p>Senior blog writer</p>
                        <div class="social_icon">
                            <router-link to="#">
                                <i class="fab fa-facebook-f"></i>
                            </router-link>
                            <router-link to="#">
                                <i class="fab fa-twitter"></i>
                            </router-link>
                            <router-link to="#">
                                <i class="fab fa-github"></i>
                            </router-link>
                            <router-link to="#">
                                <i class="fab fa-behance"></i>
                            </router-link>
                        </div>
                        <p>Boot camps have its supporters andit sdetractors. Some people do not understand why you
                            should
                            have to spend money on boot camp when you can get. Boot camps have itssuppor ters andits
                            detractors.
                        </p>
                        <div class="br"></div>
                    </aside>
                    <aside class="single_sidebar_widget popular_post_widget">
                        <h3 class="widget_title">Popular Posts</h3>
                        <div class="media post_item">
                            <img src="/src/assets/blog/popular-post/post1.jpg" alt="post">
                            <div class="media-body">
                                <router-link to="blog-single.html">
                                    <h3>Space The Final Frontier</h3>
                                </router-link>
                                <p>02 Hours ago</p>
                            </div>
                        </div>
                        <div class="media post_item">
                            <img src="/src/assets/blog/popular-post/post2.jpg" alt="post">
                            <div class="media-body">
                                <router-link to="blog-single.html">
                                    <h3>The Amazing Hubble</h3>
                                </router-link>
                                <p>02 Hours ago</p>
                            </div>
                        </div>
                        <div class="media post_item">
                            <img src="/src/assets/blog/popular-post/post3.jpg" alt="post">
                            <div class="media-body">
                                <router-link to="blog-single.html">
                                    <h3>Astronomy Or Astrology</h3>
                                </router-link>
                                <p>03 Hours ago</p>
                            </div>
                        </div>
                        <div class="media post_item">
                            <img src="/src/assets/blog/popular-post/post4.jpg" alt="post">
                            <div class="media-body">
                                <router-link to="blog-single.html">
                                    <h3>Asteroids telescope</h3>
                                </router-link>
                                <p>01 Hours ago</p>
                            </div>
                        </div>
                        <div class="br"></div>
                    </aside>
                    <aside class="single_sidebar_widget ads_widget">
                        <router-link to="#">
                            <img class="img-fluid" src="/src/assets/blog/add.jpg" alt="">
                        </router-link>
                        <div class="br"></div>
                    </aside>
                    <aside class="single_sidebar_widget post_category_widget">
                        <h4 class="widget_title">Post Catgories</h4>
                        <ul class="list cat-list">
                            <li>
                                <router-link to="#" class="d-flex justify-content-between">
                                    <p>Technology</p>
                                    <p>37</p>
                                </router-link>
                            </li>
                            <li>
                                <router-link to="#" class="d-flex justify-content-between">
                                    <p>Lifestyle</p>
                                    <p>24</p>
                                </router-link>
                            </li>
                            <li>
                                <router-link to="#" class="d-flex justify-content-between">
                                    <p>Fashion</p>
                                    <p>59</p>
                                </router-link>
                            </li>
                            <li>
                                <router-link to="#" class="d-flex justify-content-between">
                                    <p>Art</p>
                                    <p>29</p>
                                </router-link>
                            </li>
                            <li>
                                <router-link to="#" class="d-flex justify-content-between">
                                    <p>Food</p>
                                    <p>15</p>
                                </router-link>
                            </li>
                            <li>
                                <router-link to="#" class="d-flex justify-content-between">
                                    <p>Architecture</p>
                                    <p>09</p>
                                </router-link>
                            </li>
                            <li>
                                <router-link to="#" class="d-flex justify-content-between">
                                    <p>Adventure</p>
                                    <p>44</p>
                                </router-link>
                            </li>
                        </ul>
                        <div class="br"></div>
                    </aside>
                    <aside class="single-sidebar-widget newsletter_widget">
                        <h4 class="widget_title">Newsletter</h4>
                        <p>
                            Here, I focus on a range of items and features that we use in life without giving them a
                            second thought.
                        </p>
                        <div class="form-group d-flex flex-row">
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <div class="input-group-text">
                                        <i class="fa fa-envelope" aria-hidden="true"></i>
                                    </div>
                                </div>
                                <input type="text" class="form-control" id="inlineFormInputGroup"
                                    placeholder="Enter email address" onfocus="this.placeholder = ''"
                                    onblur="this.placeholder = 'Enter email'">
                            </div>
                            <router-link to="#" class="bbtns">Subcribe</router-link>
                        </div>
                        <p class="text-bottom">You can unsubscribe at any time</p>
                        <div class="br"></div>
                    </aside>
                    <aside class="single-sidebar-widget tag_cloud_widget">
                        <h4 class="widget_title">Tag Clouds</h4>
                        <ul class="list">
                            <li>
                                <router-link to="#">Technology</router-link>
                            </li>
                            <li>
                                <router-link to="#">Fashion</router-link>
                            </li>
                            <li>
                                <router-link to="#">Architecture</router-link>
                            </li>
                            <li>
                                <router-link to="#">Fashion</router-link>
                            </li>
                            <li>
                                <router-link to="#">Food</router-link>
                            </li>
                            <li>
                                <router-link to="#">Technology</router-link>
                            </li>
                            <li>
                                <router-link to="#">Lifestyle</router-link>
                            </li>
                            <li>
                                <router-link to="#">Art</router-link>
                            </li>
                            <li>
                                <router-link to="#">Adventure</router-link>
                            </li>
                            <li>
                                <router-link to="#">Food</router-link>
                            </li>
                            <li>
                                <router-link to="#">Lifestyle</router-link>
                            </li>
                            <li>
                                <router-link to="#">Adventure</router-link>
                            </li>
                        </ul>
                    </aside>
                </div>
            </div>
        </div>
    </div>
</section>
<!--================Blog Area =================-->


  </div>
</template>

<script setup>
</script>
