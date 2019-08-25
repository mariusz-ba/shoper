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
  color: getColor('buttonText');
  background: getColor('buttonBackground');
  border: 1px solid getColor('buttonBorder');
  transition: background 0.3s linear;

  &[disabled] {
    background: getColor('buttonDisabledBackground') !important;
    cursor: default !important;
  }

  &:hover {
    background: getColor('buttonBackgroundHover');
  }

  &--primary,
  &--success,
  &--danger {
    color: getColor('buttonTextAlt');
  }

  &--primary {
    background: getColor('buttonPrimaryBackground');
    border-color: getColor('buttonPrimaryBorder');

    &:hover {
      background: getColor('buttonPrimaryBackgroundHover');
    }
  }

  &--success {
    background: getColor('buttonSuccessBackground');
    border-color: getColor('buttonSuccessBorder');

    &:hover {
      background: getColor('buttonSuccessBackgroundHover');
    }
  }

  &--danger {
    background: getColor('buttonDangerBackground');
    border-color: getColor('buttonDangerBorder');

    &:hover {
      background: getColor('buttonDangerBackgroundHover');
    }
  }
}
</style>
