<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-md-8">
        <h1>Passwort zurücksetzen</h1>

        <div class="alert alert-warning" v-if="!success">
          <p>Geben Sie die Email Adresse ein, welche Sie bei der Registrierung verwendet haben.</p>
        </div>

        <div class="alert alert-success" v-if="success">
          <p>Eine Email mit weiteren Instruktionen für das Zurücksetzen des Passworts wurde gesendet.</p>
        </div>

        <form v-if="!success" name="form" @submit.prevent="requestReset()">
          <div class="form-group">
            <label class="form-control-label" for="email">Email Adresse</label>
            <input
              type="email"
              class="form-control"
              id="email"
              name="email"
              placeholder="Ihre Email Adresse"
              :class="{ valid: !v$.resetAccount.email.$invalid, invalid: v$.resetAccount.email.$invalid }"
              v-model="v$.resetAccount.email.$model"
              minlength="5"
              maxlength="254"
              email
              required
              data-cy="emailResetPassword"
            />
            <div v-if="v$.resetAccount.email.$anyDirty && v$.resetAccount.email.$invalid">
              <small class="form-text text-danger" v-if="!v$.resetAccount.email.required">Ihre Email Adresse wird benötigt.</small>
              <small class="form-text text-danger" v-if="!v$.resetAccount.email.email">Ihre Email Adresse ist ungültig.</small>
              <small class="form-text text-danger" v-if="!v$.resetAccount.email.minLength"
                >Ihre Email Adresse muss mindestens 5 Zeichen lang sein</small
              >
              <small class="form-text text-danger" v-if="!v$.resetAccount.email.maxLength"
                >Ihre Email Adresse darf nicht länger als 50 Zeichen sein</small
              >
            </div>
          </div>
          <button type="submit" :disabled="v$.resetAccount.$invalid" class="btn btn-primary" data-cy="submit">Passwort zurücksetzen</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./reset-password-init.component.ts"></script>
