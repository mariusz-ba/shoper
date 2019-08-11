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
      <select v-model="page">
        <option
          v-for="index in pagesLimit"
          :key="index"
          :value="index"
        >
          {{ index }}
        </option>
      </select>
      <h2>You are on page: {{ pageNumber }} out of {{ pagesLimit }}</h2>
      <products-list :products="productsList" />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import { ProductsActionsTypes } from '../../store/modules/products/productsActions';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import ProductsList from '../../components/ProductsList/ProductsList';

export default {
  name: 'products-list-page',
  components: {
    Breadcrumbs,
    ProductsList
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
    '$route': {
      immediate: true,
      handler(to) {
        this.page = to.query.page || 1;
        this.sorting = to.query.sorting || 'oldest';

        this.fetchProductsForPage(this.page);
      }
    },
    sorting(value) {
      this.updateQueryParams({ sorting: value, page: 1 });
    },
    page(value) {
      this.updateQueryParams({ page: value });
    }
  },
  methods: {
    ...mapActions('products', {
      fetchProducts: ProductsActionsTypes.FETCH_PRODUCTS
    }),
    fetchProductsForPage(pageIndex) {
      this.fetchProducts({
        page: pageIndex,
        limit: this.productsOnPage,
        sorting: this.sorting,
        category: this.$route.params.category
      });
    },
    updateQueryParams(query) {
      this.$router.push({
        name: 'products-list-page',
        params: this.$route.params,
        query: {
          ...this.$route.query,
          ...query
        }
      });
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
}
</style>
