<template>
  <div class="app">
    <main-header :categories-tree="categoriesTree" />
    <router-view />
    <page-overlay />
  </div>
</template>

<script>
import MainHeader from './components/MainHeader/MainHeader.vue';
import PageOverlay from './components/PageOverlay/PageOverlay.vue';
import { initialState } from './utils/js/initialState';

export default {
  name: 'app',
  components: {
    MainHeader,
    PageOverlay
  },
  data() {
    return {
      categoriesTree: initialState.categoriesTree
    };
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
