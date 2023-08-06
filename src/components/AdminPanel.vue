<script lang="ts" setup></script>
<template>
  <div
    class="fixed bottom-0 z-10 h-16 w-full bg-gray-800 shadow-xl md:h-screen md:w-48"
  >
    <div
      class="content-center justify-between text-left md:fixed md:left-0 md:top-10 md:mt-12 md:w-48 md:content-start"
    >
      <ul
        class="list-reset flex flex-row px-1 py-0 text-center md:flex-col md:px-2 md:py-3 md:text-left"
      >
        <li class="mr-3 flex-1">
          <a
            href="#"
            class="block border-b-2 border-gray-800 py-1 pl-1 align-middle text-white no-underline hover:border-pink-500 hover:text-white md:py-3"
          >
            <i class="fas fa-tasks pr-0 md:pr-3"></i
            ><span
              class="block pb-1 text-xs text-gray-600 md:inline-block md:pb-0 md:text-base md:text-gray-400"
              >Tasks</span
            >
          </a>
        </li>
        <li class="mr-3 flex-1">
          <a
            href="#"
            class="block border-b-2 border-gray-800 py-1 pl-1 align-middle text-white no-underline hover:border-purple-500 hover:text-white md:py-3"
          >
            <i class="fa fa-envelope pr-0 md:pr-3"></i
            ><span
              class="block pb-1 text-xs text-gray-600 md:inline-block md:pb-0 md:text-base md:text-gray-400"
              >Messages</span
            >
          </a>
        </li>
        <li class="mr-3 flex-1">
          <a
            href="#"
            class="block border-b-2 border-blue-600 py-1 pl-1 align-middle text-white no-underline hover:text-white md:py-3"
          >
            <i class="fas fa-chart-area pr-0 text-blue-600 md:pr-3"></i
            ><span
              class="block pb-1 text-xs text-white md:inline-block md:pb-0 md:text-base md:text-white"
              >Analytics</span
            >
          </a>
        </li>
        <li class="mr-3 flex-1">
          <a
            href="#"
            class="block border-b-2 border-gray-800 py-1 pl-0 align-middle text-white no-underline hover:border-red-500 hover:text-white md:py-3 md:pl-1"
          >
            <i class="fa fa-wallet pr-0 md:pr-3"></i
            ><span
              class="block pb-1 text-xs text-gray-600 md:inline-block md:pb-0 md:text-base md:text-gray-400"
              >Payments</span
            >
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped lang="scss"></style>
