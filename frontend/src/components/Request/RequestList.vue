/**
   * ListViewComponent Page
   */
<template>  
    <v-card-text>     
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-data-table
      :headers="getRequestHeaders"
      :items="getRequestList"
      :items-per-page="10"
      :search="search"
      >
       <template v-slot:item="row">
        <tr>
        <td class="text-xs-right">{{ row.item.requestid }}</td>
        <td class="text-xs-right">{{ row.item.name }}</td>
        <td class="text-xs-right">{{ row.item.description }}</td>
        <td class="text-xs-right">{{ row.item.status }}</td>
        <td class="text-xs-right">{{ row.item.createdby }}</td>
        <td class="justify-center layout px-0">
            <v-btn icon class="mx-0" @click="editItem(row.item)">
               <v-icon color="teal">edit</v-icon>
            </v-btn>
            <v-btn icon class="mx-0" @click="deleteItem(row.item)">
               <v-icon color="pink">delete</v-icon>
            </v-btn>
         </td>
         </tr>
      </template>
      </v-data-table>
    </v-card-text>  
</template>
  <script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
const RequestModule = namespace('RequestModule');

@Component({
  components: {
  }
})
export default class RequestListComponent extends Vue {
  @RequestModule.Action('loadRequest') public loadRequest!: any;
  @RequestModule.Getter('getRequestList') public getRequestList!: [];
  @RequestModule.Getter('getRequestHeaders') public getRequestHeaders!: [];
  @RequestModule.Action('loadRequestWF') public loadRequestWFStore!: any;

  public form: boolean = false;
  private search: string = '';

  private mounted() {
    this.loadRequest();
  }
  private editItem(item: any) {
    this.loadRequestWFStore(item.transactionid);
    this.$emit('edit-item', item);
  }

  private deleteItem(item: any) {
    this.$emit('delete-item', item);
  }
}
</script>
