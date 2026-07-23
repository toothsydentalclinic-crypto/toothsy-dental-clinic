<script setup>
import { reactive, ref, computed, onMounted, onBeforeUnmount, watch } from "vue";
import emailjs from "@emailjs/browser";
import { serviceTitles } from '~/composables/useServices'

const config = useRuntimeConfig();

const props = defineProps({
  preselectedService: {
    type: String,
    default: ''
  }
})

const form = reactive({
  name: "",
  email: "",
  phone: "",
  date: "",
  time: "",
  service: "",
  message: "",
  // Honeypot field - hidden from users, filled by bots
  website: "",
});

const popup = reactive({
  show: false,
  type: "success",
});

const isSubmitting = ref(false);
const errors = reactive({});

// Service options from shared composable
const serviceOptions = serviceTitles

// Auto-select service from query param when component mounts,
// and keep it in sync if the prop changes without a full reload
onMounted(() => {
  if (props.preselectedService && serviceOptions.includes(props.preselectedService)) {
    form.service = props.preselectedService
  }
})

watch(() => props.preselectedService, (newVal) => {
  if (newVal && serviceOptions.includes(newVal)) {
    form.service = newVal
  }
})

// `errors` is a reactive OBJECT, not a ref, so `errors.value = {}` silently
// creates a stray "value" key instead of clearing anything. This helper
// actually empties it out.
const clearErrors = () => {
  Object.keys(errors).forEach((key) => delete errors[key]);
};

const validateForm = () => {
  clearErrors();
  let isValid = true;

  if (!form.name.trim()) {
    errors.name = "Full name is required";
    isValid = false;
  }

  if (!form.email.trim()) {
    errors.email = "Email is required";
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Please enter a valid email address";
    isValid = false;
  }

  if (!form.phone.trim()) {
    errors.phone = "Phone number is required";
    isValid = false;
  } else if (!/^[\d\s\-\+\(\)]{8,}$/.test(form.phone)) {
    errors.phone = "Please enter a valid phone number";
    isValid = false;
  }

  if (!form.date) {
    errors.date = "Preferred date is required";
    isValid = false;
  } else {
    const selectedDate = new Date(form.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      errors.date = "Please select a future date";
      isValid = false;
    }
  }

  if (!form.time) {
    errors.time = "Preferred time is required";
    isValid = false;
  }

  if (!form.service) {
    errors.service = "Please select a service";
    isValid = false;
  }

  // Honeypot check - if filled, likely a bot. Fail silently, no error shown.
  if (form.website) {
    console.warn("Honeypot triggered");
    return false;
  }

  return isValid;
};

const sendEmail = async () => {
  if (!validateForm()) return;

  isSubmitting.value = true;

  try {
    await emailjs.send(
      config.public.emailjsServiceId,
      config.public.emailjsTemplateId,
      {
        name: form.name,
        email: form.email,
        phone: form.phone,
        date: form.date,
        time: form.time,
        service: form.service,
        message: form.message,
      },
      config.public.emailjsPublicKey
    );

    popup.type = "success";
    popup.show = true;

    Object.assign(form, {
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      service: "",
      message: "",
      website: "",
    });
    clearErrors();
  } catch (error) {
    console.error(error);
    popup.type = "error";
    popup.show = true;
  } finally {
    isSubmitting.value = false;
  }
};

const closePopup = () => {
  popup.show = false;
};

// Shared "today at midnight" reference the calendar uses to grey out past
// days and highlight today. (validateForm below computes its own fresh
// version at submit time, which matters more - this one is just for display.)
const startOfToday = new Date();
startOfToday.setHours(0, 0, 0, 0);

// --- Custom date picker (replaces the native <input type="date">) ---
// A button that opens a small calendar dropdown. Past days are rendered
// disabled and unclickable, so there's no way to pick one in the first
// place (rather than allowing it and only catching it on submit).
const showDateDropdown = ref(false);
const dateSelectRef = ref(null); // wraps the toggle button + panel, used for click-outside detection

