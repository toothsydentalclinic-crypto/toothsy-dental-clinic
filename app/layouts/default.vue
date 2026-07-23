<template>
  <div class="min-h-screen flex flex-col bg-[#EFF8FC] text-stone-900">

    <header ref="headerRef" class="fixed top-0 inset-x-0 z-50">
      <div ref="scrimRef" class="absolute inset-0 bg-gradient-to-b  from-black/30 via-black/10 to-transparent pointer-events-none"></div>

      <div class="relative z-10 flex items-center justify-between px-4 py-1 md:px-8">

        <!-- Logo -->
        <NuxtLink to="/" class="md:order-1 flex items-center gap-2 rounded-xl px-1 py-1.5">
          <img ref="logoRef" src="/companylogo.png" class="h-17 w-20" alt="Toothsy Dental Clinic logo">
        </NuxtLink>

        <!-- Mobile menu button -->
        <button @click="menuOpen = true" class="md:hidden flex flex-col gap-1" aria-label="Open menu">
        <span class="block w-6 h-1 transition-colors duration-300" :class="barColor"></span>
        <span class="block w-6 h-1 transition-colors duration-300" :class="barColor"></span>
        <span class="block w-6 h-1 transition-colors duration-300" :class="barColor"></span>
      </button>

        <!-- Desktop nav pill -->
        <nav ref="navRef" class="hidden md:flex md:order-2 relative items-center gap-1 bg-[#8FE3B8] rounded-full p-1.5 text-sm font-medium">
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
        <div class="hidden md:block md:order-3">
          <NuxtLink
            to="book-appointment"
            rel="noopener noreferrer"
            class="btn-primary relative z-10 ml-1 px-5 py-2 rounded-full text-white transition-all duration-300"
          >Book Now</NuxtLink>
        </div>
      </div>
    </header>

    <!-- Mobile backdrop -->
    <Transition name="fade">
      <div
        v-if="menuOpen"
        class="md:hidden fixed inset-0 z-[60] bg-[#0b1f16]/45 backdrop-blur-[2px]"
        @click="menuOpen = false"
      ></div>
    </Transition>

    <!-- Mobile sidebar -->
    <Transition name="slide">
      <aside
        v-if="menuOpen"
        class="md:hidden fixed inset-y-0 left-0 z-[70] w-80 max-w-[85%] bg-[#EFF8FC] rounded-r-[2rem] shadow-[10px_0_50px_rgba(3,101,51,0.22)] overflow-y-auto overflow-x-hidden flex flex-col"
      >
        <!-- faint signature watermark, tucked in the corner — same motif as the About page -->
        <div aria-hidden="true" class="pointer-events-none select-none absolute -right-12 -top-6 w-[180px] opacity-[0.05] rotate-[8deg]">
          <svg viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M100,20 C70,20 45,45 45,80 C45,110 55,135 50,165 C47,185 60,205 75,195 C85,188 88,170 100,170 C112,170 115,188 125,195 C140,205 153,185 150,165 C145,135 155,110 155,80 C155,45 130,20 100,20 Z"
              stroke="#111827" stroke-width="3" stroke-linejoin="round"
            />
          </svg>
        </div>

        <div class="relative flex items-center justify-between px-5 py-4 border-b border-[#1f9d63]/12">
          <NuxtLink to="/" class="flex items-center" @click="menuOpen = false">
            <img src="/companylogo.png" class="h-14 w-auto" alt="Toothsy Dental Clinic logo">
          </NuxtLink>
          <button
            @click="menuOpen = false"
            aria-label="Close menu"
            class="w-9 h-9 rounded-full bg-[#dff0e0] text-[#036533] flex items-center justify-center transition-colors duration-200 hover:bg-[#6BCE9F] hover:text-white"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4">
              <path d="M6 6l12 12M18 6L6 18" stroke-linecap="round"/>
            </svg>
          </button>
        </div>

        <span class="relative mt-6 px-5 text-[0.68rem] font-bold tracking-[0.18em] uppercase text-[#1f9d63]">Menu</span>

        <nav class="mobile-nav-enter relative flex flex-col gap-1 px-3 mt-2 pb-6 font-display text-lg font-semibold">
          <NuxtLink
            to="/"
            exact-active-class="text-[#036533] bg-[#dff0e0]"
            @click="menuOpen = false"
            class="px-4 py-3 rounded-2xl transition-colors duration-200 hover:bg-[#dff0e0] hover:text-[#036533]"
          >Home</NuxtLink>
          <NuxtLink
            to="/service"
            active-class="text-[#036533] bg-[#dff0e0]"
            @click="menuOpen = false"
            class="px-4 py-3 rounded-2xl transition-colors duration-200 hover:bg-[#dff0e0] hover:text-[#036533]"
          >Services</NuxtLink>
          <NuxtLink
            to="/blog"
            active-class="text-[#036533] bg-[#dff0e0]"
            @click="menuOpen = false"
            class="px-4 py-3 rounded-2xl transition-colors duration-200 hover:bg-[#dff0e0] hover:text-[#036533]"
          >Blog</NuxtLink>
          <NuxtLink
            to="/about"
            active-class="text-[#036533] bg-[#dff0e0]"
            @click="menuOpen = false"
            class="px-4 py-3 rounded-2xl transition-colors duration-200 hover:bg-[#dff0e0] hover:text-[#036533]"
          >About</NuxtLink>
          <NuxtLink
            to="/contact"
            active-class="text-[#036533] bg-[#dff0e0]"
            @click="menuOpen = false"
            class="px-4 py-3 rounded-2xl transition-colors duration-200 hover:bg-[#dff0e0] hover:text-[#036533]"
          >Contact Us</NuxtLink>
        </nav>

        <div class="relative flex justify-center pb-6 mt-2">
          <NuxtLink
            class="btn-primary px-8 py-3 rounded-full text-white text-sm font-semibold transition-all duration-300"
            to="/book-appointment"
            target="_blank"
            rel="noopener noreferrer"
            @click="menuOpen = false"
          >Book Now</NuxtLink>
        </div>

        <div class="relative mt-auto px-5 py-5 border-t border-[#1f9d63]/12">
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

