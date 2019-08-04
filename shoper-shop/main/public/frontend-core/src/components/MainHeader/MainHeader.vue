<template>
  <div class="main-header">
    <div class="main-header__navbar-wrapper">
      <nav class="main-header__navbar">
        <div class="main-header__brand">
          <router-link
            class="main-header__brand-link"
            to="/"
          >
            <img
              class="main-header__brand-image"
              :src="brandImage"
              alt="Shoper"
            />
          </router-link>
        </div>

        <ul class="main-header__menu">
          <li class="main-header__menu-item">
            <router-link
              class="main-header__menu-link"
              to="/products"
            >
              Products
            </router-link>
            <div class="main-header__menu-flyout">
              <div class="main-header__menu-flyout-container">
                <h3>Products link 1</h3>
                <h3>Products link 2</h3>
                <h3>Products link 3</h3>
              </div>
            </div>
          </li>
          <li class="main-header__menu-item">
            <router-link
              class="main-header__menu-link"
              to="/about"
            >
              About
            </router-link>
            <div class="main-header__menu-flyout">
              <div class="main-header__menu-flyout-container">
                <h3>About link 1</h3>
                <h3>About link 2</h3>
                <h3>About link 3</h3>
              </div>
            </div>
          </li>
        </ul>

        <div class="main-header__actions">
          <button class="main-header__action main-header__action--basket"></button>
          <button
            class="main-header__action main-header__action--search"
            @click="searchClickHandler"
          ></button>
          <button class="main-header__action main-header__action--menu"></button>
        </div>
      </nav>

      <div
        class="main-header__search"
        :class="{'main-header__search--visible': searchVisible}"
      >
        <h3 class="main-header__search-title">Search</h3>
      </div>
    </div>
  </div>
</template>

<script>
import brandImage from '../../assets/images/header/brand.svg';

export default {
  name: 'main-header',
  data() {
    return {
      brandImage,
      searchVisible: false
    };
  },
  methods: {
    searchClickHandler() {
      this.searchVisible = !this.searchVisible;
    }
  }
};
</script>

<style lang="scss">
@import '../../utils/scss/variables/colors';
@import '../../utils/scss/variables/fonts';
@import '../../utils/scss/mixins/media';
@import '../../utils/scss/mixins/iconFont';

.main-header {
  $root: &;

  &__navbar-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: getColor('navbarBackground');
    box-shadow: 0 1px 12px getColor('navbarShadow');
  }

  &__navbar {
    margin: 0 auto;
    padding: 0 2rem;
    width: 100%;
    height: 7rem;
    max-width: 1440px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__search {
    max-height: 0;
    overflow: hidden;
    background: getColor('navbarFlyoutBackground');
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    transition: max-height .3s ease-in;

    &--visible {
      max-height: 7rem;
    }
  }

  &__search-title {
    padding: 2rem;
    text-align: center;
    font-size: 2rem;
    font-weight: $fontWeightMedium;
    color: getColor('navbarShadow');
  }

  &__menu,
  &__brand,
  &__actions {
    height: 100%;
  }

  &__brand,
  &__actions {
    flex: 1;
    padding: 1rem 0;

    @include media-tablet-up {
      flex: 0 0 20rem;
    }
  }

  &__menu {
    display: none;

    @include media-tablet-up {
      flex: 1;
      list-style-type: none;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  &__menu-item {
    height: 100%;

    &:hover {
      #{$root}__menu-link {
        color: getColor('navbarAccent');

        &::after {
          transform: scaleX(1);
        }
      }

      #{$root}__menu-flyout {
        max-height: 300px;
        z-index: 10;
      }
    }
  }

  &__menu-link {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    text-transform: uppercase;
    font-size: $fontSizeRegular;
    font-weight: $fontWeightMedium;
    color: getColor('navbarPrimary');
    transition: color .3s linear;
    padding: 0 1rem;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: getColor('navbarAccent');
      transform: scaleX(0);
      transform-origin: center center;
      transition: transform .3s linear;
    }
  }

  &__menu-flyout {
    max-height: 0;
    overflow: hidden;
    position: absolute;
    top: 7rem;
    left: 0;
    width: 100%;
    background: getColor('navbarFlyoutBackground');
    box-shadow: 0 4px 4px getColor('navbarFlyoutShadow');
    transition: max-height .3s ease-in;
    transition-delay: .125s;
  }

  &__menu-flyout-container {
    margin: 0 auto;
    padding: 1rem 2rem;
    max-width: 1440px;
  }

  &__actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: -1rem;

    @include media-tablet-up {
      flex: 0 0 21rem;
    }
  }

  &__action {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0;
    outline: 0;
    padding: 0.5rem;
    font-size: 2.5rem;
    transition: color .3s linear;
    background: transparent;
    margin-right: 0.5rem;
    cursor: pointer;

    @include media-tablet-up {
      font-size: 2rem;
    }

    &:hover {
      color: getColor('navbarAccent');
    }

    &--basket {
      @include iconFont('icon-basket');
    }

    &--search {
      @include iconFont('icon-search');
    }

    &--menu {
      @include iconFont('icon-menu');

      @include media-tablet-up {
        display: none;
      }
    }
  }
}
</style>
