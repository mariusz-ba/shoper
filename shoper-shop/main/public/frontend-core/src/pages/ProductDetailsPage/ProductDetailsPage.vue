<template>
  <div class="product-details-page">
    <h1>Product details</h1>
    <p>ID: {{ $route.params.id }}</p>
    <p>Slug: {{ $route.params.slug }}</p>
  </div>
</template>

<script>
export default {
  name: 'product-details-page',
};
</script>
