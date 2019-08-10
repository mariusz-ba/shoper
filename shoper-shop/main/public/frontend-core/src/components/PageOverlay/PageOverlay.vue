<template>
  <div
    class="page-overlay"
    :class="{'page-overlay--visible': visible}"
    @click="clickHandler"
  >
  </div>
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
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .7);

  &--visible {
    display: block;
  }
}
</style>
