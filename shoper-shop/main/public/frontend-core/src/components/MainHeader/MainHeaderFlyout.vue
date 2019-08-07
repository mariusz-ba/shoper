<template>
  <div class="main-header-flyout">
    <div class="main-header-flyout__container">
      <div
        v-for="category in categories"
        :key="category.id"
        class="main-header-flyout__category"
      >
        <router-link
          class="main-header-flyout__category-link"
          :to="`/cat/${category.id}`"
        >
          {{ category.name }}
        </router-link>
        <ul
          v-if="category.children && category.children.length"
          class="main-header-flyout__subcategories"
        >
          <li
            v-for="subCategory in category.children"
            :key="subCategory.id"
            class="main-header-flyout__subcategory"
          >
            <router-link
              class="main-header-flyout__subcategory-link"
              :to="`/cat/${subCategory.id}`"
            >
              {{ subCategory.name }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'main-header-flyout',
  props: {
    categories: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style lang="scss">
@import '../../utils/scss/variables/fonts';
@import '../../utils/scss/variables/colors';

.main-header-flyout {
  max-height: 0;
  overflow: hidden;
  position: absolute;
  top: 7rem;
  left: 0;
  width: 100%;
  background: getColor('navbarFlyoutBackground');
  box-shadow: 0 4px 4px getColor('navbarFlyoutShadow');
  transition: max-height 0s linear;
  transition-delay: .125s;

  &__container {
    margin: 0 auto;
    padding: 2rem;
    max-width: 1440px;
    opacity: 0;
    transition: opacity .3s ease-in;
    transition-delay: .125s;
  }

  &__category {
    &:not(:last-of-type) {
      margin-bottom: 1rem;
    }
  }

  &__category-link,
  &__subcategory-link {
    color: getColor('navbarPrimary');
    display: inline-block;
    text-decoration: none;
    transition: color .3s linear;

    &:hover {
      color: getColor('navbarAccent');
    }
  }

  &__category-link {
    font-size: $fontSizeMedium;
    font-weight: $fontWeightMedium;
    margin-bottom: 1rem;

    &:hover {
      text-decoration: underline;
    }
  }

  &__subcategory {
    font-size: $fontSizeRegular;
    font-weight: $fontWeightRegular;
  }

  &__subcategories {
    list-style-type: none;
  }

  &__subcategory {
    &:not(:last-of-type) {
      margin-bottom: 0.5rem;
    }
  }
}
</style>
