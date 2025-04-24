<template>
  <!-- ACCOUNT LAYOUT -->
  <AccountLayout v-if="!authenticated" />
  <!-- CORE LAYOUT -->
  <MainLayout v-else />
</template>
<script lang="ts" src="./auth-gateway.component.ts"></script>
