/**
 * 
 * Add books
 */

<template>
  <v-card class="mx-auto" max-width="600">
    <v-toolbar flat>
      <v-toolbar-title class="grey--text">My Preferences</v-toolbar-title>
      <div class="flex-grow-1"></div>
    </v-toolbar>
    <!-- {{userProfile}} -->
    <v-divider></v-divider>
    <v-alert type="success" v-if="successStatus">Profile Updated succesfully</v-alert>
    <v-alert type="error" v-if="errorStatus">Something went wrong...</v-alert>
    <v-card-text>
      <v-form>
        <v-container>
          <v-row>
            <v-col cols="12">
              <h1
                class="display-2 font-weight-bold mb-3"
              >Hello {{userProfile && userProfile.last_name}}</h1>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

import { Getter, namespace } from 'vuex-class';
const BookModule = namespace('BookModule');
const ProfileModule = namespace('ProfileModule');

@Component
export default class Profile extends Vue {
  @ProfileModule.Getter('userProfile') public userProfile!: [];
  @ProfileModule.Getter('successStatus') public successStatus!: boolean;
  @ProfileModule.Getter('errorStatus') public errorStatus!: boolean;

  /**
   * @description loading  genre on load
   */
  private mounted() {
    // this.$store.dispatch('AuthorModule/loadAuthors');
    // this.$store.dispatch('ProfileModule/loadUserProfile');
  }
}
</script>
