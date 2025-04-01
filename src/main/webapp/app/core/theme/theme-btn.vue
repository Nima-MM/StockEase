<template>
  <v-btn
    :prepend-icon="theme === 'light' ? 'mdi-weather-night' : 'mdi-weather-sunny'"
    :text="theme === 'light' ? 'Dunkel' : 'Hell'"
    slim
    @click="toggleTheme"
  ></v-btn>
</template>

<script lang="ts" setup>
import { useTheme } from '@/shared/composables/theme';
const { theme, toggleTheme } = useTheme();
</script>
