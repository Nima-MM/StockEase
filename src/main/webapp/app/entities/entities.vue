<template>
  <div class="card">
    <Tabs value="1">
      <TabList>
        <div class="!flex flex-wrap justify-between !gap-2">
          <div>
            <Tab value="1">
              <!-- <router-link :to="{ name: 'ProductRoute' }"> -->
              <a v-ripple class="flex items-center cursor-pointer">
                <i class="pi pi-home mr-2"></i>
                <span class="font-medium">Lager 1</span>
              </a>
              <!-- </router-link> -->
            </Tab>
            <Tab value="1" disabled>
              <a v-ripple class="flex items-center cursor-pointer">
                <i class="pi pi-home mr-2"></i>
                <span class="font-medium">Lager 2</span>
              </a>
            </Tab>
            <Tab value="1" disabled>
              <a v-ripple class="flex items-center cursor-pointer">
                <i class="pi pi-home mr-2"></i>
                <span class="font-medium">Lager 3</span>
              </a>
            </Tab>
          </div>
          <NewProductDialog />
          <Button type="button" icon="pi pi-cog" label="Einstellungen" class="p-button-outlined" />
        </div>
      </TabList>
      <TabPanels>
        <TabPanel value="1">
          <Product />
          <!-- <router-view></router-view> -->
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>

<script lang="ts" src="./entities.component.ts"></script>
