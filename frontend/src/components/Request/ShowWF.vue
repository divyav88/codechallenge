/**
 * Show WF in UI
 */

<template>
  <v-btn v-show="showbtn" class="succcess" @click="showWF">Show WF</v-btn>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter, namespace } from 'vuex-class';
const RequestModule = namespace('RequestModule');

@Component
export default class ShowWFComponent extends Vue {
  @RequestModule.Action('getWFProcessDefinitionId') public getWFProcessDefinitionIdStore!: any;
  @RequestModule.Action('getWFXML') public getWFXMLStore!: any;
  @RequestModule.Getter('getProcessDefinitionId') public getProcessDefinitionId!: any;

  private approverRole: boolean = false;
  private userRole: boolean = false;
  private showbtn: boolean = false;
  private processDefinitionId: string = '';
  private mounted() {
      this.getWFProcessDefinitionIdStore();
      this.setEditable();
  }

  private showWF() {
    this.processDefinitionId = this.getProcessDefinitionId;
    // console.log('ShowWF: ' + this.processDefinitionId);
    this.getWFXMLStore(this.processDefinitionId);
    this.$emit('show-bpmn-wf');
  }
  private setEditable() {
    const userRoles = sessionStorage.getItem('user-roles');
    this.approverRole = !!userRoles ? userRoles.includes('approver_role') : false;
    this.userRole = !!userRoles ? userRoles.includes('user_role') : false;
    if (this.approverRole) {
      this.showbtn = true;
    }
  }
}
</script>
