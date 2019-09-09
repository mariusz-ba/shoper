<template>
  <div class="main-header">
    <div class="main-header__navbar-wrapper">
      <nav class="main-header__navbar">
        <div class="main-header__brand">
          <router-link
            class="main-header__brand-link"
            :to="{ name: routesNames.homePage.name }"
          >
            <img
              class="main-header__brand-image"
              :src="brandImage"
              alt="Shoper"
            />
          </router-link>
        </div>
        <ul class="main-header__menu">
          <li
            v-for="category in categories"
            :key="category.id"
            class="main-header__menu-item"
            @mouseenter="menuMouseEnterHandler"
            @mouseleave="menuMouseLeaveHandler"
          >
            <router-link
              class="main-header__menu-link"
              :to="{ name: routesNames.productsListPage.name, params: { category: category.id } }"
            >
              {{ category.name }}
            </router-link>
            <main-header-flyout v-if="category.children && category.children.length">
              <main-header-flyout-categories :categories="category.children" />
            </main-header-flyout>
          </li>
          <li class="main-header__menu-item">
            <router-link
              class="main-header__menu-link"
              :to="{ name: routesNames.aboutPage.name }"
            >
              {{ $t('main-header.about') }}
            </router-link>
          </li>
        </ul>
        <div class="main-header__actions">
          <router-link
            class="main-header__action main-header__action--basket"
            :to="{ name: routesNames.basketPage.name }"
          ></router-link>
          <button
            class="main-header__action main-header__action--search"
            @click="searchClickHandler"
          ></button>
          <button
            class="main-header__action main-header__action--menu"
            :class="{'main-header__action--menu_open': burgerMenuVisible}"
            @click="burgerMenuTogglerClick"
          ></button>
        </div>
      </nav>
      <div
        v-show="searchVisible"
        class="main-header__search"
      >
        <h3 class="main-header__search-title">{{ $t('main-header.search') }}</h3>
      </div>
    </div>
    <burger-menu
      :visible="burgerMenuVisible"
      :categories="categories"
    />
  </div>
</template>

<script>
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import MainHeaderFlyout from './MainHeaderFlyout';
import MainHeaderFlyoutCategories from './MainHeaderFlyoutCategories';
import brandImage from '../../assets/images/header/brand.svg';
import eventBus from '../../services/eventBus';
import { routesNames } from '../../router/routesNames';

export default {
  name: 'main-header',
  components: {
    BurgerMenu,
    MainHeaderFlyout,
    MainHeaderFlyoutCategories
  },
  props: {
    categoriesTree: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      brandImage,
      searchVisible: false,
      burgerMenuVisible: false,
      routesNames
    };
  },
  computed: {
    categories() {
      return this.categoriesTree[0] && this.categoriesTree[0].children
        ? this.categoriesTree[0].children
        : [];
    }
  },
  mounted() {
    eventBus.on('page-overlay:click', this.pageOverlayClickHandler);
  },
  methods: {
    showSearchBar() {
      this.burgerMenuVisible = false;
      this.searchVisible = true;
      this.showPageOverlay();
    },
    hideSearchBar() {
      this.searchVisible = false;
      this.hidePageOverlay();
    },
    searchClickHandler() {
      if (this.searchVisible) {
        this.hideSearchBar();
      } else {
        this.showSearchBar();
      }
    },
    menuMouseEnterHandler() {
      this.showPageOverlay();

      if (this.searchVisible) {
        this.searchVisible = false;
      }
    },
    menuMouseLeaveHandler() {
      this.hidePageOverlay();
    },
    showPageOverlay() {
      eventBus.emit('page-overlay:show');
    },
    hidePageOverlay() {
      eventBus.emit('page-overlay:hide');
    },
    pageOverlayClickHandler() {
      this.hideSearchBar();
      this.hideBurgerMenu();
    },
    showBurgerMenu() {
      this.burgerMenuVisible = true;
      this.searchVisible = false;
      this.showPageOverlay();
    },
    hideBurgerMenu() {
      this.burgerMenuVisible = false;
      this.hidePageOverlay();
    },
    burgerMenuTogglerClick() {
      if (this.burgerMenuVisible) {
        this.hideBurgerMenu();
      } else {
        this.showBurgerMenu();
      }
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
    z-index: 600;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: $colorWhite;
    box-shadow: 0 1px 12px $colorBoulder;
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
    background: $colorAlabaster;
  }

  &__search-title {
    padding: 2rem;
    text-align: center;
    font-size: 2rem;
    font-weight: $fontWeightMedium;
    color: $colorBoulder;
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
        color: $colorSquash;

        &::after {
          transform: scaleX(1);
        }
      }

      #{$root}-flyout {
        max-height: 300px;
        z-index: 10;
      }

      #{$root}-flyout__container {
        opacity: 1;
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
    color: $colorBlack;
    transition: color 0.3s linear;
    padding: 0 2rem;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: $colorSquash;
      transform: scaleX(0);
      transform-origin: center center;
      transition: transform 0.3s linear;
    }
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
    text-decoration: none;
    transition: color 0.3s linear;
    background: transparent;
    margin-right: 0.5rem;
    color: $colorBlack;
    cursor: pointer;

    @include media-tablet-up {
      font-size: 2rem;
    }

    &:hover {
      color: $colorSquash;
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
