<template>
  <div class="card">
    <Tabs value="1">
      <TabList>
        <Tab value="1"
          ><router-link :to="{ name: 'ProductRoute' }">
            <a v-ripple class="flex items-center cursor-pointer">
              <i class="pi pi-home mr-2"></i>
              <span class="font-medium">Lager 1</span>
            </a>
          </router-link>
        </Tab>
        <Tab value="2" disabled
          ><router-link :to="'/'">
            <a v-ripple class="flex items-center cursor-pointer">
              <i class="pi pi-home mr-2"></i>
              <span class="font-medium">Lager 2</span>
            </a>
          </router-link>
        </Tab>
        <Tab value="3" disabled
          ><router-link :to="'/'">
            <a v-ripple class="flex items-center cursor-pointer">
              <i class="pi pi-home mr-2"></i>
              <span class="font-medium">Lager 3</span>
            </a>
          </router-link>
        </Tab>
        <Button type="button" icon="pi pi-cog" label="Einstellungen" class="p-button-outlined" />
      </TabList>
      <TabPanels>
        <TabPanel value="1">
          <router-view></router-view>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>

<script lang="ts" src="./entities.component.ts"></script>

<!--<TabPanel value="1">
          <p class="m-0">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
            laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            Nemo enim ipsam voluptatem quia voluptas
            sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
            voluptatem sequi nesciunt. Consectetur,
            adipisci velit, sed quia non numquam eius modi.
          </p>
        </TabPanel>
        <TabPanel value="2">
          <p class="m-0">
            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
            voluptatum deleniti atque corrupti quos
            dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique
            sunt in culpa qui officia deserunt
            mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et
            expedita distinctio. Nam libero tempore,
            cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
          </p>
        </TabPanel>-->
