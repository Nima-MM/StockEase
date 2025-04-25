<template>
  <div class="" :theme="theme">
    <Suspense>
      <!-- Async Default -->
      <template #default>
        <Layouts />
      </template>

      <template #fallback>
        <FallbackLoader />
      </template>
    </Suspense>
  </div>
</template>

<script lang="ts" src="./app.component.ts"></script>
