<template>
  <div class="min-h-screen flex items-center justify-center">
    <!-- Card-Wrapper -->
    <div class="flex items-stretch max-w-7xl shadow-lg rounded-lg">
      <!-- left col -->
      <div class="flex flex-col gap-6 px-8 min-w-xs lg:w-2xl">
        <h1 class="text-2xl font-semibold">Mein Lager</h1>

        <login-form class="max-w-full"></login-form>
        <img src="../../../content/images/jhipster_family_member_0.svg" alt="Warehouse Image" class="max-w-md" />
      </div>

      <!-- right col (img) -->
      <div class="max-w-2xl hidden lg:flex items-center justify-center bg-primary rounded-r-lg">
        <img src="../../../content/images/warehouse2.png" alt="Warehouse Image" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./auth-layout.component.ts"></script>
