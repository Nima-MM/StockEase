<template>
  <div>
    <h2 id="page-heading" data-cy="BrandHeading">
      <span id="brand-heading">Brands</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" @click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon> <span>Liste aktualisieren</span>
        </button>
        <router-link :to="{ name: 'BrandCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-brand"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span>Brand erstellen</span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && brands && brands.length === 0">
      <span>Keine Brands gefunden</span>
    </div>
    <div class="table-responsive" v-if="brands && brands.length > 0">
      <table class="table table-striped" aria-describedby="brands">
        <thead>
          <tr>
            <th scope="row"><span>ID</span></th>
            <th scope="row"><span>Name</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="brand in brands" :key="brand.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'BrandView', params: { brandId: brand.id } }">{{ brand.id }}</router-link>
            </td>
            <td>{{ brand.name }}</td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'BrandView', params: { brandId: brand.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline">Details</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'BrandEdit', params: { brandId: brand.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline">Bearbeiten</span>
                  </button>
                </router-link>
                <b-button
                  @click="prepareRemove(brand)"
                  variant="danger"
                  class="btn btn-sm"
                  data-cy="entityDeleteButton"
                  v-b-modal.removeEntity
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                  <span class="d-none d-md-inline">Löschen</span>
                </b-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <template #modal-title>
        <span id="stockManagementApp.brand.delete.question" data-cy="brandDeleteDialogHeading">Löschen bestätigen</span>
      </template>
      <div class="modal-body">
        <p id="jhi-delete-brand-heading">Soll Brand {{ removeId }} wirklich dauerhaft gelöscht werden?</p>
      </div>
      <template #modal-footer>
        <div>
          <button type="button" class="btn btn-secondary" @click="closeDialog()">Abbrechen</button>
          <button
            type="button"
            class="btn btn-primary"
            id="jhi-confirm-delete-brand"
            data-cy="entityConfirmDeleteButton"
            @click="removeBrand()"
          >
            Löschen
          </button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./brand.component.ts"></script>
