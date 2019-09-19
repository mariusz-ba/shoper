<template>
  <li class="products-list-item">
    <router-link
      class="products-list-item__link"
      :to="productUrl"
    >
      <div class="products-list-item__image-wrapper">
        <lazy-image
          style="display: block;"
          :image-width="606"
          :image-height="875"
        >
          <img
            class="products-list-item__image"
            :src="product.images[0].url"
            :alt="product.name"
          />
        </lazy-image>
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
            <h4 class="products-list-item__category">{{ product.category.name }}</h4>
            <h3 class="products-list-item__name">{{ product.name }}</h3>
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
import LazyImage from '../LazyImage/LazyImage';

export default {
  name: 'products-list-item',
  components: {
    LazyImage
  },
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
        name: this.$store.state.routesNames.productDetailsPage.name,
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
@import '../../utils/scss/mixins/media';

.products-list-item {
  @include media-tablet-up {
    overflow: hidden;
    position: relative;
    padding-bottom: 5rem;

    &:hover &__details {
      bottom: 0;
    }
  }

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
    left: 0;
    font-size: $fontSizeXSmall;
    font-weight: $fontWeightBold;
    text-transform: uppercase;
    background: $colorWhite;
    border: 1px solid $colorGallery;
    border-left: 0;
    padding: 1rem .7rem;

    @include media-tablet-up {
      top: 2rem;
      max-width: 50%;
      font-size: $fontSizeSmall;
      padding: 1rem;
    }
  }

  &__details {
    padding: 1rem;

    @include media-tablet-up {
      position: absolute;
      bottom: -3rem;
      left: 0;
      width: 100%;
      height: auto;
      background: $colorWhite;
      transition: bottom .125s linear;
    }
  }

  &__header {
    display: flex;
    margin-bottom: 1rem;
  }

  &__header-left {
    flex: 1;
  }

  &__header-right {
    text-align: right;
  }

  &__category,
  &__price {
    font-size: $fontSizeSmall;
    line-height: 1.5;
  }

  &__name {
    font-size: $fontSizeSmall;
    font-weight: $fontWeightRegular;
  }

  &__category {
    font-weight: $fontWeightBold;
  }

  &__variations {
    list-style-type: none;
    display: flex;
    flex-wrap: wrap;
  }

  &__variation {
    padding: .2rem 0;
    font-size: $fontSizeSmall;
    font-weight: $fontWeightRegular;

    &:not(:last-of-type) {
      margin-right: 1rem;
    }

    &--disabled {
      opacity: 0.4;
    }
  }
}
</style>
