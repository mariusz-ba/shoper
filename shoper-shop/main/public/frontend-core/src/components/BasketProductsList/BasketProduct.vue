<template>
  <div class="basket-product">
    <div class="basket-product__mobile">
      <div class="basket-product__mobile-column">
        <img
          class="basket-product__mobile-image"
          :src="image.url"
          :alt="image.type"
        />
      </div>
      <div class="basket-product__mobile-column basket-product__mobile-column--content">
        <div class="basket-product__mobile-details">
          <router-link
            class="basket-product__link"
            :to="`/product/${productId}`"
          >
            <h4 class="basket-product__name">{{ name }}</h4>
            <h5
              v-if="category"
              class="basket-product__category"
            >
              {{ category }}
            </h5>
          </router-link>
          <div class="basket-product__mobile-variation">Variation: {{ variation }}</div>
        </div>
        <div class="basket-product__mobile-footer">
          <div>Amount: {{ amount }}</div>
          <div class="basket-product__mobile-price">{{ totalPrice }}</div>
        </div>
      </div>
    </div>
    <div class="basket-product__columns">
      <div class="basket-product__column basket-product__column--image">
        <img
          class="basket-product__image"
          :src="image.url"
          :alt="image.type"
        />
      </div>
      <div class="basket-product__column">
        <router-link
          class="basket-product__link"
          :to="`/product/${productId}`"
        >
          <h4 class="basket-product__name">{{ name }}</h4>
          <h5
            v-if="category"
            class="basket-product__category"
          >
            {{ category }}
          </h5>
        </router-link>
      </div>
      <div class="basket-product__column basket-product__column--variation">{{ variation }}</div>
      <div class="basket-product__column basket-product__column--amount">{{ amount }}</div>
      <div class="basket-product__column basket-product__column--price">{{ totalPrice }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'basket-product',
  props: {
    productId: {
      type: Number,
      required: true
    },
    image: {
      type: Object,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    category: {
      type: String,
      default: ''
    },
    variation: {
      type: String,
      default: ''
    },
    amount: {
      type: Number,
      required: true
    },
    totalPrice: {
      type: Number,
      required: true
    }
  }
};
</script>

<style lang="scss">
@import '../../utils/scss/variables/fonts';
@import '../../utils/scss/variables/colors';
@import '../../utils/scss/mixins/media';

.basket-product {
  &__mobile {
    display: grid;
    grid-template-columns: 10rem 1fr;

    @include media-tablet-up {
      display: none;
    }
  }

  &__mobile-column {
    &--content {
      padding: 1rem 0 1rem 2rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }

  &__mobile-image {
    display: block;
    width: 100%;
    height: auto;
  }

  &__mobile-variation {
    line-height: 1.5;
  }

  &__mobile-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__mobile-price {
    font-style: italic;
  }

  &__columns {
    display: none;

    @include media-tablet-up {
      display: grid;
      grid-template-columns: 10rem 1fr 10rem 10rem 10rem;
      grid-template-rows: 10rem;
    }
  }

  &__column {
    padding: 1rem;

    &--image {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &--variation,
    &--amount,
    &--price {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &--variation,
    &--amount {
      font-weight: $fontWeightBold;
    }

    &--price {
      justify-content: flex-end;
    }
  }

  &__image {
    display: block;
    width: auto;
    height: 100%;
  }

  &__link {
    cursor: pointer;
    text-decoration: none;
    line-height: 1.5;
  }

  &__name {
    font-size: $fontSizeRegular;
    font-weight: $fontWeightBold;
    color: getColor('basketLinkColor');
    transition: color .3s linear;

    &:hover {
      color: getColor('basketLinkColorHover');
    }
  }

  &__category {
    font-size: $fontSizeRegular;
    font-weight: $fontWeightRegular;
    color: getColor('basketLinkColor');
  }
}
</style>