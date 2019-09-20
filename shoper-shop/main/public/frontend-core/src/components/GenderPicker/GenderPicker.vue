<template>
  <div class="gender-picker">
    <span
      v-if="label"
      class="gender-picker__label"
    >
      {{ label }}
    </span>
    <div class="gender-picker__radio-group">
      <base-radio
        id="gender-picker-male"
        class="gender-picker__radio"
        val="MALE"
        :label="$t('gender-picker.male')"
        v-model="innerValue"
      />
      <base-radio
        id="gender-picker-female"
        class="gender-picker__radio"
        val="FEMALE"
        :label="$t('gender-picker.female')"
        v-model="innerValue"
      />
    </div>
    <p
      v-if="error"
      class="gender-picker__error"
    >
      {{ error }}
    </p>
  </div>
</template>

<script>
import BaseRadio from '../Base/BaseRadio/BaseRadio';

export default {
  name: 'gender-picker',
  components: {
    BaseRadio
  },
  props: {
    label: String,
    value: String,
    error: String
  },
  data() {
    return {
      innerValue: this.value
    };
  },
  watch: {
    value(val) {
      this.innerValue = val;
    },
    innerValue(val) {
      if (this.value !== val) {
        this.$emit('input', val);
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../utils/scss/variables/colors';
@import '../../utils/scss/variables/fonts';

.gender-picker {
  &__label {
    display: block;
    margin-bottom: 1rem;
    font-size: $fontSizeRegular;
    font-weight: $fontWeightRegular;
  }

  &__radio-group {
    display: flex;
    flex-wrap: wrap;
  }

  &__radio {
    &:not(:last-of-type) {
      margin-right: 1rem;
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