<template>
  <div>
    <!-- Activator Slot: Beliebiges Element zum Öffnen des Dialogs -->
    <slot name="activator" :open="openDialog"></slot>

    <!-- v-dialog Komponente -->
    <v-dialog v-model="internalDialog" :style="overlayStyle" max-width="600">
      <!-- Optionaler Container (v-card als Standard) -->
      <v-card :style="cardStyle">
        <!-- Optionaler Titel-Slot -->
        <v-card-title :style="{ backgroundColor: headerBackgroundColor, height: headerHeight }" class="header">
          <slot name="header" v-if="$slots.header">
            <v-icon class="dialog-logo" :icon="headerIcon" :color="headerIconColor" size="small"></v-icon>
            <span class="title ml-2">{{ headerTitle }}</span>
          </slot>
        </v-card-title>
        <!-- Default Content-Slot starts after header but before rest of other slots-->
        <slot name="default"></slot>
        <!-- Text-Slot -->
        <v-card-text v-if="$slots.text" :style="textSlotStyle">
          <slot name="text">
            <p>Default content for the dialog. Provide custom content using the #default slot.</p>
          </slot>
        </v-card-text>
        <!-- Input Slot -->
        <div v-if="$slots.input" :style="inputStyle" class="inputs">
          <slot name="input">
            <v-text-field label="Field-example-1" outlined></v-text-field>
            <v-text-field label="Field-example-2" outlined></v-text-field>
          </slot>
        </div>
        <!-- Action-Buttons -->
        <v-card-actions>
          <slot name="actions" :close="closeDialog">
            <v-btn @click="closeDialog">Close</v-btn>
          </slot>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts" src="./dialog-template.component.ts"></script>

<style scoped>
.dialog-logo {
  align-self: center;
  justify-content: center;
}

.title {
  align-self: center;
  justify-content: start;
  font-weight: bold;
  font-size: 1.25em;
}

.inputs {
  margin: 10px;
}

.header {
  display: flex;
}
</style>
