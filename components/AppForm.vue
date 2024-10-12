<template>
  <UCard class="max-w-xl mx-auto p-2 lg:p-6 rounded-2xl">
    <UForm
      :schema="schema"
      :state="formState"
      @submit="onSubmit"
      class="space-y-6"
    >
      <h1 class="text-4xl font-bold mb-4 text-primary">Design Roulette</h1>
      <p class="mb-4 font-semibold"><code> &lt;Enugu Code/Jam&gt; </code></p>

      <UFormGroup label="Email" name="email">
        <UInput
          v-model="formState.email"
          type="email"
          placeholder="hello@gmail.com"
        />
      </UFormGroup>

      <UFormGroup label="Full name" name="fullName">
        <UInput v-model="formState.fullName" placeholder="Your full name" />
      </UFormGroup>

      <UFormGroup label="Design level" name="designLevel">
        <div class="space-y-1">
          <URadio
            v-for="level of designLevels"
            :key="level.value"
            v-model="formState.designLevel"
            v-bind="level"
          />
        </div>
      </UFormGroup>

      <UFormGroup label="Years of Experience" name="yearsOfExperience">
        <NumberCounter
          class="mt-1"
          v-model="formState.yearsOfExperience"
          :min="1"
          :max="15"
          :step="1"
        />
      </UFormGroup>

      <UFormGroup label="Do you use Figma?" name="usesFigma">
        <div class="space-y-1">
          <URadio
            v-for="options of figmaOptions"
            :key="options.value"
            v-model="formState.usesFigma"
            v-bind="options"
          />
        </div>
      </UFormGroup>

      <UFormGroup label="Team Mouse or trackpad?" name="inputDevice">
        <div class="space-y-1">
          <URadio
            v-for="options of inputDeviceOptions"
            :key="options.value"
            v-model="formState.inputDevice"
            v-bind="options"
          />
        </div>
      </UFormGroup>

      <UButton
        :loading="isLoading"
        size="lg"
        class="w-full flex justify-center"
        type="submit"
        color="purple"
        >Proceed to Roulette</UButton
      >
    </UForm>
  </UCard>
</template>

<script setup lang="ts">
import { defineEmits } from "vue";
import NumberCounter from "./NumberCounter.vue";
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";
import useData from "../composables/useData";
import { RandomizerInput } from "~/types";

const emit = defineEmits(["submit"]);

const schema = z.object({
  email: z.string().email("Enter a valid email address"),
  fullName: z.string(),
  yearsOfExperience: z.number(),
  designLevel: z.string(),
  usesFigma: z.string(),
  inputDevice: z.string(),
});

type Schema = z.output<typeof schema>;

const formState = reactive({
  email: undefined,
  fullName: undefined,
  designLevel: undefined,
  yearsOfExperience: 1,
  usesFigma: undefined,
  inputDevice: undefined,
});

const designLevels = [
  { label: "Newbie", value: "newbie" },
  { label: "Intern", value: "intern" },
  { label: "Mid Level", value: "mid_level" },
  { label: "Senior Level", value: "senior_level" },
];

const figmaOptions = [
  { label: "Figma Supremacy!!", value: "true" },
  { label: "Figma? eww", value: "false" },
  { label: "What's figma?", value: "never" },
];

const inputDeviceOptions = [
  { label: "Team Mouse", value: "mouse" },
  { label: "Team Trackpad", value: "trackpad" },
  { label: "Why not both?", value: "both" },
];

const { generateDesignVariables } = useDesignRoulette();
const { saveProfile } = useData();
const toast = useToast();

const isLoading = ref(false);

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  isLoading.value = true;
  const randomizerInput = {
    fullName: event.data.fullName,
    yearsOfExperience: event.data.yearsOfExperience,
    inputDevice: event.data.inputDevice,
    designLevel: event.data.designLevel,
  };

  try {
    const designVariables = generateDesignVariables(
      randomizerInput as RandomizerInput
    );

    await saveProfile({
      email: event.data.email,
      fullName: event.data.fullName,
      yearsOfExperience: event.data.yearsOfExperience,
      inputDevice: event.data.inputDevice,
      designLevel: event.data.designLevel,
      usesFigma: event.data.usesFigma,
      designVariables: designVariables,
    });

    emit("submit", designVariables);

    localStorage.setItem(
      "design_roulette_variables",
      JSON.stringify(designVariables)
    );

    return toast.add({
      title: "Success!",
      description:
        "Your details have been entered into the Roulette Successfully.",
      icon: "i-heroicons-exclamation-circle",
    });
  } catch (error: any) {
    if (error.code == "23505") {
      return toast.add({
        title: "User Already Registered",
        description:
          "Your details have already been entered into the Roulette.",
        icon: "i-heroicons-exclamation-circle",
        color: "red",
      });
    }
    toast.add({
      title: "Error Entering Roulette",
      description:
        "An error occurred while entering you into the Roulette, please try again.",
      icon: "i-heroicons-exclamation-circle",
      color: "red",
    });
    console.error("Error 3", error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped></style>
