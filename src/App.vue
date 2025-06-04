<template>
  <div id="app" class="font-sans text-center text-[#2c3e50] flex h-screen">
    <div
      id="mask"
      class="fixed top-0 left-0 w-screen h-screen bg-black/65 opacity-0 transition-opacity duration-500 z-[-1]"
      :class="{ 'opacity-100 z-[1]': isShow }"
      @click="toggleMenu()"
    ></div>
    <div
      id="menu"
      class="fixed top-0 left-[-250px] w-[250px] h-screen transition-left duration-500 z-[5]"
      :class="{ 'left-0': isShow }"
    >
      <Nav @click="isShow=false"></Nav>
    </div>
    <div id="content" class="relative w-full h-full overflow-auto">
      <div
        id="menuTrigger"
        class="absolute w-[25px] h-[25px] leading-[25px] text-[15px] bg-gray-600 text-gray-100 rounded-full m-[10px] select-none transition-all duration-500 z-10"
        @click="toggleMenu()"
      >
        <i class="fas" :class="{'fa-times': isShow, 'fa-bars': !isShow}"></i>
      </div>
      <router-view />
    </div>
  </div>
</template>


<script setup>
import { useToggle } from '@vueuse/core'
import Nav from '@/components/Nav.vue'

const [isShow, toggleMenu] = useToggle(false)
</script>

