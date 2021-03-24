<template>
  <div>
    <div>
      
       <!-- <button type="button" class="btn btn-success btn-sm" @click="openAddRequest">
          Add Request
        </button> -->
      <!-- <AddRequest v-show="this.showAddRequest" /> -->
      <!-- <AddRequest /> -->
      <!-- <Request /> -->
      <!-- <ShowWF @show-bpmn-wf="showDiagram" /> -->
    </div>
    <div class="mt-6">
      <!-- <ListRequest /> -->
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
// import AddRequest from '@/components/Request/AddRequest.vue'; // @ is an alias to /src
import ManageRequest from '@/components/Request/ManageRequest.vue';
// // import ListRequest from '@/components/Request/ListRequest.vue';
// import ShowWF from '@/components/Request/ShowWF.vue';
// // import ShowDiagram from '@/components/Request/ShowDiagram.vue';
// import Diagram from '@/components/Request/Diagram.vue';
@Component({
  components: {
    // AddRequest,
    ManageRequest,
    // ListRequest,
    // ShowWF,
    // // ShowDiagram,
    // Diagram,
  }
})
export default class RequestsComponent extends Vue {
  // private show: boolean = false;
  // // private openAddRequest() {
  // //     this.showAddRequest = !this.showAddRequest;
  // // }
  // private showDiagram() {
  //   this.show = true;
  // }
}
</script>
