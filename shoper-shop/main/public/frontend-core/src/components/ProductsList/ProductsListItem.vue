<template>
  <li class="products-list-item">
    <router-link
      class="products-list-item__link"
      :to="productUrl"
    >
      <div class="products-list-item__image-wrapper">
        <img
          class="products-list-item__image"
          :src="product.images[0].url"
          :alt="product.name"
        />
        <span
          v-if="!available"
          class="products-list-item__image-badge"
        >
          {{ $t('products-list-item.outOfStock') }}
        </span>
      </div>
      <div class="products-list-item__details">
        <div class="products-list-item__header">
          <div class="products-list-item__header-left">
            <h3 class="products-list-item__name">{{ product.name }}</h3>
            <h4 class="products-list-item__category">{{ product.category.name }}</h4>
          </div>
          <div class="products-list-item__header-right">
            <p class="products-list-item__price">{{ product.price }}</p>
          </div>
        </div>
        <ul class="products-list-item__variations">
          <li
            v-for="stock in product.stocks"
            :key="stock.id"
            class="products-list-item__variation"
            :class="{'products-list-item__variation--disabled': stock.amount === 0}"
          >
            {{ stock.variation.name }}
          </li>
        </ul>
      </div>
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
    },
    available() {
      for (let i = 0; i < this.product.stocks.length; ++i) {
        if (this.product.stocks[i].amount > 0) {
          return true;
        }
      }

      return false;
    }
  }
};
</script>

<style lang="scss">
@import '../../utils/scss/variables/fonts';
@import '../../utils/scss/variables/colors';

.products-list-item {
  &__link {
    cursor: pointer;
    text-decoration: none;
    color: $colorBlack;
  }

  &__image-wrapper {
    position: relative;
  }

  &__image {
    display: block;
    width: 100%;
    height: auto;
  }

  &__image-badge {
    position: absolute;
    top: 1rem;
    left: 1rem;
    max-width: 50%;
    font-size: $fontSizeXSmall;
    font-weight: $fontWeightRegular;
    padding: .3rem;
    background: $colorGallery;
    border: 1px solid $colorBoulder;
  }

  &__details {
    padding: 1rem;
  }

  &__header {
    display: flex;
    margin-bottom: 1rem;
  }

  &__header-left {
    flex: 1;
  }

  &__name,
  &__price {
    font-size: $fontSizeMedium;
    font-weight: $fontWeightMedium;
  }

  &__category {
    font-size: $fontSizeRegular;
    font-weight: $fontWeightRegular;
    line-height: 1.5;
  }

  &__variations {
    list-style-type: none;
    display: flex;
    flex-wrap: wrap;
  }

  &__variation {
    padding: .2rem .5rem;
    font-size: $fontSizeSmall;
    font-weight: $fontWeightMedium;
    border: 1px solid $colorBoulder;

    &:not(:last-of-type) {
      margin-right: 1rem;
    }

    &--disabled {
      opacity: 0.4;
    }
  }
}
</style>
