<template>
  <div class="home row">
    <div class="col-md-3">
      <span class="hipster img-fluid rounded"></span>
    </div>
    <div class="col-md-9">
      <h1 class="display-4">HELLO!</h1>
      <!-- <p class="lead">Dies ist Ihre Hauptseite</p> -->
      <!-- <login-form v-if="!authenticated"></login-form> -->
      <div>
        <div class="alert alert-success" v-if="authenticated">
          <h1 v-if="username">Sie sind als Benutzer "{{ username }}" angemeldet.</h1>
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
