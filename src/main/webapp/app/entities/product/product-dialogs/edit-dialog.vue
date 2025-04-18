<template>
  <div class="card flex justify-center">
    <Button
      variant="text"
      type="button"
      icon="pi pi-pencil"
      label="Bearbeiten"
      class="p-button-outlined"
      severity="info"
      @click="visible = true"
    />

    <Dialog v-model:visible="visible" modal pt:root:class="!border-0 " pt:mask:class="backdrop-blur-sm">
      <template #container>
        <header class="p-4 bg-gradient-to-r from-blue-500 to-blue-700">
          <span class="pi pi-pencil p-4"></span>
          <span class="font-bold text-xl dark:text-primary-50">BEARBEITEN</span>
        </header>

        <!-- content -->
        <div class="flex flex-col px-8 py-8 gap-6 rounded-2xl">
          <FloatLabel variant="on">
            <label for="on_ean" class="!text-primary-50 !z-1">EAN</label>
            <InputText
              v-model="productToUpdate.ean"
              id="on_ean"
              class="focus:!border-[var(--p-blue-500)] !border-[var(--p-primary-50)] focus:!outline-none !border-1 !text-blue-400"
              fluid
            />
          </FloatLabel>
          <!-- name and stock -->
          <div class="flex gap-2">
            <div class="!w-4/6">
              <FloatLabel variant="on" class="">
                <label for="on_name" class="!text-primary-50 !z-1">Produktname</label>
                <InputText
                  v-model="productToUpdate.name"
                  id="on_name"
                  class="!w-full focus:!border-[var(--p-blue-500)] !border-[var(--p-primary-50)] focus:!outline-none !border-1 !text-blue-400"
                />
              </FloatLabel>
            </div>
            <div class="!w-2/6">
              <FloatLabel variant="on">
                <label for="on_stock" class="!text-primary-50 !z-1">Bestand</label>
                <InputNumber
                  v-model="productToUpdate.stock"
                  inputId="on_stock"
                  suffix=" Stück"
                  inputClass="focus:!border-[var(--p-blue-500)] !border-[var(--p-primary-50)] focus:!outline-none !border-1 !text-blue-400"
                  fluid
                />
              </FloatLabel>
            </div>
          </div>
          <!-- TODO: outline color -->
          <div class="flex gap-2">
            <div class="!w-2/6">
              <FloatLabel variant="on" class="">
                <label for="on_brand" class="!text-primary-50 !z-1">Marke</label>
                <Select
                  v-model="productToUpdate.brand.name"
                  inputId="on_brand"
                  :options="brandNames"
                  @update:model-value="updateBrand"
                  class="!w-full focus:!border-[var(--p-blue-500)] !border-[var(--p-primary-50)] focus:!outline-none !border-1 !text-blue-400"
                />
              </FloatLabel>
            </div>
            <div class="!w-2/6">
              <FloatLabel variant="on" class="">
                <label for="on_color" class="!text-primary-50 !z-1">Farbe</label>
                <Select
                  v-model="productToUpdate.color.name"
                  inputId="on_color"
                  :options="colorNames"
                  @update:model-value="updateColor"
                  class="!w-full focus:!border-[var(--p-blue-500)] !border-[var(--p-primary-50)] focus:!outline-none !border-1 !text-blue-400"
                />
              </FloatLabel>
            </div>
            <div class="!w-2/6">
              <FloatLabel variant="on" class="">
                <label for="on_category" class="!text-primary-50 !z-1">Kategorie</label>
                <Select
                  v-model="productToUpdate.category.name"
                  inputId="on_category"
                  :options="categoryNames"
                  @update:model-value="updateCategory"
                  class="!w-full focus:!border-[var(--p-blue-500)] !border-[var(--p-primary-50)] focus:!outline-none !border-1 !text-blue-400"
                />
              </FloatLabel>
            </div>
          </div>

          <!-- action buttons -->
          <div class="flex items-center gap-4">
            <Button
              label="Abbrechen"
              @click="visible = false"
              text
              class="!p-4 w-full !text-surface-0 !border !border-white/50 hover:!bg-white/25"
            ></Button>
            <Button
              label="Speichern"
              @click="confirmEdit"
              text
              class="!p-4 w-full !text-blue-400 !border !border-white/50 hover:!bg-white/25"
            ></Button>
          </div>
        </div>
      </template>
    </Dialog>
  </div>
</template>
<script lang="ts" src="./edit-dialog.component.ts"></script>