// Which month the calendar is currently displaying - defaults to this month
const viewYear = ref(startOfToday.getFullYear());
const viewMonth = ref(startOfToday.getMonth()); // 0-indexed (0 = January)

const monthLabel = computed(() =>
  new Date(viewYear.value, viewMonth.value, 1).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  })
);

// Can't navigate to a month before the current one - nothing bookable there
const isViewingCurrentMonth = computed(
  () => viewYear.value === startOfToday.getFullYear() && viewMonth.value === startOfToday.getMonth()
);

function prevMonth() {
  if (isViewingCurrentMonth.value) return;
  if (viewMonth.value === 0) {
    viewMonth.value = 11;
    viewYear.value -= 1;
  } else {
    viewMonth.value -= 1;
  }
}

function nextMonth() {
  if (viewMonth.value === 11) {
    viewMonth.value = 0;
    viewYear.value += 1;
  } else {
    viewMonth.value += 1;
  }
}

// Builds the grid for the currently viewed month: `null` for the leading
// blank cells (so day 1 lines up under the right weekday), then one entry
// per day with the info the template needs to style/disable it.
const calendarDays = computed(() => {
  const firstOfMonth = new Date(viewYear.value, viewMonth.value, 1);
  const leadingBlanks = firstOfMonth.getDay(); // 0 = Sunday
  const daysInMonth = new Date(viewYear.value, viewMonth.value + 1, 0).getDate();

  const cells = Array(leadingBlanks).fill(null);

  for (let d = 1; d <= daysInMonth; d++) {
    const dateObj = new Date(viewYear.value, viewMonth.value, d);
    cells.push({
      day: d,
      value: `${viewYear.value}-${String(viewMonth.value + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`,
      isPast: dateObj < startOfToday,
      isToday: dateObj.getTime() === startOfToday.getTime(),
    });
  }

  return cells;
});

function toggleDateDropdown() {
  const next = !showDateDropdown.value;
  showDateDropdown.value = next;
  if (next) showTimeDropdown.value = false; // only one dropdown open at a time
}

function selectDate(cell) {
  if (!cell || cell.isPast) return;
  form.date = cell.value;
  errors.date = "";
  showDateDropdown.value = false;
}

// Text shown on the toggle button itself
const selectedDateLabel = computed(() => {
  if (!form.date) return "Select Date";
  const [year, month, day] = form.date.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
});

// --- Dynamic time slots based on clinic hours ---
// Mon-Sat: 9:00 AM - 7:00 PM | Sunday: 9:00 AM - 4:00 PM
// Lunch break (no bookable slots) 11:00 AM - 1:00 PM every day.

