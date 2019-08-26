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
      <div
        ref="container"
        class="modal__container"
        :style="`transform: translate(-50%, -${verticalOffset}px);`"
      >
        <div
          v-if="$slots.header"
          class="modal__header"
        >
          <slot name="header" />
        </div>
        <div class="modal__content">
          <slot />
        </div>
        <div
          v-if="$slots.footer"
          class="modal__footer"
        >
          <slot name="footer" />
        </div>
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
  data() {
    return {
      verticalOffset: 0
    };
  },
  watch: {
    visible: {
      immediate: true,
      handler(value) {
        if (value) {
          this.$nextTick(() => {
            const half = this.$refs.container.offsetHeight / 2;
            const halfWindow = window.innerHeight / 2;
            this.verticalOffset = Math.min(half, halfWindow);
          })
        }
      }
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
  overflow: auto;

  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: getColor('modalOverlayBackground');
  }

  &__container {
    margin: 2rem 0;
    position: absolute;
    top: 50%;
    left: 50%;
    max-width: calc(100% - 4rem);
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

  &__header,
  &__footer {
    padding: 2rem;
  }

  &__header {
    border-bottom: 1px solid getColor('modalSectionBorder');
  }

  &__footer {
    border-top: 1px solid getColor('modalSectionBorder');
  }
}
</style>