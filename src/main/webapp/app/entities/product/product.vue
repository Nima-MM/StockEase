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
        <div class="flex flex-wrap justify-between">
          <div class="flex flex-wrap justify-end gap-2">
            <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined />
            <Button type="button" icon="pi pi-plus" label="Neues Produkt" class="p-button-outlined" @click="addProduct" />
            <Button type="button" icon="pi pi-download" label="Export" class="p-button-outlined" />
            <Button type="button" icon="pi pi-upload" label="Import" class="p-button-outlined" />
          </div>
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
      <!-- <Column header="slotProps"><template #body="slotProps">{{ slotProps.data }}</template>
      </Column> -->
      <Column field="ean" :header="columnKeys.ean"></Column>
      <Column field="stock" :header="columnKeys.stock"></Column>
      <Column field="name" :header="columnKeys.name"></Column>
      <Column :header="columnKeys.category">
        <template #body="slotProps">
          <Skeleton v-if="isFetching"></Skeleton>
          {{ slotProps.data.category.name }}
        </template>
      </Column>
      <Column :header="columnKeys.brand">
        <template #body="slotProps">
          <Skeleton v-if="isFetching"></Skeleton>
          {{ slotProps.data.brand.name }}
        </template>
      </Column>
      <Column :header="columnKeys.color">
        <template #body="slotProps">
          <Skeleton v-if="isFetching"></Skeleton>
          {{ slotProps.data.color.name }}
        </template>
      </Column>
      <template #expansion="slotProps">
        <div class="flex gap-1">
          <Button
            variant="text"
            type="button"
            icon="pi pi-star"
            label="Favoriten"
            class="p-button-outlined"
            severity="contrast"
            @click="collapseAll"
            disabled
          />
          <Button
            variant="text"
            type="button"
            icon="pi pi-eye"
            label="Details"
            class="p-button-outlined"
            severity="contrast"
            @click="collapseAll"
            disabled
          />
          <edit-dialog :product="slotProps.data"></edit-dialog>
          <decrease-dialog :product="slotProps.data"></decrease-dialog>
          <refill-dialog :product="slotProps.data"></refill-dialog>
          <delete-dialog :product="slotProps.data"></delete-dialog>
        </div>
      </template>
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
