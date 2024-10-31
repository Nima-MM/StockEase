import { Authority } from '@/shared/security/authority';
/* tslint:disable */
// prettier-ignore
const Entities = () => import('@/entities/entities.vue');

const Product = () => import('@/entities/product/product.vue');
const ProductUpdate = () => import('@/entities/product/product-update.vue');
const ProductDetails = () => import('@/entities/product/product-details.vue');

const Category = () => import('@/entities/category/category.vue');
const CategoryUpdate = () => import('@/entities/category/category-update.vue');
const CategoryDetails = () => import('@/entities/category/category-details.vue');

const Brand = () => import('@/entities/brand/brand.vue');
const BrandUpdate = () => import('@/entities/brand/brand-update.vue');
const BrandDetails = () => import('@/entities/brand/brand-details.vue');

const Color = () => import('@/entities/color/color.vue');
const ColorUpdate = () => import('@/entities/color/color-update.vue');
const ColorDetails = () => import('@/entities/color/color-details.vue');

// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

export default {
  path: '/',
  component: Entities,
  children: [
    {
      path: 'product',
      name: 'Product',
      component: Product,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'product/new',
      name: 'ProductCreate',
      component: ProductUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'product/:productId/edit',
      name: 'ProductEdit',
      component: ProductUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'product/:productId/view',
      name: 'ProductView',
      component: ProductDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'category',
      name: 'Category',
      component: Category,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'category/new',
      name: 'CategoryCreate',
      component: CategoryUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'category/:categoryId/edit',
      name: 'CategoryEdit',
      component: CategoryUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'category/:categoryId/view',
      name: 'CategoryView',
      component: CategoryDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'brand',
      name: 'Brand',
      component: Brand,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'brand/new',
      name: 'BrandCreate',
      component: BrandUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'brand/:brandId/edit',
      name: 'BrandEdit',
      component: BrandUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'brand/:brandId/view',
      name: 'BrandView',
      component: BrandDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'color',
      name: 'Color',
      component: Color,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'color/new',
      name: 'ColorCreate',
      component: ColorUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'color/:colorId/edit',
      name: 'ColorEdit',
      component: ColorUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'color/:colorId/view',
      name: 'ColorView',
      component: ColorDetails,
      meta: { authorities: [Authority.USER] },
    },
    // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
  ],
};
