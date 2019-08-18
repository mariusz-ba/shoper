<template>
  <div class="product-gallery">
    <img
      class="product-gallery__image"
      :src="images[0].url"
      :alt="images[0].type"
    />
  </div>
</template>

<script>
export default {
  name: 'product-gallery',
  props: {
    images: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style lang="scss">
@import '../../utils/scss/mixins/media';

.product-gallery {
  background: #fafafa;

  @include media-tablet-up {
    position: absolute;
    top: 0;
    left: 2rem;
    width: calc(100% - 4rem);
    padding-bottom: 60%;
  }

  &__image {
    display: block;
    width: 100%;
    height: auto;

    @include media-tablet-up {
      position: absolute;
      top: 0;
      left: 50%;
      width: auto;
      height: 100%;
      transform: translateX(-50%);
    }
  }
}
</style>