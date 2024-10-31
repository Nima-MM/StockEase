<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-md-8 toastify-container">
        <h2 v-if="username" id="settings-title">
          <span
            >Einstellungen für Benutzer [<strong>{{ username }}</strong
            >]</span
          >
        </h2>

        <div class="alert alert-success" role="alert" v-if="success"><strong>Einstellungen wurden gespeichert!</strong></div>

        <div class="alert alert-danger" role="alert" v-if="errorEmailExists">
          <strong>E-Mail-Adresse wird bereits verwendet!</strong> Bitte wählen Sie eine andere aus.
        </div>

        <form name="form" id="settings-form" @submit.prevent="save()" v-if="settingsAccount" novalidate>
          <div class="form-group">
            <label class="form-control-label" for="firstName">Vorname</label>
            <input
              type="text"
              class="form-control"
              id="firstName"
              name="firstName"
              placeholder="Ihr Vorname"
              :class="{ valid: !v$.settingsAccount.firstName.$invalid, invalid: v$.settingsAccount.firstName.$invalid }"
              v-model="v$.settingsAccount.firstName.$model"
              minlength="1"
              maxlength="50"
              required
              data-cy="firstname"
            />
            <div v-if="v$.settingsAccount.firstName.$anyDirty && v$.settingsAccount.firstName.$invalid">
              <small class="form-text text-danger" v-if="!v$.settingsAccount.firstName.required">Ihr Vorname wird benötigt.</small>
              <small class="form-text text-danger" v-if="!v$.settingsAccount.firstName.minLength"
                >Ihr Vorname muss mindestens 1 Zeichen lang sein</small
              >
              <small class="form-text text-danger" v-if="!v$.settingsAccount.firstName.maxLength"
                >Ihr Vorname darf nicht länger als 50 Zeichen sein</small
              >
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="lastName">Nachname</label>
            <input
              type="text"
              class="form-control"
              id="lastName"
              name="lastName"
              placeholder="Ihr Nachname"
              :class="{ valid: !v$.settingsAccount.lastName.$invalid, invalid: v$.settingsAccount.lastName.$invalid }"
              v-model="v$.settingsAccount.lastName.$model"
              minlength="1"
              maxlength="50"
              required
              data-cy="lastname"
            />
            <div v-if="v$.settingsAccount.lastName.$anyDirty && v$.settingsAccount.lastName.$invalid">
              <small class="form-text text-danger" v-if="!v$.settingsAccount.lastName.required">Ihr Nachname wird benötigt.</small>
              <small class="form-text text-danger" v-if="!v$.settingsAccount.lastName.minLength"
                >Ihr Nachname muss mindestens 1 Zeichen lang sein</small
              >
              <small class="form-text text-danger" v-if="!v$.settingsAccount.lastName.maxLength"
                >Ihr Nachname darf nicht länger als 50 Zeichen sein</small
              >
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="email">Email Adresse</label>
            <input
              type="email"
              class="form-control"
              id="email"
              name="email"
              placeholder="Ihre Email Adresse"
              :class="{ valid: !v$.settingsAccount.email.$invalid, invalid: v$.settingsAccount.email.$invalid }"
              v-model="v$.settingsAccount.email.$model"
              minlength="5"
              maxlength="254"
              email
              required
              data-cy="email"
            />
            <div v-if="v$.settingsAccount.email.$anyDirty && v$.settingsAccount.email.$invalid">
              <small class="form-text text-danger" v-if="!v$.settingsAccount.email.required">Ihre Email Adresse wird benötigt.</small>
              <small class="form-text text-danger" v-if="!v$.settingsAccount.email.email">Ihre Email Adresse ist ungültig.</small>
              <small class="form-text text-danger" v-if="!v$.settingsAccount.email.minLength"
                >Ihre Email Adresse muss mindestens 5 Zeichen lang sein</small
              >
              <small class="form-text text-danger" v-if="!v$.settingsAccount.email.maxLength"
                >Ihre Email Adresse darf nicht länger als 50 Zeichen sein</small
              >
            </div>
          </div>
          <button type="submit" :disabled="v$.settingsAccount.$invalid" class="btn btn-primary" data-cy="submit">Speichern</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./settings.component.ts"></script>
