<template>
  <div class="products-list-page">
    <div class="products-list-page__column products-list-page__column--filters">Filters</div>
    <div class="products-list-page__column products-list-page__column--products">
      <breadcrumbs
        v-if="categoryPath.length"
        class="products-list-page__breadcrumbs"
        :categories="categoryPath"
      />
      <select v-model="sorting">
        <option value="oldest">Oldest</option>
        <option value="newest">Newest</option>
        <option value="priceAsc">Price ascending</option>
        <option value="priceDesc">Price descending</option>
      </select>
      <h2>You are on page: {{ pageNumber }} out of {{ pagesLimit }}</h2>
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
import { mapState, mapGetters } from 'vuex';
import { ProductsActionsTypes } from '../../store/modules/products/productsActions';
import { store } from '../../store/store';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import ProductsList from '../../components/ProductsList/ProductsList';
import Pagination from '../../components/Pagination/Pagination';

const routeUpdateHandler = (to, from, next) => {
  const page = Number(to.query.page) || 1;
  const sorting = to.query.sorting || 'oldest';

  store.dispatch(`products/${ProductsActionsTypes.FETCH_PRODUCTS}`, {
    page,
    limit: 15,
    sorting,
    category: to.params.category
  })
    .then(() => {
      next();
      window.scrollTo(0, 0);
    })
    .catch(() => {
      next('/not-found');
    });
}

export default {
  name: 'products-list-page',
  components: {
    Breadcrumbs,
    ProductsList,
    Pagination
  },
  data() {
    return {
      sorting: 'oldest',
      productsOnPage: 15,
      page: 1
    };
  },
  computed: {
    ...mapState('products', ['categoryPath', 'productsCount']),
    ...mapGetters('products', ['productsList']),
    pageNumber() {
      return this.$route.query.page || 1;
    },
    pagesLimit() {
      return Math.ceil(this.productsCount / this.productsOnPage);
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
        name: 'products-list-page',
        params: this.$route.params,
        query: {
          ...this.$route.query,
          ...query
        }
      });
    },
    pageChangeHandler(index) {
      this.page = index;
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
    display: flex;
  }

  &__column {
    flex: 1;

    &--filters {
      flex: 0 0 260px;
    }
  }

  &__breadcrumbs {
    margin-bottom: 2rem;
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
