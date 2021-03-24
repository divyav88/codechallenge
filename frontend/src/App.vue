<template>
  <v-app>
    <Header />
    <v-main>
      <div style="padding:100px">
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld.vue';
import Header from './components/Header';

@Component({
  components: {
    HelloWorld,
    Header
  }
})
// App goes here
export default class App extends Vue {}
</script>
