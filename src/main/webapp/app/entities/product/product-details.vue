<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="product">
        <h2 class="jh-entity-heading" data-cy="productDetailsHeading"><span>Product</span> {{ product.id }}</h2>
        <dl class="row jh-entity-details">
          <dt>
            <span>Stock</span>
          </dt>
          <dd>
            <span>{{ product.stock }}</span>
          </dd>
          <dt>
            <span>Name</span>
          </dt>
          <dd>
            <span>{{ product.name }}</span>
          </dd>
          <dt>
            <span>Image</span>
          </dt>
          <dd>
            <span>{{ product.image }}</span>
          </dd>
          <dt>
            <span>Ean</span>
          </dt>
          <dd>
            <span>{{ product.ean }}</span>
          </dd>
          <dt>
            <span>Description</span>
          </dt>
          <dd>
            <span>{{ product.description }}</span>
          </dd>
          <dt>
            <span>Category</span>
          </dt>
          <dd>
            <div v-if="product.category">
              <router-link :to="{ name: 'CategoryView', params: { categoryId: product.category.id } }">{{
                product.category.id
              }}</router-link>
            </div>
          </dd>
          <dt>
            <span>Brand</span>
          </dt>
          <dd>
            <div v-if="product.brand">
              <router-link :to="{ name: 'BrandView', params: { brandId: product.brand.id } }">{{ product.brand.id }}</router-link>
            </div>
          </dd>
          <dt>
            <span>Color</span>
          </dt>
          <dd>
            <div v-if="product.color">
              <router-link :to="{ name: 'ColorView', params: { colorId: product.color.id } }">{{ product.color.id }}</router-link>
            </div>
          </dd>
        </dl>
        <button type="submit" @click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span>Zurück</span>
        </button>
        <router-link v-if="product.id" :to="{ name: 'ProductEdit', params: { productId: product.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span>Bearbeiten</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./product-details.component.ts"></script>
