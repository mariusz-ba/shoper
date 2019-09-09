<template>
  <div class="filter-group">
    <div
      class="filter-group__title"
      :class="{'filter-group__title--expanded': expanded}"
      @click="expanded = !expanded"
    >
      {{ title }}
    </div>
    <div
      v-show="expanded"
      class="filter-group__content"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'filter-group',
  props: {
    title: {
      type: String,
      required: true
    },
    initiallyExpanded: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      expanded: this.initiallyExpanded
    };
  }
};
</script>

<style lang="scss">
@import '../../utils/scss/variables/colors';
@import '../../utils/scss/variables/fonts';
@import '../../utils/scss/mixins/iconFont';

.filter-group {
  &__title,
  &__content {
    padding: 1rem;
    border-bottom: 1px solid $colorAlto;
  }

  &__title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: $fontSizeRegular;
    font-weight: $fontWeightMedium;
    background: $colorAlabaster;
    cursor: pointer;

    @include iconFont('icon-arrow-left', after) {
      font-size: 1rem;
      transform: rotate(-90deg);
    }

    &--expanded {
      &::after {
        transform: rotate(90deg);
      }
    }
  }

  &__content {
    background: $colorAlabasterLight;
  }
}
</style>