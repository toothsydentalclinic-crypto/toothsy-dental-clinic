<template>
  <div class="min-h-screen flex flex-col bg-[#EFF8FC] text-stone-900">

    <header ref="headerRef" class="fixed top-0 inset-x-0 z-50">
      <div ref="scrimRef" class="absolute inset-0 bg-gradient-to-b  from-black/30 via-black/10 to-transparent pointer-events-none"></div>

      <div class="relative z-10 flex items-center justify-between px-4 py-1 md:px-8">

        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2 rounded-xl px-1 py-1.5">
          <img ref="logoRef" src="/companylogo.png" class="h-17 w-20" alt="Toothsy Dental Clinic logo">
        </NuxtLink>

        <!-- Mobile menu button -->
        <button @click="menuOpen = true" class="md:hidden flex flex-col gap-1" aria-label="Open menu">
        <span class="block w-6 h-1 transition-colors duration-300" :class="barColor"></span>
        <span class="block w-6 h-1 transition-colors duration-300" :class="barColor"></span>
        <span class="block w-6 h-1 transition-colors duration-300" :class="barColor"></span>
      </button>

        <!-- Desktop nav pill -->
        <nav ref="navRef" class="hidden md:flex relative items-center gap-1 bg-[#8FE3B8] rounded-full p-1.5 text-sm font-medium">
          <span class="nav-pill absolute top-1.5 bottom-1.5 left-0 rounded-full bg-[#111827]" :style="pillStyle"></span>

          <NuxtLink
            v-for="(link, i) in navLinks"
            :key="link.to"
            :ref="(el) => setLinkRef(el, i)"
            :to="link.to"
            class="relative z-10 px-5 py-2 rounded-full transition-colors duration-300"
            :class="isActive(link) ? 'text-white' : 'text-[#0d3b24] hover:text-[#036533]'"
          >{{ link.label }}</NuxtLink>
        </nav>

        <!-- Book Now (desktop only) -->
        <div class="hidden md:block">
          <NuxtLink
            to="book-appointment"
            rel="noopener noreferrer"
            class="relative z-10 ml-1 px-5 py-2 rounded-full bg-[#6BCE9F] text-white hover:bg-[#036533] transition-colors duration-300"
          >Book Now</NuxtLink>
        </div>
      </div>
    </header>

    <!-- Mobile backdrop -->
    <Transition name="fade">
      <div
        v-if="menuOpen"
        class="md:hidden fixed inset-0 z-[60] bg-stone-900/40"
        @click="menuOpen = false"
      ></div>
    </Transition>

    <!-- Mobile sidebar -->
    <Transition name="slide">
      <aside
        v-if="menuOpen"
        class="md:hidden fixed inset-y-0 left-0 z-[70] w-80 max-w-[85%] bg-white shadow-xl overflow-y-auto flex flex-col"
      >
        <div class="flex items-center justify-between px-2 border-b border-stone-100">
          <div class="flex justify-center items-center">
            <NuxtLink to="/" class="text-lg font-bold" @click="menuOpen = false">
              <img src="/companylogo.png" class="h-18.5 mb-2 mt-1 w-21" alt="Toothsy Dental Clinic logo">
            </NuxtLink>
          </div>
          <button @click="menuOpen = false" aria-label="Close menu" class="text-amber-500 px-2">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 6l12 12M18 6L6 18" stroke-linecap="round"/>
            </svg>
          </button>
        </div>

        <nav class="flex flex-col gap-5 px-5 py-6 text-xl text-[#036533] font-medium">
          <NuxtLink to="/" exact-active-class="text-amber-600 underline underline-offset-4" @click="menuOpen = false" class="hover:text-amber-600">Home</NuxtLink>
          <NuxtLink to="/service" active-class="text-amber-600 underline underline-offset-4" @click="menuOpen = false" class="hover:text-amber-600">Services</NuxtLink>
          <NuxtLink to="/blog" active-class="text-amber-600 underline underline-offset-4" @click="menuOpen = false" class="hover:text-amber-600">Blog</NuxtLink>
          <NuxtLink to="/about" active-class="text-amber-600 underline underline-offset-4" @click="menuOpen = false" class="hover:text-amber-600">About</NuxtLink>
          <NuxtLink to="/contact" active-class="text-amber-600 underline underline-offset-4" @click="menuOpen = false" class="hover:text-amber-600">Contact Us</NuxtLink>
        </nav>

        <div class="flex justify-center pb-6">
          <NuxtLink
            class="px-8 py-2 rounded-full bg-[#036533] text-white text-sm font-medium hover:bg-amber-300"
            to="/book-appointment"
            target="_blank"
            rel="noopener noreferrer"
            @click="menuOpen = false"
          >Book Now</NuxtLink>
        </div>

        <div class="mt-auto px-5 py-5 border-t border-stone-100">
          <p class="text-center text-[10px] text-stone-400 tracking-wide">Toothsy Dental Clinic</p>
        </div>
      </aside>
    </Transition>

    <main class="flex-1">
      <slot />
    </main>

    <footer class=" bg-gradient-to-br from-[#F8F6F2] via-[#F4F0DC] to-[#F8F6F2] py-12 md:py-4 px-4">
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <!-- Phone -->
          <div class="text-center md:text-left">
            <h4 class="font-display text-base md:text-lg font-bold text-[#354D24] mb-3 tracking-wide uppercase">
              Call Us
            </h4>
            <a
              href="tel:+85512345678"
              class="text-[#354D24] hover:text-[#1f9d63] transition-colors font-medium text-sm md:text-base"
            >
              +855 858 899 56
            </a>
          </div>

          <!-- Address -->
          <div class="text-center md:text-center">
            <h4 class="font-display text-base md:text-lg font-bold text-[#354D24] mb-3 tracking-wide uppercase">
              Visit Us
            </h4>
            <address class="not-italic text-[#354D24] text-sm md:text-base leading-relaxed">
              No.F02, street GS, Sangkat Prek leap, khan Chroy chongva, Phnom Penh, Cambodia.
            </address>
          </div>

          <!-- Opening Hours -->
          <div class="text-center md:text-right">
            <h4 class="font-display text-base md:text-lg font-bold text-[#354D24] mb-3 tracking-wide uppercase">
              Opening Hours
            </h4>
            <dl class="text-[#354D24] text-sm md:text-base space-y-1">
              <div class="flex justify-center md:justify-end gap-4">
                <dt class="font-medium">Mon – Sat</dt>
                <dd>9:00 Am – 7:00 PM</dd>
              </div>
              <div class="flex justify-center md:justify-end gap-4">
                <dt class="font-medium">Sunday</dt>
                <dd>9:00 Am – 4:00 PM</dd>
              </div>
            </dl>
          </div>
        </div>

        <!-- Copyright line -->
        <div class="mt-10 pt-6 border-t border-stone-300">
          <p class="text-center text-xs sm:text-sm text-[#354D24] font-medium tracking-wide">
            © {{ year }} Toothsy Dental Clinic — Your Smile, Our Priority
          </p>
        </div>
      </div>
    </footer>

  </div>
