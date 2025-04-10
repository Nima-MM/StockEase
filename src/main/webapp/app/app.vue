<template>
  <div class="card h-svh flex justify-center justify-self-center" :theme="theme">
    <!-- ACCOUNT LAYOUT -->
    <!-- <ribbon></ribbon> -->
    <account-layout v-if="!authenticated"></account-layout>
    <!-- CORE LAYOUT -->
    <main-layout v-else></main-layout>
  </div>
</template>

<script lang="ts" src="./app.component.ts"></script>
