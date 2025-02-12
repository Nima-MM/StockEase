import { type Ref, defineComponent, inject, onMounted, ref } from 'vue';

import ColorService from './color.service';
import { type IColor } from '@/shared/model/color.model';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  name: 'Color',
  setup() {
    const colorService = inject('colorService', () => new ColorService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const colors: Ref<IColor[]> = ref([]);

    const isFetching = ref(false);

    const clear = () => {};

    const retrieveColors = async () => {
      isFetching.value = true;
      try {
        const res = await colorService().retrieve();
        colors.value = res.data;
      } catch (err) {
        alertService.showHttpError(err.response);
      } finally {
        isFetching.value = false;
      }
    };

    const handleSyncList = () => {
      retrieveColors();
    };

    onMounted(async () => {
      await retrieveColors();
    });

    const removeId: Ref<number> = ref(null);
    const removeEntity = ref<any>(null);
    const prepareRemove = (instance: IColor) => {
      removeId.value = instance.id;
      removeEntity.value.show();
    };
    const closeDialog = () => {
      removeEntity.value.hide();
    };
    const removeColor = async () => {
      try {
        await colorService().delete(removeId.value);
        const message = `A Color is deleted with identifier ${removeId.value}`;
        alertService.showInfo(message, { variant: 'danger' });
        removeId.value = null;
        retrieveColors();
        closeDialog();
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    return {
      colors,
      handleSyncList,
      isFetching,
      retrieveColors,
      clear,
      removeId,
      removeEntity,
      prepareRemove,
      closeDialog,
      removeColor,
    };
  },
});
