import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { IColor } from '@/shared/model/color.model';
import type ColorService from './color.service';

export const useColorStore = defineStore('Color', () => {
  let colorService: ColorService;
  // !State - Color
  const storedData = ref<IColor[] | null>([]);
  const isFetching = ref<boolean>(false);
  // !Getters
  /**
   * Computed property to get list of all Color.
   * @returns {IColor[]} - Current list of Color.
   */
  const getData = computed(() => storedData.value);
  const getNames = computed(() => (storedData.value ? storedData.value.map(color => color.name) : []));
  // !Setters - mutations
  /**
   * Reqest ressource from Api set response as state.color
   */
  const initStore = async (color: IColor[]) => {
    storedData.value = color;
  };
  // !Services
  const setService = (service: ColorService) => {
    colorService = service;
  };
  /**
   * Reqest Products from Api.
   */
  const retrieveEntities = async () => {
    isFetching.value = true;
    try {
      if (!colorService) {
        throw new Error('colorService is not provided');
      }
      const res = await colorService.retrieve();
      storedData.value = res.data;
    } catch (err) {
      // useAlertService().showHttpError(err.response);
    } finally {
      isFetching.value = false;
    }
  };

  return {
    storedData,
    isFetching,
    getNames,
    getData,
    initStore,
    setService,
    retrieveEntities,
  };
});
