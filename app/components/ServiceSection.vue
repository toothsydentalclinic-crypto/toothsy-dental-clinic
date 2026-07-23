<template>
  <section class="relative bg-gradient-to-b from-[#eafbf1] to-[#FFFAE1] py-20 px-6 md:px-10">
    <div class="max-w-6xl mx-auto">

      <div class="text-center mb-14">
        <h2 class="font-display text-3xl md:text-4xl font-bold text-[#111827] inline-block relative">
          Services
          <svg class="absolute left-1/2 -translate-x-1/2 -bottom-3 w-28 h-3" viewBox="0 0 120 16" fill="none">
            <path
              d="M2 8C20 2 40 14 60 8C80 2 100 14 118 8"
              stroke="#6BCE9F" stroke-width="4" stroke-linecap="round"
              :style="underlineStyle"
            />
          </svg>
        </h2>
        <p class="mt-6 text-stone-500 text-sm md:text-base max-w-md mx-auto leading-relaxed">
          Every treatment starts with understanding what you actually need —
          here's what we offer, minus the dental jargon.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ServiceCard
          v-for="(s, i) in services"
          :key="s.title"
          :title="s.title"
          :desc="s.desc"
          :link="s.link"
          :svg="s.svg"
          :index="i"
        />
      </div>

    </div>
  </section>
</template>

<script setup>
const services = [
  {
    title: 'Root Canal Treatment',
    desc: 'When infection reaches the centre of a tooth, this clears it out and saves the tooth — done gently, with proper numbing throughout.',
    link: '/service/root-canal',
    svg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C9 2 6 4 6 7c0 1 .4 2 .9 3L8 20c.2 1 1 2 2 2h4c1 0 1.8-1 2-2l1.1-10c.5-1 .9-2 .9-3 0-3-3-5-6-5z"/></svg>`
  },
  {
    title: 'Cosmetic Dentist',
    desc: 'Whitening, veneers, and small reshaping work that focuses purely on how your smile looks, not just how it functions.',
    link: '/service/cosmetic',
    svg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9" stroke-width="3"/><line x1="15" y1="9" x2="15.01" y2="9" stroke-width="3"/></svg>`
  },
  {
    title: 'Dental Implants',
    desc: 'An artificial root placed into the jaw to hold a replacement tooth or bridge — built to function like the real thing.',
    link: '/service/implants',
    svg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="2" width="6" height="9" rx="2"/><path d="M12 11v11"/><path d="M9 16h6"/><path d="M9 19.5h6"/></svg>`
  },
  {
    title: 'Teeth Whitening',
    desc: 'Brightening has never been simpler — we will match a method to how stained your teeth actually are, not just sell you the strongest option.',
    link: '/service/whitening',
    svg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v4M12 17v4M5 12H3M21 12h-2M7.05 7.05L5.6 5.6M18.4 5.6l-1.45 1.45M7.05 16.95l-1.45 1.45M18.4 18.4l-1.45-1.45"/><circle cx="12" cy="12" r="4"/></svg>`
  },
  {
    title: 'Emergency Dentistry',
    desc: 'Sudden pain, bleeding, or a knocked-out tooth — call ahead and we will fit you in the same day, no question about it.',
    link: '/service/emergency',
    svg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`
  },
  {
    title: 'Prevention',
    desc: 'Regular cleanings and checkups that catch small problems before they turn into the kind that need a root canal.',
    link: '/service/prevention',
    svg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z"/><path d="M9 12l2 2 4-4"/></svg>`
  }
]

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
.font-display {
  font-family: 'Fraunces', serif;
  font-optical-sizing: auto;
}
</style>