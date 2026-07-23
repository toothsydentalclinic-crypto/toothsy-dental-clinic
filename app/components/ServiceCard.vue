<!-- components/ServiceCard.vue -->
<template>
  <div
    ref="cardRef"
    class="group bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(0,0,0,0.09)] card-reveal cursor-pointer"
    :class="visible ? 'is-visible' : ''"
    :style="{ transitionDelay: visible ? `${index * 90}ms` : '0ms' }"
    @click="$emit('open-detail')"
  >
    <!-- Full-width photo -->
    <div class="w-full overflow-hidden" :style="{ height: imageHeight }">
      <img
        :src="image"
        :alt="title"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>

    <div class="p-7">
      <h3 class="font-display text-base font-bold text-[#064e35] uppercase tracking-[0.03em] leading-tight mb-1.5">{{ title }}</h3>
      <p class="text-[0.83rem] text-stone-500 leading-relaxed mb-5">{{ desc }}</p>

      <button
        type="button"
        class="group/link inline-flex items-center gap-2 text-sm font-semibold text-[#111827] hover:text-[#1f9d63] transition-colors"
        @click.stop="$emit('open-detail')"
      >
        See More
        <span class="flex items-center justify-center w-6 h-6 rounded-full border border-[#1f9d63] group-hover/link:bg-[#1f9d63] transition-colors duration-200">
          <svg
            class="w-3 h-3 text-[#1f9d63] group-hover/link:text-white transition-colors duration-200"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M5 12h14M13 6l6 6-6 6"/>
          </svg>
        </span>
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  desc:  { type: String, required: true },
  link:  { type: String, default: '' },
  image: { type: String, required: true },        // photo path/URL — replaces the old `svg` icon
  imageHeight: { type: String, default: '11rem' }, // ~176px, bump up/down as needed
  index: { type: Number, default: 0 },
})

defineEmits(['open-detail'])

const cardRef = ref(null)
const visible = ref(false)
let observer  = null

onMounted(() => {
  const prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReducedMotion) {
    visible.value = true
    return
  }

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        visible.value = true
        observer.disconnect()
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
  )

  if (cardRef.value) observer.observe(cardRef.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<style scoped>
.card-reveal {
  opacity: 0;
  transform: translateY(40px) scale(0.97);
  filter: blur(6px);
  transition:
    opacity   0.75s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.75s cubic-bezier(0.22, 1, 0.36, 1),
    filter    0.65s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.3s ease,
    translate  0.3s ease;
}

.card-reveal.is-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: blur(0px);
}

@media (prefers-reduced-motion: reduce) {
  .card-reveal {
    opacity: 1;
    transform: none;
    filter: none;
    transition: box-shadow 0.3s ease, translate 0.3s ease;
  }
}
.font-display {
  font-family: 'Fraunces', serif;
  font-optical-sizing: auto;
}
</style>