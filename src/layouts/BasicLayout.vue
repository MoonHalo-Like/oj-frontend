<template>
  <div id="basicLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <GlobalHeader />
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">Footer</a-layout-footer>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import GlobalHeader from "@/components/GlobalHeader.vue";
</script>

<style scoped>
#basicLayout {
}

#basicLayout .header {
  box-shadow: #eee 1px 1px 5px;
}

#basicLayout .content {
  background: linear-gradient(to right, #fefefe, #fff);

  padding: 10px;
}

#basicLayout .footer {
  background: #42b983;
  padding: 16px;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  margin-top: 10px;
}
</style>
