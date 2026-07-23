<template>
  <div
    ref="panelRef"
    class="transition-all duration-700 ease-out"
    :class="visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'"
  >
    <!-- Map -->
    <div class="relative rounded-2xl overflow-hidden border border-[#bfe6da] h-[220px] mb-5">
    <iframe class="w-[100%]" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3907.6264222235827!2d104.9139173!3d11.6499473!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109534d095a86f5%3A0x76f62d7f485de94!2sToothsy%20Dental%20clinic!5e0!3m2!1sen!2skh!4v1783390807731!5m2!1sen!2skh" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>

      <div class="absolute bottom-3 left-3 right-3 bg-white rounded-xl shadow-md px-4 py-3 flex items-center gap-3">
        <span class="flex-shrink-0 w-9 h-9 rounded-full bg-[#1f9d63] flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
        </span>
        <div>
          <p class="text-sm font-bold text-[#111827]">Office Address</p>
          <p class="text-[0.78rem] text-stone-500">Sangkat Prek leap, khan Chroy chongva, Phnom Penh, Cambodia.</p>
        </div>
      </div>
    </div>

    <!-- Info rows -->
    <div class="flex flex-col gap-3 mb-6">
      <ContactInfoRow
        v-for="row in infoRows"
        :key="row.label"
        :icon="row.icon"
        :label="row.label"
        :value="row.value"
        :value2="row.value2"
      />
    </div>

    <!-- Social -->
   <div class="text-center">
  <p class="text-sm md:text-base text-stone-500 mb-5">Follow us</p>

  <div class="flex justify-center items-center gap-5">
    <a
      v-for="social in socials"
      :key="social.name"
      :href="social.href"
      target="_blank"
      rel="noopener noreferrer"
      class="flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
    >
      <span class="w-8 h-8 flex items-center justify-center" v-html="social.svg" />
    </a>
  </div>
</div>
  </div>
</template>

<script setup>
const panelRef = ref(null)
const visible = ref(false)
let observer = null

const infoRows = [
  {
    label: 'Office Timings',
    value: 'Monday – Saturday: 9am – 7pm',
    value2: 'Saturday: 9am – 4pm',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>`
  },
  {
    label: 'Email Address',
    value: ' ritheanin85@gmail.com',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>`
  },
  {
    label: 'Phone Number',
    value: '+855 858 899 56',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.37 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l1.11-1.11a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`
  },
  {
    label: 'Live Chat / Telegram',
    value: '@TheaninTSDC',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>`
  }
]

const socials = [
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/people/Toothsy-Dental-Clinic-%E1%9E%94%E1%9E%93%E1%9F%92%E1%9E%91%E1%9E%94%E1%9F%8B%E1%9E%96%E1%9E%B7%E1%9E%82%E1%9F%92%E1%9E%9A%E1%9F%84%E1%9F%87%E1%9E%96%E1%9F%92%E1%9E%99%E1%9E%B6%E1%9E%94%E1%9E%B6%E1%9E%9B%E1%9E%87%E1%9E%98%E1%9F%92%E1%9E%84%E1%9E%BA%E1%9E%98%E1%9E%B6%E1%9E%8F%E1%9F%8B%E1%9E%92%E1%9F%92%E1%9E%98%E1%9F%81%E1%9E%89%E1%9E%92%E1%9E%BC%E1%9E%9F%E1%9F%8A%E1%9E%B8/61581044186260/#',
    svg: `<svg width="32" height="32" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/></svg>`
  },
  {
    name: 'Telegram',
    href: 'https://t.me/TheaninTSDC',
    svg: `<svg width="32" height="32" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16c-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212-.07-.062-.174-.041-.249-.024-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.475-1.635.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472z" fill="#26A5E4"/></svg>`
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@dr.nindentist',
    svg: `<svg width="32" height="32" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(-1.2,-1.2)">
        <path d="M17.9 8.7c1.28.9 2.85 1.43 4.53 1.43v-3.2a5.4 5.4 0 0 1-1.05-.12v2.52a8.6 8.6 0 0 1-4.53-1.43v6.62c0 3.31-2.68 6-6 6a5.97 5.97 0 0 1-3.35-1.02A5.99 5.99 0 0 0 11.9 22.9c3.31 0 6-2.68 6-6V10.2c-.01 0 0 0 0 0V8.7z" fill="#FE2C55"/>
      </g>
      <g transform="translate(-0.6,-0.6)">
        <path d="M17.3 8.1c1.28.9 2.85 1.43 4.53 1.43V6.34a5.4 5.4 0 0 1-1.05-.12V8.7a8.6 8.6 0 0 1-4.53-1.43v6.62c0 3.31-2.68 6-6 6a5.97 5.97 0 0 1-3.35-1.02A5.99 5.99 0 0 0 11.3 22.3c3.31 0 6-2.68 6-6V9.63c-.01 0 0 0 0 0V8.1z" fill="#25F4EE"/>
      </g>
      <path d="M16.7 7.5c1.28.9 2.85 1.43 4.53 1.43V5.74a5.4 5.4 0 0 1-2.85-1.6 5.36 5.36 0 0 1-1.32-2.9h-3.03v16.02c0 1.42-1.15 2.57-2.57 2.57a2.57 2.57 0 0 1-2.57-2.57 2.57 2.57 0 0 1 2.57-2.57c.24 0 .47.03.69.1V11.8a5.6 5.6 0 0 0-.69-.04 5.6 5.6 0 0 0-5.6 5.6 5.6 5.6 0 0 0 5.6 5.6c3.09 0 5.6-2.51 5.6-5.6V9.03a8.6 8.6 0 0 0 4.53 1.43V7.5c-1.24 0-2.4-.4-3.34-1.08l-1.55 1.08z" fill="#000000"/>
    </svg>`
  }
]
onMounted(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
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
    { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
  )
  if (panelRef.value) observer.observe(panelRef.value)
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
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