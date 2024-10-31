<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" novalidate @submit.prevent="save()" v-if="userAccount">
        <h2 id="myUserLabel">Benutzer erstellen oder bearbeiten</h2>
        <div>
          <div class="form-group" :hidden="!userAccount.id">
            <label>ID</label>
            <input type="text" class="form-control" name="id" v-model="userAccount.id" readonly />
          </div>

          <div class="form-group">
            <label class="form-control-label">Login</label>
            <input
              type="text"
              class="form-control"
              name="login"
              :class="{ valid: !v$.userAccount.login.$invalid, invalid: v$.userAccount.login.$invalid }"
              v-model="v$.userAccount.login.$model"
            />

            <div v-if="v$.userAccount.login.$anyDirty && v$.userAccount.login.$invalid">
              <small class="form-text text-danger" v-if="!v$.userAccount.login.required">Dieses Feld wird benötigt.</small>

              <small class="form-text text-danger" v-if="!v$.userAccount.login.maxLength"
                >Dieses Feld darf max. 50 Zeichen lang sein.</small
              >

              <small class="form-text text-danger" v-if="!v$.userAccount.login.pattern"
                >Dieses Feld darf nur Buchstaben, Ziffern und E-Mail-Adressen enthalten.</small
              >
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="firstName">Vorname</label>
            <input
              type="text"
              class="form-control"
              id="firstName"
              name="firstName"
              placeholder="Ihr Vorname"
              :class="{ valid: !v$.userAccount.firstName.$invalid, invalid: v$.userAccount.firstName.$invalid }"
              v-model="v$.userAccount.firstName.$model"
            />
            <div v-if="v$.userAccount.firstName.$anyDirty && v$.userAccount.firstName.$invalid">
              <small class="form-text text-danger" v-if="!v$.userAccount.firstName.maxLength"
                >Dieses Feld darf max. 50 Zeichen lang sein.</small
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
              :class="{ valid: !v$.userAccount.lastName.$invalid, invalid: v$.userAccount.lastName.$invalid }"
              v-model="v$.userAccount.lastName.$model"
            />
            <div v-if="v$.userAccount.lastName.$anyDirty && v$.userAccount.lastName.$invalid">
              <small class="form-text text-danger" v-if="!v$.userAccount.lastName.maxLength"
                >Dieses Feld darf max. 50 Zeichen lang sein.</small
              >
            </div>
          </div>
          <div class="form-group">
            <label class="form-control-label" for="email">Email</label>
            <input
              type="email"
              class="form-control"
              id="email"
              name="email"
              placeholder="Ihre Email Adresse"
              :class="{ valid: !v$.userAccount.email.$invalid, invalid: v$.userAccount.email.$invalid }"
              v-model="v$.userAccount.email.$model"
              email
              required
            />
            <div v-if="v$.userAccount.email.$anyDirty && v$.userAccount.email.$invalid">
              <small class="form-text text-danger" v-if="!v$.userAccount.email.required">Ihre Email Adresse wird benötigt.</small>
              <small class="form-text text-danger" v-if="!v$.userAccount.email.email">Ihre Email Adresse ist ungültig.</small>
              <small class="form-text text-danger" v-if="!v$.userAccount.email.minLength"
                >Ihre Email Adresse muss mindestens 5 Zeichen lang sein</small
              >
              <small class="form-text text-danger" v-if="!v$.userAccount.email.maxLength"
                >Ihre Email Adresse darf nicht länger als 50 Zeichen sein</small
              >
            </div>
          </div>
          <div class="form-check">
            <label class="form-check-label" for="activated">
              <input
                class="form-check-input"
                :disabled="userAccount.id === null"
                type="checkbox"
                id="activated"
                name="activated"
                v-model="userAccount.activated"
              />
              <span>Aktiv</span>
            </label>
          </div>

          <div class="form-group">
            <label>Profile</label>
            <select class="form-control" multiple name="authority" v-model="userAccount.authorities">
              <option v-for="authority of authorities" :value="authority" :key="authority">{{ authority }}</option>
            </select>
          </div>
        </div>
        <div>
          <button type="button" class="btn btn-secondary" @click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span>Abbrechen</span>
          </button>
          <button type="submit" :disabled="v$.userAccount.$invalid || isSaving" class="btn btn-primary">
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span>Speichern</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" src="./user-management-edit.component.ts"></script>
