<template>
  <v-app :style="{ height: appMinHeight }" class="layout" :theme="theme">
    <!-- Flex-Container als Spalte, der 100% Höhe nutzt -->
    <v-layout class="border rounded" style="display: flex; flex-direction: column; height: 100%">
      <v-app-bar app class="px-3" :style="navStyle" :elevation="24">
        <v-btn icon="mdi-menu" variant="text" @click="toggleDrawerState"></v-btn>
        <v-spacer></v-spacer>
        <RouterLink to="/" class="text-decoration-none">
          <v-toolbar-title class="text-uppercase text-decoration-overline font-weight-black" style="color: #303f9f">
            MEIN LAGER
          </v-toolbar-title>
        </RouterLink>
        <v-spacer></v-spacer>
        <v-btn
          :prepend-icon="theme === 'light' ? 'mdi-weather-night' : 'mdi-weather-sunny'"
          :text="theme === 'light' ? 'Dunkel' : 'Hell'"
          slim
          @click="changeTheme"
        ></v-btn>
      </v-app-bar>

      <v-navigation-drawer
        app
        v-model="drawer"
        :rail="rail"
        close-delay="100"
        @click="toggleRailState"
        :style="navStyle"
        :mobile="null"
        :elevation="24"
      >
        <v-list-item prepend-icon="mdi-account-supervisor-circle" :style="navTitleStyle" title="Filialleitung">
          <template v-slot:append>
            <v-btn icon="mdi-chevron-left" variant="text" @click.stop="toggleRailState"></v-btn>
          </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <!-- Button product-table -->
          <v-list-item
            style="color: #0277bd"
            prepend-icon="mdi-storefront-outline"
            title="Lager"
            to="/"
            @click.stop="!toggleRailState"
          ></v-list-item>

          <!-- Button product-new-dialog -->
          <ProductNewDialog @click.stop="!toggleRailState" />

          <!-- disabled incoming-outgoing-button  -->
          <v-list-item
            prepend-icon="mdi-storefront-plus"
            title="Wareneingang"
            to="/"
            :disabled="true"
            @click.stop="!toggleRailState"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-storefront-minus"
            title="Warenausgang"
            to="/outgoing-product/page"
            :disabled="true"
            @click.stop="!toggleRailState"
          ></v-list-item>

          <!-- Button category-table -->
          <v-list-item
            style="color: #0277bd"
            prepend-icon="mdi-shape"
            title="Kategorien"
            to="/categories/page"
            @click.stop="!toggleRailState"
          ></v-list-item>

          <!-- Button brand-table -->
          <v-list-item
            style="color: #0277bd"
            prepend-icon="mdi-hanger"
            title="Marken"
            to="/brands/page"
            @click.stop="!toggleRailState"
          ></v-list-item>

          <!-- Button color-table -->
          <v-list-item
            style="color: #0277bd"
            prepend-icon="mdi-palette"
            title="Farben"
            to="/colors/page"
            @click.stop="!toggleRailState"
          ></v-list-item>

          <!-- Button userAccounts-table -->
          <v-list-item
            style="color: #0277bd"
            prepend-icon="mdi-account-multiple"
            title="Benutzerkontensteuerung"
            to="/user-accounts-administration/page"
            @click.stop="!toggleRailState"
          ></v-list-item>

          <!-- disabled faq-button -->
          <v-list-item
            prepend-icon="mdi-frequently-asked-questions"
            title="FAQ"
            :disabled="true"
            to="/faq/page"
            @click.stop="!toggleRailState"
          ></v-list-item>
        </v-list>

        <!-- Button Logout -->
        <template #append>
          <v-list-item
            :variant="rail === true ? 'text' : 'outlined'"
            base-color="#D50000"
            :style="
              rail === true
                ? { fontSize: 'larger', textAlign: 'center', margin: '0 0px 10px 0px' }
                : { fontSize: 'larger', textAlign: 'center', margin: '0 10px 10px 10px', borderRadius: '20px' }
            "
            @click.stop="!toggleRailState"
            @click=""
            block
            :prepend-icon="rail === true ? 'mdi-logout' : ''"
            >{{ rail === true ? '' : 'Logout' }}</v-list-item
          >
        </template>
      </v-navigation-drawer>

      <!-- v-main als flexibles, scrollbares Element -->
      <v-main style="flex: 1; overflow-y: auto">
        <router-view class="px-16" />
      </v-main>
    </v-layout>
  </v-app>
</template>
<style scoped>
.layout {
  max-width: 1768px;
  margin: 0 auto;
}
</style>
<script lang="ts" src="./app.component.ts"></script>

<!-- <template>
  <div id="app">
    <ribbon></ribbon>
    <div id="app-header">
      <jhi-navbar></jhi-navbar>
    </div>
    <div class="container-fluid">
      <div class="card jh-card">
        <router-view></router-view>
      </div>
      <b-modal id="login-page" hide-footer lazy>
        <template #modal-title>
          <span data-cy="loginTitle" id="login-title">Anmeldung</span>
        </template>
        <login-form></login-form>
      </b-modal>

      <jhi-footer></jhi-footer>
    </div>
  </div>
</template>
-->
