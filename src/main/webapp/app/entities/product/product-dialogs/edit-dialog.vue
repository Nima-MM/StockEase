<template>
  <dialog-template header-height="100px" header-background-color="#2196F3" header-icon="mdi-pen" header-title="EDITIEREN">
    <!-- Activator Slot -->
    <template #activator="{ open }">
      <v-icon @click="open" v-tooltip="'Produktdatenblatt ändern'" class="icon" color="#2196F3">mdi-pen</v-icon>
    </template>
    <!-- Optionaler Header-Slot -->
    <template #header></template>
    <!-- Input-Slot -->
    <template #input>
      <v-text-field v-model="productToUpdate.ean" type="text" class="inputField2" label="EAN" max-width="600px"></v-text-field>
      <div style="display: flex" max-width="600px">
        <v-text-field v-model="productToUpdate.name" type="text" class="inputField1" label="Produktname" max-width="450px"></v-text-field>
        <v-text-field v-model="productToUpdate.stock" type="number" class="inputField3" label="Bestand" max-width="120px"></v-text-field>
      </div>
      <div style="display: flex; gap: 10px" max-width="550px">
        <v-select
          :items="brandNames"
          label="Marke"
          class="inputField4"
          v-model="productToUpdate.brand.name"
          @update:model-value="updateBrand"
        />
        <v-select
          :items="colorNames"
          label="Farbe"
          class="inputField5"
          v-model="productToUpdate.color.name"
          @update:model-value="updateColor"
        />
        <v-select
          :items="categoryNames"
          label="Kategorie"
          class="inputField3"
          v-model="productToUpdate.category.name"
          @update:model-value="updateCategory"
        />
      </div>
    </template>
    <!-- Mehrere Action-Slots mit einzigartigen Namen -->
    <template #actions="{ close }">
      <v-btn @click="close">Abbrechen</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="#1976D2" @click="() => confirmEdit(close)">Speichern</v-btn>
    </template>
  </dialog-template>
</template>
<script lang="ts" src="./edit-dialog.component.ts"></script>
<style scoped>
.dialog-logo {
  align-self: center;
}

.dialog-title {
  align-self: center;
}

.icon {
  border-style: solid;
  border-left: 10px;
  border: 5px;
  border-color: rgb(200, 9, 22);
}

.inputField1 {
  margin-right: 10px;
}
</style>
