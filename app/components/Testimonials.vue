<template>
  <section class="relative z-10 py-16 md:py-20 bg-white">
    <div class="max-w-6xl mx-auto px-6 md:px-10">
      <div class="text-center mb-12">
        <span class="inline-block text-[0.68rem] font-bold tracking-[0.18em] uppercase text-[#1f9d63] mb-3">
          Testimonials
        </span>
        <h2 class="font-display text-2xl md:text-[1.9rem] font-bold tracking-tight max-w-md mx-auto leading-[1.2]">
          What Our Patients Say
        </h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <article
          v-for="(testimonial, i) in testimonials"
          :key="i"
          class="bg-white rounded-2xl p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-[#e8f5ee] hover:shadow-[0_10px_28px_rgba(0,0,0,0.09)] hover:border-[#bfe6da] transition-all duration-200 ease-out"
        >
          <div class="flex items-center gap-1 mb-4" aria-label="Rating">
            <svg v-for="n in 5" :key="n" class="w-5 h-5 text-[#FFD700]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <blockquote class="text-stone-600 leading-relaxed mb-5">
            "{{ testimonial.quote }}"
          </blockquote>
          <footer>
            <cite class="font-display text-sm font-bold text-[#111827] not-italic">{{ testimonial.name }}</cite>
            <p class="text-[0.75rem] text-stone-500 mt-0.5">{{ testimonial.treatment }}</p>
          </footer>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
// TODO: Replace with real patient reviews
const testimonials = [
  {
    name: 'Sarah M.',
    treatment: 'Teeth Whitening',
    quote: 'The team made me feel so comfortable. My teeth are 3 shades whiter and the results look completely natural!'
  },
  {
    name: 'James R.',
    treatment: 'Root Canal Treatment',
    quote: 'I was terrified of getting a root canal, but Dr. Pich explained everything and it was totally painless. Highly recommend!'
  },
  {
    name: 'Linda K.',
    treatment: 'Family Checkups',
    quote: 'We bring our whole family here. The pediatric care is exceptional — my kids actually ask when their next appointment is.'
  }
]
</script>

<style scoped>
/* Matches ServiceCard hover elevation */
</style>
</file>