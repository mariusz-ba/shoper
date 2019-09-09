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
      v-if="stocks && stocks.length"
      class="buy-box__size-picker"
    >
      <p class="buy-box__size-picker-title">{{ $t('buy-box.title') }}</p>
      <select v-model="variationId">
        <option
          value=""
          disabled
        >
          {{ $t('buy-box.title') }}
        </option>
        <option
          v-for="stock in stocks"
          :key="stock.id"
          :value="stock.variation.id"
          :disabled="!stock.amount"
        >
          {{ stock.variation.name }}
        </option>
      </select>
    </div>
    <base-button
      class="buy-box__button"
      :disabled="!variation.id"
      type="primary"
      @click="addToCart"
    >
      {{ $t('buy-box.addToCart') }}
    </base-button>
    <buy-box-modal
      :visible="showModalSuccess"
      :product-details="productDetails"
      @close="showModalSuccess = false"
    />
    <buy-box-modal-error
      :visible="showModalError"
      :message="errorMessage"
      @close="showModalError = false"
    />
  </div>
</template>

<script>
import BuyBoxModal from './BuyBoxModal';
import BuyBoxModalError from './BuyBoxModalError';
import basketService from '../../services/basketService';

export default {
  name: 'buy-box',
  components: {
    BuyBoxModal,
    BuyBoxModalError
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
      type: Number,
      required: true
    },
    stocks: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      variationId: '',
      showModalSuccess: false,
      showModalError: false,
      errorMessage: ''
    };
  },
  computed: {
    variation() {
      const variationStock = this.stocks.find(stock => stock.variation.id === this.variationId);
      return variationStock ? variationStock.variation : {};
    },
    productDetails() {
      return {
        name: this.productName,
        category: this.categoryName,
        variation: this.variation
      };
    }
  },
  methods: {
    addToCart() {
      basketService().addProduct(this.productId, this.variation.id, 1)
        .then(() => {
          this.showModalSuccess = true;
        })
        .catch(error => {
          this.errorMessage = error.response.data.message;
          this.showModalError = true;
        })
    }
  }
};
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
