<template>
  <div>
	<!-- ================ start banner area ================= -->	
	<section class="contact-banner-area" id="contact">
		<div class="container h-100">
			<div class="contact-banner">
				<div class="text-center">
					<h1>Contact Us</h1>
					<nav aria-label="breadcrumb" class="banner-breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
              <li class="breadcrumb-item active" aria-current="page">Contact Us</li>
            </ol>
          </nav>
				</div>
			</div>
    </div>
	</section>
	<!-- ================ end banner area ================= -->


	<section class="section-margin">
    <div class="container">
      <!-- google map start -->
      <div class="d-none d-sm-block mb-5 pb-4">
        <div ref="mapEl" class="contact-map" style="height: 420px;"></div>
      </div>
      <!-- google map end -->


      <div class="row">
        <div class="col-md-4 col-lg-3 mb-4 mb-md-0">
          <div class="media contact-info">
            <span class="contact-info__icon"><i class="ti-home"></i></span>
            <div class="media-body">
              <h3>California United States</h3>
              <p>Santa monica bullevard</p>
            </div>
          </div>
          <div class="media contact-info">
            <span class="contact-info__icon"><i class="ti-headphone"></i></span>
            <div class="media-body">
              <h3><a href="tel:004409865562">00 (440) 9865 562</a></h3>
              <p>Mon to Fri 9am to 6pm</p>
            </div>
          </div>
          <div class="media contact-info">
            <span class="contact-info__icon"><i class="ti-email"></i></span>
            <div class="media-body">
              <h3><a href="mailto:support@colorlib.com">support@colorlib.com</a></h3>
              <p>Send us your query anytime!</p>
            </div>
          </div>
        </div>
        <div class="col-md-8 col-lg-9">
          <form class="row contact_form" action="contact_process.php" method="post" id="contactForm"
              novalidate="novalidate">
              <div class="col-md-6">
                  <div class="form-group">
                      <input type="text" class="form-control" id="name" name="name" placeholder="Enter your name">
                  </div>
                  <div class="form-group">
                      <input type="email" class="form-control" id="email" name="email" placeholder="Enter email address">
                  </div>
                  <div class="form-group">
                      <input type="text" class="form-control" id="subject" name="subject" placeholder="Enter Subject">
                  </div>
              </div>
              <div class="col-md-6">
                  <div class="form-group">
                      <textarea class="form-control different-control" name="message" id="message" rows="5" placeholder="Enter Message"></textarea>
                  </div>
              </div>
              <div class="col-md-12 text-right">
                  <button type="submit" value="submit" class="button-contact"><span>Send Message</span></button>
              </div>
          </form>
        </div>
      </div>
    </div>
  </section>


  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const mapEl = ref(null)

onMounted(() => {
  if (!mapEl.value) return
  const apiKey = 'AIzaSyDpfS1oRGreGSBU5HHjMmQ3o5NLw7VdJ6I'
  if (window.google?.maps) {
    initMap()
    return
  }
  const script = document.createElement('script')
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=__contactsInitMap`
  script.async = true
  script.defer = true
  window.__contactsInitMap = initMap
  document.head.appendChild(script)
})

onUnmounted(() => {
  delete window.__contactsInitMap
})

function initMap() {
  if (!mapEl.value || !window.google?.maps) return
  const grayStyles = [
    {
      featureType: 'all',
      stylers: [
        { saturation: -90 },
        { lightness: 50 }
      ]
    },
    { elementType: 'labels.text.fill', stylers: [{ color: '#A3A3A3' }] }
  ]
  new window.google.maps.Map(mapEl.value, {
    center: { lat: -31.197, lng: 150.744 },
    zoom: 9,
    styles: grayStyles,
    scrollwheel: false
  })
}
</script>
