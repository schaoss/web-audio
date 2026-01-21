<template>
  <div id="app" class="font-sans text-slate-dark dark:text-slate-300 dark:bg-slate-900 h-screen overflow-hidden">
    <!-- Backdrop overlay -->
    <Transition name="fade">
      <div
        v-if="isShow"
        class="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm z-40"
        @click="toggleMenu()"
      />
    </Transition>

    <!-- Sidebar -->
    <aside
      class="fixed top-0 left-0 h-full w-64 bg-white dark:bg-slate-800 shadow-2xl z-50 transform transition-transform duration-300 ease-out"
      :class="isShow ? 'translate-x-0' : '-translate-x-full'"
    >
      <Nav @click="isShow = false" />
    </aside>

    <!-- Menu trigger button -->
    <button
      id="menuTrigger"
      class="menu-trigger"
      :class="{ 'left-72': isShow }"
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
/* Scrollbar styling */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

html.dark ::-webkit-scrollbar-track {
  background: #1e293b;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 5px;
}

html.dark ::-webkit-scrollbar-thumb {
  background: #475569;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

html.dark ::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
