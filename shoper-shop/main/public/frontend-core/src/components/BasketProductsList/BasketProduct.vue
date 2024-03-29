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
          <button
            class="basket-product__remove-button"
            @click="removeProductClickHandler"
          ></button>
          <router-link
            class="basket-product__link"
            :to="getProductRoute(productId)"
          >
            <h4 class="basket-product__name">{{ name }}</h4>
            <h5
              v-if="category"
              class="basket-product__category"
            >
              {{ category }}
            </h5>
          </router-link>
          <div class="basket-product__mobile-variation">
            {{ $t('basket-product.variation') }}: {{ variationName }}
          </div>
        </div>
        <div class="basket-product__mobile-footer">
          <div>
            <base-select
              id="amount-mobile"
              class="basket-product__amount-select"
              :label="$t('basket-product.amount')"
              :options="amountOptions"
              v-model="productAmount"
            />
          </div>
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
      <div class="basket-product__column basket-product__column--details">
        <router-link
          class="basket-product__link"
          :to="getProductRoute(productId)"
        >
          <h4 class="basket-product__name">{{ name }}</h4>
          <h5
            v-if="category"
            class="basket-product__category"
          >
            {{ category }}
          </h5>
        </router-link>
        <button @click="removeProductClickHandler">{{ $t('basket-product.remove') }}</button>
      </div>
      <div class="basket-product__column basket-product__column--variation">{{ variationName }}</div>
      <div class="basket-product__column basket-product__column--amount">
        <base-select
          id="amount-desktop"
          class="basket-product__amount-select"
          :options="amountOptions"
          v-model="productAmount"
        />
      </div>
      <div class="basket-product__column basket-product__column--price">{{ totalPrice }}</div>
    </div>
  </div>
</template>

<script>
import BaseSelect from '../Base/BaseSelect/BaseSelect';

export default {
  name: 'basket-product',
  components: {
    BaseSelect
  },
  props: {
    productId: {
      type: Number,
      required: true
    },
    variationId: {
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
    amount: {
      type: Number,
      required: true
    },
    totalPrice: {
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
      productAmount: this.amount
    };
  },
  computed: {
    variationStock() {
      return this.stocks.find(
        stock => stock.variation.id === this.variationId
      );
    },
    variationName() {
      return this.variationStock.variation.name;
    },
    variationAmount() {
      return this.variationStock.amount;
    },
    amountOptions() {
      const options = [];

      for (let i = 0; i < this.variationAmount; ++i) {
        options.push({
          value: i + 1,
          label: `${i + 1}`
        });
      }

      return options;
    }
  },
  watch: {
    productAmount(value) {
      this.$emit('amount-change', {
        productId: this.productId,
        variationId: this.variationId,
        amount: value
      });
    }
  },
  methods: {
    getProductRoute(productId) {
      return {
        name: this.$store.state.routesNames.productDetailsPage.name,
        params: {
          id: productId
        }
      };
    },
    removeProductClickHandler() {
      this.$emit('remove', {
        productId: this.productId,
        variationId: this.variationId
      });
    }
  }
};
</script>

<style lang="scss">
@import '../../utils/scss/variables/fonts';
@import '../../utils/scss/variables/colors';
@import '../../utils/scss/mixins/media';
@import '../../utils/scss/mixins/iconFont';

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

  &__mobile-details {
    position: relative;
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
      grid-template-columns: 10rem 1fr 10rem 12rem 10rem;
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

    &--details {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      justify-content: space-between;
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
    color: $colorBlack;
    transition: color 0.3s linear;

    &:hover {
      color: $colorSquash;
    }
  }

  &__category {
    font-size: $fontSizeRegular;
    font-weight: $fontWeightRegular;
    color: $colorBlack;
  }

  &__remove-button {
    position: absolute;
    top: 0;
    right: 0;

    @include iconFont('icon-garbage') {
      font-size: 2rem;
    }
  }

  &__amount-select {
    width: 10rem;
  }
}
</style>
