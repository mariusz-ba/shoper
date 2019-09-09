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
        <span class="burger-menu-tree__item--back_arrow"></span>
        <span class="burger-menu-tree__item-title">{{ parent.name }}</span>
      </li>
      <li class="burger-menu-tree__item">
        <span
          class="burger-menu-tree__item-title"
          @click="categoryClickHandler(parent, -1)"
        >
          Overview
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
          :parent="category"
          @back="goBackHandler"
        />
      </template>
    </li>
  </ul>
</template>

<script>
import { routesNames } from '../../router/routesNames';

export default {
  name: 'burger-menu-tree',
  props: {
    root: {
      type: Boolean,
      default: false
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
          name: routesNames.productsListPage.name,
          params: {
            category: category.id
          }
        });
      }
    },
    goBackClickHandler() {
      this.$emit('back');
    },
    goBackHandler() {
      this.visibleCategoryIndex = -1;
    }
  }
};
</script>

<style lang="scss">
@import '../../utils/scss/variables/fonts';
@import '../../utils/scss/variables/colors';
@import '../../utils/scss/mixins/iconFont';

.burger-menu-tree {
  padding-top: 2rem;
  list-style-type: none;
  background: $colorWhite;

  &--subcategory {
    padding-top: 0;
    position: absolute;
    top: 0;
    left: 100%;
    width: 100%;
    height: 100%;
    transition: transform 0.3s linear;
  }

  &--subcategory_visible {
    transform: translateX(-100%);
  }

  &__item {
    height: 48px;
    display: flex;
    align-items: center;

    &--back {
      height: 66px;
      border-bottom: 1px solid $colorSilverChalice;
      font-size: $fontSizeMedium;
      font-weight: $fontWeightMedium;
      letter-spacing: 1px;
      text-transform: uppercase;
      margin-bottom: 1.5rem;
    }

    &--back_arrow {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 100%;
      border-right: 1px solid $colorSilverChalice;

      @include iconFont('icon-arrow-left') {
        font-size: $fontSizeMedium;
      }
    }
  }

  &__item-title {
    flex: 1;
    display: block;
    padding: 1.5rem 1.6rem;
  }

  &__item-arrow {
    padding-right: 1.6rem;

    @include iconFont('icon-arrow-right') {
      font-size: $fontSizeMedium;
    }
  }
}
</style>
