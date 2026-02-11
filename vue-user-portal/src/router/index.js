import { createRouter, createWebHistory } from 'vue-router'
import Rooms from '../views/Rooms.vue'
import RoomDetail from '../views/RoomDetail.vue'
import MyBookings from '../views/MyBookings.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Rooms', component: Rooms },
    { path: '/room/:id', name: 'RoomDetail', component: RoomDetail },
    { path: '/my-bookings', name: 'MyBookings', component: MyBookings },
  ],
})
