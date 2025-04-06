<script setup>
import { ref, onMounted } from 'vue'
import { marked } from 'marked'

const readmeContent = ref('')

onMounted(async () => {
  // Load README.md
  try {
    const response = await fetch('/README.md', { cache: 'no-store' })
    if (response.ok) {
      readmeContent.value = await response.text()
    }
  } catch (error) {
    console.error('Error loading README:', error)
  }
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- README Content -->
    <div class="prose prose-sm max-w-none prose-headings:text-gray-900 prose-a:text-blue-600" v-html="marked.parse(readmeContent)"></div>
  </div>
</template> 