<template>
  <div class="products-list-page">
    <div class="products-list-page__column products-list-page__column--filters">Filters</div>
    <div class="products-list-page__column products-list-page__column--products">
      <div
        v-if="categoryPath.length"
        class="products-list-page__breadcrumbs"
      >
        <router-link
          v-for="category in categoryPath"
          :key="category.id"
          class="products-list-page__breadcrumb"
          :to="`/cat/${category.id}`"
        >
          {{ category.name }}
        </router-link>
      </div>
      <ul class="products-list-page__products">
        <li
          v-for="product in productsList"
          :key="product.id"
          class="products-list-page__product"
        >
          <router-link
            class="products-list-page__product-link"
            :to="`/product/${product.id}/${product.name.toLowerCase().replace(/\s+/g, '-')}`"
          >
            <img
              class="products-list-page__product-image"
              :src="product.images[0].url"
              :alt="product.name"
            />
            <h3 class="products-list-page__product-name">{{ product.name }}</h3>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import { ProductsActionsTypes } from '../../store/modules/products/productsActions';

export default {
  name: 'products-list-page',
  computed: {
    ...mapState('products', ['categoryPath']),
    ...mapGetters('products', ['productsList']),
  },
  watch: {
    '$route': {
      immediate: true,
      handler(to, from) {
        if (!from || to.params.category !== from.params.category) {
          this.fetchProducts({ category: to.params.category });
        }
      }
    }
  },
  methods: {
    ...mapActions('products', {
      fetchProducts: ProductsActionsTypes.FETCH_PRODUCTS
    })
  }
};
</script>

<style lang="scss">
@import '../../utils/scss/variables/fonts';
@import '../../utils/scss/variables/colors';
@import '../../utils/scss/mixins/media';

.products-list-page {
  margin: 0 auto;
  padding: 2rem;
  max-width: 1440px;

  @include media-tablet-up {
    display: flex;
  }

  &__column {
    flex: 1;

    &--filters {
      flex: 0 0 225px;
    }
  }

  &__breadcrumbs {
    display: flex;
  }

  &__breadcrumb {
    display: inline-block;
    margin-bottom: 2rem;
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

  &__products {
    list-style-type: none;
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(2, 1fr);

    @include media-tablet-up {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
  }

  &__product {
    &:hover {
      box-shadow: 0 0 5px getColor('productBoxShadow');
    }
  }

  &__product-link {
    cursor: pointer;
    text-decoration: none;
    color: getColor('productBoxLink');
  }

  &__product-image {
    display: block;
    width: 100%;
    height: auto;
  }

  &__product-name {
    padding: 1rem;
  }
}
</style>
