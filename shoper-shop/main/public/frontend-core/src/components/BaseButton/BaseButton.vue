<template>
  <button
    class="base-button"
    :class="{
      'base-button--primary': type === 'primary',
      'base-button--success': type === 'success',
      'base-button--danger': type === 'danger'
    }"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'base-button',
  props: {
    type: {
      type: String,
      default: ''
    }
  }
};
</script>

<style lang="scss">
@import '../../utils/scss/variables/colors';
@import '../../utils/scss/variables/fonts';

.base-button {
  cursor: pointer;
  border: 0;
  outline: 0;
  padding: 1rem 1.5rem;
  font-family: $fontFamily;
  font-size: $fontSizeRegular;
  font-weight: $fontWeightMedium;
  color: $colorBlack;
  background: $colorAlabaster;
  border: 1px solid $colorDustGray;
  transition: background 0.3s linear;

  &[disabled] {
    background: $colorDustGray !important;
    cursor: default !important;
  }

  &:hover {
    background: darken($colorAlabaster, 10%);
  }

  &--primary,
  &--success,
  &--danger {
    color: $colorWhite;
  }

  &--primary {
    background: $colorSquash;
    border-color: darken($colorSquash, 10%);

    &:hover {
      background: darken($colorSquash, 5%);
    }
  }

  &--success {
    background: $colorAtlantis;
    border-color: darken($colorAtlantis, 10%);

    &:hover {
      background: darken($colorAtlantis, 5%);
    }
  }

  &--danger {
    background: $colorMonza;
    border-color: darken($colorMonza, 10%);

    &:hover {
      background: darken($colorMonza, 5%);
    }
  }
}
</style>
