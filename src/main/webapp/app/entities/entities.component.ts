import { defineComponent, provide } from 'vue';

import ProductService from './product/product.service';
import CategoryService from './category/category.service';
import BrandService from './brand/brand.service';
import ColorService from './color/color.service';
import UserService from '@/entities/user/user.service';
import Product from './product/product.vue';
// jhipster-needle-add-entity-service-to-entities-component-import - JHipster will import entities services here

export default defineComponent({
  name: 'Entities',
  components: {
    Product: Product,
  },
  setup() {
    provide('userService', () => new UserService());
    provide('productService', () => new ProductService());
    provide('categoryService', () => new CategoryService());
    provide('brandService', () => new BrandService());
    provide('colorService', () => new ColorService());
    // jhipster-needle-add-entity-service-to-entities-component - JHipster will import entities services here
  },
});
