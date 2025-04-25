<template>
  <!-- ACCOUNT LAYOUT -->
  <AuthLayout v-if="!authenticated" />
  <!-- CORE LAYOUT -->
  <MainLayout v-else />
</template>
<script lang="ts" src="./layouts.component.ts"></script>
