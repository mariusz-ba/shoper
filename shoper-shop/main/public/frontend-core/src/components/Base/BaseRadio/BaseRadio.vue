<template>
  <div
    class="base-radio"
    :class="{'base-radio--disabled': disabled}"
  >
    <input
      class="base-radio__input"
      type="radio"
      :id="id"
      :name="name"
      :value="val"
      :disabled="disabled"
      :aria-invalid="error"
      v-model="checked"
      @change="changeHandler"
    />
    <label
      class="base-radio__label"
      :for="id"
    >
      <slot :checked="value === val">
        <div class="base-radio__label-content">
          <div
            class="base-radio__circle"
            :class="{'base-radio__circle--disabled': disabled}"
          ></div>
          <span
            v-if="label"
            class="base-radio__text"
            :class="{'base-radio__text--required': required}"
          >
            {{ label }}
          </span>
        </div>
      </slot>
    </label>
  </div>
</template>

<script>
export default {
  name: 'base-radio',
  props: {
    id: String,
    val: [Boolean, String, Number],
    name: String,
    label: String,
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

.base-radio {
  color: $colorMineShaft;

  &--disabled {
    color: $colorSilverChaliceDark;
    pointer-events: none;
  }

  &__input {
    display: none;
  }

  &__input:checked + &__label &__circle {
    border-color: $colorMineShaft;

    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: calc(100% - 3px);
      height: calc(100% - 3px);
      transform: translate(-50%, -50%);
      border-radius: 50%;
      background: $colorMineShaft;
    }

    &--disabled {
      border-color: $colorSilverChaliceDark;

      &::after {
        background: $colorSilverChaliceDark;
      }
    }
  }

  &__label-content {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  &__circle {
    position: relative;
    width: 1.6rem;
    height: 1.6rem;
    border: 1px solid $colorBoulder;
    border-radius: 50%;

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
}
</style>
