<template>
  <div
    class="base-input"
    :class="{
      'base-input--error': error,
      'base-input--disabled': disabled
    }"
  >
    <div class="base-input__container">
      <input
        ref="input"
        :id="id"
        class="base-input__input"
        :name="name"
        :value="value"
        :type="inputType"
        :placeholder="inputPlaceholder"
        :aria-invalid="String(!!error)"
        @input="inputHandler"
        @focus="focused = true"
        @blur="focused = false"
        :disabled="disabled"
      />
      <label
        v-if="label"
        :for="id"
        class="base-input__label"
        :class="{
          'base-input__label--floated': value,
          'base-input__label--required': required
        }"
      >
        {{ label }}
      </label>
      <span
        v-if="type === 'password'"
        class="base-input__button"
        :class="{'base-input__button--visible': passwordVisible}"
        @mousedown="togglePasswordVisibility"
      >
      </span>
    </div>
    <p
      v-if="error"
      class="base-input__error"
    >
      {{ error }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'base-input',
  props: {
    id: String,
    name: String,
    label: String,
    value: String,
    error: String,
    placeholder: String,
    required: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'text'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      focused: false,
      passwordVisible: false
    };
  },
  computed: {
    inputPlaceholder() {
      return this.value || this.focused ? this.placeholder : null;
    },
    inputType() {
      switch (this.type) {
        case 'password':
          return this.passwordVisible ? 'text' : 'password';
        default:
          return this.type;
      }
    }
  },
  methods: {
    inputHandler(event) {
      this.$emit('input', event.target.value);
    },
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    }
  }
}
</script>

<style lang="scss">
@import '../../../utils/scss/variables/colors';
@import '../../../utils/scss/variables/fonts';
@import '../../../utils/scss/mixins/iconFont';

.base-input {
  $root: &;

  color: $colorMineShaft;

  &--error {
    #{$root}__label {
      color: $colorRed;
    }

    #{$root}__input {
      border-color: $colorRed;
    }
  }

  &--disabled {
    color: $colorSilverChaliceDark;
    pointer-events: none;
  }

  &__container {
    position: relative;
  }

  &__button {
    position: absolute;
    top: 50%;
    right: 1rem;
    width: 2rem;
    height: 2rem;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &::before {
      font-size: 2rem;
    }

    @include iconFont('icon-eye-hide');

    &--visible {
      @include iconFont('icon-eye-visible');
    }
  }

  &__input {
    outline: 0;
    width: 100%;
    height: 4.5rem;
    padding: .5rem 1rem;
    font-size: $fontSizeRegular;
    font-weight: $fontWeightRegular;
    border: 1px solid $colorBoulder;
    background: $colorWhite;

    &:focus {
      border-color: $colorAzureRadiance;
      box-shadow: 0 0 0 1px $colorAzureRadiance;
    }

    &[disabled] {
      border-color: $colorSilverChaliceDark;
    }
  }

  &__input:focus + &__label {
    top: 0;
    transform: translateY(-50%) scale(0.85);
  }

  &__label {
    padding: .2rem .5rem;
    position: absolute;
    top: 50%;
    left: .5rem;
    max-width: calc(100% - 1rem);
    font-size: $fontSizeRegular;
    transform: translateY(-50%);
    transform-origin: left center;
    transition: top .125s linear, transform .125s linear;
    background: $colorWhite;
    pointer-events: none;

    &--floated {
      top: 0;
      transform: translateY(-50%) scale(0.85);
    }

    &--required {
      &::after {
        content: '*';
      }
    }
  }

  &__error {
    margin-top: .4rem;
    font-size: $fontSizeRegular;
    font-weight: $fontWeightRegular;
    color: $colorRed;
  }
}
</style>
