<template>
  <modal
    class="buy-box-modal"
    :visible="visible"
    @close="close"
  >
    <div class="buy-box-modal__header">
      <h3 class="buy-box-modal__header-title">Product was added to basket</h3>
    </div>
    <div class="buy-box-modal__content">
      <p class="buy-box-modal__content-text buy-box-modal__content-text--name">{{ productDetails.name }}</p>
      <p class="buy-box-modal__content-text">{{ productDetails.category }}</p>
      <p class="buy-box-modal__content-text">Vartiation: {{ productDetails.variation.name }}</p>
    </div>
    <div class="buy-box-modal__footer">
      <base-button
        class="buy-box-modal__footer-button"
        @click="close"
      >
        Close
      </base-button>
      <base-button
        class="buy-box-modal__footer-button"
        type="success"
        @click="basketClickHandler"
      >
        Go to basket
      </base-button>
    </div>
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

  &__header,
  &__content,
  &__footer {
    padding: 2rem;
  }

  &__header-title {
    font-size: $fontSizeMedium;
    font-weight: $fontWeightBold;
  }

  &__content {
    border-top: 1px solid getColor('modalSectionBorder');
    border-bottom: 1px solid getColor('modalSectionBorder');
    line-height: 1.5;
  }

  &__content-text {
    &--name {
      font-weight: $fontWeightBold;
    }
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  &__footer-button {
    &:not(:last-of-type) {
      margin-right: 1rem;
    }
  }
}
</style>