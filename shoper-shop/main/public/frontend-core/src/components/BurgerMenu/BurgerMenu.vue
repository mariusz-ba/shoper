<template>
  <aside
    class="burger-menu"
    :class="{'burger-menu--visible': visible}"
  >
    <burger-menu-tree
      :root="true"
      :categories="categories"
    />
  </aside>
</template>

<script>
import BurgerMenuTree from './BurgerMenuTree';

export default {
  name: 'burger-menu',
  components: {
    BurgerMenuTree
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    categories: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style lang="scss">
@import '../../utils/scss/variables/colors';
@import '../../utils/scss/mixins/media';

.burger-menu {
  position: relative;
  z-index: 590;
  display: block;
  position: fixed;
  top: 7rem;
  left: 100%;
  width: calc(100% - 20px);
  max-width: 300px;
  height: 100%;
  transition: transform .3s linear;
  background: getColor('navbarBackground');

  @include media-tablet-up {
    display: none;
  }

  &--visible {
    transform: translateX(-100%);
  }
}
</style>