</template>

<script setup>
const route = useRoute()
const menuOpen = ref(false)
const year = new Date().getFullYear()
const scrolled = ref(false)

const barColor = computed(() => {
  if (menuOpen.value) return 'bg-white'
  return scrolled.value ? 'bg-black' : 'bg-white'
})

function handleScroll() {
  scrolled.value = window.scrollY > 50 // adjust threshold as needed
}

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
const navLinks = [
  { to: '/', label: 'Home', exact: true },
  { to: '/service', label: 'Services' },
  { to: '/blog', label: 'Dental Care' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' }
]

const navRef = ref(null)
const linkEls = ref([])
const pillStyle = ref({ width: '0px', transform: 'translateX(0px)', opacity: 0 })

function setLinkRef(el, i) {
  linkEls.value[i] = el?.$el ?? el ?? null
}

function isActive(link) {
  return link.exact ? route.path === link.to : route.path.startsWith(link.to)
}

function updatePill() {
  const i = navLinks.findIndex(isActive)
  const el = linkEls.value[i]
  if (!el) {
    pillStyle.value = { ...pillStyle.value, opacity: 0 }
    return
  }
  pillStyle.value = {
    width: `${el.offsetWidth}px`,
    transform: `translateX(${el.offsetLeft}px)`,
    opacity: 1
  }
}

let resizeObserver
onMounted(() => {
  nextTick(updatePill)
  resizeObserver = new ResizeObserver(updatePill)
  if (navRef.value) resizeObserver.observe(navRef.value)
})

onBeforeUnmount(() => resizeObserver?.disconnect())
watch(() => route.path, () => nextTick(updatePill))

/* ---------- Header scroll behavior ---------- */
const headerRef = ref(null)
const scrimRef = ref(null)
const logoRef = ref(null)

const SCROLL_THRESHOLD = 140
let progress = 0
let headerRafId = null
let prefersReducedMotion = false

function clamp(n, min, max) { return Math.min(max, Math.max(min, n)) }
function lerp(a, b, t) { return a + (b - a) * t }

function applyHeaderStyles(p) {
  if (headerRef.value) {
    headerRef.value.style.backgroundColor = `rgba(252, 251, 236, ${p})`
    headerRef.value.style.backdropFilter = `blur(${p * 10}px)`
    headerRef.value.style.WebkitBackdropFilter = `blur(${p * 10}px)`
    headerRef.value.style.boxShadow = `0 4px 24px rgba(0,0,0,${p * 0.08})`
  }
  if (scrimRef.value) {
    scrimRef.value.style.opacity = `${clamp(1 - p * 1.4, 0, 1)}`
  }
  if (logoRef.value) {
    const scale = lerp(1, 0.82, p)
    const lift = lerp(0, -3, p)
    logoRef.value.style.transform = `translateY(${lift}px) scale(${scale})`
  }
}

function headerTick() {
  const target = clamp(window.scrollY / SCROLL_THRESHOLD, 0, 1)
  progress = lerp(progress, target, 0.12)
  applyHeaderStyles(progress)
  headerRafId = requestAnimationFrame(headerTick)
}

onMounted(() => {
  prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReducedMotion) {
    applyHeaderStyles(window.scrollY > SCROLL_THRESHOLD / 2 ? 1 : 0)
    return
  }

  headerRafId = requestAnimationFrame(headerTick)
})

onBeforeUnmount(() => {
  if (headerRafId) cancelAnimationFrame(headerRafId)
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

.slide-enter-active, .slide-leave-active { transition: transform 0.3s ease; }
.slide-enter-from, .slide-leave-to { transform: translateX(-100%); }

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.nav-pill {
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1),
              width 0.35s cubic-bezier(0.4, 0, 0.2, 1),
              opacity 0.2s ease;
}

@media (prefers-reduced-motion: reduce) {
  .nav-pill { transition: none; }
}
</style>