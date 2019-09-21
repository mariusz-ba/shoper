<template>
  <div
    class="base-select"
    :class="{'base-select--disabled': disabled}"
  >
    <div
      ref="container"
      tabindex="0"
      class="base-select__container"
      :class="{
        'base-select__container--opened': opened,
        'base-select__container--disabled': disabled
      }"
      :aria-invalid="String(!!error)"
      @blur="blurHandler"
      @focus="focusHandler"
      @keyup.up="selectPrevOption"
      @keyup.down="selectNextOption"
      @keyup.enter="enterClickHandler"
    >
      <span
        v-if="label"
        class="base-select__label"
        :class="{
          'base-select__label--floated': value,
          'base-select__label--required': required
        }"
      >
        {{ label }}
      </span>
      <span
        v-show="value"
        class="base-select__value"
      >
        {{ optionLabel }}
      </span>
      <span
        class="base-select__icon"
        :class="{'base-select__icon--opened': opened}"
      >
      </span>
      <div
        ref="options"
        v-show="opened"
        class="base-select__options"
      >
        <div
          v-for="(option, index) in options"
          :key="option.value"
          class="base-select__option"
          :class="{
            'base-select__option--selected': index === selectedIndex,
            'base-select__option--active': option.value === value,
            'base-select__option--disabled': option.disabled
          }"
          @click="inputHandler(option.value, option.disabled)"
        >
          <slot
            name="option"
            v-bind="option"
          >
            {{ option.label }}
          </slot>
        </div>
      </div>
      <select
        class="base-select__select-native"
        :name="name"
        :value="value"
        :disabled="disabled"
        @input="inputHandler($event.target.value)"
        @click.prevent.stop=""
      >
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          :disabled="option.disabled"
        >
          {{ option.label }}
        </option>
      </select>
    </div>
    <p
      v-if="error"
      class="base-select__error"
    >
      {{ error }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'base-select',
  props: {
    name: String,
    label: String,
    value: [String, Number],
    error: String,
    options: {
      type: Array,
      required: true
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      opened: false,
      selectedIndex: -1
    };
  },
  computed: {
    optionLabel() {
      const option = this.options.find(option => option.value === this.value);
      return option ? option.label : this.label;
    }
  },
  watch: {
    opened(value) {
      if (!value) {
        this.selectedIndex = -1;
      }
    },
    selectedIndex(value) {
      if (value !== -1 && this.$refs.options) {
        this.$refs.options.scrollTop = 36 * value;
      }
    }
  },
  methods: {
    inputHandler(value, disabled) {
      if (disabled) {
        return;
      }

      this.$refs.container.blur();
      this.$emit('input', value);
    },
    focusHandler() {
      this.opened = true;
    },
    blurHandler(event) {
      this.opened = false;
    },
    selectPrevOption() {
      this.selectedIndex = Math.max(0, this.selectedIndex - 1);
    },
    selectNextOption() {
      this.selectedIndex = Math.min(this.options.length - 1, this.selectedIndex + 1);
    },
    enterClickHandler() {
      if (this.selectedIndex !== -1) {
        this.inputHandler(this.options[this.selectedIndex].value);
      }
    }
  }
};
</script>

<style lang="scss">
@import '../../../utils/scss/variables/colors';
@import '../../../utils/scss/variables/fonts';
@import '../../../utils/scss/mixins/media';
@import '../../../utils/scss/mixins/iconFont';

.base-select {
  $root: &;

  color: $colorMineShaft;

  &--error {
    #{$root}__label {
      color: $colorRed;
    }

    #{$root}__container {
      border-color: $colorRed;
    }
  }

  &--disabled {
    color: $colorSilverChaliceDark;
    pointer-events: none;
  }

  &__container {
    outline: 0;
    position: relative;
    width: 100%;
    height: 4.5rem;
    padding: .5rem 1rem;
    font-size: $fontSizeRegular;
    font-weight: $fontWeightRegular;
    border: 1px solid $colorBoulder;
    background: $colorWhite;
    display: flex;
    align-items: center;
    cursor: pointer;

    &:focus,
    &--opened {
      border-color: $colorAzureRadiance;
      box-shadow: 0 0 0 1px $colorAzureRadiance;
    }

    &--disabled {
      border-color: $colorSilverChaliceDark;
    }
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

  &__value {
    font-size: $fontSizeRegular;
    font-weight: $fontWeightRegular;
  }

  &__icon {
    position: absolute;
    top: 50%;
    right: 1rem;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateY(-50%) rotate(-90deg);

    @include iconFont('icon-arrow-left') {
      font-size: $fontSizeRegular;
    }

    &--opened {
      transform: translateY(-50%) rotate(90deg);
    }
  }

  &__options {
    z-index: 1;
    overflow: auto;
    position: absolute;
    top: 100%;
    left: -1px;
    right: -1px;
    max-height: 200px;
    border: 1px solid $colorAzureRadiance;
    border-top: none;
    box-shadow: 0 -2px 0 -1px $colorMercury, 0 0 0 1px $colorAzureRadiance;
    background: $colorWhite;
  }

  &__option {
    padding: 1rem;
    font-size: $fontSizeRegular;
    font-weight: $fontWeightRegular;

    &:hover {
      background: $colorGallery;
    }

    &--active {
      font-weight: $fontWeightBold;
    }

    &--selected {
      background: $colorGallery;
    }

    &--disabled {
      color: $colorBoulder;

      &:hover {
        background: transparent;
      }
    }
  }

  &__select-native {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;

    @include media-tablet-up {
      display: none;
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
