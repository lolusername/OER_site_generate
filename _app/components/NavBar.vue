<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const resources = ref([])
const isMobileMenuOpen = ref(false)

onMounted(async () => {
  // Load all resources for navigation
  const markdownModules = import.meta.glob('../../content/*.md', { as: 'raw' })
  const textModules = import.meta.glob('../../content/*.txt', { as: 'raw' })
  
  const loadFiles = async (modules, extension) => {
    for (const path in modules) {
      try {
        const fileName = path.split('/').pop().replace(extension, '')
        if (fileName !== 'README') {
          resources.value.push({
            id: fileName,
            title: fileName.split('-').map(word => 
              word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ')
          })
        }
      } catch (error) {
        console.error(`Error loading ${path}:`, error)
      }
    }
  }

  await Promise.all([
    loadFiles(markdownModules, '.md'),
    loadFiles(textModules, '.txt')
  ])

  // Sort resources alphabetically
  resources.value.sort((a, b) => a.title.localeCompare(b.title))
})

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
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
        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center space-x-4">
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
        <!-- Mobile Menu Button -->
        <div class="md:hidden flex items-center">
          <button 
            @click="toggleMobileMenu"
            class="text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path 
                v-if="!isMobileMenuOpen"
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M4 6h16M4 12h16M4 18h16" 
              />
              <path 
                v-else
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <!-- Mobile Menu Dropdown -->
    <div 
      v-if="isMobileMenuOpen"
      class="md:hidden absolute w-full bg-white shadow-lg"
    >
      <div class="px-2 pt-2 pb-3 space-y-1">
        <button
          @click="router.push('/'); closeMobileMenu()"
          class="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
        >
          Home
        </button>
        <button
          v-for="resource in resources"
          :key="resource.id"
          @click="router.push({ name: 'resource', params: { id: resource.id }}); closeMobileMenu()"
          class="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
        >
          {{ resource.title }}
        </button>
      </div>
    </div>
  </nav>
</template> 