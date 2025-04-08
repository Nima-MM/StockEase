<style scoped>
.layout {
  height: 100svh;
  max-width: 1768px;
  margin: 0 auto;
}
</style>
<template>
  <!-- <v-app :style="{ height: appMinHeight }" class="layout" :theme="theme"> -->
  <div class="layout" :theme="theme">
    <!-- ACCOUNT LAYOUT -->
    <account-layout v-if="!authenticated"></account-layout>
    <!-- CORE LAYOUT -->
    <main-layout v-else></main-layout>
  </div>
</template>

<script lang="ts" src="./app.component.ts"></script>

<!-- <template>
  <div id="app">
    <ribbon></ribbon>
    <div id="app-header">
      <jhi-navbar></jhi-navbar>
    </div>
    <div class="container-fluid">
      <div class="card jh-card">
        <router-view></router-view>
      </div>
      <b-modal id="login-page" hide-footer lazy>
        <template #modal-title>
          <span data-cy="loginTitle" id="login-title">Anmeldung</span>
        </template>
        <login-form></login-form>
      </b-modal>

      <jhi-footer></jhi-footer>
    </div>
  </div>
</template>
-->
