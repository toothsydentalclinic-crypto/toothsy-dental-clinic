<!-- components/ServiceDetailModal.vue -->
<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        @keydown.esc="close"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-[#111827]/50 backdrop-blur-sm"
          @click="close"
        ></div>

        <!-- Panel -->
        <Transition name="modal-scale" appear>
          <div
            v-if="open"
            class="relative w-full max-w-lg bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.25)] overflow-hidden max-h-[90vh] flex flex-col"
            role="dialog"
            aria-modal="true"
            :aria-labelledby="titleId"
          >
            <!-- Close button -->
            <button
              type="button"
              class="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-stone-100 flex items-center justify-center shadow-sm transition-colors"
              aria-label="Close"
              @click="close"
            >
              <svg class="w-4 h-4 text-stone-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>

            <!-- Scrollable content -->
            <div class="overflow-y-auto p-7 sm:p-8">
              <div class="flex items-start justify-between gap-4 mb-5">
              
            
              </div>

              <h2 :id="titleId" class="font-sans font-semibold text-xl text-[#111827] mb-2">
                {{ service?.title }}
              </h2>
              

              <p class="text-[0.95rem] text-stone-500 leading-relaxed mb-6">
                {{ service?.desc }}
              </p>

              <div v-if="service?.includes?.length" class="mb-6">
                <h3 class="text-xs font-semibold text-stone-400 uppercase tracking-wide mb-3">
                  What's included
                </h3>
                <ul class="flex flex-col gap-2.5">
                  <li
                    v-for="item in service.includes"
                    :key="item"
                    class="flex items-center gap-2.5 text-sm text-stone-600"
                  >
                    <span class="flex-shrink-0 w-5 h-5 rounded-full bg-[#8FE3B8] flex items-center justify-center">
                      <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6.5L4.5 9L10 3" stroke="#036533" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </span>
                    {{ item }}
                  </li>
                </ul>
              </div>

              <NuxtLink
                v-if="service?.link"
                @click.prevent="bookService"
                class="inline-flex items-center justify-center w-full gap-2 text-sm font-semibold text-white bg-[#1f9d63] hover:bg-[#187a4d] rounded-xl py-3 transition-colors cursor-pointer"
              >
                Book this service
              </NuxtLink>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { nextTick } from 'vue'

const props = defineProps({
  open: { type: Boolean, default: false },
  service: { type: Object, default: null }, // { title, desc, icon, price, includes, link }
  iconSize: { type: String, default: '56px' },
  iconInnerRatio: { type: Number, default: 50 }
})

const emit = defineEmits(['update:open', 'close'])

const router = useRouter()

const titleId = `service-modal-title-${Math.random().toString(36).slice(2, 9)}`

function close() {
  emit('update:open', false)
  emit('close')
}

function bookService() {
  if (!props.service?.title) return
  // Close modal first, then navigate with service pre-selected
  close()
  nextTick(() => {
    router.push({ path: '/book-appointment', query: { service: props.service.title } })
  })
}

// lock body scroll while open
watch(
  () => props.open,
  (val) => {
    if (import.meta.client) {
      document.body.style.overflow = val ? 'hidden' : ''
    }
  }
)

onBeforeUnmount(() => {
  if (import.meta.client) document.body.style.overflow = ''
})
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-scale-enter-active {
  transition: opacity 0.25s ease, transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
.modal-scale-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.modal-scale-enter-from,
.modal-scale-leave-to {
  opacity: 0;
  transform: scale(0.96) translateY(8px);
}
</style>