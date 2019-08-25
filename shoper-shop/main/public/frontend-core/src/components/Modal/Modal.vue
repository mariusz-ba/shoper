<template>
  <transition name="modal-fade">
    <div
      v-if="visible"
      class="modal"
    >
      <div
        class="modal__overlay"
        @click="close"  
      ></div>
      <div class="modal__container">
        <slot />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'modal',
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    close() {
      this.$emit('close');
    }
  }
};
</script>

<style lang="scss">
@import '../../utils/scss/variables/colors';

.modal {
  $root: &;

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: getColor('modalOverlayBackground');
  }

  &__container {
    position: absolute;
    top: 50%;
    left: 50%;
    max-width: calc(100% - 4rem);
    max-height: calc(100% - 4rem);
    transform: translate(-50%, -50%);
    background: getColor('modalBackground');
    border-radius: 3px;
  }

  &-fade-enter-active,
  &-fade-leave-active {
    transition: opacity .425s linear;
  }

  &-fade-enter-active {
    #{$root}__overlay {
      transition: opacity .125s linear;
    }

    #{$root}__container {
      transition: opacity .3s linear;
      transition-delay: .125s;
    }
  }

  &-fade-leave-active {
    #{$root}__overlay {
      transition-delay: .3s;
      transition: opacity .125s linear;
    }

    #{$root}__container {
      transition: opacity .3s linear;
    }
  }

  &-fade-enter,
  &-fade-leave-to {
    #{$root}__overlay,
    #{$root}__container {
      opacity: 0;
    }
  }
}
</style>