import { defineComponent, provide } from 'vue';

import ProductService from './product/product.service';
import CategoryService from './category/category.service';
import BrandService from './brand/brand.service';
import ColorService from './color/color.service';
import UserService from '@/entities/user/user.service';
// jhipster-needle-add-entity-service-to-entities-component-import - JHipster will import entities services here

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'Entities',
  setup() {
    provide('userService', () => new UserService());
    provide('productService', () => new ProductService());
    provide('categoryService', () => new CategoryService());
    provide('brandService', () => new BrandService());
    provide('colorService', () => new ColorService());
    // jhipster-needle-add-entity-service-to-entities-component - JHipster will import entities services here
  },
});
