<template>
  <div class="product-details-page">
    <div class="product-details-page__top">
      <div class="product-details-page__top-column product-details-page__top-column--gallery">
        <product-gallery :images="product.images" />
      </div>
      <div class="product-details-page__top-column product-details-page__top-column--buy_box">
        <buy-box
          :product-id="product.id"
          :product-name="product.name"
          :category-name="product.category.description"
          :price="product.price"
          :variations="product.variations"
        />
      </div>
    </div>
    <div class="product-details-page__middle"></div>
  </div>
</template>

<script>
import BuyBox from '../../components/BuyBox/BuyBox';
import ProductGallery from '../../components/ProductGallery/ProductGallery';
import { ProductsActionsTypes } from '../../store/modules/products/productsActions';
import { store } from '../../store/store';

const routeUpdateHandler = (to, from, next) => {
  store.dispatch(`products/${ProductsActionsTypes.FETCH_PRODUCT}`, to.params.id)
    .then(() => {
      next();
      window.scrollTo(0, 0);
    })
    .catch(() => {
      next('/not-found');
    });
}

export default {
  name: 'product-details-page',
  components: {
    BuyBox,
    ProductGallery
  },
  computed: {
    product() {
      return this.$store.state.products.products[this.$route.params.id] || {};
    }
  },
  beforeRouteEnter: routeUpdateHandler,
  beforeRouteUpdate: routeUpdateHandler
};
</script>

<style lang="scss">
@import '../../utils/scss/mixins/media';

.product-details-page {
  padding: 2rem;

  @include media-tablet-up {
    padding-top: 6rem;
  }

  &__top {
    @include media-tablet-up {
      display: flex;
      margin: 0 -2rem;
    }
  }

  &__top-column {
    position: relative;

    @include media-tablet-up {
      padding: 0 2rem;
    }

    &--gallery {
      @include media-tablet-up {
        width: 60%;
      }
    }

    &--buy_box {
      padding-top: 2rem;

      @include media-tablet-up {
        padding-top: 0;
        width: 40%;
      }
    }
  }
}
</style>