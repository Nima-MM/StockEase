import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { IBrand } from '@/shared/model/brand.model';

export const useBrandStore = defineStore('Brand', () => {
  // !State - Brand
  const storedData = ref<IBrand[] | null>([]);
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
    console.log('Brand Store: ', storedData.value);
  };

  return {
    storedData,
    getNames,
    getData,
    initStore,
  };
});
