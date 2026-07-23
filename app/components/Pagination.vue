<template>
  <div class="flex items-center justify-center gap-2 mt-12">
    <button
      type="button"
      class="w-9 h-9 flex items-center justify-center rounded-full border border-stone-200 text-stone-400 disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#1f9d63] hover:text-[#1f9d63] transition-colors"
      :disabled="modelValue === 1"
      @click="$emit('update:modelValue', modelValue - 1)"
      aria-label="Previous page"
    >
      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M15 18l-6-6 6-6"/>
      </svg>
    </button>

    <button
      v-for="page in totalPages"
      :key="page"
      type="button"
      class="w-9 h-9 flex items-center justify-center rounded-full text-sm font-semibold transition-colors"
      :class="page === modelValue ? 'bg-[#1f9d63] text-white' : 'text-stone-500 hover:bg-stone-100'"
      @click="$emit('update:modelValue', page)"
    >
      {{ page }}
    </button>

    <button
      type="button"
      class="w-9 h-9 flex items-center justify-center rounded-full border border-stone-200 text-stone-400 disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#1f9d63] hover:text-[#1f9d63] transition-colors"
      :disabled="modelValue === totalPages"
      @click="$emit('update:modelValue', modelValue + 1)"
      aria-label="Next page"
    >
      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9 18l6-6-6-6"/>
      </svg>
    </button>
  </div>
</template>

<script setup>
defineProps({
  modelValue: { type: Number, required: true },
  totalPages: { type: Number, required: true },
})
defineEmits(['update:modelValue'])
</script>