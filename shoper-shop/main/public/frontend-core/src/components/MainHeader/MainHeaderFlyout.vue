<template>
  <div class="main-header-flyout">
    <div class="main-header-flyout__container">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'main-header-flyout'
};
</script>

<style lang="scss">
@import '../../utils/scss/variables/colors';

.main-header-flyout {
  max-height: 0;
  overflow: hidden;
  position: absolute;
  top: 7rem;
  left: 0;
  width: 100%;
  background: $colorAlabaster;

  &__container {
    margin: 0 auto;
    padding: 2rem;
    max-width: 1200px;
    opacity: 0;
    transition: opacity 0.3s ease-in;
  }
}
</style>
