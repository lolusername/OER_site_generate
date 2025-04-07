<script setup>
import { ref, watchEffect } from 'vue'
import { marked } from 'marked'
import { useRoute, useRouter } from 'vue-router'
import TextFileViewer from '../components/TextFileViewer.vue'

const route = useRoute()
const router = useRouter()
const resource = ref(null)
const isMarkdown = ref(false)

const getBaseUrl = () => {
  // In development, use empty string
  // In production, use the base URL from vite.config.js
  return import.meta.env.PROD ? '/OER_site_generate/' : ''
}

const loadResource = async () => {
  try {
    const baseUrl = getBaseUrl()
    // Try markdown first
    let response = await fetch(`${baseUrl}${route.params.id}.md`)
    if (response.ok) {
      const content = await response.text()
      resource.value = {
        content,
        title: route.params.id
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
      }
      isMarkdown.value = true
      return
    }

    // Try text file
    response = await fetch(`${baseUrl}${route.params.id}.txt`)
    if (response.ok) {
      const content = await response.text()
      resource.value = {
        content,
        title: route.params.id
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
      }
      isMarkdown.value = false
      return
    }

    throw new Error('File not found')
  } catch (error) {
    console.error('Error loading resource:', error)
    router.push('/')
  }
}

watchEffect(() => {
  if (route.params.id) {
    loadResource()
  }
})
</script>

<template>
  <div class="mt-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div v-if="resource" class="bg-white rounded-lg shadow-sm p-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-6">{{ resource.title }}</h1>
      <div 
        v-if="isMarkdown"
        class="prose prose-lg max-w-none"
        v-html="marked.parse(resource.content)"
      ></div>
      <TextFileViewer
        v-else
        :content="resource.content"
        class="prose prose-lg max-w-none"
      />
    </div>
  </div>
</template>

<style>
.prose h1 {
  @apply text-3xl font-bold mb-6 text-gray-900;
}
.prose h2 {
  @apply text-2xl font-semibold mb-4 mt-8 text-gray-800;
}
.prose p {
  @apply text-gray-700 mb-4 leading-relaxed;
}
.prose ul {
  @apply mb-4 list-disc list-inside;
}
.prose li {
  @apply text-gray-700 mb-2;
}
</style> 