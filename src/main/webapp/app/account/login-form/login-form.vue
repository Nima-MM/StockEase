<template>
  <div class="card max-w-3xl">
    <Fieldset legend="Anmeldung" pt:content:class="flex justify-center">
      <div class="card flex justify-center">
        <!-- <Form :resolver @submit="onFormSubmit" class="flex flex-col gap-4 w-full sm:w-56"> -->
        <Form class="flex flex-col gap-4 w-full sm:w-56">
          <FormField v-slot="$field" as="section" name="username" initialValue="" class="flex flex-col gap-2">
            <InputText v-model="username" type="text" placeholder="Benutzername" />
            <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{ $field.error?.message }}</Message>
          </FormField>
          <FormField v-slot="$field" asChild name="password" initialValue="">
            <section class="flex flex-col gap-2">
              <Password v-model="password" type="text" placeholder="Passwort" :feedback="false" toggleMask fluid />
              <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{ $field.error?.message }}</Message>
            </section>
          </FormField>
          <FormField v-slot="$field" asChild name="rememberMe" initialValue="true">
            <section class="flex gap-2">
              <Checkbox v-model="rememberMe" inputId="rememberMe" binary />
              <label for="rememberMe">Automatische Anmeldung</label>
              <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{ $field.error?.message }}</Message>
            </section>
          </FormField>
          <Button type="submit" @click="doLogin" severity="secondary" label="Anmelden" />
        </Form>
      </div>
    </Fieldset>
  </div>
</template>
<script lang="ts" src="./login-form.component.ts"></script>

<!-- <template>
  <div class="modal-body">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <b-alert show data-cy="loginError" variant="danger"
          v-if="authenticationError"><strong>Anmeldung fehlgeschlagen!</strong> Überprüfen Sie bitte
          Ihre Angaben und versuchen Sie es erneut.</b-alert>
      </div>
      <div class="col-md-8">
        <b-form @submit.prevent="doLogin()">
          <b-form-group label="Benutzername" label-for="username">
            <b-form-input id="username" type="text" name="username" autofocus
              placeholder="Ihr Benutzername" v-model="login" data-cy="username">
            </b-form-input>
          </b-form-group>
          <b-form-group label="Passwort" label-for="password">
            <b-form-input id="password" type="password" name="password" placeholder="Ihr Passwort"
              v-model="password" data-cy="password">
            </b-form-input>
          </b-form-group>
          <b-form-checkbox id="rememberMe" name="rememberMe" v-model="rememberMe" checked>
            <span>Automatische Anmeldung</span>
          </b-form-checkbox>
          <div>
            <b-button data-cy="submit" type="submit" variant="primary">Anmelden</b-button>
          </div>
        </b-form>
        <p></p>
        <div>
          <b-alert show variant="warning">
            <b-link :to="'/account/reset/request'" class="alert-link"
              data-cy="forgetYourPasswordSelector">Sie haben Ihr Passwort vergessen?</b-link>
          </b-alert>
        </div>
        <div>
          <b-alert show variant="warning">
            <span>Sie haben noch keinen Zugang?</span>
            <b-link :to="'/register'" class="alert-link">Registrieren Sie sich</b-link>
          </b-alert>
        </div>
      </div>
    </div>
  </div>
</template> -->
