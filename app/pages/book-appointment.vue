<script setup>
import AppointmentForm from "~/components/AppointmentForm.vue";
import { useRoute } from 'vue-router'

definePageMeta({
  layout: "blank",
});

useSeoMeta({
  title: "Book Appointment",
  description: "Book your appointment with Toothsy Clinic.",
});

const route = useRoute()
const preselectedService = route.query.service || ''
</script>

<template>
  <main
    class="min-h-screen flex items-center justify-center px-3 py-10 bg-gradient-to-br from-[#F8F6F2] via-[#F4F0DC] to-[#F8F6F2]"
  >
    <div class="w-full max-w-7xl">
      <div class="grid lg:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-2xl">
        <!-- Left Side: brand panel, hidden on small screens to keep the form front and center -->
        <div class="hidden lg:flex flex-col relative overflow-hidden bg-[#1f9d63] text-white p-12">
          <!-- Soft decorative circle, purely visual -->
          <div class="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/5"></div>
          <div class="pointer-events-none absolute -bottom-32 -left-16 w-64 h-64 rounded-full bg-white/5"></div>

          <div class="relative flex items-center gap-4 mb-10">
            <div class="bg-white rounded-2xl p-2 shadow-lg shrink-0">
              <img
                src="/companylogo.png"
                alt="Toothsy Dental Clinic Logo"
                class="w-14 h-14 object-contain"
              />
            </div>

            <div>
              <span class="block text-white/70 text-xs font-semibold tracking-[0.2em] uppercase">
                Toothsy Dental Clinic
              </span>
              <p class="mt-1 text-lg font-medium leading-snug">
                Let Your Smile <span class="text-[#ffd94b]">Shine</span>
              </p>
            </div>
          </div>

          <h1 class="relative font-display text-5xl font-bold leading-tight">
            Book Your <br />
            Appointment
          </h1>

          <p class="relative mt-6 text-white/80 leading-8">
            Schedule your dental visit in just a few minutes.
            Our experienced dentists are ready to provide you with
            professional, comfortable, and personalized dental care.
          </p>

          <div class="relative mt-10 space-y-5">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <svg class="w-5 h-5 text-[#ffd94b]" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>Experienced Dental Specialists</span>
            </div>

            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <svg class="w-5 h-5 text-[#ffd94b]" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>Fast Appointment Confirmation</span>
            </div>

            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <svg class="w-5 h-5 text-[#ffd94b]" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>Modern Dental Equipment</span>
            </div>
          </div>
        </div>

        <!-- Right Side: the booking form itself -->
        <div class="p-8 lg:p-12">
          <NuxtLink
            to="/"
            class="inline-flex items-center gap-2 text-sm font-medium text-[#1f9d63] mb-6 hover:text-[#178a54] transition-colors"
          >
            ← Back to Home
          </NuxtLink>
          <AppointmentForm :preselected-service="preselectedService" />
        </div>
      </div>
    </div>
  </main>
</template>