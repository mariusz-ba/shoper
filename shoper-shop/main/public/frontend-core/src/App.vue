<template>
  <div class="app">
    <main-header />
    <router-view />
  </div>
</template>

<script>
import MainHeader from './components/MainHeader/MainHeader.vue';

export default {
  name: 'app',
  components: {
    MainHeader
  }
};
</script>

<style lang="scss">
@import 'utils/scss/variables/global';

.app {
  padding-top: 7rem;
}
</style>
