import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { IProduct } from '@/shared/model/product.model';

/**
 * Store for managing products.
 *
 * @returns {Object} - The products store.
 * @property {Ref<IProduct[]>} storedData - Reactive reference to the list of products.
 * @property {ComputedRef<IProduct[]>} getProducts - Computed property to get the list of all products.
 * @property {ComputedRef<string[]>} getCategoryNames - Computed property to get the list of all category names.
 * @property {ComputedRef<string[]>} getBrandNames - Computed property to get the list of all brand names.
 * @property {ComputedRef<string[]>} getColorNames - Computed property to get the list of all color names.
 * @property {ComputedRef<Function>} getProductById -Computed property that takes an ID and returns matching product, or undefined if not found.
 * @property {Function} initStore - Function to initialize the store with products from an API.
 */
export const useProductsStore = defineStore('products', () => {
  // !State - Products
  const storedData = ref<IProduct[]>([]);
  // !Getters
  const getProducts = computed(() => storedData.value);
  const getCategoryNames = computed(() => storedData.value.map((product: IProduct) => product.category?.name));
  const getBrandNames = computed(() => storedData.value.map((product: IProduct) => product.brand?.name));
  const getColorNames = computed(() => storedData.value.map((product: IProduct) => product.color?.name));

  const getProductById = computed(() => (id: number): IProduct | undefined => {
    return storedData.value.find((product: IProduct) => product.id === id);
  });
  // !Setters - mutations
  /**
   * Reqest Products from Api.
   */
  const initStore = async (products: any) => {
    storedData.value = products;
    console.log('Products Store: ', storedData.value);
  };

  return {
    storedData,
    getCategoryNames,
    getBrandNames,
    getColorNames,
    getProducts,
    getProductById,
    initStore,
  };
});
