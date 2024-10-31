import { type Ref, computed, defineComponent, inject, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';

import ColorService from './color.service';
import { useValidation } from '@/shared/composables';
import { useAlertService } from '@/shared/alert/alert.service';

import { Color, type IColor } from '@/shared/model/color.model';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'ColorUpdate',
  setup() {
    const colorService = inject('colorService', () => new ColorService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const color: Ref<IColor> = ref(new Color());
    const isSaving = ref(false);
    const currentLanguage = inject('currentLanguage', () => computed(() => navigator.language ?? 'de'), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);

    const retrieveColor = async colorId => {
      try {
        const res = await colorService().find(colorId);
        color.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.colorId) {
      retrieveColor(route.params.colorId);
    }

    const validations = useValidation();
    const validationRules = {
      name: {},
    };
    const v$ = useVuelidate(validationRules, color as any);
    v$.value.$validate();

    return {
      colorService,
      alertService,
      color,
      previousState,
      isSaving,
      currentLanguage,
      v$,
    };
  },
  created(): void {},
  methods: {
    save(): void {
      this.isSaving = true;
      if (this.color.id) {
        this.colorService()
          .update(this.color)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showInfo(`A Color is updated with identifier ${param.id}`);
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      } else {
        this.colorService()
          .create(this.color)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showSuccess(`A Color is created with identifier ${param.id}`);
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      }
    },
  },
});
