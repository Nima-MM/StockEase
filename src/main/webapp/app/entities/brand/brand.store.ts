import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { IBrand } from '@/shared/model/brand.model';
import type BrandService from './brand.service';

export const useBrandStore = defineStore('Brand', () => {
  let brandService: BrandService;
  // !State - Brand
  const storedData = ref<IBrand[] | null>([]);
  const isFetching = ref<boolean>(false);
  // !Getters
  /**
   * Computed property to get list of all Brand.
   * @returns {IBrand[]} - Current list of Brand.
   */
  const getData = computed(() => storedData.value);
  const getNames = computed(() => (storedData.value ? storedData.value.map(brand => brand.name) : []));
  // !Setters - mutations
  /**
   * Reqest ressource from Api set response as state.brand
   */
  const initStore = async (brand: IBrand[]) => {
    storedData.value = brand;
  };
  const setService = (service: BrandService) => {
    brandService = service;
  };
  /**
   * Reqest Products from Api.
   */
  const retrieveEntities = async () => {
    isFetching.value = true;
    try {
      if (!brandService) {
        throw new Error('brandService is not provided');
      }
      const res = await brandService.retrieve();
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