.slide-enter-active, .slide-leave-active { transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1); }
.slide-enter-from, .slide-leave-to { transform: translateX(-100%); }

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.nav-pill {
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1),
              width 0.35s cubic-bezier(0.4, 0, 0.2, 1),
              opacity 0.2s ease;
}

/* shared "cool" gradient button — same recipe as the About page, used for every Book Now CTA */
.btn-primary {
  background: linear-gradient(135deg, #6BCE9F 0%, #1f9d63 55%, #036533 100%);
  background-size: 180% 180%;
  background-position: 0% 50%;
  box-shadow: 0 10px 24px rgba(3, 101, 51, 0.22);
  transition: background-position 0.5s ease, transform 0.25s ease, box-shadow 0.3s ease;
}
.btn-primary:hover {
  background-position: 100% 50%;
  transform: translateY(-2px);
  box-shadow: 0 14px 32px rgba(3, 101, 51, 0.32);
}

/* mobile nav links fade/slide in, staggered, each time the drawer opens */
.mobile-nav-enter > * {
  opacity: 0;
  animation: navLinkIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
.mobile-nav-enter > *:nth-child(1) { animation-delay: 0.06s; }
.mobile-nav-enter > *:nth-child(2) { animation-delay: 0.11s; }
.mobile-nav-enter > *:nth-child(3) { animation-delay: 0.16s; }
.mobile-nav-enter > *:nth-child(4) { animation-delay: 0.21s; }
.mobile-nav-enter > *:nth-child(5) { animation-delay: 0.26s; }

@keyframes navLinkIn {
  from { opacity: 0; transform: translateX(-10px); }
  to   { opacity: 1; transform: translateX(0); }
}

@media (prefers-reduced-motion: reduce) {
  .nav-pill { transition: none; }
  .btn-primary { transition: none; }
  .btn-primary:hover { transform: none; }
  .mobile-nav-enter > * { animation: none; opacity: 1; transform: none; }
  .slide-enter-active, .slide-leave-active { transition: none; }
}
</style>