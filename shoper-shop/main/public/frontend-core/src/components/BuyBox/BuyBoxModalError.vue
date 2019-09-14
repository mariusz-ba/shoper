<template>
  <modal
    class="buy-box-modal-error"
    :visible="visible"
    @close="close"
  >
    <template v-slot:header>
      <h3 class="buy-box-modal-error__title">
        {{ $t('buy-box-modal-error.title') }}
      </h3>
    </template>
    <div class="buy-box-modal-error__content">{{ message }}</div>
    <template v-slot:footer>
      <div class="buy-box-modal-error__footer">
        <base-button @click="close">
          {{ $t('buy-box-modal-error.close') }}
        </base-button>
      </div>
    </template>
  </modal>
</template>

<script>
import BaseButton from '../Base/BaseButton/BaseButton';
import Modal from '../Modal/Modal';

export default {
  name: 'buy-box-modal-error',
  components: {
    BaseButton,
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

  &__header-title {
    font-size: $fontSizeMedium;
    font-weight: $fontWeightBold;
  }

  &__content {
    padding: 2rem;
    line-height: 1.5;
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>