<template>
  <div>
    <p v-if="loading">Loading...</p>
    <p v-else-if="error" class="card" style="color: #f85149;">{{ error }}</p>
    <template v-else-if="room">
      <div style="margin-bottom: 1.5rem;">
        <router-link to="/" style="color: var(--muted); font-size: 0.9rem;">← Back to rooms</router-link>
      </div>
      <div class="card" style="margin-bottom: 1.5rem;">
        <div class="thumb" style="height: 200px; border-radius: 10px; margin-bottom: 1rem;">🛏️</div>
        <h1 class="page-title" style="margin-bottom: 0.5rem;">{{ room.name }}</h1>
        <p class="price" style="font-size: 1.25rem;">${{ room.price }} / night</p>
        <p style="color: var(--muted); margin-top: 0.5rem;">Up to {{ room.capacity }} guests · {{ (room.amenities || []).join(', ') }}</p>
      </div>
      <div class="card">
        <h2 style="margin-bottom: 1rem; font-size: 1.1rem;">Book this room</h2>
        <form @submit.prevent="submit" style="display: grid; gap: 1rem; max-width: 400px;">
          <label>
            Your name
            <input v-model="form.guestName" required style="width: 100%; margin-top: 0.35rem;" />
          </label>
          <label>
            Email
            <input v-model="form.guestEmail" type="email" required style="width: 100%; margin-top: 0.35rem;" />
          </label>
          <label>
            Check-in
            <input v-model="form.checkIn" type="date" required style="width: 100%; margin-top: 0.35rem;" />
          </label>
          <label>
            Check-out
            <input v-model="form.checkOut" type="date" required style="width: 100%; margin-top: 0.35rem;" />
          </label>
          <label>
            Guests
            <input v-model.number="form.guests" type="number" min="1" :max="room.capacity" style="width: 100%; margin-top: 0.35rem;" />
          </label>
          <p v-if="submitError" style="color: #f85149; font-size: 0.9rem;">{{ submitError }}</p>
          <p v-if="submitted" style="color: var(--accent);">Booking requested. Check My Bookings for status.</p>
          <button type="submit" class="btn-primary" :disabled="submitted">Request booking</button>
        </form>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getRoom, createBooking } from '../api'

const route = useRoute()
const room = ref(null)
const loading = ref(true)
const error = ref(null)
const submitError = ref(null)
const submitted = ref(false)

const form = reactive({
  guestName: '',
  guestEmail: '',
  checkIn: '',
  checkOut: '',
  guests: 1,
})

onMounted(async () => {
  try {
    room.value = await getRoom(route.params.id)
    form.guests = room.value.capacity
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
})

async function submit() {
  submitError.value = null
  if (form.checkOut <= form.checkIn) {
    submitError.value = 'Check-out must be after check-in.'
    return
  }
  try {
    await createBooking({
      roomId: room.value.id,
      guestName: form.guestName,
      guestEmail: form.guestEmail,
      checkIn: form.checkIn,
      checkOut: form.checkOut,
      guests: form.guests,
    })
    submitted.value = true
  } catch (e) {
    submitError.value = e.message
  }
}
</script>
