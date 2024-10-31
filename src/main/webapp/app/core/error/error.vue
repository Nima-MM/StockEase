<template>
  <div>
    <div class="row">
      <div class="col-md-3">
        <span class="hipster img-fluid rounded"></span>
      </div>
      <div class="col-md-9">
        <h1>Fehlerseite!</h1>

        <div v-if="errorMessage">
          <div class="alert alert-danger">{{ errorMessage }}</div>
        </div>
        <div v-if="error403" class="alert alert-danger">Sie haben nicht die nötigen Berechtigungen um diese Seite anzuzeigen.</div>
        <div v-if="error404" class="alert alert-warning">Die Seite existiert nicht.</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./error.component.ts"></script>
