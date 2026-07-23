<template>
  <div class="bg-[#EFF8FC]">
    <HeroSection
      eyebrow="Blog"
      title="Dental advice"
      highlight="made simple"
      description="Tips, explainers, and practical care notes from the Toothsy team."
      video-src="/video/hero-blog.mp4"
    />

    <section
      ref="sectionRef"
      class="relative py-20 px-6 md:px-10 transition-all duration-700 ease-out"
      :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
    >
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-10">
          <h2 class="font-display text-3xl md:text-4xl font-bold text-[#111827] inline-block relative">
From the Blog
          </h2>
          <p class="mt-4 text-stone-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed mt-5 text-stone-500 text-[0.95rem] leading-relaxed max-w-md">
            Expert dental tips, oral health guides, and practical advice to help you keep your smile healthy and confident.
          </p>
        </div>

        <div
          ref="trackRef"
          class="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 no-scrollbar"
          @scroll="updateArrows"
        >
          <BlogCarouselCard
            v-for="post in posts"
            :key="post.title + post.author"
            v-bind="post"
          />
        </div>

        <div class="flex justify-center gap-3 mt-8">
          <button
            @click="scrollByCard(-1)"
            :disabled="atStart"
            aria-label="Previous post"
            class="w-11 h-11 rounded-full bg-[#111827] text-white flex items-center justify-center transition-opacity duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#036533]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <button
            @click="scrollByCard(1)"
            :disabled="atEnd"
            aria-label="Next post"
            class="w-11 h-11 rounded-full bg-[#111827] text-white flex items-center justify-center transition-opacity duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#036533]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: 'Blog - Toothsy Dental Clinic',
  meta: [{ name: 'description', content: 'Dental care tips and explainers from Toothsy Dental Clinic.' }]
})

const posts = [
  {
    image: '/blog1.webp',
    category: 'Oral Care',
    author: '',
    title: 'How to Brush Your Teeth the Right Way',
    excerpt: 'Brushing for just two minutes with the proper technique can prevent cavities, reduce plaque, and keep your gums healthy.'
  },
  {
    image: '/blog2.webp',
    category: 'Dental Health',
    author: '',
    title: '7 Signs You Should Visit a Dentist',
    excerpt: 'Persistent tooth pain, bleeding gums, bad breath, or sensitivity may be signs that it is time for a professional dental checkup.'
  },
  {
    image: '/teeth-whitening.webp',
    category: 'Cosmetic Dentistry',
    author: '',
    title: 'Teeth Whitening: What Really Works?',
    excerpt: 'Learn the difference between professional whitening treatments, over-the-counter products, and common myths about whitening your teeth.'
  },
  {
    image: '/blog4.webp',
    category: 'Preventive Care',
    author: '',
    title: 'Why Regular Dental Checkups Matter',
    excerpt: 'Routine dental exams help detect problems early, prevent costly treatments, and keep your teeth and gums in excellent condition.'
  },
  {
    image: '/blog5.webp',
    category: 'Oral Hygiene',
    author: '',
    title: 'How to Prevent Cavities',
    excerpt: 'Simple daily habits like brushing, flossing, eating a balanced diet, and limiting sugary drinks can greatly reduce your risk of cavities.'
  },
  {
    image: '/blog6.webp',
    category: 'Pediatric Dentistry',
    author: '',
    title: 'Caring for Your Child is Teeth',
    excerpt: 'Discover when your child should first visit the dentist and how to build healthy oral hygiene habits from an early age.'
  }
]

const sectionRef = ref(null)
const trackRef = ref(null)
const visible = ref(false)
const atStart = ref(true)
const atEnd = ref(false)

let observer = null

function updateArrows() {
  const el = trackRef.value
  if (!el) return
  atStart.value = el.scrollLeft <= 4
  atEnd.value = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4
}

function scrollByCard(direction) {
  const el = trackRef.value
  if (!el) return
  const card = el.children[0]
  const gap = 20
  const amount = card ? card.offsetWidth + gap : el.clientWidth * 0.8
  el.scrollBy({ left: amount * direction, behavior: 'smooth' })
}

function onResize() {
  nextTick(updateArrows)
}

onMounted(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReducedMotion) {
    visible.value = true
  } else {
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          visible.value = true
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    )
    if (sectionRef.value) observer.observe(sectionRef.value)
  }

  nextTick(updateArrows)
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
  window.removeEventListener('resize', onResize)
})
</script>

<style scoped>
.no-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
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
