<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  designVariables: {
    required: true,
    type: Object,
  },
});

const emit = defineEmits(["update:isOpen"]);

const modalState = computed({
  get: () => props.isOpen,
  set: (value: boolean) => emit("update:isOpen", value),
});
</script>

<template>
  <div>
    <UModal v-model="modalState" prevent-close>
      <UCard
        class="relative z-[99]"
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h3
              class="text-lg font-semibold leading-6 text-gray-900 dark:text-white"
            >
              <slot name="header"> </slot>
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="emit('update:isOpen', false)"
            />
          </div>
        </template>
        <div v-if="designVariables" class="space-y-4">
          <p>
            <strong>Primary Color:</strong> {{ designVariables.primaryColor }}
          </p>
          <p><strong>Font:</strong> {{ designVariables.font }}</p>
          <p>
            <strong>Design System:</strong> {{ designVariables.designSystem }}
          </p>
          <p><strong>Icon Pack:</strong> {{ designVariables.iconPack }}</p>
          <p><strong>Screen Size:</strong> {{ designVariables.screenSize }}</p>
          <p>
            <strong>Product/Service:</strong>
            {{ designVariables.productService }}
          </p>
          <p>
            <strong>Business Type:</strong> {{ designVariables.businessType }}
          </p>
          <p><strong>UI Task:</strong> {{ designVariables.uiTask }}</p>
        </div>

        <template #footer>
          
        </template>
      </UCard>
    </UModal>
  </div>
</template>
