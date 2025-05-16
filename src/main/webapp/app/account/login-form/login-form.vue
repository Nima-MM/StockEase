<template>
  <div class="flex flex-col justify-center">
    <Message v-if="authenticationError" severity="error" icon="pi pi-times-circle" class="mb-2"> Authentifikation Fehlgeschlagen!</Message>
    <Form class="flex flex-col gap-4 max-w-7xl w-full">
      <div class="flex flex-col gap-4">
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
      </div>
      <div class="flex flex-row justify-between">
        <FormField v-slot="$field" asChild name="rememberMe" initialValue="true">
          <section class="flex justify-center items-center gap-2 text-primary text-xs">
            <Checkbox v-model="rememberMe" inputId="rememberMe" binary />
            <label for="rememberMe">Automatische Anmeldung</label>
            <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{ $field.error?.message }}</Message>
          </section>
        </FormField>

        <p class="flex items-center text-xs">
          <b-link :to="'/account/reset/request'" class="alert-link" data-cy="forgetYourPasswordSelector"
            >Sie haben Ihr Passwort vergessen?</b-link
          >
        </p>
      </div>
      <Button type="submit" @click="doLogin" severity="secondary" label="Anmelden" />
    </Form>
  </div>
</template>
<script lang="ts" src="./login-form.component.ts"></script>
