<template>
  <div class="main-header-actions">
    <button
      class="main-header-actions__action main-header-actions__action--search"
      @click="searchClickHandler"
    >
      <span class="main-header-actions__action-name">
        {{ $t('main-header-actions.search') }}
      </span>
    </button>
    <router-link
      class="main-header-actions__action main-header-actions__action--basket"
      :to="{ name: $store.state.routesNames.basketPage.name }"
    >
      <span class="main-header-actions__badge">{{ totalAmount }}</span>
      <span class="main-header-actions__action-name">
        {{ $t('main-header-actions.basket') }}
      </span>
    </router-link>
    <router-link
      class="main-header-actions__action main-header-actions__action--account"
      :to="{ name: $store.state.routesNames.loginPage.name }"
    >
      <span class="main-header-actions__action-name">
        {{ $t('main-header-actions.account') }}
      </span>
    </router-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'main-header-actions',
  computed: {
    ...mapGetters('basket', ['totalAmount'])
  },
  methods: {
    searchClickHandler() {
      this.$emit('search-click');
    }
  }
};
</script>

<style lang="scss">
@import '../../utils/scss/variables/colors';
@import '../../utils/scss/variables/fonts';
@import '../../utils/scss/mixins/media';
@import '../../utils/scss/mixins/iconFont';

.main-header-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;

  &__action {
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    border: 0;
    outline: 0;
    text-decoration: none;
    transition: color 0.3s linear;
    background: transparent;
    color: $colorBlack;
    cursor: pointer;

    &:not(:last-child) {
      margin-right: 1.5rem;
    }

    &:hover {
      color: $colorSquash;
    }

    &::before {
      font-size: 2.4rem;
    }

    &--account {
      @include iconFont('icon-user');
    }

    &--basket {
      @include iconFont('icon-basket');
    }

    &--search {
      @include iconFont('icon-search');

      @include media-tablet-up {
        display: none;
      }
    }
  }

  &__badge {
    position: absolute;
    top: -0.6rem;
    right: -0.6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    color: $colorBlack;
    background: $colorMercury;
    border-radius: 50%;
    font-size: $fontSizeXSmall;
    font-weight: $fontWeightRegular;
  }

  &__action-name {
    display: none;

    @include media-tablet-up {
      display: block;
      font-size: $fontSizeSmall;
      font-weight: $fontWeightBold;
      margin-top: 0.7rem;
    }
  }
}
</style>