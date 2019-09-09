<template>
  <div class="basket-summary">
    <div class="basket-summary__container">
      <div class="basket-summary__row">
        <span>{{ $t('basket-summary.summary') }}: </span>
        <span>{{ summaryPrice }}</span>
      </div>
      <div class="basket-summary__row">
        <span>{{ $t('basket-summary.delivery') }}: </span>
        <span>{{ deliveryPrice }}</span>
      </div>
      <div class="basket-summary__row basket-summary__row--total">
        <span>{{ $t('basket-summary.total') }}: </span>
        <span>{{ totalPrice }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'basket-summary',
  props: {
    summaryPrice: {
      type: Number,
      required: true
    },
    deliveryPrice: {
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

.basket-summary {
  display: flex;
  justify-content: flex-end;

  &__container {
    width: 100%;
    padding: 1rem;
    margin-top: 2rem;
    background: $colorAlabaster;

    @include media-tablet-up {
      width: 300px;
    }
  }

  &__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.5rem;

    &:first-of-type {
      margin-top: 0;
    }

    &--total {
      margin-top: 1rem;
      padding-top: 1rem;
      font-size: $fontSizeMedium;
      font-weight: $fontWeightBold;
      border-top: 1px solid $colorBlack;
    }
  }
}
</style>
