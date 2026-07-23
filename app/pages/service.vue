<!-- pages/service.vue -->
<template>
  <div class="bg-[#EFF8FC]">
    <HeroSection
      eyebrow="Services"
      title="Dental services"
      highlight="for every smile"
      description="Providing gentle, modern dental care for patients of all ages."
    />

    <section ref="sectionRef" class="py-20 px-6">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="font-display text-3xl md:text-4xl font-bold text-[#111827] inline-block relative">
            Our Services
          </h2>
          <p class="mt-4 text-stone-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed mt-5 text-stone-500 text-[0.95rem] leading-relaxed max-w-md">
            Choose the care you need, then book a visit so we can recommend the right next step.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ServiceCard
            v-for="(service, i) in paginatedServices"
            :key="service.link"
            :title="service.title"
            :desc="service.desc"
            :link="service.link"
            :image="service.image"
            :index="i"
            @open-detail="openModal(service)"
          />
        </div>

        <Pagination
          v-if="totalPages > 1"
          v-model="currentPage"
          :total-pages="totalPages"
        />
      </div>
    </section>

    <!-- Modal -->
    <ServiceDetailModal
      v-model:open="modalOpen"
      :service="activeService"
    />
  </div>
</template>

<script setup>
import { services } from '~/composables/useServices'
import ServiceDetailModal from '~/components/ServiceDetailModal.vue'

useHead({
  title: 'Services - Toothsy Dental Clinic',
  meta: [{ name: 'description', content: 'Explore our full range of gentle, modern dental services.' }]
})

const modalOpen = ref(false)
const activeService = ref(null)

function openModal(service) {
  activeService.value = service
  modalOpen.value = true
}

// Pagination
const pageSize = 6
const currentPage = ref(1)
const sectionRef = ref(null)

const totalPages = computed(() => Math.ceil(services.length / pageSize))

const paginatedServices = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return services.slice(start, start + pageSize)
})

watch(currentPage, () => {
  sectionRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
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