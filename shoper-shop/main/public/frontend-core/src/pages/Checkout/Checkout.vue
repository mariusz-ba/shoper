<template>
  <div class="checkout">
    <checkout-steps :step-index="stepIndex" />
    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import CheckoutSteps from '../../components/CheckoutSteps/CheckoutSteps';

export default {
  name: 'checkout',
  components: {
    CheckoutSteps
  },
  computed: {
    ...mapState(['routesNames']),
    steps() {
      return [
        this.routesNames.checkoutLogin.name,
        this.routesNames.checkoutDelivery.name,
        this.routesNames.checkoutPayment.name,
        this.routesNames.checkoutSummary.name,
        this.routesNames.checkoutSuccess.name
      ];
    },
    stepIndex() {
      return this.steps.indexOf(this.$route.name);
    }
  }
};
</script>
