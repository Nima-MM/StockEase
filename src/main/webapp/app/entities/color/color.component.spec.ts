/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { type MountingOptions, shallowMount } from '@vue/test-utils';
import sinon, { type SinonStubbedInstance } from 'sinon';

import Color from './color.vue';
import ColorService from './color.service';
import AlertService from '@/shared/alert/alert.service';

type ColorComponentType = InstanceType<typeof Color>;

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  let alertService: AlertService;

  describe('Color Management Component', () => {
    let colorServiceStub: SinonStubbedInstance<ColorService>;
    let mountOptions: MountingOptions<ColorComponentType>['global'];

    beforeEach(() => {
      colorServiceStub = sinon.createStubInstance<ColorService>(ColorService);
      colorServiceStub.retrieve.resolves({ headers: {} });

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
          colorService: () => colorServiceStub,
        },
      };
    });

    describe('Mount', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        colorServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

        // WHEN
        const wrapper = shallowMount(Color, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(colorServiceStub.retrieve.calledOnce).toBeTruthy();
        expect(comp.colors[0]).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
    describe('Handles', () => {
      let comp: ColorComponentType;

      beforeEach(async () => {
        const wrapper = shallowMount(Color, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();
        colorServiceStub.retrieve.reset();
        colorServiceStub.retrieve.resolves({ headers: {}, data: [] });
      });

      it('Should call delete service on confirmDelete', async () => {
        // GIVEN
        colorServiceStub.delete.resolves({});

        // WHEN
        comp.prepareRemove({ id: 123 });

        comp.removeColor();
        await comp.$nextTick(); // clear components

        // THEN
        expect(colorServiceStub.delete.called).toBeTruthy();

        // THEN
        await comp.$nextTick(); // handle component clear watch
        expect(colorServiceStub.retrieve.callCount).toEqual(1);
      });
    });
  });
});
