<template>
  <div class="home row">
    <div class="col-md-3">
      <span class="hipster img-fluid rounded"></span>
    </div>
    <div class="col-md-9">
      <h1 class="display-4">HELLO WORLD!</h1>
      <p class="lead">Dies ist Ihre Hauptseite</p>
      <v-btn rounded="xl">HELLO BUTTON</v-btn>
      <div>
        <div class="alert alert-success" v-if="authenticated">
          <span v-if="username">Sie sind als Benutzer "{{ username }}" angemeldet.</span>
        </div>

        <div class="alert alert-warning" v-if="!authenticated">
          <span>Wenn Sie sich </span>
          <a class="alert-link" @click="openLogin()">anmelden</a
          ><span>
            möchten, versuchen Sie es mit <br />- Administrator (Name="admin" und Passwort="admin")<br />- Benutzer (Name="user" und
            Passwort="user").</span
          >
        </div>
        <div class="alert alert-warning" v-if="!authenticated">
          <span>Sie haben noch keinen Zugang?</span>&nbsp;
          <router-link class="alert-link" to="/register">Registrieren Sie sich</router-link>
        </div>
      </div>

      <p>Wenn Sie Fragen zu JHipster haben:</p>

      <ul>
        <li><a href="https://www.jhipster.tech/" target="_blank" rel="noopener noreferrer">JHipster Hauptseite</a></li>
        <li>
          <a href="https://stackoverflow.com/tags/jhipster/info" target="_blank" rel="noopener noreferrer">JHipster auf Stack Overflow</a>
        </li>
        <li>
          <a href="https://github.com/jhipster/generator-jhipster/issues?state=open" target="_blank" rel="noopener noreferrer"
            >JHipster Fehlereinträge</a
          >
        </li>
        <li>
          <a href="https://gitter.im/jhipster/generator-jhipster" target="_blank" rel="noopener noreferrer">JHipster Chat</a>
        </li>
        <li>
          <a href="https://twitter.com/jhipster" target="_blank" rel="noopener noreferrer"
            >kontaktieren Sie uns mit @jhipster auf Twitter</a
          >
        </li>
      </ul>

      <p>
        <span>Wenn Sie JHipster mögen, vergessen Sie nicht uns einen Stern zu geben auf</span>
        <a href="https://github.com/jhipster/generator-jhipster" target="_blank" rel="noopener noreferrer">GitHub</a>!
      </p>
    </div>
  </div>
</template>

<script lang="ts" src="./home.component.ts"></script>
