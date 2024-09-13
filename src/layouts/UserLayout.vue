<template>
  <div id="userLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <a-space>
          <img src="../assets/logo1.png" class="logo" alt="c.c ojs" />
          <div class="title">c.c oj</div>
        </a-space>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">Footer</a-layout-footer>
    </a-layout>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
#userLayout {
  text-align: center;
  background: url("../assets/bg.png") 0% 0% / 100% 100%;
}

#userLayout .header {
  margin-bottom: 16px;
}

#userLayout .header .logo {
  width: 64px;
  height: 64px;
}

#userLayout .header .title {
}

#userLayout .content {
  padding: 10px;
}

#userLayout .footer {
  padding: 16px;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  margin-top: 10px;
}
</style>
