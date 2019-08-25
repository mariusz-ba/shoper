<template>
  <modal
    class="buy-box-modal-error"
    :visible="visible"
    @close="close"
  >
    <div class="buy-box-modal__header">
      <h3 class="buy-box-modal__header-title">An error occured</h3>
    </div>
    <div class="buy-box-modal__content">
      <p>{{ message }}</p>
    </div>
    <div class="buy-box-modal__footer">
      <base-button @click="close">Close</base-button>
    </div>
  </modal>
</template>

<script>
import Modal from '../Modal/Modal';

export default {
  name: 'buy-box-modal-error',
  components: {
    Modal
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    message: {
      type: String,
      required: true
    }
  },
  methods: {
    close() {
      this.$emit('close');
    }
  }
}
</script>

<style lang="scss">
@import '../../utils/scss/variables/fonts';
@import '../../utils/scss/variables/colors';
@import '../../utils/scss/mixins/media';

.buy-box-modal-error {
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

  &__footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>