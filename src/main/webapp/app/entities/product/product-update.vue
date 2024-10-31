<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" novalidate @submit.prevent="save()">
        <h2 id="stockManagementApp.product.home.createOrEditLabel" data-cy="ProductCreateUpdateHeading">
          Product erstellen oder bearbeiten
        </h2>
        <div>
          <div class="form-group" v-if="product.id">
            <label for="id">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="product.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-stock">Stock</label>
            <input
              type="number"
              class="form-control"
              name="stock"
              id="product-stock"
              data-cy="stock"
              :class="{ valid: !v$.stock.$invalid, invalid: v$.stock.$invalid }"
              v-model.number="v$.stock.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-name">Name</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="product-name"
              data-cy="name"
              :class="{ valid: !v$.name.$invalid, invalid: v$.name.$invalid }"
              v-model="v$.name.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-image">Image</label>
            <input
              type="text"
              class="form-control"
              name="image"
              id="product-image"
              data-cy="image"
              :class="{ valid: !v$.image.$invalid, invalid: v$.image.$invalid }"
              v-model="v$.image.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-ean">Ean</label>
            <input
              type="text"
              class="form-control"
              name="ean"
              id="product-ean"
              data-cy="ean"
              :class="{ valid: !v$.ean.$invalid, invalid: v$.ean.$invalid }"
              v-model="v$.ean.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-description">Description</label>
            <input
              type="text"
              class="form-control"
              name="description"
              id="product-description"
              data-cy="description"
              :class="{ valid: !v$.description.$invalid, invalid: v$.description.$invalid }"
              v-model="v$.description.$model"
            />
            <div v-if="v$.description.$anyDirty && v$.description.$invalid">
              <small class="form-text text-danger" v-for="error of v$.description.$errors" :key="error.$uid">{{ error.$message }}</small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-category">Category</label>
            <select class="form-control" id="product-category" data-cy="category" name="category" v-model="product.category">
              <option :value="null"></option>
              <option
                :value="product.category && categoryOption.id === product.category.id ? product.category : categoryOption"
                v-for="categoryOption in categories"
                :key="categoryOption.id"
              >
                {{ categoryOption.id }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-brand">Brand</label>
            <select class="form-control" id="product-brand" data-cy="brand" name="brand" v-model="product.brand">
              <option :value="null"></option>
              <option
                :value="product.brand && brandOption.id === product.brand.id ? product.brand : brandOption"
                v-for="brandOption in brands"
                :key="brandOption.id"
              >
                {{ brandOption.id }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="product-color">Color</label>
            <select class="form-control" id="product-color" data-cy="color" name="color" v-model="product.color">
              <option :value="null"></option>
              <option
                :value="product.color && colorOption.id === product.color.id ? product.color : colorOption"
                v-for="colorOption in colors"
                :key="colorOption.id"
              >
                {{ colorOption.id }}
              </option>
            </select>
          </div>
        </div>
        <div>
          <button type="button" id="cancel-save" data-cy="entityCreateCancelButton" class="btn btn-secondary" @click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Abbrechen</span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="v$.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Speichern</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./product-update.component.ts"></script>
