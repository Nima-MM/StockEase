<template>
  <div class="card flex justify-center">
    <Button variant="text" type="button" icon="pi pi-plus" label="Bestand erhöhen" class="p-button-outlined" @click="visible = true" />

    <Dialog v-model:visible="visible" modal pt:root:class="!border-0 " pt:mask:class="backdrop-blur-sm">
      <template #header style="background-image: radial-gradient(circle at left top, green, green, #009688)">
        <header>
          <span class="font-bold text-xl text-green-600">BESTAND AUFFÜLLEN</span>
        </header>
        <!--  <svg width="35" height="40" viewBox="0 0 35 40" fill="none"
          xmlns="http://www.w3.org/2000/svg" class="block mx-auto">
          <path
          d="M25.87 18.05L23.16 17.45L25.27 20.46V29.78L32.49 23.76V13.53L29.18 14.73L25.87 18.04V18.05ZM25.27 35.49L29.18 31.58V27.67L25.27 30.98V35.49ZM20.16 17.14H20.03H20.17H20.16ZM30.1 5.19L34.89 4.81L33.08 12.33L24.1 15.67L30.08 5.2L30.1 5.19ZM5.72 14.74L2.41 13.54V23.77L9.63 29.79V20.47L11.74 17.46L9.03 18.06L5.72 14.75V14.74ZM9.63 30.98L5.72 27.67V31.58L9.63 35.49V30.98ZM4.8 5.2L10.78 15.67L1.81 12.33L0 4.81L4.79 5.19L4.8 5.2ZM24.37 21.05V34.59L22.56 37.29L20.46 39.4H14.44L12.34 37.29L10.53 34.59V21.05L12.42 18.23L17.45 26.8L22.48 18.23L24.37 21.05ZM22.85 0L22.57 0.69L17.45 13.08L12.33 0.69L12.05 0H22.85Z"
          fill="var(--p-primary-700)" />
          <path
            d="M30.69 4.21L24.37 4.81L22.57 0.69L22.86 0H26.48L30.69 4.21ZM23.75 5.67L22.66 3.08L18.05 14.24V17.14H19.7H20.03H20.16H20.2L24.1 15.7L30.11 5.19L23.75 5.67ZM4.21002 4.21L10.53 4.81L12.33 0.69L12.05 0H8.43002L4.22002 4.21H4.21002ZM21.9 17.4L20.6 18.2H14.3L13 17.4L12.4 18.2L12.42 18.23L17.45 26.8L22.48 18.23L22.5 18.2L21.9 17.4ZM4.79002 5.19L10.8 15.7L14.7 17.14H14.74H15.2H16.85V14.24L12.24 3.09L11.15 5.68L4.79002 5.2V5.19Z"
            fill="var(--p-primary-200)" />
        </svg>-->
      </template>

      <!-- <template #container="{ closeCallback }"> -->
      <div class="flex flex-col px-8 py-8 gap-6 rounded-2xl">
        <div class="inline-flex flex-col gap-2">
          <p>
            <span class="text-primary-100 font-bold">Kategorie: {{ product?.category?.name }} - Farbe: {{ product?.color?.name }}</span
            ><br />
            EAN: <span style="font-weight: bold">{{ product?.ean }}</span
            ><br />
            Marke: <span style="font-weight: bold">{{ product?.brand?.name }}</span
            ><br />
            Produktname: <span style="font-weight: bold">{{ product?.name }}</span
            ><br />
            Bestand: <span style="font-weight: bold">{{ product?.stock }}</span
            ><br />
          </p>
        </div>
        <div class="inline-flex flex-col gap-2">
          <label for="amount" class="!text-green-400 font-semibold">Um wie viel auffüllen?</label>
          <InputNumber
            v-model="amount"
            id="amount"
            class="!bg-white/0 !border-0 !text-primary-50 w-80"
            inputClass="focus:!border-[var(--p-primary-50)] !border-[var(--p-green-500)] focus:!outline-none !border-1 !text-primary-50"
          />
        </div>
        <div class="flex items-center gap-4">
          <Button
            label="Abbrechen"
            @click="visible = false"
            text
            class="!p-4 w-full !text-surface-0 !border !border-white/50 hover:!bg-white/25"
          ></Button>
          <Button
            label="Auffüllen"
            @click="confirmRefill"
            text
            class="!p-4 w-full !text-green-400 !border !border-white/50 hover:!bg-white/25"
          ></Button>
        </div>
      </div>
      <!-- </template> -->
    </Dialog>
  </div>
</template>
<script lang="ts" src="./refill-dialog.component.ts"></script>

<!--
<template>
  <dialog-template header-height="100px" header-background-color="#009688" header-icon="mdi-archive-plus" header-title="BESTAND AUFFÜLLEN">
    <!-- Activator Slot --
    <template #activator="{ open }">
      <v-icon @click="open" v-tooltip="'Den Bestand erhöhen'" class="icon" color="#009688">mdi-archive-plus-outline</v-icon>
    </template>
    <!-- Optionaler Header-Slot --
    <template #header></template>
    <!-- Default Text-Slot --
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
    <!-- Input Slot --
    <template #input>
      <div style="display: flex; gap: 10%">
        <p style="color: #4caf50; padding: 18px; font-size: large; font-weight: bold">Um wie viel auffüllen?</p>
        <v-text-field v-model="amount" type="number" class="inputField3" label="Anzahl" max-width="200px"></v-text-field>
      </div>
    </template>
    <!-- Mehrere Action-Slots mit einzigartigen Namen --
    <template #actions="{ close }">
      <v-btn @click="close">Abbrechen</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="#009688" @click="() => confirmRefill(close)">Auffüllen</v-btn>
    </template>
  </dialog-template>
</template>
<script lang="ts" src="./refill-dialog.component.ts"></script>
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
-->