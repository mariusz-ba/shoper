<template>
  <div class="checkout-delivery">
    <h2 class="checkout-delivery__title">Delivery</h2>

    <div class="checkout-delivery__methods">
      <h3 class="checkout-delivery__section-title">Delivery methods</h3>
      <delivery-method-picker />
    </div>

    <div class="checkout-delivery__addresses">
      <div class="checkout-delivery__address-form">
        <h3 class="checkout-delivery__section-title">Delivery address</h3>
        <base-select
          id="delivery-addresses"
          class="checkout-delivery__address-form-select"
          label="Delivery address"
          :options="deliveryAddresses"
          v-model="deliveryAddress"
        />
        <address-form id="delivery" />
      </div>
      <div class="checkout-delivery__address-form">
        <h3 class="checkout-delivery__section-title">Billing address</h3>
        <base-checkbox
          id="billing-address-checkbox"
          class="checkout-delivery__address-form-checkbox"
          v-model="billingAddressSameAsDelivery"
        >
          Same as delivery address
        </base-checkbox>
        <template v-if="!billingAddressSameAsDelivery">
          <base-select
            id="billing-addresses"
            class="checkout-delivery__address-form-select"
            label="Billing address"
            :options="billingAddresses"
            v-model="billingAddress"
          />
          <address-form id="billing" />
        </template>
      </div>
    </div>

    <basket-summary
      :summary-price="summary.summaryPrice"
      :delivery-price="deliveryPrice.numeric"
      :total-price="totalPrice"
    />

    <div class="checkout-delivery__footer">
      <base-button
        class="checkout-delivery__payment-button"
        version="success"
        reversed
      >
        Go to payment
      </base-button>
    </div>

  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { store } from '../../store/store';
import { CheckoutActionsTypes } from '../../store/modules/checkout/checkoutActions';

import AddressForm from '../../components/AddressForm/AddressForm';
import BaseButton from '../../components/Base/BaseButton/BaseButton';
import BaseCheckbox from '../../components/Base/BaseCheckbox/BaseCheckbox';
import BaseSelect from '../../components/Base/BaseSelect/BaseSelect';
import DeliveryMethodPicker from '../../components/DeliveryMethodPicker/DeliveryMethodPicker';

import BasketSummary from '../../components/BasketSummary/BasketSummary';

// Share this route with other checkout steps. Check basket and user session before
// rendering components
const beforeRouteEnter = (to, from, next) => {
  const basketAmount = store.getters['basket/totalAmount'];

  if (basketAmount === 0) {
    return next({ name: store.state.routesNames.basketPage.name });
  }

  const userId = store.getters['auth/userId'];

  if (!userId) {
    return next({ name: store.state.routesNames.checkoutLogin.name });
  }

  store.dispatch(`checkout/${CheckoutActionsTypes.FETCH_USER_ADDRESSES}`, userId)
    .then(() => store.dispatch(`checkout/${CheckoutActionsTypes.FETCH_DELIVERY_METHODS}`))
    .then(() => {
      next();
    })
    .catch(() => {
      next();
    })
};

export default {
  name: 'checkout-delivery',
  components: {
    AddressForm,
    BaseButton,
    BaseCheckbox,
    BaseSelect,
    BasketSummary,
    DeliveryMethodPicker
  },
  data() {
    return {
      deliveryAddress: null,
      billingAddress: null,
      billingAddressSameAsDelivery: true
    };
  },
  computed: {
    ...mapState('basket', ['summary']),
    ...mapState('checkout', ['delivery']),
    ...mapGetters('checkout', ['deliveryPrice']),
    totalPrice() {
      return this.summary.summaryPrice + this.deliveryPrice.numeric;
    },
    deliveryAddresses() {
      if (this.delivery.userDeliveryAddress) {
        return this.delivery.userDeliveryAddress.map(address => ({
          label: `${address.streetName} ${address.streetNr}, ${address.town}`,
          value: address.id,
          address
        }));
      }

      return [];
    },
    billingAddresses() {
      if (this.delivery.userBillingAddress) {
        return this.delivery.userBillingAddress.map(address => ({
          label: `${address.streetName} ${address.streetNr}, ${address.town}`,
          value: address.id,
          address
        }));
      }

      return [];
    }
  },
  beforeRouteEnter
};
</script>

<style lang="scss">
@import '../../utils/scss/variables/colors';
@import '../../utils/scss/mixins/media';

.checkout-delivery {
  padding: 2rem;
  margin: 0 auto;
  max-width: 1200px;

  &__title {
    margin-bottom: 3rem;
  }

  &__section-title {
    margin-bottom: 2rem;
  }

  &__methods {
    margin-bottom: 3rem;
    padding-bottom: 3rem;
    border-bottom: 1px solid $colorMercury;
  }

  &__addresses {
    @include media-tablet-up {
      display: flex;
      flex-wrap: wrap;
    }
  }

  &__address-form {
    @include media-tablet-up {
      width: 50%;
    }

    &:first-child {
      padding-bottom: 2.5rem;

      @include media-tablet-up {
        padding-bottom: 0;
        padding-right: 2rem;
        border-right: 1px solid $colorMercury;
      }

      @include media-laptop-up {
        padding-right: 10rem;
      }
    }

    &:last-child {
      padding-top: 2.5rem;
      border-top: 1px solid $colorMercury;

      @include media-tablet-up {
        padding-top: 0;
        padding-left: 2rem;
        border-top: none;
      }

      @include media-laptop-up {
        padding-left: 10rem;
      }
    }
  }

  &__address-form-select,
  &__address-form-checkbox {
    margin-bottom: 2rem;
  }

  &__footer {
    margin-top: 3rem;
    padding-top: 3rem;
    border-top: 1px solid $colorMercury;

    @include media-tablet-up {
      display: flex;
      justify-content: flex-end;
    }
  }
  
  &__payment-button {
    width: 100%;
    height: 5rem;

    @include media-tablet-up {
      width: auto;
      min-width: 240px;
    }
  }
}
</style>