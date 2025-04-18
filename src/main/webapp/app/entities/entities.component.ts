import { defineComponent, provide } from 'vue';

import ProductService from './product/product.service';
import CategoryService from './category/category.service';
import BrandService from './brand/brand.service';
import ColorService from './color/color.service';
import UserService from '@/entities/user/user.service';
import { useProductsStore } from './product/product.store';
import { useCategoryStore } from './category/category.store';
import { useBrandStore } from './brand/brand.store';
import { useColorStore } from './color/color.store';
import Product from './product/product.vue';
// // import { ICategory } from '@/shared/model/category.model';
// // import { IBrand } from '@/shared/model/brand.model';
// // import { IColor } from '@/shared/model/color.model';
// jhipster-needle-add-entity-service-to-entities-component-import - JHipster will import entities services here

export default defineComponent({
  name: 'Entities',
  components: {
    Product,
  },
  setup() {
    // const categories = reactive<ICategory[]>([]);
    // const brands = reactive<IBrand[]>([]);
    // const colors = reactive<IColor[]>([]);
    // Provide the services for dependency injection
    provide('userService', () => new UserService());
    provide('productService', () => new ProductService());
    provide('categoryService', () => new CategoryService());
    provide('brandService', () => new BrandService());
    provide('colorService', () => new ColorService());
    useProductsStore().setService(new ProductService());
    useCategoryStore().setService(new CategoryService());
    useBrandStore().setService(new BrandService());
    useColorStore().setService(new ColorService());
  },
});
