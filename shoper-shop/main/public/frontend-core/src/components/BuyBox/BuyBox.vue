<template>
  <div class="buy-box">
    <div class="buy-box__header">
      <div class="buy-box__header-names">
        <h3 class="buy-box__category">{{ categoryName }}</h3>
        <h1 class="buy-box__name">{{ productName }}</h1>
      </div>
      <div class="buy-box__header-prices">
        <p class="buy-box__price">{{ price }}</p>
      </div>
    </div>
    <div
      v-if="variations && variations.length"
      class="buy-box__size-picker"
    >
      <p class="buy-box__size-picker-title">Pick your size</p>
      <select v-model="variationId">
        <option
          value=""
          disabled
        >
          Select your size
        </option>
        <option
          v-for="variation in variations"
          :key="variation.id"
          :value="variation.id"
        >
          {{ variation.name }}
        </option>
      </select>
    </div>
    <base-button
      class="buy-box__button"
      :disabled="!variation"
      @click="addToCart"
    >
      Add to cart
    </base-button>
  </div>
</template>

<script>
import BaseButton from '../../components/BaseButton/BaseButton';
import basketService from '../../services/basketService';

export default {
  name: 'buy-box',
  components: {
    BaseButton
  },
  props: {
    productId: {
      type: Number,
      required: true
    },
    productName: {
      type: String,
      required: true
    },
    categoryName: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    },
    variations: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      variationId: ''
    }
  },
  computed: {
    variation() {
      return this.variations
        ? this.variations.find(variation => variation.id === this.variationId)
        : {};
    }
  },
  methods: {
    addToCart() {
      basketService().addProduct(this.productId, this.variations.id, 1);
    }
  }
}
</script>

<style lang="scss">
@import '../../utils/scss/mixins/media';
@import '../../utils/scss/variables/fonts';

.buy-box {
  &__header {
    display: flex;
    margin-bottom: 2rem;
  }

  &__header-names {
    flex: 1;
  }

  &__header-prices {
    max-width: 100px;
  }

  &__category,
  &__price {
    font-size: $fontSizeMedium;
    font-weight: $fontWeightRegular;
    line-height: 1.5;
  }

  &__price {
    text-align: right;
  }

  &__name {
    font-size: $fontSizeLarge;
    font-weight: $fontWeightBold;
  }

  &__size-picker {
    margin-bottom: 2rem;
  }

  &__size-picker-title {
    margin-bottom: 1rem;
    font-size: $fontSizeMedium;
  }

  &__button {
    height: 5rem;
    width: 100%;

    @include media-tablet-up {
      height: 6rem;
    }
  }
}
</style>