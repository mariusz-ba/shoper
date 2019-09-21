<template>
  <div class="breadcrumbs">
    <router-link
      v-for="category in categories"
      :key="category.id"
      class="breadcrumbs__item"
      :to="getCategoryRoute(category.id)"
    >
      <span>{{ category.name }}</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'breadcrumbs',
  props: {
    categories: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    getCategoryRoute(categoryId) {
      return {
        name: this.$store.state.routesNames.productsListPage.name,
        params: {
          category: categoryId
        }
      };
    }
  }
};
</script>

<style lang="scss">
@import '../../utils/scss/variables/fonts';
@import '../../utils/scss/variables/colors';
@import '../../utils/scss/mixins/iconFont';

.breadcrumbs {
  display: flex;

  &__item {
    display: inline-block;
    font-size: $fontSizeRegular;
    font-weight: $fontWeightRegular;
    text-decoration: none;
    color: $colorDustGray;
    cursor: pointer;

    &:hover {
      color: $colorBlack;

      &::after {
        color: $colorDustGray;
      }

      span {
        border-bottom: 2px solid $colorBlack;
      }
    }

    &:not(:last-of-type) {
      margin-right: 1rem;

      @include iconFont('icon-arrow-right', after) {
        margin-left: 1rem;
        font-size: 0.8rem;
      }
    }
  }
}
</style>
