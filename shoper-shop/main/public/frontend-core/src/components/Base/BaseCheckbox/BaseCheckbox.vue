<template>
  <div
    class="base-checkbox"
    :class="{'base-checkbox--disabled': disabled}"
  >
    <input
      class="base-checkbox__input"
      type="checkbox"
      :id="id"
      :name="name"
      :value="val"
      :disabled="disabled"
      :aria-invalid="error"
      v-model="checked"
      @change="changeHandler"
    />
    <label
      class="base-checkbox__label"
      :for="id"
    >
      <div
        class="base-checkbox__rect"
        :class="{'base-checkbox__rect--disabled': disabled}"
      ></div>
      <span
        v-if="$slots.default"
        class="base-checkbox__text"
        :class="{'base-checkbox__text--required': required}"
      >
        <slot></slot>
      </span>
    </label>
    <p
      v-if="error"
      class="base-checkbox__error"
    >
      {{ error }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'base-checkbox',
  props: {
    id: String,
    val: [Boolean, String, Number],
    name: String,
    value: [Boolean, String, Number, Array],
    error: String,
    disabled: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      checkedProxy: false
    };
  },
  computed: {
    checked: {
      get() {
        return this.value;
      },
      set(val) {
        this.checkedProxy = val;
      }
    }
  },
  methods: {
    changeHandler() {
      this.$emit('input', this.checkedProxy);
    }
  }
};
</script>

<style lang="scss">
@import '../../../utils/scss/variables/colors';
@import '../../../utils/scss/variables/fonts';
@import '../../../utils/scss/mixins/iconFont';

.base-checkbox {
  padding: .5rem 0;
  color: $colorMineShaft;

  &--disabled {
    color: $colorSilverChaliceDark;
    pointer-events: none;
  }

  &__input {
    display: none;
  }

  &__input:checked + &__label &__rect {
    background: $colorMineShaft;
    border-color: $colorMineShaft;

    @include iconFont('icon-tick');

    &--disabled {
      background: $colorSilverChaliceDark;
      border-color: $colorSilverChaliceDark;
    }
  }

  &__label {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  &__rect {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.6rem;
    height: 1.6rem;
    color: $colorWhite;
    border: 1px solid $colorBoulder;
    font-size: $fontSizeSmall;

    &--disabled {
      border-color: $colorSilverChaliceDark;
    }
  }

  &__text {
    margin-left: 1rem;
    font-size: $fontSizeRegular;
    font-weight: $fontWeightRegular;

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
