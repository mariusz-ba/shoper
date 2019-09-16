<template>
  <div class="app">
    <main-header />
    <router-view />
    <page-overlay />
  </div>
</template>

<script>
import MainHeader from './components/MainHeader/MainHeader.vue';
import PageOverlay from './components/PageOverlay/PageOverlay.vue';

export default {
  name: 'app',
  components: {
    MainHeader,
    PageOverlay
  }
};
</script>

<style lang="scss">
@import 'utils/scss/variables/global';
@import 'utils/scss/mixins/media';

.app {
  padding-top: 7rem;

  @include media-tablet-up {
    padding-top: 11.6rem;
  }
}
</style>
