<template>
  <div
    class="base-textarea"
    :class="{'base-textarea--disabled': disabled}"
  >
    <div class="base-textarea__container">
      <textarea
        ref="textarea"
        :id="id"
        class="base-textarea__textarea"
        :class="{'base-textarea__textarea--error': error}"
        :rows="rows"
        :name="name"
        :value="value"
        :placeholder="textareaPlaceholder"
        :aria-invalid="String(!!error)"
        :disabled="disabled"
        @input="inputHandler"
        @focus="focused = true"
        @blur="focused = false"
      ></textarea>
      <label
        v-if="label"
        :for="id"
        class="base-textarea__label"
        :class="{
          'base-textarea__label--floated': value,
          'base-textarea__label--required': required
        }"
      >
        {{ label }}
      </label>
    </div>
    <p
      v-if="error"
      class="base-textarea__error"
    >
      {{ error }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'base-textarea',
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
    rows: {
      type: Number,
      default: 1
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      focused: false
    };
  },
  computed: {
    textareaPlaceholder() {
      return this.value || this.focused ? this.placeholder : null;
    }
  },
  methods: {
    inputHandler(event) {
      this.$emit('input', event.target.value);
    }
  }
}
</script>

<style lang="scss">
@import '../../../utils/scss/variables/colors';
@import '../../../utils/scss/variables/fonts';

.base-textarea {
  color: $colorMineShaft;

  &--disabled {
    color: $colorSilverChaliceDark;
    pointer-events: none;
  }

  &__container {
    position: relative;
  }

  &__textarea {
    display: block;
    resize: vertical;
    outline: 0;
    width: 100%;
    min-height: 4.5rem;
    padding: 1rem;
    font-size: $fontSizeRegular;
    font-weight: $fontWeightRegular;
    border: 1px solid $colorBoulder;
    background: $colorWhite;

    &--error {
      border-color: $colorShiraz;
    }

    &:focus {
      border-color: $colorElectricViolet;
      box-shadow: 0 0 0 1px $colorElectricViolet;
    }

    &[disabled] {
      border-color: $colorSilverChaliceDark;
    }
  }

  &__textarea:focus + &__label {
    top: 0;
    transform: translateY(-50%) scale(0.85);
  }

  &__label {
    padding: .2rem .5rem;
    position: absolute;
    top: 1rem;
    left: .5rem;
    max-width: calc(100% - 1rem);
    font-size: $fontSizeRegular;
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
    color: $colorShiraz;
  }
}
</style>