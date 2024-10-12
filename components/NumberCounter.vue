<template>
  <div class="flex gap-x-5 items-center">
    <UButton
      icon="i-heroicons-minus"
      color="gray"
      variant="solid"
      :disabled="value <= min"
      @click="decrement"
    />

    <div>
      {{ value }}
    </div>

    <UButton
      icon="i-heroicons-plus"
      color="gray"
      variant="solid"
      :disabled="value >= max"
      @click="increment"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  step: {
    type: Number,
    default: 1,
  },
});

const emit = defineEmits(["update:modelValue"]);

const value = ref(props.modelValue);

const increment = () => {
  if (value.value < props.max) {
    value.value += props.step;
    emit("update:modelValue", value.value);
  }
};

const decrement = () => {
  if (value.value > props.min) {
    value.value -= props.step;
    emit("update:modelValue", value.value);
  }
};

const validateInput = () => {
  value.value = Math.max(props.min, Math.min(props.max, value.value));
  emit("update:modelValue", value.value);
};

watch(
  () => props.modelValue,
  (newValue) => {
    value.value = newValue;
  }
);
</script>
