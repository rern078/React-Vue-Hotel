<template>
  <div>
    <h1 class="page-title">Rooms</h1>
    <p v-if="loading">Loading...</p>
    <p v-else-if="error" class="card" style="color: #f85149;">{{ error }}</p>
    <div v-else class="room-grid">
      <div
        v-for="room in rooms"
        :key="room.id"
        class="room-card"
        @click="$router.push({ name: 'RoomDetail', params: { id: room.id } })"
      >
        <div class="thumb">🛏️</div>
        <div class="body">
          <h3>{{ room.name }}</h3>
          <div class="price">${{ room.price }} <span style="font-weight: 400; color: var(--muted);">/ night</span></div>
          <div class="meta">Up to {{ room.capacity }} guests · {{ (room.amenities || []).join(', ') }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getRooms } from '../api'

const rooms = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    rooms.value = await getRooms()
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
})
</script>
