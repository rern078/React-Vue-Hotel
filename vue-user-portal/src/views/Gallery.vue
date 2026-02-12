<template>
  <div>
	<!-- ================ start banner area ================= -->
	<section class="contact-banner-area" id="gallery">
		<div class="container h-100">
			<div class="contact-banner">
				<div class="text-center">
					<h1>Gallery</h1>
					<nav aria-label="breadcrumb" class="banner-breadcrumb">
						<ol class="breadcrumb">
							<li class="breadcrumb-item"><router-link to="#">Home</router-link></li>
							<li class="breadcrumb-item active" aria-current="page">Gallery</li>
						</ol>
					</nav>
				</div>
			</div>
		</div>
	</section>
	<!-- ================ end banner area ================= -->

	<!-- ================ start gallery section ================= -->
	<section class="section-margin">
		<div class="container">
			<div class="section-intro text-center pb-80px">
				<div class="section-intro__style">
					<img src="/src/assets/home/bed-icon.png" alt="">
				</div>
				<h2>Our Gallery</h2>
			</div>

			<div class="row">
				<div class="col-md-5">
					<div class="row">
						<div class="col-12 mb-4">
							<router-link to="/" class="img-gal card-img">
								<div class="single-imgs relative">
									<div class="overlay overlay-bg"></div>
									<div class="relative">
										<img class="card-img rounded-0" src="/src/assets/gallery/g1.png"
											alt="">
									</div>
								</div>
							</router-link>
						</div>
						<div class="col-12 mb-4">
							<router-link to="/" class="img-gal card-img">
								<div class="single-imgs relative">
									<div class="overlay overlay-bg"></div>
									<div class="relative">
										<img class="card-img rounded-0" src="/src/assets/gallery/g2.png"
											alt="">
									</div>
								</div>
							</router-link>
						</div>
					</div>
				</div>

				<div class="col-md-7">
					<div class="row">
						<div class="col-sm-7 mb-4">
							<router-link to="/" class="img-gal card-img">
								<div class="single-imgs relative">
									<div class="overlay overlay-bg"></div>
									<div class="relative">
										<img class="card-img rounded-0" src="/src/assets/gallery/g3.png"
											alt="">
									</div>
								</div>
							</router-link>
						</div>
						<div class="col-sm-5 mb-4">
							<router-link to="/" class="img-gal card-img">
								<div class="single-imgs relative">
									<div class="overlay overlay-bg"></div>
									<div class="relative">
										<img class="card-img rounded-0" src="/src/assets/gallery/g4.png"
											alt="">
									</div>
								</div>
							</router-link>
						</div>
					</div>
					<div class="row">
						<div class="col-12 mb-4">
							<router-link href="/" class="img-gal card-img">
								<div class="single-imgs relative">
									<div class="overlay overlay-bg"></div>
									<div class="relative">
										<img class="card-img rounded-0" src="/src/assets/gallery/g5.png"
											alt="">
									</div>
								</div>
							</router-link>
						</div>
					</div>
					<div class="row">
						<div class="col-sm-7 mb-4">
							<router-link href="/" class="img-gal card-img">
								<div class="single-imgs relative">
									<div class="overlay overlay-bg"></div>
									<div class="relative">
										<img class="card-img rounded-0" src="/src/assets/gallery/g6.png"
											alt="">
									</div>
								</div>
							</router-link>
						</div>
						<div class="col-sm-5 mb-4">
							<router-link href="/" class="img-gal card-img">
								<div class="single-imgs relative">
									<div class="overlay overlay-bg"></div>
									<div class="relative">
										<img class="card-img rounded-0" src="/src/assets/gallery/g7.png"
											alt="">
									</div>
								</div>
							</router-link>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
	<!-- ================ end gallery section ================= -->




  </div>
</template>

<script setup>
</script>
