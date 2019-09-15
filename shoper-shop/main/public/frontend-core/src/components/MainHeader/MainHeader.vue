<template>
  <header class="main-header">
    <div class="main-header__navbar-wrapper">
      <div class="main-header__navbar">
        <div class="main-header__brand">
          <button
            class="main-header__burger-menu-toggler"
            @click="burgerMenuTogglerClick"
          ></button>
          <router-link
            class="main-header__brand-link"
            :to="{ name: $store.state.routesNames.homePage.name }"
          >
            <img
              class="main-header__brand-image"
              :src="brandImage"
              alt="Shoper"
            />
          </router-link>
        </div>
        <main-header-search @submit="searchSubmitHandler" />
        <main-header-actions @search-click="searchClickHandler" />
      </div>
      <ul class="main-header__menu">
        <li
          v-for="category in categories"
          :key="category.id"
          class="main-header__menu-item"
          @mouseenter="menuMouseEnterHandler"
          @mouseleave="menuMouseLeaveHandler"
        >
          <span class="main-header__menu-link-wrapper">
            <router-link
              class="main-header__menu-link"
              :class="{'main-header__menu-link--with_icon': category.children && category.children.length}"
              :to="{ name: $store.state.routesNames.productsListPage.name, params: { category: category.id } }"
            >
              {{ category.name }}
            </router-link>
          </span>
          <main-header-flyout v-if="category.children && category.children.length">
            <main-header-flyout-categories :categories="category.children" />
          </main-header-flyout>
        </li>
        <li class="main-header__menu-item">
          <span class="main-header__menu-link-wrapper">
            <router-link
              class="main-header__menu-link"
              :to="{ name: $store.state.routesNames.aboutPage.name }"
            >
              {{ $t('main-header.about') }}
            </router-link>
          </span>
        </li>
      </ul>
      <div
        v-show="searchVisible"
        class="main-header__search-flyout"
      >
        <h3 class="main-header__search-flyout-title">{{ $t('main-header.search') }}</h3>
      </div>
    </div>
    <burger-menu
      :visible="burgerMenuVisible"
      :categories="categories"
      @close="burgerMenuTogglerClick"
    />
  </header>
</template>

<script>
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import MainHeaderActions from './MainHeaderActions';
import MainHeaderFlyout from './MainHeaderFlyout';
import MainHeaderFlyoutCategories from './MainHeaderFlyoutCategories';
import MainHeaderSearch from './MainHeaderSearch';
import brandImage from '../../assets/images/header/brand.svg';
import eventBus from '../../services/eventBus';

export default {
  name: 'main-header',
  components: {
    BurgerMenu,
    MainHeaderActions,
    MainHeaderFlyout,
    MainHeaderFlyoutCategories,
    MainHeaderSearch
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
      burgerMenuVisible: false
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
    showPageOverlay(full = false) {
      eventBus.emit('page-overlay:show', full ? { zIndex: 699 } : {});
    },
    hidePageOverlay() {
      eventBus.emit('page-overlay:hide');
    },
    pageOverlayClickHandler() {
      this.hideSearchBar();
      this.hideBurgerMenu();
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
    showBurgerMenu() {
      this.burgerMenuVisible = true;
      this.searchVisible = false;
      this.showPageOverlay(true);
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
    },
    searchSubmitHandler(search) {
      console.log('Searching for: ', search);
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
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1)
  }

  &__navbar {
    margin: 0 auto;
    padding: 0 2rem;
    width: 100%;
    height: 7rem;
    max-width: 1200px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__burger-menu-toggler {
    border: 0;
    outline: 0;
    background: transparent;
    margin-right: 2rem;
    cursor: pointer;

    @include iconFont('icon-menu') {
      font-size: 2.4rem;
      color: $colorBlack;
    }

    @include media-tablet-up {
      display: none;
    }
  }

  &__brand,
  &__actions {
    @include media-tablet-up {
      width: 150px;
    }
  }

  &__brand-image {
    max-width: 100px;

    @include media-tablet-up {
      max-width: none;
    }
  }

  &__menu {
    display: none;

    @include media-tablet-up {
      margin: 0 auto;
      padding: 0 2rem;
      max-width: 1200px;
      list-style-type: none;
      flex: 1;
      display: flex;
      align-items: center;
    }
  }

  &__menu-item {
    &:last-child {
      #{$root}__menu-link {
        border-right: 1px solid $colorMercury;
      }
    }

    &:hover {
      #{$root}__menu-link-wrapper::after {
        transform: scaleX(1);
      }

      #{$root}__menu-link {
        color: $colorSquash;
      }

      #{$root}__menu-link::after {
        transform: rotate(90deg);
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

  &__menu-link-wrapper {
    display: block;
    height: 100%;
    padding: 1.5rem 0;
    position: relative;
    cursor: pointer;

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

  &__menu-link {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    font-size: $fontSizeRegular;
    font-weight: $fontWeightBold;
    color: $colorBlack;
    transition: color 0.3s linear;
    padding: 0 2rem;
    border-left: 1px solid $colorMercury;

    &--with_icon {
      @include iconFont('icon-arrow-left', after) {
        font-size: 1.2rem;
        margin-left: 1rem;
        transform: rotate(-90deg);
        transition: transform 0.2s linear;
      }
    }
  }

  &__search-flyout {
    background: $colorAlabaster;
  }

  &__search-flyout-title {
    padding: 2rem;
    text-align: center;
    font-size: 2rem;
    font-weight: $fontWeightMedium;
    color: $colorBoulder;
  }
}
</style>