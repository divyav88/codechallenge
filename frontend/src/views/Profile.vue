<template>
  <div>
    <Profile />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Profile from '@/components/Profile/Profile.vue';
@Component({
  components: {
    Profile
  }
})
export default class ProfilePage extends Vue {}
</script>
