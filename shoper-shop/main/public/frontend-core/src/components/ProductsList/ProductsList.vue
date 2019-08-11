<template>
  <ul class="products-list">
    <products-list-item
      v-for="product in products"
      :key="product.id"
      class="products-list__item"
      :product="product"
    />
  </ul>
</template>

<script>
import ProductsListItem from './ProductsListItem';

export default {
  name: 'products-list',
  components: {
    ProductsListItem
  },
  props: {
    products: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style lang="scss">
@import '../../utils/scss/variables/colors';
@import '../../utils/scss/mixins/media';

.products-list {
  list-style-type: none;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(2, 1fr);

  @include media-tablet-up {
    grid-template-columns: repeat(3, 1fr);
  }

  &__item {
    &:hover {
      box-shadow: 0 0 5px getColor('productBoxShadow');
    }
  }
}
</style>