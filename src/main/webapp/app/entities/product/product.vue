<template>
  <v-card class="fill-height" flat>
    <!-- search bar -->
    <template v-slot:text>
      <v-text-field
        type="search"
        v-model="search"
        label="Produkt suchen"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
        single-line
      ></v-text-field>
    </template>
    <!-- table -->
    <v-data-table :headers="productTableHeaders" :items="products" :sort-by="[{ key: 'id', order: 'asc' }]" :hover="true" :search="search">
      <template v-slot:item.actions="{ item }">
        <div class="actions">
          <RefillDialog :product="item" />
          <DecreaseDialog :product="item" />
          <EditDialog :product="item" />
          <DeleteDialog :product="item" />
        </div>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="retrieveProducts"> Reset </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts" src="./product.component.ts"></script>
<style scoped>
.actions {
  display: flex;
  justify-content: center;
  gap: 10%;
}
</style>
