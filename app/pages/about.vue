<template>
  <div class="relative isolate overflow-x-hidden bg-[#EFF8FC]">

    <HeroSection eyebrow="About Toothsy" title="Healthy Smiles" highlight="Begin Here"
      description="Comfortable, high-quality dental care delivered with precision and compassion." />

    <!-- ════════════════════════════════════════════════════
      ABOUT CONTENT
    ════════════════════════════════════════════════════ -->
    <section class="min-h-screen py-10 px-4 relative z-10">
      <div class="max-w-7xl mx-auto">

        <!-- Page Title --> 
        <div class="text-center mb-12">
          <h2 class="font-display text-3xl md:text-4xl font-bold text-[#111827] inline-block relative">
            About Us
          </h2>
          <p class="mt-4 text-stone-500 text-[0.95rem] leading-relaxed max-w-md mx-auto">
            We believe visiting the dentist should feel comfortable, transparent, and stress-free. Every treatment is carefully planned to protect your oral health and create lasting results.
          </p>
        </div>

        <!-- Mission Section -->
        <div ref="missionRef" class="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16 items-start">

          <!-- Text: slides from left -->
          <div class="section-reveal-left" :class="missionVisible ? 'is-visible' : ''">
            <h2 class="font-display text-2xl md:text-3xl font-bold text-[#111827] inline-block relative">Our Mission</h2>
            <p class="mt-4 text-stone-500 text-[0.95rem] leading-relaxed">
              To make every dental visit comfortable, honest, and stress-free by providing modern, gentle care that puts people first.
            </p>
            <h3 class="font-display text-xl md:text-2xl mt-5 font-bold text-[#111827] inline-block relative">
              Our core values 
            </h3>
            <p class="mt-4 text-stone-500 text-[0.95rem] leading-relaxed">
              We treat every patient with kindness and respect.
            </p>
            <p class=" text-stone-500 text-[0.95rem] leading-relaxed">
              We provide high-quality dentistry using modern techniques and materials.
            </p>
            <p class=" text-stone-500 text-[0.95rem] leading-relaxed">
              We recommend only the treatments our patients truly need.
            </p>   
            <p class=" text-stone-500 text-[0.95rem] leading-relaxed">
              We create a calm environment where patients feel safe and confident.
            </p>    
          </div>

          <!-- Image: slides from right -->
          <div class="rounded-2xl overflow-hidden h-64 md:h-100 group relative section-reveal-right"
            :class="missionVisible ? 'is-visible' : ''">
            <img :src="clinic" alt="Dentist at work"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />

            <div class="absolute inset-0 -translate-x-full group-hover:translate-x-full
           transition-transform duration-700 bg-gradient-to-r
           from-transparent via-white/30 to-transparent skew-x-12" />
          </div>
        </div>

        <div ref="specialistsRef" class="item-center text-center -mx-2 px-2 md:px-5 py-10 mb-4 fade-up-reveal"
          :class="specialistsVisible ? 'is-visible' : ''">
          <h2 class="font-display text-3xl md:text-4xl font-bold text-[#111827] inline-block relative">Meet Our Specialists</h2>
          <p class="mt-4 text-stone-500 text-[0.95rem] leading-relaxed max-w-md mx-auto">
            We use only the best quality materials on the market in<br />
            order to provide the best products to our patients.
          </p>

          <div class="max-w-6xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <article v-for="(doctor, i) in doctors" :key="doctor.name" :ref="(el) => setDoctorRef(el, i)"
              class="bg-white rounded-2xl overflow-hidden card-reveal hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(0,0,0,0.09)]"
              :class="doctorVisible[i] ? 'is-visible' : ''"
              :style="{ transitionDelay: doctorVisible[i] ? `${i * 100}ms` : '0ms' }">
              <div class="w-full overflow-hidden" :style="{ height: '168px' }">
                <img :src="doctor.photo" :alt="doctor.name"
                  class="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" />
              </div>
              <div class="p-6">
                <h3 class="font-display text-base font-bold text-[#064e35] uppercase tracking-[0.03em] leading-tight mb-1.5">{{ doctor.name }}</h3>
                <span class="inline-block text-xs font-medium text-[#3d8f74] bg-[#5bbfa0]/10 px-2.5 py-1 rounded-full mt-1.5 mb-2">
                  {{ doctor.specialty }}
                </span>
                <p class="text-[0.83rem] text-stone-500 leading-relaxed">
                  {{ doctor.bio }}
                </p>
              </div>
            </article>
          </div>
        </div>

        <!-- CTA + Video -->
        <div ref="ctaRef" class="text-center py-16 cta-reveal" :class="ctaVisible ? 'is-visible' : ''">
          <h2 class="font-display text-3xl md:text-4xl font-bold text-[#111827] inline-block relative">
            We're Welcoming New Patients<br />And Can't Wait To Meet You.
          </h2>
          <p class="mt-4 text-stone-500 text-[0.95rem] leading-relaxed max-w-md mx-auto">
            Book a consultation and let's start with a conversation about your smile.
          </p>

          <a href="book-appointment" class="mt-6 inline-flex items-center gap-2 bg-[#5bbfa0] hover:bg-[#4da88f] text-white text-sm font-semibold px-6 py-3 rounded-full transition-colors">
            Book an appointment
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>

          <div class="mt-8 rounded-xl overflow-hidden h-60 md:h-[480px] relative">
            <Swiper
              :modules="[Autoplay]"
              :slides-per-view="1"
              :loop="true"
              :autoplay="{
                delay: 3000,
                disableOnInteraction: false
              }"
              :speed="1000"
              class="w-full h-full"
            >
              <SwiperSlide><img :src="img1" class="w-full h-full object-cover" /></SwiperSlide>
              <SwiperSlide><img :src="img2" class="w-full h-full object-cover" /></SwiperSlide>
              <SwiperSlide><img :src="img3" class="w-full h-full object-cover" /></SwiperSlide>
              <SwiperSlide><img :src="img4" class="w-full h-full object-cover" /></SwiperSlide>
              <SwiperSlide><img :src="img5" class="w-full h-full object-cover" /></SwiperSlide>
              <SwiperSlide><img :src="img6" class="w-full h-full object-cover" /></SwiperSlide>
            </Swiper>
          </div>
        </div>

      </div>
    </section>

  </div>
