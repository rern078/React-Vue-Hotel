import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Rooms from '../views/Rooms.vue'
import RoomDetail from '../views/RoomDetail.vue'
import MyBookings from '../views/MyBookings.vue'
import About from '../views/About.vue'
import Properties from '../views/Properties.vue'
import Gallery from '../views/Gallery.vue'
import Blogs from '../views/Blogs.vue'
import Contacts from '../views/Contacts.vue'
import BlogSingle from '../views/BlogSingle.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/rooms', name: 'Rooms', component: Rooms },
    { path: '/room/:id', name: 'RoomDetail', component: RoomDetail },
    { path: '/my-bookings', name: 'MyBookings', component: MyBookings },
    { path: '/abouts', name: 'About', component: About },
    { path: '/properties', name: 'Properties', component: Properties },
    { path: '/gallerys', name: 'Gallery', component: Gallery },
    { path: '/blogs', name: 'Blogs', component: Blogs },
    { path: '/contacts', name: 'Contacts', component: Contacts },
    { path: '/blogs-single', name: 'BlogSingle', component: BlogSingle },
  ],
})
