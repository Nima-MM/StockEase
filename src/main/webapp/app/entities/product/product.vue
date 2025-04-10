<template>
  <div class="card">
    <DataTable
      v-model:expandedRows="expandedRows"
      :value="products"
      dataKey="id"
      paginator
      :rows="5"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      :size="'small'"
      stripedRows
      @rowExpand="onRowExpand"
      @rowCollapse="onRowCollapse"
      tableStyle="min-width: 60rem"
    >
      <template #header>
        <div class="flex flex-wrap justify-end gap-2">
          <Button text icon="pi pi-plus" label="Expand All" @click="expandAll" />
          <Button text icon="pi pi-minus" label="Collapse All" @click="collapseAll" />
        </div>
      </template>
      <template #empty> No customers found. </template>
      <template #loading> Loading customers data. Please wait. </template>
      <Column expander style="width: 5rem" />
      <Column field="ean" :header="productTableHeaders[0].title"></Column>
      <Column field="stock" :header="productTableHeaders[4].title"></Column>
      <Column field="name" :header="productTableHeaders[3].title"></Column>
      <Column :header="productTableHeaders[1].title">
        <template #body="slotProps">
          {{ slotProps.data.category.name }}
        </template>
      </Column>
      <Column :header="productTableHeaders[2].title">
        <template #body="slotProps">
          {{ slotProps.data.brand.name }}
        </template>
      </Column>
      <Column :header="productTableHeaders[5].title">
        <template #body="slotProps">
          {{ slotProps.data.color.name }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script lang="ts" src="./product.component.ts"></script>
<style scoped>
.actions {
  display: flex;
  justify-content: center;
  gap: 10%;
}
</style>
<!-- <v-card class="fill-height" flat> -->
<!-- search bar -->
<!-- <template v-slot:text>
      <v-text-field
        type="search"
        v-model="search"
        label="Produkt suchen"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
        single-line
      ></v-text-field>
    </template> -->
<!-- table -->
<!-- <v-data-table :headers="productTableHeaders" :items="products" :sort-by="[{ key: 'id', order: 'asc' }]" :hover="true" :search="search">
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
  </v-card> -->
