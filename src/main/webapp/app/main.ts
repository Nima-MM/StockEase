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
    // erkläre mir _props und emit
    // _props ist ein Platzhalter für die Props, die an die Komponente übergeben werden
    // emit ist eine Funktion, die verwendet wird, um Ereignisse von der Kindkomponente an die Elternkomponente zu senden
    // emit ist eine Methode, die es ermöglicht, benutzerdefinierte Ereignisse auszulösen
    // und an die Elternkomponente zu kommunizieren
    // emit('eventName', eventData) - Hiermit wird ein benutzerdefiniertes Ereignis mit dem Namen 'eventName' und den zugehörigen Daten 'eventData' ausgelöst
    // und an die Elternkomponente gesendet
    // Ok. Welche _props und emits wurden hier konkret verwendet?
    // In diesem Fall wird _props nicht verwendet, aber es ist eine gute Praxis, es zu definieren,
    // falls in Zukunft Props an die Komponente übergeben werden müssen.
    // emit wird verwendet, um Ereignisse an die Elternkomponente zu senden.
    // In diesem Fall wird emit nicht verwendet, aber es ist eine gute Praxis, es zu definieren,
    // falls in Zukunft Ereignisse an die Elternkomponente gesendet werden müssen.
    // emit wird verwendet, um Ereignisse an die Elternkomponente zu senden.
    // In diesem Fall wird emit nicht verwendet, aber es ist eine gute Praxis, es zu definieren,
    // falls in Zukunft Ereignisse an die Elternkomponente gesendet werden müssen.
    // kannst du mir ein Beispiel geben, wie emit hier verwendet werden könnte?
    // Ja, hier ist ein Beispiel, wie emit verwendet werden könnte:
    // emit('eventName', eventData) - Hiermit wird ein benutzerdefiniertes Ereignis mit dem Namen 'eventName' und den zugehörigen Daten 'eventData' ausgelöst
    // und an die Elternkomponente gesendet
    // emit('loginSuccess', { username: 'JohnDoe' }) - Hiermit wird ein benutzerdefiniertes Ereignis mit dem Namen 'loginSuccess' und den zugehörigen Daten '{ username: 'JohnDoe' }' ausgelöst
    // und an die Elternkomponente gesendet
    // emit('loginError', { error: 'Invalid credentials' }) - Hiermit wird ein benutzerdefiniertes Ereignis mit dem Namen 'loginError' und den zugehörigen Daten '{ error: 'Invalid credentials' }' ausgelöst
    // und an die Elternkomponente gesendet
    // emit('logout') - Hiermit wird ein benutzerdefiniertes Ereignis mit dem Namen 'logout' ausgelöst
    // und an die Elternkomponente gesendet
    // emit('themeChange', { theme: 'dark' }) - Hiermit wird ein benutzerdefiniertes Ereignis mit dem Namen 'themeChange' und den zugehörigen Daten '{ theme: 'dark' }' ausgelöst
    // und an die Elternkomponente gesendet
    // Ich verstehe aber nicht wieso es hier bei createApp im setup() als parameter übergeben wird. Kannst du mir erklären wie und wieso es hier verwendet wird?
    // Ja, das setup() ist eine Funktion, die in der Composition API von Vue 3 verwendet wird.
    // In dieser Funktion können Sie den Zustand und die Methoden der Komponente definieren.
    // Der erste Parameter ist _props, der die Eigenschaften der Komponente enthält.
    // Der zweite Parameter ist ein Objekt, das verschiedene Funktionen enthält, darunter emit.
    // In diesem Fall wird emit verwendet, um Ereignisse an die Elternkomponente zu senden.
    // Es ist wichtig zu beachten, dass emit nicht direkt in der setup() Funktion verwendet wird,
    // sondern in der Template- oder Render-Funktion der Komponente.
    // In der Template- oder Render-Funktion können Sie dann emit verwenden, um Ereignisse auszulösen,
    // die von der Elternkomponente behandelt werden können.
    // Zum Beispiel könnten Sie in der Template- oder Render-Funktion etwas wie folgendes haben:
    // <button @click="emit('loginSuccess', { username: 'JohnDoe' })">Login</button>
    // Initialize PrimeVue
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
