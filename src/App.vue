<template>
  <div id="app" class="font-sans text-slate-dark h-screen overflow-hidden">
    <!-- Backdrop overlay -->
    <Transition name="fade">
      <div
        v-if="isShow"
        class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        @click="toggleMenu()"
      />
    </Transition>

    <!-- Sidebar -->
    <aside
      class="fixed top-0 left-0 h-full w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out"
      :class="isShow ? 'translate-x-0' : '-translate-x-full'"
    >
      <Nav @click="isShow = false" />
    </aside>

    <!-- Menu trigger button -->
    <button
      id="menuTrigger"
      class="menu-trigger"
      :class="{ 'left-68': isShow }"
      @click="toggleMenu()"
      aria-label="Toggle menu"
    >
      <i class="fas text-lg" :class="isShow ? 'fa-times' : 'fa-bars'" />
    </button>

    <!-- Main content -->
    <main class="h-full overflow-auto">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useToggle } from '@vueuse/core'
import Nav from '@/components/Nav.vue'

const [isShow, toggleMenu] = useToggle(false)
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
