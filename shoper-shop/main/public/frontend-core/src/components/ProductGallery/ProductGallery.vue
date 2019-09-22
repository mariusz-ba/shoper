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
  @include media-tablet-up {
    padding-left: 100px;
  }

  &__image {
    display: block;
    width: 100%;
    height: auto;
  }
}
</style>
