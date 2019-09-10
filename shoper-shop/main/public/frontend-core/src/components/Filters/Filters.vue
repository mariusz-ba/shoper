<template>
  <div class="filters">
    <filter-group
      :title="$t('filters.price')"
      :initially-expanded="priceFrom !== null || priceTo !== null"
    >
      <base-input
        v-model="priceFrom"
        id="priceFrom"
        class="filters__price-input"
        name="priceFrom"
        type="number"
        :label="$t('filters.priceFrom')"
      />
      <base-input
        v-model="priceTo"
        id="priceTo"
        class="filters__price-input"
        name="priceTo"
        type="number"
        :label="$t('filters.priceTo')"
      />
    </filter-group>
    <filter-group
      v-if="variations.length"
      :title="$t('filters.variations')"
      :initially-expanded="selectedVariations.length > 0"
    >
      <base-checkbox
        v-for="variation in variations"
        :key="variation.id"
        :id="`variation-${variation.id}`"
        :val="variation.id"
        :label="variation.name"
        name="variation"
        v-model="selectedVariations"
      />
    </filter-group>
    <base-button
      class="filters__submit"
      @click="submitHandler"
    >
      {{ $t('filters.submit') }}
    </base-button>
  </div>
</template>

<script>
import FilterGroup from './FilterGroup';

export default {
  name: 'filters',
  components: {
    FilterGroup
  },
  props: {
    initialFilters: {
      type: Object,
      default: () => ({})
    },
    variations: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      priceFrom: Number(this.initialFilters.priceFrom) || null,
      priceTo: Number(this.initialFilters.priceTo) || null,
      selectedVariations: this.initialFilters.variations || []
    };
  },
  methods: {
    submitHandler() {
      this.$emit('change', this.getFilters());
    },
    getFilters() {
      return {
        priceFrom: this.priceFrom,
        priceTo: this.priceTo,
        variations: this.selectedVariations
      };
    }
  }
};
</script>

<style lang="scss">
@import '../../utils/scss/variables/colors';

.filters {
  border: 1px solid $colorAlto;
  border-radius: 3px;

  &__price-input {
    &:not(:last-of-type) {
      margin-bottom: 1.5rem;
    }
  }

  &__submit {
    width: 100%;
    border: none !important;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
  }
}
</style>