/* tslint:disable max-line-length */
import { vitest } from 'vitest';
import { type MountingOptions, shallowMount } from '@vue/test-utils';
import sinon, { type SinonStubbedInstance } from 'sinon';
import { type RouteLocation } from 'vue-router';

import ColorUpdate from './color-update.vue';
import ColorService from './color.service';
import AlertService from '@/shared/alert/alert.service';

type ColorUpdateComponentType = InstanceType<typeof ColorUpdate>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const colorSample = { id: 123 };

describe('Component Tests', () => {
  let mountOptions: MountingOptions<ColorUpdateComponentType>['global'];
  let alertService: AlertService;

  describe('Color Management Update Component', () => {
    let comp: ColorUpdateComponentType;
    let colorServiceStub: SinonStubbedInstance<ColorService>;

    beforeEach(() => {
      route = {};
      colorServiceStub = sinon.createStubInstance<ColorService>(ColorService);
      colorServiceStub.retrieve.onFirstCall().resolves(Promise.resolve([]));

      alertService = new AlertService({
        bvToast: {
          toast: vitest.fn(),
        } as any,
      });

      mountOptions = {
        stubs: {
          'font-awesome-icon': true,
          'b-input-group': true,
          'b-input-group-prepend': true,
          'b-form-datepicker': true,
          'b-form-input': true,
        },
        provide: {
          alertService,
          colorService: () => colorServiceStub,
        },
      };
    });

    afterEach(() => {
      vitest.resetAllMocks();
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const wrapper = shallowMount(ColorUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.color = colorSample;
        colorServiceStub.update.resolves(colorSample);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(colorServiceStub.update.calledWith(colorSample)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        colorServiceStub.create.resolves(entity);
        const wrapper = shallowMount(ColorUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.color = entity;

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(colorServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        colorServiceStub.find.resolves(colorSample);
        colorServiceStub.retrieve.resolves([colorSample]);

        // WHEN
        route = {
          params: {
            colorId: `${colorSample.id}`,
          },
        };
        const wrapper = shallowMount(ColorUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(comp.color).toMatchObject(colorSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        colorServiceStub.find.resolves(colorSample);
        const wrapper = shallowMount(ColorUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});
