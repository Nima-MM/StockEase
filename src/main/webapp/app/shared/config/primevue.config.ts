import type { App } from 'vue';

// PrimeVue
import PrimeVue from 'primevue/config';
// import Aura from '@primeuix/themes/aura';
// import Material from '@primeuix/themes/material';
// import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';
import StyleClass from 'primevue/styleclass';
import Ripple from 'primevue/ripple';
import {
  Avatar,
  Button,
  Checkbox,
  Column,
  DataTable,
  Dialog,
  Drawer,
  Fieldset,
  FloatLabel,
  IconField,
  InputIcon,
  InputNumber,
  InputText,
  Menubar,
  Message,
  Password,
  Select,
  SelectButton,
  Skeleton,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Tag,
  ToggleSwitch,
  Toolbar,
} from 'primevue';
import { Form, FormField } from '@primevue/forms';
import ToastService from 'primevue/toastservice';
// import ThemeSwitcher from '@/core/theme/ThemeSwitcher.vue';

/**
 * global primevue configuration
 */
export function initPrimeVue(vue: App): void {
  // PrimeVue instance
  vue.use(PrimeVue, {
    theme: {
      // unstyled: true,
      preset: Nora,
      ripple: true,
      options: {
        prefix: 'p',
        darkModeSelector: 'system',
        cssLayer: false,
      },
    },
  });
  vue.use(ToastService);

  // directives
  vue.directive('styleclass', StyleClass);
  vue.directive('ripple', Ripple);

  // components
  /* import from primevue */
  vue.component('Avatar', Avatar);
  vue.component('Button', Button);
  vue.component('Column', Column);
  vue.component('Checkbox', Checkbox);
  vue.component('DataTable', DataTable);
  vue.component('Dialog', Dialog);
  vue.component('Drawer', Drawer);
  vue.component('Fieldset', Fieldset);
  vue.component('FloatLabel', FloatLabel);
  vue.component('IconField', IconField);
  vue.component('InputIcon', InputIcon);
  vue.component('InputNumber', InputNumber);
  vue.component('InputText', InputText);
  vue.component('Menubar', Menubar);
  vue.component('Message', Message);
  vue.component('Password', Password);
  vue.component('Select', Select);
  vue.component('SelectButton', SelectButton);
  vue.component('Skeleton', Skeleton);
  vue.component('Tab', Tab);
  vue.component('Tabs', Tabs);
  vue.component('TabList', TabList);
  vue.component('TabPanel', TabPanel);
  vue.component('TabPanels', TabPanels);
  vue.component('Tag', Tag);
  vue.component('ToggleSwitch', ToggleSwitch);
  vue.component('Toolbar', Toolbar);
  /* import from @primevue/forms */
  vue.component('Form', Form);
  vue.component('FormField', FormField);
  /* custom components */
  // vue.component('theme-switcher', ThemeSwitcher);
}
