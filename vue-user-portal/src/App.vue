<template>
  <SiteHeader />
  <router-view />
  <SiteFooter />
</template>

<script>
import SiteHeader from './components/SiteHeader.vue';
import SiteFooter from './components/SiteFooter.vue';

export default {
  name: 'App',
  components: {
    SiteHeader,
    SiteFooter,
  },
};
</script>