<template>
  <div
    class="relative bg-accent w-full min-h-screen flex flex-col items-center justify-start"
  >
    <div>
      <brutalist-x class="absolute left-0" />
      <brutalist-tags
        class="absolute right-0 bottom-[30%] lg:bottom-0 z-[55] lg:z-auto w-40 lg:w-60"
      />
      <flower-shape class="absolute right-0 z-[55]" />
    </div>
    <div class="p-6 lg:p-20 w-full relative z-50">
      <div v-if="hasSubmitted" class="pt-20">
        <UCard
          :ui="{
            background: 'dark:bg-white',
          }"
          class="max-w-xl mx-auto p-6 rounded-2xl"
        >
          <template #header>
            <h1 class="text-4xl font-bold mb-4">Design Roulette</h1>
            <p class="mb-4 font-semibold">
              <code> &lt;Enugu Code/Jam&gt; </code>
            </p>
          </template>
          <p class="text-center">
            Sorry, you can only submit once.
            <span class="font-semibold"> Goodluck.</span>
          </p>
        </UCard>
      </div>

      <app-form v-else @submit="onSubmit" />
    </div>

    <result-modal
      class="relative z-[999]"
      :isOpen="showResult"
      @update:is-open="showResult = $event"
      :designVariables="designVariables"
    >
      <template #header> Your Design Challenge</template>
    </result-modal>
  </div>
</template>

<script setup>
import BrutalistTags from "./components/svgs/BrutalistTags.vue";
import BrutalistX from "./components/svgs/BrutalistX.vue";
import FlowerShape from "./components/svgs/FlowerShape.vue";

const showResult = ref(false);
const hasSubmitted = ref(false);
const designVariables = reactive({});

const onSubmit = async (event) => {
  Object.assign(designVariables, event);
  showResult.value = true;
};

function checkPreviousSubmission() {
  const storedData = localStorage.getItem("design_roulette_variables");
  if (storedData) {
    const { expireAt } = JSON.parse(storedData);
    if (new Date(expireAt) > new Date()) {
      hasSubmitted.value = true;
    } else {
      localStorage.removeItem("design_roulette_variables");
    }
  }
}

onMounted(() => {
  checkPreviousSubmission();
});
</script>

<style scoped>
.bg-accent {
  background: linear-gradient(#58f1d3 0%, #a89fd7 71%);
}
</style>
