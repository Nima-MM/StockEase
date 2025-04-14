import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { setActivePinia, createPinia } from 'pinia';
import { useProductsStore } from '../product.store';
import Product from '../product.vue';
import ProductService from '../product.service';
import sinon, { type SinonStubbedInstance } from 'sinon';
import { privateDecrypt } from 'crypto';

describe('Product Store', () => {
  setActivePinia(createPinia());
  const store = useProductsStore();
  const wrapper = mount(store, {
    global: {
      plugins: [createTestingPinia()],
    },
  });
  let productServiceStub: SinonStubbedInstance<ProductService>;

  beforeEach(() => {});

  it('has an intial empty state', () => {
    expect(store.storedData).toEqual([]);
    expect(store.isFetching).toBe(false);
  });

  it('should fetch products and update storedData', async () => {
    productServiceStub = sinon.createStubInstance<ProductService>(ProductService);
    productServiceStub.retrieve.resolves({
      headers: {},
      data: [
        {
          id: 123,
          stock: 0,
          name: 'AAAAAAA',
          image: 'AAAAAAA',
          ean: 'AAAAAAA',
          description: 'AAAAAAA',
          category: { id: 1, name: 'B' },
          brand: { id: 2, name: 'BB' },
          color: { id: 3, name: 'BBB' },
        },
      ],
    });
    store.setService(productServiceStub as ProductService);
    await store.retrieveEntity();
    expect(store.storedData).toEqual([
      {
        id: 123,
        stock: 0,
        name: 'AAAAAAA',
        image: 'AAAAAAA',
        ean: 'AAAAAAA',
        description: 'AAAAAAA',
        category: { id: 1, name: 'B' },
        brand: { id: 2, name: 'BB' },
        color: { id: 3, name: 'BBB' },
      },
    ]);
    expect(store.isFetching).toBe(false);
  });

  it('should', () => {
    const store = useProductsStore();
    store.getProducts;
    expect(store);
  });
});
