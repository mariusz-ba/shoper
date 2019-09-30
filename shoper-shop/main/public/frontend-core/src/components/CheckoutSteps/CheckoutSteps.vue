<template>
  <div class="checkout-steps">
    <div
      v-for="(step, index) in steps"
      :key="index"
      class="checkout-steps__step"
      :class="{
        'checkout-steps__step--selected': index <= stepIndex,
        'checkout-steps__step--current': index === stepIndex
      }"
      :style="{zIndex: steps.length - index}"
    >
      <div class="checkout-steps__name">{{ $t(`checkout-steps.${step}`) }}</div>
      <div class="checkout-steps__arrow"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'checkout-steps',
  props: {
    stepIndex: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      steps: [
        'login',
        'delivery',
        'payment',
        'summary',
        'success'
      ]
    };
  }
};
</script>

<style lang="scss">
@import '../../utils/scss/variables/colors';

.checkout-steps {
  $root: &;

  padding: 0 2rem;
  margin: 2rem auto;
  max-width: 1200px;
  display: flex;
  overflow: hidden;

  &__step {
    flex: 1;
    position: relative;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 2.5rem 1.5rem;

    &:not(:last-of-type) {
      #{$root}__name {
        border-right: 0;
      }
    }

    &:not(:first-of-type) {
      #{$root}__name {
        border-left: 0;
      }
    }

    &:last-of-type {
      #{$root}__arrow {
        display: none;
      }
    }

    &--selected {
      #{$root}__name,
      #{$root}__arrow {
        background: $colorMountainMeadow;
        color: $colorWhite;
      }

      #{$root}__arrow {
        border-color: $colorAlabaster;
      }
    }

    &--current {
      #{$root}__arrow {
        border-color: $colorMercury;
      }
    }
  }

  &__name {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid $colorMercury;
    background: $colorAlabaster;
    font-weight: 700;
    z-index: 1;
  }

  &__arrow {
    position: absolute;
    top: 0;
    right: -15px;
    width: 50px;
    height: 50px;
    border-top: 1px solid $colorMercury;
    border-right: 1px solid $colorMercury;
    border-bottom: 1px solid transparent;
    border-left: 1px solid transparent;
    background: $colorAlabaster;
    transform: rotate(45deg);
    z-index: 0;
  }
}
</style>
