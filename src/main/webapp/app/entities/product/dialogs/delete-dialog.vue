<template>
  <dialog-template header-height="100px" header-background-color="#D32F2F" header-icon="mdi-delete" header-title="PRODUKT LÖSCHEN">
    <!-- Activator Slot -->
    <template #activator="{ open }">
      <v-icon @click="open" v-tooltip="'Produkt aus dem Inventar Löschen'" class="icon" color="#D32F2F">mdi-delete</v-icon>
    </template>
    <!-- Optionaler Header-Slot -->
    <template #header></template>
    <!-- Default Text-Slot -->
    <template #text>
      <p>
        {{ product?.category?.name }} - {{ product?.color?.name }}<br /><br />
        EAN: <span style="font-weight: bold">{{ product?.ean }}</span
        ><br />
        Produktname: <span style="font-weight: bold">{{ product?.name }}</span
        ><br />
        Marke: <span style="font-weight: bold">{{ product?.brand?.name }}</span
        ><br />
        Bestand: <span style="font-weight: bold">{{ product?.stock }}</span
        ><br />
        <br />
        <span style="color: #e64a19; font-size: large; font-weight: bold">Aus dem Sortiment löschen?</span>
      </p>
    </template>
    <!-- Mehrere Action-Slots mit einzigartigen Namen -->
    <template #actions="{ close }">
      <v-btn @click="close">Abbrechen</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="red" @click="() => confirmDeletion(close)"
        ><v-icon color="red" @click="() => confirmDeletion(close)" size="medium">mdi-trash-can-outline</v-icon><span>Löschen</span></v-btn
      >
    </template>
  </dialog-template>
</template>

<script lang="ts" src="./delete-dialog.component.ts"></script>

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
