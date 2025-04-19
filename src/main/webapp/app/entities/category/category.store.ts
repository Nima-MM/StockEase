import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { ICategory } from '@/shared/model/category.model';
import CategoryService from './category.service';

export const useCategoryStore = defineStore('Category', () => {
  let categoryService: CategoryService;
  // !State - Category
  const storedData = ref<ICategory[] | null>([]);
  const isFetching = ref<boolean>(false);
  // !Getters
  /**
   * Computed property to get list of all Category.
   * @returns {ICategory[]} - Current list of Category.
   */
  const getData = computed(() => storedData.value);
  const getNames = computed(() => (storedData.value ? storedData.value.map(category => category.name) : []));
  // !Setters - mutations
  /**
   * Reqest ressource from Api set response as state.category
   */
  const initStore = async (category: ICategory[]) => {
    storedData.value = category;
  };
  // !Services
  const setService = (service: CategoryService) => {
    categoryService = service;
  };
  /**
   * Reqest Products from Api.
   */
  const retrieveEntities = async () => {
    isFetching.value = true;
    try {
      if (!categoryService) {
        throw new Error('categoryService is not provided');
      }
      const res = await categoryService.retrieve();
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
