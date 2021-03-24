/**
 * Header of app
 */

<template>
  <v-app-bar app>
    <v-toolbar-title class="headline text-uppercase">
      <span>Home</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text to="/requests" link v-if="isAdmin">
      <span class="mr-2">Requests</span>
    </v-btn>
    <v-btn text to="/" link>
      <span class="mr-2">Home</span>
    </v-btn>
    <v-btn text to="/login" link v-if="!isLoggedin">
      <span class="mr-2">Login</span>
    </v-btn>
    <v-menu open-on-hover top offset-y v-if="isLoggedin">
      <template v-slot:activator="{ on }">
        <v-avatar color="indigo" v-on="on">
          <v-icon dark>mdi-account-circle</v-icon>
        </v-avatar>
      </template>

      <v-list>
        <v-list-item v-if="isUser">
          <v-list-item-title>
            <v-btn text to="/profile" link>
              <span class="mr-2">{{userProfile.lastName}}</span>
            </v-btn>
          </v-list-item-title>
        </v-list-item>
        <v-list-item @click="logout">
          <v-list-item-title>
            <v-btn text v-if="isLoggedin">
              <span class="mr-2">Logout</span>
            </v-btn>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter, namespace } from 'vuex-class';
const KeyCloakModule = namespace('KeyCloakModule');

@Component
export default class Header extends Vue {
  @KeyCloakModule.Getter('userProfile') private userProfile!: [];
  @KeyCloakModule.Getter('isLoggedin') private isLoggedin!: boolean;
  @KeyCloakModule.Getter('isUser') private isUser!: boolean;
  @KeyCloakModule.Getter('isAdmin') private isAdmin!: boolean;

  /**
   * make user logout
   * @returns {} dispatch
   */
  private logout() {
    this.$store.dispatch('KeyCloakModule/setLogout');
  }
}
</script>
