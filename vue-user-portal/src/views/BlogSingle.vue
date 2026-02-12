<template>
  <div>
<!-- ================ start banner area ================= -->
	<section class="blog-banner-area" id="blog">
		<div class="container h-100">
			<div class="blog-banner">
				<div class="text-center">
					<h1>Blog Details</h1>
					<nav aria-label="breadcrumb" class="banner-breadcrumb">
						<ol class="breadcrumb">
							<li class="breadcrumb-item"><router-link to="#">Home</router-link></li>
							<li class="breadcrumb-item"><router-link to="#">Blog</router-link></li>
							<li class="breadcrumb-item active" aria-current="page">Blog Details</li>
						</ol>
					</nav>
				</div>
			</div>
		</div>
	</section>
	<!-- ================ end banner area ================= -->


	<!--================Blog Area =================-->
	<section class="blog_area single-post-area py-80px">
		<div class="container">
			<div class="row">
				<div class="col-lg-8 posts-list">
					<div class="single-post row">
						<div class="col-lg-12">
							<div class="feature-img">
								<img class="img-fluid" src="/src/assets/blog/feature-img1.jpg" alt="">
							</div>
						</div>
						<div class="col-lg-3  col-md-3">
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
								<ul class="social-links">
									<li>
										<router-link to="#">
											<i class="fab fa-facebook-f"></i>
										</router-link>
									</li>
									<li>
										<router-link to="#">
											<i class="fab fa-twitter"></i>
										</router-link>
									</li>
									<li>
										<router-link to="#">
											<i class="fab fa-github"></i>
										</router-link>
									</li>
									<li>
										<router-link to="#">
											<i class="fab fa-behance"></i>
										</router-link>
									</li>
								</ul>
							</div>
						</div>
						<div class="col-lg-9 col-md-9 blog_details">
							<h2>Astronomy Binoculars A Great Alternative</h2>
							<p class="excert">
								MCSE boot camps have its supporters and its detractors. Some people do
								not understand why you should have to spend money
								on boot camp when you can get the MCSE study materials yourself at a
								fraction.
							</p>
							<p>
								Boot camps have its supporters and its detractors. Some people do not
								understand why you should have to spend money on boot
								camp when you can get the MCSE study materials yourself at a fraction of
								the camp price.
								However, who has the willpower to actually sit through a self-imposed
								MCSE training. who
								has the willpower to actually sit through a self-imposed
							</p>
							<p>
								Boot camps have its supporters and its detractors. Some people do not
								understand why you should have to spend money on boot
								camp when you can get the MCSE study materials yourself at a fraction of
								the camp price.
								However, who has the willpower to actually sit through a self-imposed
								MCSE training. who
								has the willpower to actually sit through a self-imposed
							</p>
						</div>
						<div class="col-lg-12">
							<div class="quotes">
								MCSE boot camps have its supporters and its detractors. Some people do
								not understand why you should have to spend money
								on boot camp when you can get the MCSE study materials yourself at a
								fraction of the camp
								price. However, who has the willpower to actually sit through a
								self-imposed MCSE training.
							</div>
							<div class="row">
								<div class="col-6">
									<img class="img-fluid" src="/src/assets/blog/post-img1.jpg" alt="">
								</div>
								<div class="col-6">
									<img class="img-fluid" src="/src/assets/blog/post-img2.jpg" alt="">
								</div>
								<div class="col-lg-12 mt-4">
									<p>
										MCSE boot camps have its supporters and its detractors. Some
										people do not understand why you should have to spend money
										on boot camp when you can get the MCSE study materials
										yourself at a fraction of
										the camp price. However, who has the willpower.
									</p>
									<p>
										MCSE boot camps have its supporters and its detractors. Some
										people do not understand why you should have to spend money
										on boot camp when you can get the MCSE study materials
										yourself at a fraction of
										the camp price. However, who has the willpower.
									</p>
								</div>
							</div>
						</div>
					</div>
					<div class="navigation-area">
						<div class="row">
							<div
								class="col-lg-6 col-md-6 col-12 nav-left flex-row d-flex justify-content-start align-items-center">
								<div class="thumb">
									<router-link to="#">
										<img class="img-fluid" src="/src/assets/blog/prev.jpg" alt="">
									</router-link>
								</div>
								<div class="arrow">
									<router-link to="#">
										<span class="lnr text-white lnr-arrow-left"></span>
									</router-link>
								</div>
								<div class="detials">
									<p>Prev Post</p>
									<router-link to="#">
										<h4>Space The Final Frontier</h4>
									</router-link>
								</div>
							</div>
							<div
								class="col-lg-6 col-md-6 col-12 nav-right flex-row d-flex justify-content-end align-items-center">
								<div class="detials">
									<p>Next Post</p>
									<router-link to="#">
										<h4>Telescopes 101</h4>
									</router-link>
								</div>
								<div class="arrow">
									<router-link to="#">
										<span class="lnr text-white lnr-arrow-right"></span>
									</router-link>
								</div>
								<div class="thumb">
									<router-link to="#">
										<img class="img-fluid" src="/src/assets/blog/next.jpg" alt="">
									</router-link>
								</div>
							</div>
						</div>
					</div>
					<div class="comments-area">
						<h4>05 Comments</h4>
						<div class="comment-list">
							<div class="single-comment justify-content-between d-flex">
								<div class="user justify-content-between d-flex">
									<div class="thumb">
										<img src="/src/assets/blog/c1.jpg" alt="">
									</div>
									<div class="desc">
										<h5>
											<router-link to="#">Emilly Blunt</router-link>
										</h5>
										<p class="date">December 4, 2017 at 3:12 pm </p>
										<p class="comment">
											Never say goodbye till the end comes!
										</p>
									</div>
								</div>
								<div class="reply-btn">
									<router-link to="" class="btn-reply text-uppercase">reply</router-link>
								</div>
							</div>
						</div>
						<div class="comment-list left-padding">
							<div class="single-comment justify-content-between d-flex">
								<div class="user justify-content-between d-flex">
									<div class="thumb">
										<img src="/src/assets/blog/c2.jpg" alt="">
									</div>
									<div class="desc">
										<h5>
											<router-link to="#">Elsie Cunningham</router-link>
										</h5>
										<p class="date">December 4, 2017 at 3:12 pm </p>
										<p class="comment">
											Never say goodbye till the end comes!
										</p>
									</div>
								</div>
								<div class="reply-btn">
									<router-link to="" class="btn-reply text-uppercase">reply</router-link>
								</div>
							</div>
						</div>
						<div class="comment-list left-padding">
							<div class="single-comment justify-content-between d-flex">
								<div class="user justify-content-between d-flex">
									<div class="thumb">
										<img src="/src/assets/blog/c3.jpg" alt="">
									</div>
									<div class="desc">
										<h5>
											<router-link to="#">Annie Stephens</router-link>
										</h5>
										<p class="date">December 4, 2017 at 3:12 pm </p>
										<p class="comment">
											Never say goodbye till the end comes!
										</p>
									</div>
								</div>
								<div class="reply-btn">
									<router-link to="" class="btn-reply text-uppercase">reply</router-link>
								</div>
							</div>
						</div>
						<div class="comment-list">
							<div class="single-comment justify-content-between d-flex">
								<div class="user justify-content-between d-flex">
									<div class="thumb">
										<img src="/src/assets/blog/c4.jpg" alt="">
									</div>
									<div class="desc">
										<h5>
											<router-link to="#">Maria Luna</router-link>
										</h5>
										<p class="date">December 4, 2017 at 3:12 pm </p>
										<p class="comment">
											Never say goodbye till the end comes!
										</p>
									</div>
								</div>
								<div class="reply-btn">
									<router-link to="" class="btn-reply text-uppercase">reply</router-link>
								</div>
							</div>
						</div>
						<div class="comment-list">
							<div class="single-comment justify-content-between d-flex">
								<div class="user justify-content-between d-flex">
									<div class="thumb">
										<img src="/src/assets/blog/c5.jpg" alt="">
									</div>
									<div class="desc">
										<h5>
											<router-link to="#">Ina Hayes</router-link>
										</h5>
										<p class="date">December 4, 2017 at 3:12 pm </p>
										<p class="comment">
											Never say goodbye till the end comes!
										</p>
									</div>
								</div>
								<div class="reply-btn">
									<router-link to="" class="btn-reply text-uppercase">reply</router-link>
								</div>
							</div>
						</div>
					</div>
					<div class="comment-form">
						<h4>Leave a Reply</h4>
						<form>
							<div class="form-group form-inline">
								<div class="form-group col-lg-6 col-md-6 name">
									<input type="text" class="form-control" id="name"
										placeholder="Enter Name" onfocus="this.placeholder = ''"
										onblur="this.placeholder = 'Enter Name'">
								</div>
								<div class="form-group col-lg-6 col-md-6 email">
									<input type="email" class="form-control" id="email"
										placeholder="Enter email address"
										onfocus="this.placeholder = ''"
										onblur="this.placeholder = 'Enter email address'">
								</div>
							</div>
							<div class="form-group">
								<input type="text" class="form-control" id="subject"
									placeholder="Subject" onfocus="this.placeholder = ''"
									onblur="this.placeholder = 'Subject'">
							</div>
							<div class="form-group">
								<textarea class="form-control mb-10" rows="5" name="message"
									placeholder="Messege" onfocus="this.placeholder = ''"
									onblur="this.placeholder = 'Messege'" required=""></textarea>
							</div>
							<router-link to="#" class="button button-postComment button--active">Post Comment</router-link>
						</form>
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
							<p>Boot camps have its supporters andit sdetractors. Some people do not
								understand why you should
								have to spend money on boot camp when you can get. Boot camps have
								itssuppor ters andits
								detractors.
							</p>
							<div class="br"></div>
						</aside>
						<aside class="single_sidebar_widget popular_post_widget">
							<h3 class="widget_title">Popular Posts</h3>
							<div class="media post_item">
								<img src="/src/assets/blog/popular-post/post1.jpg" alt="post">
								<div class="media-body">
									<router-link to="blog-details.html">
										<h3>Space The Final Frontier</h3>
									</router-link>
									<p>02 Hours ago</p>
								</div>
							</div>
							<div class="media post_item">
								<img src="/src/assets/blog/popular-post/post2.jpg" alt="post">
								<div class="media-body">
									<router-link to="blog-details.html">
										<h3>The Amazing Hubble</h3>
									</router-link>
									<p>02 Hours ago</p>
								</div>
							</div>
							<div class="media post_item">
								<img src="/src/assets/blog/popular-post/post3.jpg" alt="post">
								<div class="media-body">
									<router-link to="blog-details.html">
										<h3>Astronomy Or Astrology</h3>
									</router-link>
									<p>03 Hours ago</p>
								</div>
							</div>
							<div class="media post_item">
								<img src="/src/assets/blog/popular-post/post4.jpg" alt="post">
								<div class="media-body">
									<router-link to="blog-details.html">
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
								Here, I focus on a range of items and features that we use in life
								without giving them a second thought.
							</p>
							<div class="form-group d-flex flex-row">
								<div class="input-group">
									<div class="input-group-prepend">
										<div class="input-group-text">
											<i class="fa fa-envelope" aria-hidden="true"></i>
										</div>
									</div>
									<input type="text" class="form-control" id="inlineFormInputGroup"
										placeholder="Enter email address"
										onfocus="this.placeholder = ''"
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
