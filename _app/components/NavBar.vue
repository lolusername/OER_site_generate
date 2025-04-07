<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isMenuOpen = ref(false)

const resources = [
  { id: 'biology-101', title: 'Biology 101' },
  { id: 'sample-chemistry', title: 'Sample Chemistry' },
  { id: 'sample-notes', title: 'Sample Notes' }
]

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const navigate = (path) => {
  router.push(path)
  isMenuOpen.value = false
}
</script>

<template>
  <nav class="bg-white shadow-md fixed w-full top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <!-- Logo/Home button - Always visible -->
        <div class="flex items-center">
          <button 
            @click="navigate('/')"
            class="text-xl sm:text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors"
          >
            Open Educational Resources
          </button>
        </div>

        <!-- Mobile menu button -->
        <div class="flex items-center sm:hidden">
          <button
            @click="toggleMenu"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          >
            <span class="sr-only">Open main menu</span>
            <!-- Heroicon name: menu -->
            <svg
              :class="{'hidden': isMenuOpen, 'block': !isMenuOpen }"
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <!-- Heroicon name: x -->
            <svg
              :class="{'block': isMenuOpen, 'hidden': !isMenuOpen }"
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Desktop navigation - Hidden on mobile -->
        <div class="hidden sm:flex sm:items-center sm:space-x-4">
          <button
            @click="navigate('/')"
            class="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Home
          </button>
          <button
            v-for="resource in resources"
            :key="resource.id"
            @click="navigate({ name: 'resource', params: { id: resource.id }})"
            class="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            {{ resource.title }}
          </button>
        </div>
      </div>

      <!-- Mobile menu, show/hide based on menu state -->
      <div
        :class="{ 'block': isMenuOpen, 'hidden': !isMenuOpen }"
        class="sm:hidden"
      >
        <div class="pt-2 pb-3 space-y-1">
          <button
            @click="navigate('/')"
            class="block w-full text-left px-4 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          >
            Home
          </button>
          <button
            v-for="resource in resources"
            :key="resource.id"
            @click="navigate({ name: 'resource', params: { id: resource.id }})"
            class="block w-full text-left px-4 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
          >
            {{ resource.title }}
          </button>
        </div>
      </div>
    </div>
  </nav>
</template> 