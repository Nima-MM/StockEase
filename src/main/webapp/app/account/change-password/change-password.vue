<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-md-8 toastify-container">
        <h2 v-if="username" id="password-title">
          <span
            >Passwort für [<strong>{{ username }}</strong
            >]</span
          >
        </h2>

        <div class="alert alert-success" role="alert" v-if="success"><strong>Passwort wurde geändert!</strong></div>
        <div class="alert alert-danger" role="alert" v-if="error">
          <strong>Es ist ein Fehler aufgetreten!</strong> Das Passwort konnte nicht geändert werden.
        </div>

        <div class="alert alert-danger" role="alert" v-if="doNotMatch">Das bestätigte Passwort entspricht nicht dem neuen Passwort!</div>

        <form name="form" id="password-form" @submit.prevent="changePassword()">
          <div class="form-group">
            <label class="form-control-label" for="currentPassword">Aktuelles Passwort</label>
            <input
              type="password"
              class="form-control"
              id="currentPassword"
              name="currentPassword"
              :class="{ valid: !v$.resetPassword.currentPassword.$invalid, invalid: v$.resetPassword.currentPassword.$invalid }"
              placeholder="Aktuelles Passwort"
              v-model="v$.resetPassword.currentPassword.$model"
              required
              data-cy="currentPassword"
            />
            <div v-if="v$.resetPassword.currentPassword.$anyDirty && v$.resetPassword.currentPassword.$invalid">
              <small class="form-text text-danger" v-if="!v$.resetPassword.currentPassword.required"
                >Ein neues Passwort wird benötigt.</small
              >
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="newPassword">Neues Passwort</label>
            <input
              type="password"
              class="form-control"
              id="newPassword"
              name="newPassword"
              placeholder="Neues Passwort"
              :class="{ valid: !v$.resetPassword.newPassword.$invalid, invalid: v$.resetPassword.newPassword.$invalid }"
              v-model="v$.resetPassword.newPassword.$model"
              minlength="4"
              maxlength="50"
              required
              data-cy="newPassword"
            />
            <div v-if="v$.resetPassword.newPassword.$anyDirty && v$.resetPassword.newPassword.$invalid">
              <small class="form-text text-danger" v-if="!v$.resetPassword.newPassword.required">Ein neues Passwort wird benötigt.</small>
              <small class="form-text text-danger" v-if="!v$.resetPassword.newPassword.minLength"
                >Das neue Passwort muss mindestens 4 Zeichen lang sein</small
              >
              <small class="form-text text-danger" v-if="!v$.resetPassword.newPassword.maxLength"
                >Das neue Passwort darf nicht länger als 50 Zeichen sein</small
              >
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="confirmPassword">Neues Passwort bestätigen</label>
            <input
              type="password"
              class="form-control"
              id="confirmPassword"
              name="confirmPassword"
              :class="{ valid: !v$.resetPassword.confirmPassword.$invalid, invalid: v$.resetPassword.confirmPassword.$invalid }"
              placeholder="Bestätigen Sie Ihr neues Passwort"
              v-model="v$.resetPassword.confirmPassword.$model"
              minlength="4"
              maxlength="50"
              required
              data-cy="confirmPassword"
            />
            <div v-if="v$.resetPassword.confirmPassword.$anyDirty && v$.resetPassword.confirmPassword.$invalid">
              <small class="form-text text-danger" v-if="!v$.resetPassword.confirmPassword.sameAsPassword"
                >Das bestätigte Passwort entspricht nicht dem neuen Passwort!</small
              >
            </div>
          </div>

          <button type="submit" :disabled="v$.resetPassword.$invalid" class="btn btn-primary" data-cy="submit">Speichern</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./change-password.component.ts"></script>
