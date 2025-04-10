<template>
  <div class="card container h-svh flex justify-center justify-self-center" :theme="theme">
    <!-- ACCOUNT LAYOUT -->
    <!-- <ribbon></ribbon> -->
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
