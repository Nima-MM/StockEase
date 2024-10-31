/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { type MountingOptions, shallowMount } from '@vue/test-utils';
import sinon, { type SinonStubbedInstance } from 'sinon';

import Category from './category.vue';
import CategoryService from './category.service';
import AlertService from '@/shared/alert/alert.service';

type CategoryComponentType = InstanceType<typeof Category>;

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  let alertService: AlertService;

  describe('Category Management Component', () => {
    let categoryServiceStub: SinonStubbedInstance<CategoryService>;
    let mountOptions: MountingOptions<CategoryComponentType>['global'];

    beforeEach(() => {
      categoryServiceStub = sinon.createStubInstance<CategoryService>(CategoryService);
      categoryServiceStub.retrieve.resolves({ headers: {} });

      alertService = new AlertService({
        bvToast: {
          toast: vitest.fn(),
        } as any,
      });

      mountOptions = {
        stubs: {
          bModal: bModalStub as any,
          'font-awesome-icon': true,
          'b-badge': true,
          'b-button': true,
          'router-link': true,
        },
        directives: {
          'b-modal': {},
        },
        provide: {
          alertService,
          categoryService: () => categoryServiceStub,
        },
      };
    });

    describe('Mount', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        categoryServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

        // WHEN
        const wrapper = shallowMount(Category, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(categoryServiceStub.retrieve.calledOnce).toBeTruthy();
        expect(comp.categories[0]).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
    describe('Handles', () => {
      let comp: CategoryComponentType;

      beforeEach(async () => {
        const wrapper = shallowMount(Category, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();
        categoryServiceStub.retrieve.reset();
        categoryServiceStub.retrieve.resolves({ headers: {}, data: [] });
      });

      it('Should call delete service on confirmDelete', async () => {
        // GIVEN
        categoryServiceStub.delete.resolves({});

        // WHEN
        comp.prepareRemove({ id: 123 });

        comp.removeCategory();
        await comp.$nextTick(); // clear components

        // THEN
        expect(categoryServiceStub.delete.called).toBeTruthy();

        // THEN
        await comp.$nextTick(); // handle component clear watch
        expect(categoryServiceStub.retrieve.callCount).toEqual(1);
      });
    });
  });
});
