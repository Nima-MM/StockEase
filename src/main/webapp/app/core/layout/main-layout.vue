<template>
  <v-layout class="border rounded" style="display: flex; flex-direction: column; height: 100%">
    <main-navbar />
    <!-- v-main als flexibles, scrollbares Element -->
    <v-main style="flex: 1; overflow-y: auto">
      <router-view class="px-16" />
    </v-main>
  </v-layout>
</template>
<script lang="ts" src="./main-layout.component.ts"></script>
