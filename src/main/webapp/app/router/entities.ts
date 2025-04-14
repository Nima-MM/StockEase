import { Authority } from '@/shared/security/authority';
/* tslint:disable */
// prettier-ignore
// const Home = () => import('@/core/home/home.vue');

const Entities = () => import('@/entities/entities.vue');

const Product = () => import('@/entities/product/product.vue');
const ProductUpdate = () => import('@/entities/product/product-dialogs/product-update.vue');
const ProductDetails = () => import('@/entities/product/product-dialogs/product-details.vue');

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
  path: '/warehouses',
  name: 'EntitiesRoute',
  component: Entities,
  meta: { authorities: [Authority.USER] },
  children: [
    {
      path: '/warehouses/storage',
      name: 'ProductRoute',
      component: Product,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'product/new',
      name: 'ProductCreate',
      component: ProductUpdate,
      meta: { authorities: [Authority.ADMIN] },
    },
    {
      path: 'product/:productId/edit',
      name: 'ProductEditRoute',
      component: ProductUpdate,
      meta: { authorities: [Authority.ADMIN] },
    },
    {
      path: 'product/:productId/view',
      name: 'ProductViewRoute',
      component: ProductDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'category',
      name: 'CategoryRoute',
      component: Category,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'category/new',
      name: 'CategoryCreateRoute',
      component: CategoryUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'category/:categoryId/edit',
      name: 'CategoryEditRoute',
      component: CategoryUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'category/:categoryId/view',
      name: 'CategoryViewRoute',
      component: CategoryDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'brand',
      name: 'BrandRoute',
      component: Brand,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'brand/new',
      name: 'BrandCreateRoute',
      component: BrandUpdate,
      meta: { authorities: [Authority.ADMIN] },
    },
    {
      path: 'brand/:brandId/edit',
      name: 'BrandEditRoute',
      component: BrandUpdate,
      meta: { authorities: [Authority.ADMIN] },
    },
    {
      path: 'brand/:brandId/view',
      name: 'BrandViewRoute',
      component: BrandDetails,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'color',
      name: 'ColorRoute',
      component: Color,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'color/new',
      name: 'ColorCreateRoute',
      component: ColorUpdate,
      meta: { authorities: [Authority.ADMIN] },
    },
    {
      path: 'color/:colorId/edit',
      name: 'ColorEditRoute',
      component: ColorUpdate,
      meta: { authorities: [Authority.ADMIN] },
    },
    {
      path: 'color/:colorId/view',
      name: 'ColorViewRoute',
      component: ColorDetails,
      meta: { authorities: [Authority.USER] },
    },
    // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
  ],
};
