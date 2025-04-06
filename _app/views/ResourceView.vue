<script setup>
import { ref, watchEffect } from 'vue'
import { marked } from 'marked'
import { useRoute, useRouter } from 'vue-router'
import TextFileViewer from '../components/TextFileViewer.vue'

const route = useRoute()
const router = useRouter()
const resource = ref(null)
const isMarkdown = ref(false)

const loadResource = async () => {
  try {
    // Try markdown first
    let response = await fetch(`/${route.params.id}.md`, { cache: 'no-store' })
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
    response = await fetch(`/${route.params.id}.txt`, { cache: 'no-store' })
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
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div v-if="resource" class="bg-white rounded-lg shadow-sm p-6">
      <h1 class="text-3xl font-bold text-gray-900 mb-6">{{ resource.title }}</h1>
      <div 
        v-if="isMarkdown"
        class="prose prose-sm max-w-none prose-headings:text-gray-900 prose-a:text-blue-600"
        v-html="marked.parse(resource.content)"
      ></div>
      <TextFileViewer
        v-else
        :content="resource.content"
      />
    </div>
  </div>
</template> 