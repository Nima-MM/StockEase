<template>
  <div class="card">
    <DataTable
      v-model:filters="filters"
      v-model:expandedRows="expandedRows"
      :loading="isFetching"
      :value="products"
      dataKey="id"
      filterDisplay="menu"
      :globalFilterFields="['name', 'stock', 'ean', 'category.name', 'brand.name', 'color.name']"
      paginator
      :rows="5"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      :size="'small'"
      stripedRows
      @rowExpand="onRowExpand"
      @rowCollapse="onRowCollapse"
      tableStyle="min-width: 60rem"
    >
      <!-- table bar -->
      <template #header>
        <div class="flex justify-between">
          <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined />
          <div class="flex flex-wrap justify-end gap-2">
            <IconField>
              <InputIcon>
                <i class="pi pi-search" />
              </InputIcon>
              <InputText v-model="filters['global'].value" placeholder="Suche im Lager nach..." />
              <!-- <InputText placeholder="Keyword Search" /> -->
            </IconField>
            <Button text icon="pi pi-plus" label="Alle ausklappen" @click="expandAll" />
            <Button text icon="pi pi-minus" label="Alle kollabieren" @click="collapseAll" />
          </div>
        </div>
      </template>
      <!-- table fallbacks -->
      <template #empty> No customers found. </template>
      <template #loading>Loading customers data. Please wait. </template>
      <!-- table headers -->
      <Column expander style="width: 5rem" />
      <Column field="ean" :header="productTableHeaders[0].title"></Column>
      <Column field="stock" :header="productTableHeaders[4].title"></Column>
      <Column field="name" :header="productTableHeaders[3].title"></Column>
      <Column :header="productTableHeaders[1].title">
        <template #body="slotProps">
          <Skeleton v-if="isFetching"></Skeleton>
          {{ slotProps.data.category.name }}
        </template>
      </Column>
      <Column :header="productTableHeaders[2].title">
        <template #body="slotProps">
          <Skeleton v-if="isFetching"></Skeleton>
          {{ slotProps.data.brand.name }}
        </template>
      </Column>
      <Column :header="productTableHeaders[5].title">
        <template #body="slotProps">
          <Skeleton v-if="isFetching"></Skeleton>
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
