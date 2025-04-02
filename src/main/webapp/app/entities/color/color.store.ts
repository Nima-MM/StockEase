import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { IColor } from '@/shared/model/color.model';

export const useColorStore = defineStore('Color', () => {
  // !State - Color
  const storedData = ref<IColor[] | null>([]);
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

  return {
    storedData,
    getNames,
    getData,
    initStore,
  };
});
