<template>
  <div class="card h-svh flex justify-center justify-self-center" :theme="theme">
    <Suspense>
      <!-- Async Default -->
      <template #default>
        <AuthGateway />
      </template>

      <template #fallback>
        <FallbackLoader />
      </template>
    </Suspense>
  </div>
</template>

<script lang="ts" src="./app.component.ts"></script>
