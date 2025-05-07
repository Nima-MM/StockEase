<template>
  <div class="home flex-col justify-items-center p-8">
    <div class="col-md-3">
      <span class="hipster img-fluid rounded"></span>
    </div>
    <div class="col-md-9 flex flex-col items-center gap-4">
      <h1 class="display-4">
        HELLO <span class="text-primary-400">{{ username }}</span
        >! Betreten Sie Ihr Lager:
      </h1>
      <!-- <p class="lead">Dies ist Ihre Hauptseite</p> -->
      <!-- <login-form v-if="!authenticated"></login-form> -->
      <div>
        <div class="alert alert-success flex-col justify-items-center" v-if="authenticated">
          <Toast v-if="visible" position="bottom-center" group="bc" @close="onClose">
            <template #message="slotProps">
              <div class="flex flex-col items-start flex-auto">
                <div class="flex items-center gap-2">
                  <Avatar icon="pi pi-user" class="" size="medium" shape="circle" />
                  <span class="font-bold">Filial-Leitung</span>
                </div>
                <div class="font-medium text-lg my-4">{{ slotProps.message.summary }}</div>
              </div>
            </template>
          </Toast>
          <router-link :to="{ name: 'ProductRoute' }"><Button>Zum Lager</Button></router-link>
        </div>

        <div class="alert alert-warning" v-if="!authenticated">
          <span>Wenn Sie sich </span>
          <a class="alert-link" @click="openLogin()">anmelden</a>
          <span>
            möchten, versuchen Sie es mit <br />- Administrator (Name="admin" und Passwort="admin")<br />- Benutzer (Name="user" und
            Passwort="user").</span
          >
        </div>
        <div class="alert alert-warning" v-if="!authenticated">
          <span>Sie haben noch keinen Zugang?</span>&nbsp;
          <router-link class="alert-link" to="/register">Registrieren Sie sich</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./home.component.ts"></script>
