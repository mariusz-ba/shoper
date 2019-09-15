<template>
  <ul
    class="burger-menu-tree"
    :class="{
      'burger-menu-tree--subcategory': !root,
      'burger-menu-tree--subcategory_visible': visible
    }"
  >
    <template v-if="!root">
      <li
        class="burger-menu-tree__item burger-menu-tree__item--back"
        @click="goBackClickHandler"
      >
        <div class="burger-menu-tree__item--back_arrow"></div>
        <div class="burger-menu-tree__item-title">
          <span
            v-if="grandParent"
            class="burger-menu-tree__item-title-grandparent"
          >
            {{ grandParent.name }}
          </span>
          <span class="burger-menu-tree__item-title-parent">{{ parent.name }}</span>
        </div>
      </li>
      <li class="burger-menu-tree__item">
        <span
          class="burger-menu-tree__item-title burger-menu-tree__item-title--overview"
          @click="categoryClickHandler(parent, -1)"
        >
          {{ $t('burger-menu-tree.overview') }}
        </span>
      </li>
    </template>
    <li
      v-for="(category, index) in categories"
      :key="category.id"
      class="burger-menu-tree__item"
    >
      <span
        class="burger-menu-tree__item-title"
        @click.stop="categoryClickHandler(category, index)"
      >
        {{ category.name }}
      </span>
      <template v-if="category.children && category.children.length">
        <span class="burger-menu-tree__item-arrow"></span>
        <burger-menu-tree
          :visible="visibleCategoryIndex === index"
          :categories="category.children"
          :grand-parent="parent"
          :parent="category"
          @back="goBackHandler"
          @close="closeBurgerMenu"
        />
      </template>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'burger-menu-tree',
  props: {
    root: {
      type: Boolean,
      default: false
    },
    grandParent: {
      type: Object,
      default: () => {}
    },
    parent: {
      type: Object,
      default: () => {}
    },
    categories: {
      type: Array,
      default: () => []
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visibleCategoryIndex: -1
    };
  },
  methods: {
    categoryClickHandler(category, index) {
      if (category.children && category.children.length && index !== -1) {
        this.visibleCategoryIndex = index;
      } else {
        this.$router.push({
          name: this.$store.state.routesNames.productsListPage.name,
          params: {
            category: category.id
          }
        });
        this.closeBurgerMenu();
      }
    },
    goBackClickHandler() {
      this.$emit('back');
    },
    goBackHandler() {
      this.visibleCategoryIndex = -1;
    },
    closeBurgerMenu() {
      this.$emit('close');
    }
  }
};
</script>

<style lang="scss">
@import '../../utils/scss/variables/fonts';
@import '../../utils/scss/variables/colors';
@import '../../utils/scss/mixins/iconFont';

.burger-menu-tree {
  list-style-type: none;
  background: $colorWhite;

  &--subcategory {
    padding-top: 0;
    position: absolute;
    top: 0;
    left: 100%;
    width: 100%;
    height: 100%;
    transition: transform 0.2s ease-in-out;
  }

  &--subcategory_visible {
    transform: translateX(-100%);
  }

  &__item {
    height: 48px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid $colorMercury;
    cursor: pointer;

    &--back {
      height: 66px;
      border-bottom: 1px solid $colorMercury;
      font-size: $fontSizeMedium;
      font-weight: $fontWeightMedium;
      letter-spacing: 1px;
      text-transform: uppercase;
    }

    &--back_arrow {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 100%;
      border-right: 1px solid $colorMercury;

      @include iconFont('icon-arrow-left') {
        font-size: $fontSizeMedium;
      }
    }
  }

  &__item-title {
    flex: 1;
    display: block;
    padding: 1.5rem 1.6rem;

    &--overview {
      font-weight: $fontWeightMedium;
    }
  }

  &__item-title-grandparent,
  &__item-title-parent {
    display: block;
  }

  &__item-title-grandparent {
    font-size: $fontSizeRegular;
    font-weight: $fontWeightRegular;
    line-height: 1.375;
  }

  &__item-arrow {
    padding-right: 1.6rem;

    @include iconFont('icon-arrow-right') {
      font-size: $fontSizeMedium;
    }
  }
}
</style>
