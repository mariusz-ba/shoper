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
      <base-select
        id="amount-mobile"
        class="buy-box__size-picker-select"
        :label="$t('buy-box.size_picker_label')"
        :options="variationsOptions"
        v-model="variationId"
      >
        <template v-slot:option="{ label, amount }">
          <div class="buy-box__size-picker-select-option">
            <span>{{ label }}</span>
            <span>
            {{ amount === 0
              ? $t('buy-box.out_of_stock')
              : $t('buy-box.on_stock', [amount])
            }}
            </span>
          </div>
        </template>
      </base-select>
    </div>
    <base-button
      class="buy-box__button"
      :disabled="!variation.id"
      version="primary"
      reversed
      @click="addToCartClickHandler"
    >
      {{ $t('buy-box.add_to_cart') }}
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
import { mapActions } from 'vuex';
import BaseButton from '../Base/BaseButton/BaseButton';
import BaseSelect from '../Base/BaseSelect/BaseSelect';
import BuyBoxModal from './BuyBoxModal';
import BuyBoxModalError from './BuyBoxModalError';
import { BasketActionsTypes } from '../../store/modules/basket/basketActions';

export default {
  name: 'buy-box',
  components: {
    BaseButton,
    BaseSelect,
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
    },
    variationsOptions() {
      return this.stocks.map(stock => ({
        label: stock.variation.name,
        value: stock.variation.id,
        disabled: !stock.amount,
        amount: stock.amount
      }));
    }
  },
  methods: {
    ...mapActions('basket', {
      addProduct: BasketActionsTypes.ADD_PRODUCT
    }),
    addToCartClickHandler() {
      this.addProduct({
        productId: this.productId,
        variationId: this.variationId,
        amount: 1
      })
        .then(() => {
          this.showModalSuccess = true;
        })
        .catch(error => {
          this.errorMessage = error.response.data.message;
          this.showModalError = true;
        });
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

  &__size-picker-select-option {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__button {
    height: 5rem;
    width: 100%;
    font-size: $fontSizeMedium;

    @include media-tablet-up {
      height: 6rem;
    }
  }
}
</style>
