<template>
  <div class="main-header-flyout-categories">
    <div
      v-for="category in categories"
      :key="category.id"
      class="main-header-flyout-categories__category"
    >
      <router-link
        class="main-header-flyout-categories__category-link"
        :to="`/cat/${category.id}`"
      >
        {{ category.name }}
      </router-link>
      <ul
        v-if="category.children && category.children.length"
        class="main-header-flyout-categories__subcategories"
      >
        <li
          v-for="subCategory in category.children"
          :key="subCategory.id"
          class="main-header-flyout-categories__subcategory"
        >
          <router-link
            class="main-header-flyout-categories__subcategory-link"
            :to="`/cat/${subCategory.id}`"
          >
            {{ subCategory.name }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'main-header-flyout-categories',
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

.main-header-flyout-categories {
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
    transition: color 0.3s linear;

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
