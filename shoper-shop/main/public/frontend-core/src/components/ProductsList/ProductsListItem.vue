<template>
  <li class="products-list-item">
    <router-link
      class="products-list-item__link"
      :to="productUrl"
    >
      <img
        class="products-list-item__image"
        :src="product.images[0].url"
        :alt="product.name"
      />
      <h3 class="products-list-item__name">{{ product.name }}</h3>
      <p class="products-list-item__price">{{ product.price }}</p>
    </router-link>
  </li>
</template>

<script>
import { routesNames } from '../../router/routesNames';

export default {
  name: 'products-list-item',
  props: {
    product: {
      type: Object,
      default: () => ({
        id: '',
        name: '',
        images: [],
        price: 0
      })
    }
  },
  computed: {
    productUrl() {
      return {
        name: routesNames.productDetailsPage.name,
        params: {
          id: this.product.id
        }
      };
    }
  }
};
</script>

<style lang="scss">
@import '../../utils/scss/variables/colors';

.products-list-item {
  &__link {
    cursor: pointer;
    text-decoration: none;
    color: getColor('productBoxLink');
  }

  &__image {
    display: block;
    width: 100%;
    height: auto;
  }

  &__name {
    padding: 1rem;
  }
}
</style>
