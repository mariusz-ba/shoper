<template>
  <modal
    class="buy-box-modal"
    :visible="visible"
    @close="close"
  >
    <template v-slot:header>
      <h3 class="buy-box-modal__title">Product was added to basket</h3>
    </template>
    <div class="buy-box-modal__content">
      <p class="buy-box-modal__content-text buy-box-modal__content-text--name">{{ productDetails.name }}</p>
      <p class="buy-box-modal__content-text">{{ productDetails.category }}</p>
      <p class="buy-box-modal__content-text">Vartiation: {{ productDetails.variation.name }}</p>
    </div>
    <template v-slot:footer>
      <div class="buy-box-modal__buttons">
        <base-button
          class="buy-box-modal__button"
          @click="close"
        >
          Close
        </base-button>
        <base-button
          class="buy-box-modal__button"
          type="success"
          @click="basketClickHandler"
        >
          Go to basket
        </base-button>
      </div>
    </template>
  </modal>
</template>

<script>
import { routesNames } from '../../router/routesNames';
import Modal from '../Modal/Modal';

export default {
  name: 'buy-box-modal',
  components: {
    Modal
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    productDetails: {
      type: Object,
      default: () => ({
        name: '',
        category: '',
        variation: {
          name: ''
        }
      })
    }
  },
  methods: {
    close() {
      this.$emit('close');
    },
    basketClickHandler() {
      this.close();
      this.$router.push({ name: routesNames.basketPage.name });
    }
  }
};
</script>

<style lang="scss">
@import '../../utils/scss/variables/fonts';
@import '../../utils/scss/variables/colors';
@import '../../utils/scss/mixins/media';

.buy-box-modal {
  .modal__container {
    width: calc(100% - 4rem);

    @include media-tablet-up {
      width: 500px;
    }
  }

  &__title {
    font-size: $fontSizeMedium;
    font-weight: $fontWeightBold;
  }

  &__content {
    padding: 2rem;
    line-height: 1.5;
  }

  &__content-text {
    &--name {
      font-weight: $fontWeightBold;
    }
  }

  &__buttons {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  &__button {
    &:not(:last-of-type) {
      margin-right: 1rem;
    }
  }
}
</style>