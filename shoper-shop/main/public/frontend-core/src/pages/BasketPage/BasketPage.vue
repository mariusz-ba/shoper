<template>
  <div class="basket-page">
    <h3
      v-if="products.length === 0"
      class="basket-page__empty"
    >
      {{ $t('basket-page.empty') }}
    </h3>
    <template v-else>
      <div class="basket-page__header">
        <base-button
          class="basket-page__button"
          @click="continueShoppingClickHandler"
        >
          Continue shopping
        </base-button>
        <base-button
          class="basket-page__button basket-page__button--checkout"
          version="success"
          reversed
          @click="checkoutClickHandler"
        >
          Checkout
        </base-button>
      </div>
      <h3 class="basket-page__title">
        {{ $t('basket-page.title', { amount: totalAmount }) }}
      </h3>
      <basket-products-list
        :products="products"
        @amount-change="productAmountChangeHandler"
        @remove="productRemoveHandler"
      />
      <basket-summary
        :summary-price="summary.summaryPrice"
        :delivery-price="summary.deliveryPrice"
        :total-price="summary.totalPrice"
      />
      <div class="basket-page__footer">
        <base-button
          class="basket-page__button basket-page__button--checkout"
          version="success"
          reversed
          @click="checkoutClickHandler"
        >
          Checkout
        </base-button>
      </div>
    </template>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import { BasketActionsTypes } from '../../store/modules/basket/basketActions';
import { store } from '../../store/store';
import BaseButton from '../../components/Base/BaseButton/BaseButton';
import BasketProductsList from '../../components/BasketProductsList/BasketProductsList';
import BasketSummary from '../../components/BasketSummary/BasketSummary';

export default {
  name: 'basket-page',
  components: {
    BaseButton,
    BasketProductsList,
    BasketSummary
  },
  computed: {
    ...mapState('basket', ['products', 'summary']),
    ...mapGetters('basket', ['totalAmount'])
  },
  beforeRouteEnter(to, from, next) {
    store
      .dispatch(`basket/${BasketActionsTypes.FETCH_PRODUCTS}`)
      .then(() => {
        next();
      })
      .catch(() => {
        next();
      });
  },
  methods: {
    ...mapActions('basket', {
      updateProduct: BasketActionsTypes.UPDATE_PRODUCT,
      removeProduct: BasketActionsTypes.REMOVE_PRODUCT
    }),
    productAmountChangeHandler(data) {
      this.updateProduct(data);
    },
    productRemoveHandler(data) {
      this.removeProduct(data)
    },
    checkoutClickHandler() {
      this.$router.push({ name: this.$store.state.routesNames.checkoutLogin.name });
    },
    continueShoppingClickHandler() {
      this.$router.push({ name: this.$store.state.routesNames.homePage.name });
    }
  }
};
</script>

<style lang="scss">
@import '../../utils/scss/variables/fonts';
@import '../../utils/scss/mixins/iconFont';
@import '../../utils/scss/mixins/media';

.basket-page {
  margin: 0 auto;
  padding: 2rem;
  max-width: 1200px;

  @include media-tablet-up {
    padding: 3rem 2rem 2rem;
  }

  &__title,
  &__empty {
    font-size: $fontSizeXMedium;
    font-weight: $fontWeightMedium;
    margin-bottom: 2rem;

    @include media-tablet-up {
      font-size: $fontSizeXMedium;
    }
  }

  &__header {
    margin-bottom: 2rem;

    @include media-tablet-up {
      display: flex;
      justify-content: space-between;
    }
  }

  &__footer {
    margin-top: 2rem;

    @include media-tablet-up {
      display: flex;
      justify-content: flex-end;
    }
  }

  &__button {
    width: 100%;
    height: 5rem;

    &:not(:last-of-type) {
      margin-bottom: 2rem;
    }

    @include media-tablet-up {
      width: auto;

      &:not(:last-of-type) {
        margin-bottom: 0;
      }
    }

    &--checkout {
      display: flex;
      align-items: center;
      justify-content: center;

      @include iconFont('icon-lock') {
        font-size: 1.4rem;
        margin-right: 1rem;
      }

      @include media-tablet-up {
        min-width: 300px;
      }
    }
  }
}
</style>
