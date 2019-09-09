<template>
  <div class="filters">
    <filter-group
      :title="$t('filters.price')"
      :initially-expanded="priceFrom !== null || priceTo !== null"
    >
      <div class="filter__input-group">
        <label for="priceFrom">{{ $t('filters.priceFrom') }}</label>
        <input
          v-model="priceFrom"
          id="priceFrom"
          name="priceFrom"
          type="number"
        />
      </div>
      <div class="filter__input-group">
        <label for="priceTo">{{ $t('filters.priceTo') }}</label>
        <input
          v-model="priceTo"
          id="priceTo"
          name="priceTo"
          type="number"
        />
      </div>
    </filter-group>
    <filter-group
      v-if="variations.length"
      :title="$t('filters.variations')"
      :initially-expanded="selectedVariations.length > 0"
    >
      <div
        class="filter__input-group"
        v-for="variation in variations"
        :key="variation.id"
      >
        <label :for="`variation-${variation.id}`">{{ variation.name }}</label>
        <input
          v-model="selectedVariations"
          :id="`variation-${variation.id}`"
          name="variation"
          type="checkbox"
          :value="variation.id"
        />
      </div>
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

  &__submit {
    width: 100%;
    border: none !important;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
  }
}
</style>