<template>
  <div class="delivery-method-picker">
    <base-radio
      v-for="method in methods"
      :key="method.id"
      :id="`delivery-method-${method.id}`"
      class="delivery-method-picker__method"
      :val="method.id"
      v-model="methodId"
    >
      <template v-slot="{ checked }">
        <div
          class="delivery-method-picker__method-content"
          :class="{'delivery-method-picker__method-content--checked': checked}"
        >
          <div class="delivery-method-picker__method-name">{{ method.name }}</div>
          <div class="delivery-method-picker__method-price">{{ method.price.numeric > 0 ? method.price.text : 'Free' }}</div>
        </div>
      </template>
    </base-radio>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { CheckoutMutationsTypes } from '../../store/modules/checkout/checkoutMutations';
import BaseRadio from '../Base/BaseRadio/BaseRadio';

export default {
  name: 'delivery-method-picker',
  components: {
    BaseRadio
  },
  computed: {
    ...mapState('checkout', ['delivery']),
    methods() {
      return Object.values(this.delivery.methods);
    },
    methodId: {
      get() {
        return this.delivery.methodId;
      },
      set(val) {
        this.setMethodId(val);
      }
    }
  },
  methods: {
    ...mapMutations('checkout', {
      setMethodId: CheckoutMutationsTypes.SET_DELIVERY_METHOD_ID
    })
  }
};
</script>

<style lang="scss">
@import '../../utils/scss/mixins/media';
@import '../../utils/scss/variables/colors';

.delivery-method-picker {
  &__method {
    &:not(:last-of-type) {
      margin-bottom: 2rem;
    }
  }

  &__method-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2rem;
    border: 1px solid $colorMercury;
    cursor: pointer;

    @include media-tablet-up {
      width: 300px;
    }

    &--checked {
      border: 1px solid $colorAzureRadiance;
      box-shadow: 0 0 0 1px $colorAzureRadiance;
      background: $colorAlabaster;
    }
  }

  &__method-name {
    font-weight: 700;
  }

  &__method-price {
    font-size: 1.6rem;
  }
}
</style>