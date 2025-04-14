<template>
  <dialog-template
    header-height="100px"
    header-background-color="#FF5722"
    header-icon="mdi-archive-minus"
    header-title="BESTAND REDUZIEREN"
  >
    <!-- Activator Slot -->
    <template #activator="{ open }">
      <v-icon @click="open" v-tooltip="'Den Bestand verringern'" class="icon" color="#FF5722">mdi-archive-minus-outline</v-icon>
    </template>
    <!-- Optionaler Header-Slot -->
    <template #header></template>
    <!-- Default Text-Slot -->
    <template #text>
      <p>
        {{ product?.category?.name }} - {{ product?.color?.name }}<br />
        EAN: <span style="font-weight: bold">{{ product?.ean }}</span
        ><br />
        Marke: <span style="font-weight: bold">{{ product?.brand?.name }}</span
        ><br />
        Produktname: <span style="font-weight: bold">{{ product?.name }}</span
        ><br />
        Bestand: <span style="font-weight: bold">{{ product?.stock }}</span
        ><br />
      </p>
    </template>
    <!-- Input Slot -->
    <template #input>
      <div style="display: flex; gap: 10%">
        <p style="color: #e64a19; padding: 18px; font-size: large; font-weight: bold">Um wie viel reduzieren?</p>
        <v-text-field v-model="amount" type="number" class="inputField3" label="Anzahl" max-width="200px"></v-text-field>
      </div>
    </template>
    <!-- Mehrere Action-Slots mit einzigartigen Namen -->
    <template #actions="{ close }">
      <v-btn @click="close">Abbrechen</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="#E64A19" @click="() => confirmReduction(close)">Reduzieren</v-btn>
    </template>
  </dialog-template>
</template>
<script lang="ts" src="./decrease-dialog.component.ts"></script>
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
