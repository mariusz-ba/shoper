<template>
  <transition
    name="page-overlay__show"
    @after-leave="afterLeave"
  >
    <div
      v-show="visible"
      class="page-overlay"
      :style="styles"
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
      visible: false,
      styles: {}
    };
  },
  mounted() {
    eventBus.on('page-overlay:show', this.show);
    eventBus.on('page-overlay:hide', this.hide);
  },
  methods: {
    show(data) {
      this.styles = data;
      this.visible = true;
    },
    hide() {
      this.visible = false;
    },
    afterLeave() {
      this.styles = {};
    },
    clickHandler() {
      eventBus.emit('page-overlay:click');
    }
  }
};
</script>

<style lang="scss">
.page-overlay {
  z-index: 500;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);

  &__show-enter-active,
  &__show-leave-active {
    transition: opacity 0.3s linear;
  }

  &__show-enter,
  &__show-leave-to {
    opacity: 0;
  }
}
</style>
