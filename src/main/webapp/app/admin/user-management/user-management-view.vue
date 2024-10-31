<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="user">
        <h2 class="jh-entity-heading">
          <span>Benutzer</span> [<strong>{{ user.login }}</strong
          >]
        </h2>
        <dl class="row jh-entity-details">
          <dt><span>Login</span></dt>
          <dd>
            <span>{{ user.login }}</span>
            <b-badge variant="success" v-if="user.activated">Aktiv</b-badge>
            <b-badge variant="danger" v-if="!user.activated">Deaktiviert</b-badge>
          </dd>
          <dt><span>Vorname</span></dt>
          <dd>{{ user.firstName }}</dd>
          <dt><span>Nachname</span></dt>
          <dd>{{ user.lastName }}</dd>
          <dt><span>Email</span></dt>
          <dd>{{ user.email }}</dd>
          <dt><span>Erstellt von</span></dt>
          <dd>{{ user.createdBy }}</dd>
          <dt><span>Erstellt am</span></dt>
          <dd>
            <span v-if="user.createdDate">
              {{ formatDate(user.createdDate) }}
            </span>
          </dd>
          <dt><span>Bearbeitet von</span></dt>
          <dd>{{ user.lastModifiedBy }}</dd>
          <dt><span>Zuletzt bearbeitet</span></dt>
          <dd>
            <span v-if="user.lastModifiedDate">
              {{ formatDate(user.lastModifiedDate) }}
            </span>
          </dd>
          <dt><span>Profile</span></dt>
          <dd>
            <ul class="list-unstyled">
              <li v-for="authority of user.authorities" :key="authority">
                <b-badge variant="info">{{ authority }}</b-badge>
              </li>
            </ul>
          </dd>
        </dl>
        <router-link custom v-slot="{ navigate }" :to="{ name: 'JhiUser' }">
          <button @click="navigate" class="btn btn-info">
            <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span>Zurück</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./user-management-view.component.ts"></script>
