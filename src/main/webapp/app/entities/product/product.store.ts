import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { IProduct } from '@/shared/model/product.model';
import ProductService from './product.service';
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
 * @property {Function} retrieveEntities - Function to initialize the store with products from an API.
 */
export const useProductsStore = defineStore('products', () => {
  let productService: ProductService;
  // !State - Products
  const storedData = ref<IProduct[]>([]);
  const isFetching = ref<boolean>(false);
  // !Getters
  const getProducts = computed(() => storedData.value);
  const getCategoryNames = computed(() => storedData.value.map((product: IProduct) => product.category?.name));
  const getBrandNames = computed(() => storedData.value.map((product: IProduct) => product.brand?.name));
  const getColorNames = computed(() => storedData.value.map((product: IProduct) => product.color?.name));

  const getProductById = computed(() => (id: number): IProduct | undefined => {
    return storedData.value.find((product: IProduct) => product.id === id);
  });

  // !Setters - mutations
  // !Services
  const setService = (service: ProductService) => {
    productService = service;
  };
  /**
   * Reqest Products from Api.
   */
  const retrieveEntities = async () => {
    isFetching.value = true;
    try {
      if (!productService) {
        throw new Error('productService is not provided');
      }
      const res = await productService.retrieve();
      storedData.value = res.data;
    } catch (err) {
      // useAlertService().showHttpError(err.response);
    } finally {
      isFetching.value = false;
    }
  };

  const deleteEntity = async (id: number) => {
    isFetching.value = true;
    try {
      if (!productService) {
        throw new Error('productService is not provided');
      }
      await productService.delete(id);
      await retrieveEntities();
    } catch (error) {
      // alertService.showHttpError(error.response);
    } finally {
      isFetching.value = false;
    }
  };

  const decreaseStock = async (id: number, amount: number) => {
    isFetching.value = true;
    try {
      if (!productService) {
        throw new Error('productService is not provided');
      }
      await productService.decreaseStock(id, amount);
      await retrieveEntities();
    } catch (err) {
      // useAlertService().showHttpError(err.response);
    } finally {
      isFetching.value = false;
    }
  };

  const addToStock = async (id: number, amount: number) => {
    isFetching.value = true;
    try {
      if (!productService) {
        throw new Error('productService is not provided');
      }
      await productService.addToStock(id, amount);
      await retrieveEntities();
    } catch (err) {
      // useAlertService().showHttpError(err.response);
    } finally {
      isFetching.value = false;
    }
  };

  return {
    storedData,
    getCategoryNames,
    getBrandNames,
    getColorNames,
    getProducts,
    getProductById,
    isFetching,
    setService,
    retrieveEntities,
    deleteEntity,
    decreaseStock,
    addToStock,
  };
});
