<template>
  <validation-provider
    :rules="validationRules"
    :name="validationName"
    :vid="validationId"
    v-slot="{ errors }"
    slim
  >
    <base-input
      v-bind="inputProps"
      v-on="listeners"
      v-model="innerValue"
      :error="errors[0]"
    />
  </validation-provider>
</template>

<script>
import omit from 'lodash/omit';
import BaseInput from '../Base/BaseInput/BaseInput';

export default {
  name: 'validated-input',
  components: {
    BaseInput
  },
  props: {
    ...BaseInput.props,
    validationRules: [String, Object],
    validationName: String,
    validationId: String
  },
  data() {
    return {
      innerValue: this.value
    };
  },
  computed: {
    inputProps() {
      return omit(
        this.$props,
        [
          'validationRules',
          'validationName',
          'validationId',
          'value'
        ]
      );
    },
    listeners() {
      return omit(
        this.$listeners,
        [
          'input'
        ]
      )
    }
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
};
</script>