<template>
  <form
    class="main-header-search"
    @submit.prevent="submitHandler"
  >
    <input
      class="main-header-search__input"
      type="text"
      :placeholder="$t('main-header-search.placeholder')"
      v-model="search"
    />
    <button class="main-header-search__button"></button>
  </form>
</template>

<script>
export default {
  name: 'main-header-search',
  data() {
    return {
      search: ''
    };
  },
  methods: {
    submitHandler() {
      this.$emit('submit', this.search);
    }
  }
};
</script>

<style lang="scss">
@import '../../utils/scss/variables/colors';
@import '../../utils/scss/variables/fonts';
@import '../../utils/scss/mixins/iconFont';
@import '../../utils/scss/mixins/media';

.main-header-search {
  display: none;
  position: relative;

  @include media-tablet-up {
    display: block;
  }

  &__input {
    outline: 0;
    border: 1px solid $colorMercury;
    background: $colorWhite;
    font-size: $fontSizeRegular;
    font-weight: $fontWeightRegular;
    padding: 0 1rem;
    height: 4.5rem;
    width: 400px;
  }

  &__button {
    border: 0;
    outline: 0;
    position: absolute;
    top: 0;
    right: 0;
    width: 4.5rem;
    height: 4.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    cursor: pointer;

    &:hover::before {
      color: $colorSquash;
    }

    @include iconFont('icon-search') {
      font-size: 2rem;
      color: $colorBoulder;
      transition: color 0.3s linear;
    }
  }
}
</style>
