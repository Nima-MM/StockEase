// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.common with an alias.
import { computed, createApp, provide } from 'vue';
import { createPinia, storeToRefs } from 'pinia';

import App from './app.vue';
import router from './router';
import LoginService from './account/login.service';
import AccountService from './account/account.service';
import { setupAxiosInterceptors } from '@/shared/config/axios-interceptor';
import { useStore } from '@/store';

// Styles
import '@mdi/font/css/materialdesignicons.css';

import '../content/scss/global.scss';
import '../content/scss/vendor.scss';
import { initPrimeVue } from './shared/config/primevue.config';

const pinia = createPinia();
// jhipster-needle-add-entity-service-to-main-import - JHipster will import entities services here

const app = createApp({
  components: { App },
  template: '<App/>',
  setup(_props, { emit }) {
    initPrimeVue(app);

    const loginService = new LoginService({ emit });
    provide('loginService', loginService);
    const store = useStore();
    const accountService = new AccountService(store);
    provide(
      'currentLanguage',
      computed(() => store.account?.langKey ?? navigator.language ?? 'de'),
    );

    router.beforeResolve(async (to, from, next) => {
      // Make sure login modal is closed
      // loginService.hideLogin();

      if (!store.authenticated) {
        await accountService.update();
      }
      if (Array.isArray(to.meta?.authorities) && to.meta.authorities.length > 0) {
        const value = await accountService.hasAnyAuthorityAndCheckAuth(to.meta.authorities);
        if (!value) {
          if (from.path !== '/forbidden') {
            next({ path: '/forbidden' });
            return;
          }
        }
      }
      next();
    });

    setupAxiosInterceptors(
      (error: any) => {
        const url = error.response?.config?.url;
        const status = error.status || error.response.status;
        if (status === 401) {
          // Store logged out state.
          store.logout();
          if (!url.endsWith('api/account') && !url.endsWith('api/authenticate')) {
            // Ask for a new authentication
            loginService.openLogin();
            return;
          }
        }
        return Promise.reject(error);
      },
      (error: any) => {
        return Promise.reject(error);
      },
    );

    const { authenticated } = storeToRefs(store);
    provide('authenticated', authenticated);
    provide(
      'currentUsername',
      computed(() => store.account?.login),
    );

    provide('accountService', accountService);
  },
});

app.use(router).use(pinia).mount('#app');
