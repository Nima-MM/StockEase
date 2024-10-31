<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-md-8 toastify-container">
        <h1 id="register-title" data-cy="registerTitle">Registrierung</h1>

        <div class="alert alert-success" role="alert" v-if="success">
          <strong>Registrierung gespeichert!</strong> Bitte überprüfen Sie Ihre E-Mails für die Bestätigung.
        </div>

        <div class="alert alert-danger" role="alert" v-if="error">
          <strong>Registrierung fehlgeschlagen!</strong> Bitte versuchen Sie es später nochmal.
        </div>

        <div class="alert alert-danger" role="alert" v-if="errorUserExists">
          <strong>Benutzername bereits vergeben!</strong> Bitte wählen Sie einen anderen aus.
        </div>

        <div class="alert alert-danger" role="alert" v-if="errorEmailExists">
          <strong>E-Mail-Adresse wird bereits verwendet!</strong> Bitte wählen Sie eine andere aus.
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-8">
        <form id="register-form" name="registerForm" @submit.prevent="register()" v-if="!success" no-validate>
          <div class="form-group">
            <label class="form-control-label" for="username">Benutzername</label>
            <input
              type="text"
              class="form-control"
              v-model="v$.registerAccount.login.$model"
              id="username"
              name="login"
              :class="{ valid: !v$.registerAccount.login.$invalid, invalid: v$.registerAccount.login.$invalid }"
              required
              minlength="1"
              maxlength="50"
              pattern="^[a-zA-Z0-9!#$&'*+=?^_`{|}~.-]+@?[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"
              placeholder="Ihr Benutzername"
              data-cy="username"
            />
            <div v-if="v$.registerAccount.login.$anyDirty && v$.registerAccount.login.$invalid">
              <small class="form-text text-danger" v-if="!v$.registerAccount.login.required">Ihr Benutzername wird benötigt.</small>
              <small class="form-text text-danger" v-if="!v$.registerAccount.login.minLength"
                >Ihr Benutzername muss mindestens ein Zeichen lang sein.</small
              >
              <small class="form-text text-danger" v-if="!v$.registerAccount.login.maxLength"
                >Ihr Benutzername darf nicht länger als 50 Zeichen sein.</small
              >
              <small class="form-text text-danger" v-if="!v$.registerAccount.login.pattern">Ihr Benutzername ist ungültig.</small>
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="email">Email Adresse</label>
            <input
              type="email"
              class="form-control"
              id="email"
              name="email"
              :class="{ valid: !v$.registerAccount.email.$invalid, invalid: v$.registerAccount.email.$invalid }"
              v-model="v$.registerAccount.email.$model"
              minlength="5"
              maxlength="254"
              email
              required
              placeholder="Ihre Email Adresse"
              data-cy="email"
            />
            <div v-if="v$.registerAccount.email.$anyDirty && v$.registerAccount.email.$invalid">
              <small class="form-text text-danger" v-if="!v$.registerAccount.email.required">Ihre Email Adresse wird benötigt.</small>
              <small class="form-text text-danger" v-if="!v$.registerAccount.email.email">Ihre Email Adresse ist ungültig.</small>
              <small class="form-text text-danger" v-if="!v$.registerAccount.email.minLength"
                >Ihre Email Adresse muss mindestens 5 Zeichen lang sein</small
              >
              <small class="form-text text-danger" v-if="!v$.registerAccount.email.maxLength"
                >Ihre Email Adresse darf nicht länger als 50 Zeichen sein</small
              >
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="firstPassword">Neues Passwort</label>
            <input
              type="password"
              class="form-control"
              id="firstPassword"
              name="password"
              :class="{ valid: !v$.registerAccount.password.$invalid, invalid: v$.registerAccount.password.$invalid }"
              v-model="v$.registerAccount.password.$model"
              minlength="4"
              maxlength="50"
              required
              placeholder="Neues Passwort"
              data-cy="firstPassword"
            />
            <div v-if="v$.registerAccount.password.$anyDirty && v$.registerAccount.password.$invalid">
              <small class="form-text text-danger" v-if="!v$.registerAccount.password.required">Ein neues Passwort wird benötigt.</small>
              <small class="form-text text-danger" v-if="!v$.registerAccount.password.minLength"
                >Das neue Passwort muss mindestens 4 Zeichen lang sein</small
              >
              <small class="form-text text-danger" v-if="!v$.registerAccount.password.maxLength"
                >Das neue Passwort darf nicht länger als 50 Zeichen sein</small
              >
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="secondPassword">Neues Passwort bestätigen</label>
            <input
              type="password"
              class="form-control"
              id="secondPassword"
              name="confirmPasswordInput"
              :class="{ valid: !v$.confirmPassword.$invalid, invalid: v$.confirmPassword.$invalid }"
              v-model="v$.confirmPassword.$model"
              minlength="4"
              maxlength="50"
              required
              placeholder="Bestätigen Sie Ihr neues Passwort"
              data-cy="secondPassword"
            />
            <div v-if="v$.confirmPassword.$dirty && v$.confirmPassword.$invalid">
              <small class="form-text text-danger" v-if="!v$.confirmPassword.required">Sie müssen das Passwort bestätigen.</small>
              <small class="form-text text-danger" v-if="!v$.confirmPassword.minLength"
                >Das bestätigte Passwort muss mindestens 4 Zeichen lang sein</small
              >
              <small class="form-text text-danger" v-if="!v$.confirmPassword.maxLength"
                >Das bestätigte Passwort darf nicht länger als 50 Zeichen sein</small
              >
              <small class="form-text text-danger" v-if="!v$.confirmPassword.sameAsPassword"
                >Das bestätigte Passwort entspricht nicht dem neuen Passwort!</small
              >
            </div>
          </div>

          <button type="submit" :disabled="v$.$invalid" class="btn btn-primary" data-cy="submit">Registrieren</button>
        </form>
        <p></p>
        <div class="alert alert-warning">
          <span>Wenn Sie sich </span>
          <a class="alert-link" @click="openLogin()">anmelden</a
          ><span>
            möchten, versuchen Sie es mit <br />- Administrator (Name="admin" und Passwort="admin")<br />- Benutzer (Name="user" und
            Passwort="user").</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./register.component.ts"></script>
