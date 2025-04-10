// imports
import { defineComponent, ref } from 'vue';
import '@/shared/config/dayjs';
import { useTheme } from '@/shared/composables/theme';
// import ThemeBtn from '../theme/theme-btn.vue';
import { useStore } from '@/store';
import { useRouter } from 'vue-router';
// primevue imports
import Menubar from 'primevue/menubar';
import Avatar from 'primevue/avatar';
import Button from 'primevue/button';
import Drawer from 'primevue/drawer';
import MainDrawer from './main-drawer.vue';
import Toolbar from 'primevue/toolbar';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';

export default defineComponent({
  name: 'MainNavbar',
  components: {
    Menubar: Menubar,
    Avatar: Avatar,
    Button: Button,
    Drawer: Drawer,
    Toolbar: Toolbar,
    MainDrawer: MainDrawer,
    IconField: IconField,
    InputIcon: InputIcon,
    InputText: InputText,
  },

  setup() {
    const items = ref([
      {
        label: 'Dashboard',
        icon: 'pi pi-home',
      },
    ]);
    const visible = ref<boolean>(true);
    const rail = ref<boolean>(false);
    const drawer = ref<boolean>(true);
    const store = useStore();
    const router = useRouter();
    const { nameColor, navColor } = useTheme();
    const toggleDrawerState = (): void => {
      drawer.value = !drawer.value;
    };
    const toggleRailState = (): void => {
      rail.value = !rail.value;
    };

    const logout = async () => {
      console.log('logout');
      localStorage.removeItem('jhi-authenticationToken');
      sessionStorage.removeItem('jhi-authenticationToken');
      store.logout();
      if (router.currentRoute.value.path !== '/') {
        router.push('/');
      }
    };
    return { items, visible, logout, toggleDrawerState, toggleRailState, drawer, rail, nameColor, navColor };
  },
});
