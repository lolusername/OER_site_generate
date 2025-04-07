<script setup>
import { ref, onMounted } from 'vue'
import { marked } from 'marked'
import path from 'path'

const readmeContent = ref('')
const selectedFiles = ref([])
const uploadStatus = ref('')

const selectFiles = async () => {
  try {
    const filePaths = await window.ipcRenderer.invoke('select-files')
    if (filePaths.length > 0) {
      const formData = new FormData()
      for (const filePath of filePaths) {
        const file = await fetch(`file://${filePath}`).then(r => r.blob())
        formData.append('files', file, path.basename(filePath))
      }
      
      const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData
      })
      
      if (response.ok) {
        uploadStatus.value = 'Files uploaded successfully!'
        setTimeout(() => uploadStatus.value = '', 3000)
        // Refresh content list
        window.location.reload()
      }
    }
  } catch (error) {
    console.error('Error uploading files:', error)
    uploadStatus.value = 'Error uploading files'
  }
}

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3000/content/README.md')
    if (response.ok) {
      readmeContent.value = await response.text()
    }
  } catch (error) {
    console.error('Error loading README:', error)
  }
})
</script>

<template>
  <div class="mt-20 sm:mt-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
    <div class="mb-8 text-center">
      <button
        @click="selectFiles"
        class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
      >
        Select Files to Upload
      </button>
      <p v-if="uploadStatus" class="mt-2 text-sm" :class="uploadStatus.includes('Error') ? 'text-red-500' : 'text-green-500'">
        {{ uploadStatus }}
      </p>
    </div>

    <div class="prose prose-sm sm:prose-lg max-w-none">
      <div v-html="marked.parse(readmeContent)"></div>
    </div>
  </div>
</template>

<style>
.prose h1 {
  @apply text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-900;
}
.prose h2 {
  @apply text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 mt-6 sm:mt-8 text-gray-800;
}
.prose p {
  @apply text-gray-700 mb-3 sm:mb-4 leading-relaxed;
}
.prose ul {
  @apply mb-3 sm:mb-4 list-disc list-inside;
}
.prose li {
  @apply text-gray-700 mb-1 sm:mb-2;
}
</style> 