</template>


<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

import clinic from '@/assets/images/clinic.png'
import img1 from '@/assets/images/img1.png'
import img2 from '@/assets/images/img2.jpg'
import img3 from '@/assets/images/img3.jpg'
import img4 from '@/assets/images/img4.jpg'
import img5 from '@/assets/images/img5.jpg'
import img6 from '@/assets/images/img6.jpg'

useHead({
  title: 'About - Toothsy Dental Clinic',
  meta: [{ name: 'description', content: 'Learn about Toothsy Dental Clinic, our mission, specialists, and services.' }]
})

const doctors = [
  {
    name: 'Dr. Sornn Ritheanin',
    specialty: 'General Dentist',
    photo: img1,
    bio: 'Dr. Brent provides general and cosmetic dentistry services at Toothsy Dental Clinic, He has extensive experience in general and cosmetic dentistry. '
  },
  {
    name: 'Dr. Chheng Mesa',
    specialty: 'Specialist Orthodontic',
    photo: img2,
    bio: 'Dr. Ashish J. Vashi has been practicing general, cosmetic and implant dentistry for over 18 years.'
  },
  {
    name: 'Dr. Sornn Rithornu',
    specialty: 'Prosthodontics',
    photo: img3,
    bio: 'When it comes to oral surgeons, few can compare to Dr. James Connors.'
  },
]