// Builds {value, label} slots in 30-min steps between two times.
// startMinutes/endMinutes are minutes-since-midnight; end is EXCLUSIVE,
// so the last slot generated always starts 30 min before endMinutes
// (e.g. a 19:00 close produces a last slot of 18:30).
function generateSlots(startMinutes, endMinutes) {
  const slots = [];
  for (let mins = startMinutes; mins < endMinutes; mins += 30) {
    const h24 = Math.floor(mins / 60);
    const m = mins % 60;
    const value = `${String(h24).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
    const period = h24 < 12 ? "AM" : "PM";
    const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
    const label = `${h12}:${String(m).padStart(2, "0")} ${period}`;
    slots.push({ value, label });
  }
  return slots;
}

// Recomputes Morning/Afternoon slot groups whenever the picked date changes.
const timeSlots = computed(() => {
  if (!form.date) return { morning: [], afternoon: [] };

  // Parse "YYYY-MM-DD" into local date parts manually. Using
  // `new Date(form.date)` directly parses it as UTC midnight, which can
  // roll the day forward/backward depending on the visitor's timezone
  // offset - this keeps the day-of-week check accurate everywhere.
  const [year, month, day] = form.date.split("-").map(Number);
  const selected = new Date(year, month - 1, day);
  const isSunday = selected.getDay() === 0; // 0 = Sunday

  const closingMinutes = (isSunday ? 16 : 19) * 60; // 4 PM Sunday, 7 PM Mon-Sat

  return {
    morning: generateSlots(9 * 60, 11 * 60 + 30), // 9:00 - 11:00 AM
    afternoon: generateSlots(13 * 60, closingMinutes), // 1:00 PM - closing
  };
});

// If a previously picked time is no longer valid for the newly picked date
// (e.g. they had 6:30 PM selected then switched to a Sunday), clear it so
// they don't accidentally submit a time the clinic isn't open for.
watch(
  () => form.date,
  () => {
    const stillValid = [...timeSlots.value.morning, ...timeSlots.value.afternoon].some(
      (slot) => slot.value === form.time
    );
    if (!stillValid) form.time = "";
    showTimeDropdown.value = false;
  }
);

// --- Custom time picker (replaces the long scrolling native <select>) ---
// A button that toggles a small dropdown panel showing Morning/Afternoon
// slots as a button grid instead of one long vertical list, so there's much
// less scrolling to find a slot.
const showTimeDropdown = ref(false);
const timeSelectRef = ref(null); // wraps the toggle button + panel, used for click-outside detection

function toggleTimeDropdown() {
  const next = !showTimeDropdown.value;
  showTimeDropdown.value = next;
  if (next) showDateDropdown.value = false; // only one dropdown open at a time
}

function selectTime(value) {
  form.time = value;
  errors.time = "";
  showTimeDropdown.value = false;
}

// Text shown on the toggle button itself
const selectedTimeLabel = computed(() => {
  if (!form.date) return "Select a date first";
  if (!form.time) return "Select Time";
  const all = [...timeSlots.value.morning, ...timeSlots.value.afternoon];
  const match = all.find((slot) => slot.value === form.time);
  return match ? match.label : "Select Time";
});

// Closes whichever dropdown (date or time) is open when a click lands
// outside both of them
function handleClickOutside(event) {
  if (dateSelectRef.value && !dateSelectRef.value.contains(event.target)) {
    showDateDropdown.value = false;
  }
  if (timeSelectRef.value && !timeSelectRef.value.contains(event.target)) {
    showTimeDropdown.value = false;
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div class="w-full max-w-xl">
    <h2 class="font-display text-2xl font-bold text-gray-900">Book Appointment</h2>
    <p class="mt-1 mb-6 text-sm text-gray-500">Fields marked <span class="text-red-400">*</span> are required.</p>

    <form @submit.prevent="sendEmail" class="space-y-5" novalidate>
      <!-- Full Name -->
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700 mb-1.5">
          Full Name <span class="text-red-400">*</span>
        </label>
        <div class="relative">
          <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </span>
          <input
            id="name"
            v-model="form.name"
            type="text"
            placeholder="e.g. Sok Dara"
            class="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3.5 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1f9d63]/25 focus:border-[#1f9d63] transition-all"
            :class="{ 'border-red-400 focus:ring-red-100 focus:border-red-400': errors.name }"
            required
            autocomplete="name"
            inputmode="text"
            :aria-invalid="!!errors.name"
            :aria-describedby="errors.name ? 'name-error' : undefined"
            @input="errors.name = ''"
          />
        </div>
        <p v-if="errors.name" id="name-error" class="mt-1.5 flex items-center gap-1 text-sm text-red-500" role="alert">
          <svg class="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fill-rule="evenodd" d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zm-7-4a1 1 0 10-2 0v4a1 1 0 102 0V6zm-1 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
          </svg>
          {{ errors.name }}
        </p>
      </div>

      <!-- Email + Phone side by side on larger screens -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1.5">
            Email <span class="text-red-400">*</span>
          </label>
          <div class="relative">
            <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </span>
            <input
              id="email"
              v-model="form.email"
              type="email"
              placeholder="you@example.com"
              class="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3.5 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1f9d63]/25 focus:border-[#1f9d63] transition-all"
              :class="{ 'border-red-400 focus:ring-red-100 focus:border-red-400': errors.email }"
              required
              autocomplete="email"
              inputmode="email"
              :aria-invalid="!!errors.email"
              :aria-describedby="errors.email ? 'email-error' : undefined"
              @input="errors.email = ''"
            />
          </div>
          <p v-if="errors.email" id="email-error" class="mt-1.5 flex items-center gap-1 text-sm text-red-500" role="alert">
            <svg class="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fill-rule="evenodd" d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zm-7-4a1 1 0 10-2 0v4a1 1 0 102 0V6zm-1 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
            </svg>
            {{ errors.email }}
          </p>
        </div>

        <div>
          <label for="phone" class="block text-sm font-medium text-gray-700 mb-1.5">
            Phone Number <span class="text-red-400">*</span>
          </label>
          <div class="relative">
            <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </span>
            <input
              id="phone"
              v-model="form.phone"
              type="tel"
              placeholder="+855 12 345 678"
              class="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3.5 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1f9d63]/25 focus:border-[#1f9d63] transition-all"
              :class="{ 'border-red-400 focus:ring-red-100 focus:border-red-400': errors.phone }"
              required
              autocomplete="tel"
              inputmode="tel"
              :aria-invalid="!!errors.phone"
              :aria-describedby="errors.phone ? 'phone-error' : undefined"
              @input="errors.phone = ''"
            />
          </div>
          <p v-if="errors.phone" id="phone-error" class="mt-1.5 flex items-center gap-1 text-sm text-red-500" role="alert">
            <svg class="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fill-rule="evenodd" d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zm-7-4a1 1 0 10-2 0v4a1 1 0 102 0V6zm-1 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
            </svg>
            {{ errors.phone }}
          </p>
        </div>
      </div>

      <!-- Date + Time side by side on larger screens -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div ref="dateSelectRef">
          <label for="date" class="block text-sm font-medium text-gray-700 mb-1.5">
            Preferred Date <span class="text-red-400">*</span>
          </label>
          <div class="relative">
            <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 z-10">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </span>
            <!-- Toggle button stands in for the old native <input type="date"> -->
            <button
              id="date"
              type="button"
              @click="toggleDateDropdown"
              class="w-full flex items-center justify-between border border-gray-300 rounded-xl pl-12 pr-4 py-3.5 text-base text-left focus:outline-none focus:ring-2 focus:ring-[#1f9d63]/25 focus:border-[#1f9d63] transition-all bg-white"
              :class="{ 'border-red-400 focus:ring-red-100 focus:border-red-400': errors.date }"
              :aria-invalid="!!errors.date"
              :aria-describedby="errors.date ? 'date-error' : undefined"
              aria-haspopup="dialog"
              :aria-expanded="showDateDropdown"
            >
              <span :class="form.date ? 'text-gray-900' : 'text-gray-400'">{{ selectedDateLabel }}</span>
              <svg
                class="w-4 h-4 text-gray-400 flex-shrink-0 transition-transform"
                :class="{ 'rotate-180': showDateDropdown }"
                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true"
              >
                <polyline points="6,9 12,15 18,9" />
              </svg>
            </button>

            <!-- Calendar dropdown: past days are rendered disabled so they
                 simply can't be clicked, rather than being pickable and
                 only caught afterwards -->
            <div
              v-if="showDateDropdown"
              class="absolute z-20 mt-2 w-72 max-w-[90vw] bg-white border border-gray-200 rounded-xl shadow-lg p-4"
            >
              <div class="flex items-center justify-between mb-3">
                <button
                  type="button"
                  @click="prevMonth"
                  :disabled="isViewingCurrentMonth"
                  class="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                  aria-label="Previous month"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                    <polyline points="15,18 9,12 15,6" />
                  </svg>
                </button>
                <p class="text-sm font-semibold text-gray-800">{{ monthLabel }}</p>
                <button
                  type="button"
                  @click="nextMonth"
                  class="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100"
                  aria-label="Next month"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                    <polyline points="9,18 15,12 9,6" />
                  </svg>
                </button>
              </div>

              <div class="grid grid-cols-7 gap-1 mb-1">
                <span v-for="d in ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']" :key="d" class="text-[11px] font-medium text-gray-400 text-center py-1">
                  {{ d }}
                </span>
              </div>

              <div class="grid grid-cols-7 gap-1">
                <template v-for="(cell, idx) in calendarDays" :key="idx">
                  <span v-if="!cell"></span>
                  <button
                    v-else
                    type="button"
                    :disabled="cell.isPast"
                    @click="selectDate(cell)"
                    class="text-sm py-2 rounded-lg transition-colors"
                    :class="[
                      cell.isPast ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-[#e6faf6] cursor-pointer',
                      form.date === cell.value ? 'bg-[#1f9d63] text-white hover:bg-[#1f9d63]' : '',
                      cell.isToday && form.date !== cell.value ? 'ring-1 ring-[#1f9d63] ring-inset' : '',
                    ]"
                  >
                    {{ cell.day }}
                  </button>
                </template>
              </div>

              <p class="mt-3 pt-3 border-t border-gray-100 text-[11px] text-gray-400 text-center">
                Open Mon–Sat 9AM–7PM · Sun 9AM–4PM
              </p>
            </div>
          </div>
          <p v-if="errors.date" id="date-error" class="mt-1.5 flex items-center gap-1 text-sm text-red-500" role="alert">
            <svg class="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fill-rule="evenodd" d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zm-7-4a1 1 0 10-2 0v4a1 1 0 102 0V6zm-1 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
            </svg>
            {{ errors.date }}
          </p>
        </div>

        <div ref="timeSelectRef">
          <label for="time" class="block text-sm font-medium text-gray-700 mb-1.5">
            Preferred Time <span class="text-red-400">*</span>
          </label>
          <div class="relative">
            <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 z-10">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12,6 12,12 16,14" />
              </svg>
            </span>
            <!-- Toggle button stands in for the old native <select> -->
            <button
              id="time"
              type="button"
              :disabled="!form.date"
              @click="toggleTimeDropdown"
              class="w-full flex items-center justify-between border border-gray-300 rounded-xl pl-12 pr-4 py-3.5 text-base text-left focus:outline-none focus:ring-2 focus:ring-[#1f9d63]/25 focus:border-[#1f9d63] transition-all bg-white disabled:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-70"
              :class="{ 'border-red-400 focus:ring-red-100 focus:border-red-400': errors.time }"
              :aria-invalid="!!errors.time"
              :aria-describedby="errors.time ? 'time-error' : undefined"
              aria-haspopup="listbox"
              :aria-expanded="showTimeDropdown"
            >
              <span :class="form.time ? 'text-gray-900' : 'text-gray-400'">{{ selectedTimeLabel }}</span>
              <svg
                class="w-4 h-4 text-gray-400 flex-shrink-0 transition-transform"
                :class="{ 'rotate-180': showTimeDropdown }"
                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true"
              >
                <polyline points="6,9 12,15 18,9" />
              </svg>
            </button>

            <!-- Dropdown panel: slots laid out as a grid instead of one long
                 scrolling list, grouped under Morning / Afternoon headers -->
            <div
              v-if="showTimeDropdown"
              role="listbox"
              class="absolute z-20 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg p-3 max-h-72 overflow-y-auto"
            >
              <template v-if="timeSlots.morning.length || timeSlots.afternoon.length">
                <div v-if="timeSlots.morning.length" class="mb-3">
                  <p class="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2 px-1">Morning</p>
                  <div class="grid grid-cols-3 gap-2">
                    <button
                      v-for="slot in timeSlots.morning"
                      :key="slot.value"
                      type="button"
                      role="option"
                      :aria-selected="form.time === slot.value"
                      @click="selectTime(slot.value)"
                      class="text-sm py-2 rounded-lg border transition-colors"
                      :class="form.time === slot.value
                        ? 'bg-[#1f9d63] text-white border-[#1f9d63]'
                        : 'border-gray-200 text-gray-700 hover:border-[#1f9d63] hover:bg-[#e6faf6]'"
                    >
                      {{ slot.label }}
                    </button>
                  </div>
                </div>
                <div v-if="timeSlots.afternoon.length">
                  <p class="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2 px-1">Afternoon</p>
                  <div class="grid grid-cols-3 gap-2">
                    <button
                      v-for="slot in timeSlots.afternoon"
                      :key="slot.value"
                      type="button"
                      role="option"
                      :aria-selected="form.time === slot.value"
                      @click="selectTime(slot.value)"
                      class="text-sm py-2 rounded-lg border transition-colors"
                      :class="form.time === slot.value
                        ? 'bg-[#1f9d63] text-white border-[#1f9d63]'
                        : 'border-gray-200 text-gray-700 hover:border-[#1f9d63] hover:bg-[#e6faf6]'"
                    >
                      {{ slot.label }}
                    </button>
                  </div>
                </div>
              </template>
              <p v-else class="text-sm text-gray-400 text-center py-4">No slots available</p>
            </div>
          </div>
          <p v-if="errors.time" id="time-error" class="mt-1.5 flex items-center gap-1 text-sm text-red-500" role="alert">
            <svg class="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fill-rule="evenodd" d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zm-7-4a1 1 0 10-2 0v4a1 1 0 102 0V6zm-1 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
            </svg>
            {{ errors.time }}
          </p>
        </div>
      </div>

      <!-- Service -->
      <div>
        <label for="service" class="block text-sm font-medium text-gray-700 mb-1.5">
          Service <span class="text-red-400">*</span>
        </label>
        <div class="relative">
          <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 z-10">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
          </span>
          <select
            id="service"
            v-model="form.service"
            class="w-full border border-gray-300 rounded-xl pl-12 pr-11 py-3.5 text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1f9d63]/25 focus:border-[#1f9d63] transition-all appearance-none bg-white cursor-pointer"
            :class="{ 'border-red-400 focus:ring-red-100 focus:border-red-400': errors.service }"
            required
            :aria-invalid="!!errors.service"
            :aria-describedby="errors.service ? 'service-error' : undefined"
            @change="errors.service = ''"
          >
            <option value="">Select Service</option>
            <option v-for="svc in serviceOptions" :key="svc" :value="svc">{{ svc }}</option>
          </select>
        </div>
        <p v-if="errors.service" id="service-error" class="mt-1.5 flex items-center gap-1 text-sm text-red-500" role="alert">
          <svg class="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fill-rule="evenodd" d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zm-7-4a1 1 0 10-2 0v4a1 1 0 102 0V6zm-1 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
          </svg>
          {{ errors.service }}
        </p>
      </div>

      <!-- Message (optional) -->
      <div>
        <label for="message" class="block text-sm font-medium text-gray-700 mb-1.5">Message (Optional)</label>
        <div class="relative">
          <span class="pointer-events-none absolute top-0 left-0 flex items-start pl-4 pt-3.5 text-gray-400">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </span>
          <textarea
            id="message"
            v-model="form.message"
            rows="4"
            placeholder="Anything we should know before your visit?"
            class="w-full border border-gray-300 rounded-xl pl-12 pr-4 py-3.5 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1f9d63]/25 focus:border-[#1f9d63] transition-all resize-y"
            autocomplete="off"
          ></textarea>
        </div>
      </div>

      <!-- Honeypot field - hidden from users -->
      <div class="hidden" aria-hidden="true">
        <label for="website">Website</label>
        <input
          id="website"
          v-model="form.website"
          type="text"
          tabindex="-1"
          autocomplete="off"
        />
      </div>

      <button
        type="submit"
        :disabled="isSubmitting"
        class="w-full bg-[#1f9d63] text-white py-4 px-6 rounded-xl font-semibold text-base hover:bg-[#178a54] transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#1f9d63] focus:outline-none focus:ring-2 focus:ring-[#1f9d63] focus:ring-offset-2 min-h-[48px] touch-manipulation shadow-sm shadow-[#1f9d63]/20"
      >
        <span v-if="isSubmitting" class="flex items-center justify-center gap-2">
          <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Sending...
        </span>
        <span v-else>Book Appointment</span>
      </button>
      <p class="text-center text-xs text-gray-400">We'll confirm your booking by email within 24 hours.</p>
    </form>
  </div>

  <!-- Popup Overlay -->
  <Transition name="popup">
    <div
      v-if="popup.show"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      @click.self="closePopup"
    >
      <!-- Success Popup -->
      <div
        v-if="popup.type === 'success'"
        class="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 text-center relative"
      >
        <button
          @click="closePopup"
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-2"
          aria-label="Close"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div class="flex items-center justify-center w-20 h-20 rounded-full bg-[#e6faf6] mx-auto mb-5">
          <svg class="w-10 h-10 text-[#1f9d63]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h3 class="font-display text-xl font-bold text-gray-800 mb-2">Thank You So Much! 🙏</h3>
        <p class="text-gray-500 text-sm leading-relaxed mb-6">
          Your appointment request is in. We truly appreciate you choosing Toothsy — our team will review it and reach out shortly to confirm your booking.
        </p>

        <div class="bg-[#e6faf6] border border-[#d1fae5] rounded-xl px-4 py-3 mb-6 text-sm text-[#1f9d63]">
          📩 Please check your email for a confirmation message.
        </div>

        <button
          @click="closePopup"
          class="w-full bg-[#1f9d63] hover:bg-[#178a54] text-white font-semibold py-3 rounded-xl transition-colors min-h-[48px] touch-manipulation"
        >
          Done, Got It!
        </button>
      </div>

      <!-- Error Popup -->
      <div
        v-else
        class="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 text-center relative"
      >
        <button
          @click="closePopup"
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-2"
          aria-label="Close"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div class="flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mx-auto mb-5">
          <svg class="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
        </div>

        <h3 class="font-display text-xl font-bold text-gray-800 mb-2">Oops, Something Went Wrong</h3>
        <p class="text-gray-500 text-sm leading-relaxed mb-6">
          We're sorry for the inconvenience. Your request could not be sent at this time. Please check your internet connection and try again, or contact us directly.
        </p>

        <div class="flex gap-3">
          <button
            @click="closePopup"
            class="flex-1 border border-gray-200 text-gray-600 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-colors min-h-[48px] touch-manipulation"
          >
            Cancel
          </button>
          <button
            @click="closePopup(); sendEmail();"
            class="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition-colors min-h-[48px] touch-manipulation"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* Popup animations */
.popup-enter-active,
.popup-leave-active {
  transition: all 0.3s ease;
}
.popup-enter-from,
.popup-leave-to {
  opacity: 0;
}
.popup-enter-from .bg-white,
.popup-leave-to .bg-white {
  transform: scale(0.9);
}
.popup-enter-active .bg-white,
.popup-leave-active .bg-white {
  transition: transform 0.3s ease;
}

/* iOS Safari date/time input styling - tint the native calendar icon brand green */
input[type="date"]::-webkit-calendar-picker-indicator,
input[type="time"]::-webkit-calendar-picker-indicator {
  cursor: pointer;
  opacity: 0.6;
  filter: invert(0.4) sepia(1) saturate(5) hue-rotate(80deg);
  background: no-repeat center;
  background-size: 20px 20px;
  padding: 4px;
  margin-right: 4px;
}
input[type="date"]::-webkit-calendar-picker-indicator:hover,
input[type="time"]::-webkit-calendar-picker-indicator:hover {
  opacity: 1;
}

/* Remove default spinner on number inputs (not used here but good practice) */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Custom chevron for selects, positioned to clear the pr-11 padding */
select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
  background-size: 20px;
}

/* Ensure touch targets are at least 44x44px */
button,
input,
select,
textarea {
  min-height: 44px;
}

/* Prevent zoom on iOS when focusing inputs (font-size >= 16px) */
@media screen and (max-width: 768px) {
  input, select, textarea {
    font-size: 16px !important;
  }
}

/* Focus visible for accessibility */
:focus-visible {
  outline: 2px solid #1f9d63;
  outline-offset: 2px;
}

/* Smooth transitions for form elements */
input, select, textarea {
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

/* Disable autocomplete dropdown styling issues on iOS */
input[autocomplete="off"]::-webkit-contacts-auto-fill-button,
input[autocomplete="off"]::-webkit-credentials-auto-fill-button {
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