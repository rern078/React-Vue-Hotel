<template>
  <div>
    <h1 class="page-title">My Bookings</h1>
    <div class="card" style="margin-bottom: 1.5rem;">
      <label>
        Enter your email to view bookings
        <input v-model="email" type="email" placeholder="you@example.com" style="width: 100%; max-width: 320px; margin-top: 0.5rem;" @keyup.enter="load" />
      </label>
      <button class="btn-primary" style="margin-top: 0.75rem;" @click="load" :disabled="!email.trim()">Load</button>
    </div>
    <p v-if="loading">Loading...</p>
    <p v-else-if="searched && bookings.length === 0" class="card" style="color: var(--muted);">No bookings found for this email.</p>
    <div v-else-if="bookings.length" class="card">
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="border-bottom: 1px solid var(--border);">
            <th style="text-align: left; padding: 0.75rem; color: var(--muted); font-size: 0.85rem;">Room</th>
            <th style="text-align: left; padding: 0.75rem; color: var(--muted); font-size: 0.85rem;">Check-in</th>
            <th style="text-align: left; padding: 0.75rem; color: var(--muted); font-size: 0.85rem;">Check-out</th>
            <th style="text-align: left; padding: 0.75rem; color: var(--muted); font-size: 0.85rem;">Guests</th>
            <th style="text-align: left; padding: 0.75rem; color: var(--muted); font-size: 0.85rem;">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="b in bookings" :key="b.id" style="border-bottom: 1px solid var(--border);">
            <td style="padding: 0.75rem;">{{ b.room?.name }}</td>
            <td style="padding: 0.75rem;">{{ b.checkIn }}</td>
            <td style="padding: 0.75rem;">{{ b.checkOut }}</td>
            <td style="padding: 0.75rem;">{{ b.guests }}</td>
            <td style="padding: 0.75rem;"><span :class="['badge', b.status]">{{ b.status }}</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { getBookingsByEmail } from '../api'

const email = ref('')
const bookings = ref([])
const loading = ref(false)
const searched = ref(false)

async function load() {
  if (!email.value.trim()) return
  loading.value = true
  searched.value = true
  try {
    bookings.value = await getBookingsByEmail(email.value.trim())
  } catch {
    bookings.value = []
  } finally {
    loading.value = false
  }
}
</script>
