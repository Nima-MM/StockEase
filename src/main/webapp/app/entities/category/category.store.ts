import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { ICategory } from '@/shared/model/category.model';

export const useCategoryStore = defineStore('Category', () => {
  // !State - Category
  const storedData = ref<ICategory[] | null>([]);
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

  return {
    storedData,
    getNames,
    getData,
    initStore,
  };
});
