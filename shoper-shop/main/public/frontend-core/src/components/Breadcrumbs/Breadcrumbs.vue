<template>
  <div class="breadcrumbs">
    <router-link
      v-for="category in categories"
      :key="category.id"
      class="breadcrumbs__item"
      :to="`/cat/${category.id}`"
    >
      {{ category.name }}
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
  }
};
</script>

<style lang="scss">
@import '../../utils/scss/variables/fonts';
@import '../../utils/scss/variables/colors';

.breadcrumbs {
  display: flex;

  &__item {
    display: inline-block;
    font-size: $fontSizeRegular;
    font-weight: $fontWeightRegular;
    text-decoration: none;
    color: getColor('breadcrumbColor');
    cursor: pointer;

    &:hover {
      color: getColor('breadcrumbColorHover');

      &::after {
        color: getColor('breadcrumbColor');
      }
    }

    &:not(:last-of-type) {
      margin-right: 1rem;

      &::after {
        margin-left: 1rem;
        content: '\B7';
      }
    }
  }
}
</style>
