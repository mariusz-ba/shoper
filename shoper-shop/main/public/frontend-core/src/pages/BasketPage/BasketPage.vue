<template>
  <div class="basket-page">
    <h3
      v-if="products.length === 0"
      class="basket-page__empty"
    >
      Your basket is empty
    </h3>
    <template v-else>
      <h3 class="basket-page__title">Your basket ({{ totalAmount }})</h3>
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
    </template>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import { BasketActionsTypes } from '../../store/modules/basket/basketActions';
import { store } from '../../store/store';
import BasketProductsList from '../../components/BasketProductsList/BasketProductsList';
import BasketSummary from '../../components/BasketSummary/BasketSummary';

export default {
  name: 'basket-page',
  components: {
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
    }
  }
};
</script>

<style lang="scss">
@import '../../utils/scss/variables/fonts';
@import '../../utils/scss/mixins/media';

.basket-page {
  margin: 0 auto;
  padding: 2rem;
  max-width: 1440px;

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
}
</style>
