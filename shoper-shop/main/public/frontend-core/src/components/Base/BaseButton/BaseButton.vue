<template>
  <button
    class="base-button"
    :class="{
      'base-button--primary': version === 'primary',
      'base-button--success': version === 'success',
      'base-button--danger': version === 'danger',
      'base-button--reversed': reversed
    }"
    v-on="$listeners"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'base-button',
  props: {
    version: {
      type: String,
      default: ''
    },
    reversed: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss">
@import '../../../utils/scss/variables/colors';
@import '../../../utils/scss/variables/fonts';

.base-button {
  $root: &;

  cursor: pointer;
  border: 0;
  outline: 0;
  padding: 1rem 1.5rem;
  font-family: $fontFamily;
  font-size: $fontSizeRegular;
  font-weight: $fontWeightBold;
  color: $colorBlack;
  background: transparent;
  border: 2px solid $colorBlack;
  transition: background 0.3s linear, color 0.3s linear;

  &[disabled] {
    color: $colorBoulder !important;
    background: transparent !important;
    border-color: $colorDustGray !important;
    cursor: not-allowed;

    &:hover {
      color: $colorBoulder !important;
      background: transparent !important;
    }
  }

  &:hover {
    background: $colorBlack;
    color: $colorWhite;
  }

  &--reversed {
    color: $colorWhite;
    background: $colorBlack;

    &:hover {
      color: $colorBlack;
      background: transparent;
    }
  }

  &--primary,
  &--success,
  &--danger {
    color: $colorWhite;
  }

  &--primary {
    color: $colorSquash;
    border-color: $colorSquash;

    &:hover {
      color: $colorWhite;
      background: $colorSquash;
    }

    &#{$root}--reversed {
      color: $colorWhite;
      background: $colorSquash;
      border-color: $colorSquash;

      &:hover {
        color: $colorSquash;
        background: transparent;
      }
    }
  }

  &--success {
    color: $colorMalachite;
    border-color: $colorMalachite;

    &:hover {
      color: $colorWhite;
      background: $colorMalachite;
    }

    &#{$root}--reversed {
      color: $colorWhite;
      background: $colorMalachite;
      border-color: $colorMalachite;

      &:hover {
        color: $colorMalachite;
        background: transparent;
      }
    }
  }

  &--danger {
    color: $colorRed;
    border-color: $colorRed;

    &:hover {
      color: $colorWhite;
      background: $colorRed;
    }

    &#{$root}--reversed {
      color: $colorWhite;
      background: $colorRed;
      border-color: $colorRed;

      &:hover {
        color: $colorRed;
        background: transparent;
      }
    }
  }
}
</style>
