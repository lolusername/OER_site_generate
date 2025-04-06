<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const resources = [
  { id: 'biology-101', title: 'Biology 101' },
  { id: 'sample-chemistry', title: 'Sample Chemistry' },
  { id: 'sample-notes', title: 'Sample Notes' }
]
</script>

<template>
  <nav class="bg-white shadow-md fixed w-full top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <button 
            @click="router.push('/')"
            class="text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors"
          >
            Open Educational Resources
          </button>
        </div>
        <div class="flex items-center space-x-4">
          <button
            @click="router.push('/')"
            class="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Home
          </button>
          <button
            v-for="resource in resources"
            :key="resource.id"
            @click="router.push({ name: 'resource', params: { id: resource.id }})"
            class="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            {{ resource.title }}
          </button>
        </div>
      </div>
    </div>
  </nav>
</template> 