<template>
  <div class="bg-[#EFF8FC]">
    <HeroSection
      eyebrow="Contact"
      title="Get in touch"
      highlight="with Toothsy"
      description="Book an appointment, ask a question, or find the clinic details you need."
    />

    <section class="pt-24 pb-20 px-6 md:px-10">
      <div class="max-w-3xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="font-display text-3xl md:text-4xl font-bold text-[#111827] inline-block relative">
            Get in touch
          </h2>
          <p class="mt-4 text-stone-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed mt-5 text-stone-500 text-[0.95rem] leading-relaxed max-w-md">
            Book an appointment to treat your teeth right now.
          </p>
        </div>

        <ContactInfoPanel />
      </div>
    </section>

  </div>
</template>

<script setup>
useHead({
  title: 'Contact - Toothsy Dental Clinic',
  meta: [{ name: 'description', content: 'Contact Toothsy Dental Clinic to book an appointment or ask a question.' }]
})

const underlineStyle = reactive({
  strokeDasharray: '160',
  strokeDashoffset: '160',
  transition: 'stroke-dashoffset 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s'
})

onMounted(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion) {
    underlineStyle.transition = 'none'
    underlineStyle.strokeDashoffset = '0'
    return
  }
  requestAnimationFrame(() => {
    underlineStyle.strokeDashoffset = '0'
  })
})
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

.body-font {
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
}
.font-display {
  font-family: 'Fraunces', serif;
  font-optical-sizing: auto;
}


</style>