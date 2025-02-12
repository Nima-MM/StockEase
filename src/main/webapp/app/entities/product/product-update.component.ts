import { type Ref, computed, defineComponent, inject, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';

import ProductService from './product.service';
import { useValidation } from '@/shared/composables';
import { useAlertService } from '@/shared/alert/alert.service';

import CategoryService from '@/entities/category/category.service';
import { type ICategory } from '@/shared/model/category.model';
import BrandService from '@/entities/brand/brand.service';
import { type IBrand } from '@/shared/model/brand.model';
import ColorService from '@/entities/color/color.service';
import { type IColor } from '@/shared/model/color.model';
import { type IProduct, Product } from '@/shared/model/product.model';

export default defineComponent({
  name: 'ProductUpdate',
  setup() {
    const productService = inject('productService', () => new ProductService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const product: Ref<IProduct> = ref(new Product());

    const categoryService = inject('categoryService', () => new CategoryService());

    const categories: Ref<ICategory[]> = ref([]);

    const brandService = inject('brandService', () => new BrandService());

    const brands: Ref<IBrand[]> = ref([]);

    const colorService = inject('colorService', () => new ColorService());

    const colors: Ref<IColor[]> = ref([]);
    const isSaving = ref(false);
    const currentLanguage = inject('currentLanguage', () => computed(() => navigator.language ?? 'de'), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);

    const retrieveProduct = async productId => {
      try {
        const res = await productService().find(productId);
        product.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.productId) {
      retrieveProduct(route.params.productId);
    }

    const initRelationships = () => {
      categoryService()
        .retrieve()
        .then(res => {
          categories.value = res.data;
        });
      brandService()
        .retrieve()
        .then(res => {
          brands.value = res.data;
        });
      colorService()
        .retrieve()
        .then(res => {
          colors.value = res.data;
        });
    };

    initRelationships();

    const validations = useValidation();
    const validationRules = {
      stock: {},
      name: {},
      image: {},
      ean: {},
      description: {
        maxLength: validations.maxLength('Dieses Feld darf max. 4096 Zeichen lang sein.', 4096),
      },
      category: {},
      brand: {},
      color: {},
    };
    const v$ = useVuelidate(validationRules, product as any);
    v$.value.$validate();

    return {
      productService,
      alertService,
      product,
      previousState,
      isSaving,
      currentLanguage,
      categories,
      brands,
      colors,
      v$,
    };
  },
  created(): void {},
  methods: {
    save(): void {
      this.isSaving = true;
      if (this.product.id) {
        this.productService()
          .update(this.product)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showInfo(`A Product is updated with identifier ${param.id}`);
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      } else {
        this.productService()
          .create(this.product)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showSuccess(`A Product is created with identifier ${param.id}`);
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      }
    },
  },
});
