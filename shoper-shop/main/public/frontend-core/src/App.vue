<template>
  <div class="app">
    <main-header :categories-tree="categoriesTree" />
    <router-view />
  </div>
</template>

<script>
import MainHeader from './components/MainHeader/MainHeader.vue';
import initialState from './utils/js/getInitialState';

export default {
  name: 'app',
  components: {
    MainHeader
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

.app {
  padding-top: 7rem;
}
</style>