// ═══════════════════════════════════════════════════════════════
//  SCROLL REVEAL — one IntersectionObserver, plain refs/flags.
//  Replaces the old blob/watermark/RAF-loop parallax system.
// ═══════════════════════════════════════════════════════════════
const missionRef = ref(null)
const specialistsRef = ref(null)
const ctaRef = ref(null)

const doctorEls = ref([])
function setDoctorRef(el, i) { doctorEls.value[i] = el }

const missionVisible = ref(false)
const specialistsVisible = ref(false)
const ctaVisible = ref(false)
const doctorVisible = reactive(doctors.map(() => false))

let observer = null

onMounted(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const targets = [
    { el: missionRef.value, cb: () => (missionVisible.value = true) },
    { el: specialistsRef.value, cb: () => (specialistsVisible.value = true) },
    { el: ctaRef.value, cb: () => (ctaVisible.value = true) },
    ...doctorEls.value.filter(Boolean).map((el, i) => ({ el, cb: () => (doctorVisible[i] = true) })),
  ].filter(t => t.el)

  if (reduceMotion) {
    targets.forEach(t => t.cb())
    return
  }

  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return
      const match = targets.find(t => t.el === entry.target)
      if (match) { match.cb(); observer.unobserve(entry.target) }
    })
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' })

  targets.forEach(t => observer.observe(t.el))
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})
</script>


<style scoped>
/* ── Mission: text ← left, image → right ─────────────────── */
.section-reveal-left {
  opacity: 0;
  filter: blur(5px);
  transform: translateX(-36px) translateY(14px);
  transition: opacity .9s cubic-bezier(.22, 1, .36, 1),
    transform .9s cubic-bezier(.22, 1, .36, 1),
    filter .7s cubic-bezier(.22, 1, .36, 1);
}

.section-reveal-left.is-visible {
  opacity: 1;
  transform: none;
  filter: blur(0);
}

.section-reveal-right {
  opacity: 0;
  filter: blur(5px);
  transform: translateX(36px) translateY(14px);
  transition: opacity .9s .13s cubic-bezier(.22, 1, .36, 1),
    transform .9s .13s cubic-bezier(.22, 1, .36, 1),
    filter .7s .13s cubic-bezier(.22, 1, .36, 1);
}

.section-reveal-right.is-visible {
  opacity: 1;
  transform: none;
  filter: blur(0);
}

/* ── Specialists: pure fade-up ─────────────────────────────── */
.fade-up-reveal {
  opacity: 0;
  filter: blur(4px);
  transform: translateY(28px);
  transition: opacity .8s cubic-bezier(.22, 1, .36, 1),
    transform .8s cubic-bezier(.22, 1, .36, 1),
    filter .65s cubic-bezier(.22, 1, .36, 1);
}

.fade-up-reveal.is-visible {
  opacity: 1;
  transform: none;
  filter: blur(0);
}

/* ── Doctor cards: staggered slide-up + shadow hover ───────── */
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

/* ── CTA: most dramatic scale + fade ─────────────────────── */
.cta-reveal {
  opacity: 0;
  filter: blur(5px);
  transform: translateY(40px) scale(0.97);
  transition: opacity .9s cubic-bezier(.22, 1, .36, 1),
    transform .9s cubic-bezier(.22, 1, .36, 1),
    filter .75s cubic-bezier(.22, 1, .36, 1);
}

.cta-reveal.is-visible {
  opacity: 1;
  transform: none;
  filter: blur(0);
}

/* ── Reduced-motion: everything instant ───────────────────── */
@media (prefers-reduced-motion: reduce) {

  .section-reveal-left,
  .section-reveal-right,
  .fade-up-reveal,
  .doctor-reveal,
  .cta-reveal {
    opacity: 1 !important;
    transform: none !important;
    filter: none !important;
    transition: none !important;
  }
}

@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

.body-font {
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
}

.font-display {
  font-family: 'Fraunces', serif;
  font-optical-sizing: auto;
}
</style>