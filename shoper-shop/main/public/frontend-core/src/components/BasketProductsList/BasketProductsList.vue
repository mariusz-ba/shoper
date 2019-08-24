<template>
  <div class="basket-products-list">
    <div class="basket-products-list__header">
      <div class="basket-products-list__header-cell">Product</div>
      <div class="basket-products-list__header-cell"></div>
      <div class="basket-products-list__header-cell basket-products-list__header-cell--variation">Variation</div>
      <div class="basket-products-list__header-cell basket-products-list__header-cell--amount">Amount</div>
      <div class="basket-products-list__header-cell basket-products-list__header-cell--price">Price</div>
    </div>
    <div class="basket-products-list__products">
      <basket-product
        v-for="product in products"
        :key="`${product.productId}-${product.variationId}`"
        class="basket-products-list__product"
        :product-id="product.productId"
        :variation-id="product.variationId"
        :name="product.productDetails.name"
        :image="product.productDetails.images[0]"
        :amount="product.amount"
        :category="product.productDetails.category.description"
        :stocks="product.productDetails.stocks"
        :total-price="product.totalPrice"
        @amount-change="productAmountChangeHandler"
        @remove="productRemoveHandler"
      />
    </div>
  </div>
</template>

<script>
import BasketProduct from './BasketProduct';

export default {
  name: 'basket-products-list',
  components: {
    BasketProduct
  },
  props: {
    products: {
      type: Array,
      required: true
    }
  },
  methods: {
    productAmountChangeHandler(data) {
      this.$emit('amount-change', data);
    },
    productRemoveHandler(data) {
      this.$emit('remove', data);
    }
  }
};
</script>

<style lang="scss">
@import '../../utils/scss/variables/colors';
@import '../../utils/scss/mixins/media';

.basket-products-list {
  &__header {
    display: none;

    @include media-tablet-up {
      display: grid;
      grid-template-columns: 10rem 1fr 10rem 10rem 10rem;
      border-bottom: 1px solid getColor('basketHeaderBorder');
    }
  }

  &__header-cell {
    padding: 1rem;
    font-weight: 700;

    &--variation,
    &--amount {
      text-align: center;
    }

    &--price {
      text-align: right;
    }
  }

  &__product {
    &:not(:last-of-type) {
      margin-bottom: 1rem;
    }

    @include media-tablet-up {
      &:not(:last-of-type) {
        margin-bottom: 0;
      }

      &:nth-of-type(2n-1) {
        background: getColor('basketSummaryBackground');
      }
    }
  }
}
</style>
