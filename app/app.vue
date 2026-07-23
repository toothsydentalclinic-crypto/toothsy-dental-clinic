<script setup>
useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap'
    }
  ]
})
</script>
<style>
/* not scoped — scoped styles can't reach html/body */
html, body {
  overflow-x: hidden;
}
</style>
<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>