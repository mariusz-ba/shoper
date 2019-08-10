<template>
  <transition name="page-overlay__show">
    <div
      v-show="visible"
      class="page-overlay"
      @click="clickHandler"
    >
    </div>
  </transition>
</template>

<script>
import eventBus from '../../services/eventBus';

export default {
  name: 'page-overlay',
  data() {
    return {
      visible: false
    };
  },
  mounted() {
    eventBus.on('page-overlay:show', this.show);
    eventBus.on('page-overlay:hide', this.hide);
  },
  methods: {
    show() {
      this.visible = true;
    },
    hide() {
      this.visible = false;
    },
    clickHandler() {
      eventBus.emit('page-overlay:click');
    }
  }
}
</script>

<style lang="scss">
.page-overlay {
  z-index: 500;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .7);

  &__show-enter-active,
  &__show-leave-active {
    transition: opacity .3s linear;
  }

  &__show-enter,
  &__show-leave-to {
    opacity: 0;
  }
}
</style>
