<template>
  <div class="min-h-screen flex items-center justify-center">
    <!-- äusserer Card-Wrapper -->
    <div class="flex items-stretch max-w-3xl shadow-lg rounded-lg overflow-hidden">
      <!-- linke Spalte -->
      <div class="flex flex-col gap-6 px-8 flex-1">
        <h1 class="text-2xl font-semibold">Mein Lager</h1>

        <!-- Formular bekommt volle Höhe des Eltern-Blocks, aber nicht mehr -->
        <login-form class="max-w-full"></login-form>
        <img src="../../../content/images/jhipster_family_member_0.svg" alt="Warehouse Image" class="h-full w-full object-cover" />
      </div>

      <!-- rechte Spalte (Bild) -->
      <div class="w-100 flex-shrink-0">
        <img src="../../../content/images/warehouse2.png" alt="Warehouse Image" class="h-full w-full object-cover" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./auth-layout.component.ts"></script>
