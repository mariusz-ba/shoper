<template>
  <div class="pagination">
    <button
      v-if="pagesGroup.begin > 1"
      class="pagination__button pagination__button--side"
      @click="pageClickHandler(pagesGroup.begin - 1)"
    >
      Previous
    </button>
    <button
      v-for="item in pagesRange"
      :key="item"
      class="pagination__button"
      :class="{'pagination__button--active': item === pageIndex}"
      @click="pageClickHandler(item)"
    >
      {{ item }}
    </button>
    <button
      v-if="pagesGroup.end < pagesCount"
      class="pagination__button pagination__button--side"
      @click="pageClickHandler(pagesGroup.end + 1)"
    >
      Next
    </button>
  </div>
</template>

<script>
export default {
  name: 'pagination',
  props: {
    pagesCount: {
      type: Number,
      required: true
    },
    pageIndex: {
      type: Number,
      required: true
    },
    groupSize: {
      type: Number,
      default: 4
    }
  },
  computed: {
    pagesGroup() {
      const middle = Math.ceil(this.pagesCount / 2);
      let begin = 0;
      let end = 0;

      if (this.pageIndex < middle) {
        const left = Math.ceil(this.pageIndex - this.groupSize / 2);

        begin = Math.max(1, left);
        end = Math.min(begin + this.groupSize, this.pagesCount);
      } else {
        const right = Math.ceil(this.pageIndex + this.groupSize / 2);

        end = Math.min(this.pagesCount, right);
        begin = Math.max(1, end - this.groupSize);
      }

      return { begin, end };
    },
    pagesRange() {
      const itemsCount = Math.max(0, this.pagesGroup.end - this.pagesGroup.begin + 1);
      
      return new Array(itemsCount)
        .fill(1)
        .map((value, index) => index + this.pagesGroup.begin);
    }
  },
  methods: {
    pageClickHandler(index) {
      this.$emit('change', index);
    }
  }
};
</script>

<style lang="scss">
@import '../../utils/scss/variables/fonts';
@import '../../utils/scss/variables/colors';

.pagination {
  display: flex;

  &__button {
    height: 4rem;
    padding: 1rem 1.5rem;
    border: 0;
    outline: 0;
    font-family: $fontFamily;
    font-size: $fontSizeRegular;
    font-weight: $fontWeightMedium;
    background: getColor('paginationBackground');
    color: getColor('paginationColor');
    transition: background 0.3s linear;
    cursor: pointer;

    &:hover {
      background: getColor('paginationBackgroundHover');
      color: getColor('paginationColorHover');
    }

    &--active {
      background: getColor('paginationBackgroundHover');
      color: getColor('paginationColorHover');
    }

    &--side {
      &:first-child {
        margin-right: 1rem;
      }

      &:last-child {
        margin-left: 1rem;
      }
    }
  }
}
</style>
