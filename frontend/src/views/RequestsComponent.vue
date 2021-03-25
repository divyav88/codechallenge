<template>
  <div>
    <div>
      <!-- <ShowWF @show-bpmn-wf="showDiagram" /> -->
    </div>
    <div class="mt-6">
      <ManageRequest />
    </div>
    <div>
      <!-- <ShowDiagram /> -->
      <!-- <Diagram /> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ManageRequest from '@/components/Request/ManageRequest.vue';
// import ShowWF from '@/components/Request/ShowWF.vue';
// import Diagram from '@/components/Request/Diagram.vue';
@Component({
  components: {
    ManageRequest,
    // ShowWF,
    // Diagram,
  },
})
export default class RequestsComponent extends Vue {
  // private show: boolean = false;
  // private showDiagram() {
  //   this.show = true;
  // }
}
</script>
