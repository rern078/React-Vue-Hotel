<template>
  <div>
    <header class="header">
      <h1>Hotel</h1>
      <nav>
        <router-link to="/">Rooms</router-link>
        <router-link to="/my-bookings">My Bookings</router-link>
      </nav>
    </header>
    <main class="container">
      <router-view />
    </main>
  </div>
</template>

<script setup>
</script>
