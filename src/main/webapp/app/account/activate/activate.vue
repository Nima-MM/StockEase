<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-md-8">
        <h1>Aktivierung</h1>
        <div class="alert alert-success" v-if="success">
          <span><strong>Ihr Benutzer wurde aktiviert.</strong> Bitte </span>
          <a class="alert-link" @click="openLogin">anmelden</a>.
        </div>
        <div class="alert alert-danger" v-if="error">
          <strong>Ihr Benutzer konnte nicht aktiviert werden.</strong> Bitte benutzen Sie die Registrierungsmaske, um sich zu registrieren.
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./activate.component.ts"></script>
