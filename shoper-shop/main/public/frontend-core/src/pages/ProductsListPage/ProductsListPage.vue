<template>
  <div class="products-list-page">
    <div class="products-list-page__column products-list-page__column--filters">
      <filters
        class="products-list-page__filters"
        :variations="variations"
        :initial-filters="selectedFilters"
        @change="filtersChangeHandler"
      />
    </div>
    <div class="products-list-page__column products-list-page__column--products">
      <breadcrumbs
        v-if="categoryPath.length"
        class="products-list-page__breadcrumbs"
        :categories="categoryPath"
      />
      <div class="products-list-page__header">
        <h2 class="products-list-page__title">
          {{ $t('products-list-page.title', { page: pageNumber, total: pagesLimit }) }}
        </h2>
        <base-select
          id="sorting"
          class="products-list-page__sorting"
          v-model="sorting"
          :label="$t('products-list-page.sorting')"
          :options="[
            { value: 'oldest', label: $t('products-list-page.oldest') },
            { value: 'newest', label: $t('products-list-page.newest') },
            { value: 'priceAsc', label: $t('products-list-page.priceAsc') },
            { value: 'priceDesc', label: $t('products-list-page.priceDesc') }
          ]"
        />
      </div>
      <products-list :products="productsList" />
      <pagination
        class="products-list-page__pagination"
        :pages-count="pagesLimit"
        :page-index="page"
        @change="pageChangeHandler"
      />
    </div>
  </div>
</template>

<script>
import pick from 'lodash/pick';
import pickBy from 'lodash/pickBy';
import omit from 'lodash/omit';
import { mapState, mapGetters } from 'vuex';
import { ProductsActionsTypes } from '../../store/modules/products/productsActions';
import { store } from '../../store/store';
import { routesNames } from '../../router/routesNames';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import ProductsList from '../../components/ProductsList/ProductsList';
import Pagination from '../../components/Pagination/Pagination';
import Filters from '../../components/Filters/Filters';

const routeUpdateHandler = (to, from, next) => {
  const page = Number(to.query.page) || 1;
  const sorting = to.query.sorting || 'oldest';
  const filters = omit(to.query, ['page', 'sorting']);

  store.dispatch(`products/${ProductsActionsTypes.FETCH_PRODUCTS}`, {
    page,
    limit: 15,
    sorting,
    category: to.params.category,
    filters
  })
  .then(() => {
    next();
    window.scrollTo(0, 0);
  })
  .catch(() => {
    next('/not-found');
  });
};

export default {
  name: 'products-list-page',
  components: {
    Breadcrumbs,
    ProductsList,
    Pagination,
    Filters
  },
  data() {
    return {
      sorting: 'oldest',
      productsOnPage: 15,
      page: 1
    };
  },
  computed: {
    ...mapState('products', [
      'categoryPath',
      'productsCount',
      'variations'
    ]),
    ...mapGetters('products', ['productsList']),
    pageNumber() {
      return this.$route.query.page || 1;
    },
    pagesLimit() {
      return Math.ceil(this.productsCount / this.productsOnPage);
    },
    selectedFilters() {
      const filters = pick(this.$route.query, ['priceFrom', 'priceTo', 'variations']);

      if (filters.variations) {
        if (Array.isArray(filters.variations)) {
          filters.variations = filters.variations.map(variation => Number(variation));
        } else {
          filters.variations = [Number(filters.variations)];
        }
      }

      return filters;
    }
  },
  watch: {
    sorting(value) {
      this.updateQueryParams({ sorting: value, page: 1 });
    },
    page(value) {
      this.updateQueryParams({ page: value });
    }
  },
  beforeRouteEnter: routeUpdateHandler,
  beforeRouteUpdate: routeUpdateHandler,
  methods: {
    updateQueryParams(query) {
      this.$router.push({
        name: routesNames.productsListPage.name,
        params: this.$route.params,
        query: pickBy(
          {
            ...this.$route.query,
            ...query
          },
          (value) => [undefined, null, ''].includes(value) === false
        )
      });
    },
    pageChangeHandler(index) {
      this.page = index;
    },
    filtersChangeHandler(filters) {
      this.updateQueryParams(filters);
    }
  }
};
</script>

<style lang="scss">
@import '../../utils/scss/mixins/media';

.products-list-page {
  margin: 0 auto;
  padding: 2rem;
  max-width: 1440px;

  @include media-tablet-up {
    display: grid;
    grid-template-columns: 260px 1fr;
    grid-column-gap: 2rem;
  }

  &__filters {
    margin-bottom: 2rem;

    @include media-tablet-up {
      margin-bottom: 0;
      position: sticky;
      top: 9rem;
    }
  }

  &__breadcrumbs {
    margin-bottom: 2rem;
  }

  &__header {
    @include media-tablet-up {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 2rem;
    }
  }

  &__title {
    margin-bottom: 2rem;

    @include media-tablet-up {
      margin-bottom: 0;
    }
  }

  &__sorting {
    margin-bottom: 2rem;
    width: 100%;

    @include media-tablet-up {
      margin-bottom: 0;
      width: 200px;
    }
  }

  &__pagination {
    margin-top: 4rem;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
