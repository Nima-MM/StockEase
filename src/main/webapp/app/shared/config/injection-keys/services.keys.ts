import type { InjectionKey } from 'vue';
import type ProductService from '@/entities/product/product.service';

export const ProductServiceKey: InjectionKey<ProductService> = Symbol('ProductService');
