<template>
  <aside
    class="burger-menu"
    :class="{'burger-menu--visible': visible}"
  >
    <header class="burger-menu__header">
      <span class="burger-menu__header-title">{{ $t('burger-menu.title') }}</span>
      <button
        class="burger-menu__close-button"
        :title="$t('burger-menu.close_button')"
        @click="closeButtonClickHandler"
      >
      </button>
    </header>
    <div class="burger-menu__tree">
      <burger-menu-tree
        :root="true"
        :categories="categories"
        @close="closeButtonClickHandler"
      />
    </div>
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
  },
  methods: {
    closeButtonClickHandler() {
      this.$emit('close');
    }
  }
};
</script>

<style lang="scss">
@import '../../utils/scss/variables/colors';
@import '../../utils/scss/variables/fonts';
@import '../../utils/scss/mixins/media';
@import '../../utils/scss/mixins/iconFont';

.burger-menu {
  overflow: hidden;
  position: relative;
  z-index: 700;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  right: 100%;
  width: 100%;
  max-width: 320px;
  height: 100%;
  transition: transform 0.2s ease-in-out;
  background: $colorWhite;

  @include media-tablet-up {
    display: none;
  }

  &--visible {
    transform: translateX(100%);
  }

  &__header {
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1.5rem;
    background: $colorGallery;
    border-bottom: 1px solid $colorMercury;
  }

  &__header-title {
    font-size: $fontSizeMedium;
    font-weight: $fontWeightMedium;
  }

  &__close-button {
    border: 0;
    outline: 0;
    background: transparent;
    cursor: pointer;

    @include iconFont('icon-close') {
      font-size: $fontSizeMedium;
    }
  }

  &__tree {
    position: relative;
    flex: 1;
  }
}
</style>
