import { getCurrentInstance } from 'vue';

export const useAlertService = () => {
  // add toaster instance of primevue later
  const useToast = getCurrentInstance();
};

export default class AlertService {}
