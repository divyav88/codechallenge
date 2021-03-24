/**
 * RequestComponent
 */
<template>
  <v-card class="mx-auto">
    <v-toolbar flat>
      <v-toolbar-title class="grey--text">All Requests</v-toolbar-title>
      <div class="flex-grow-1"></div>
    </v-toolbar>
    <v-divider></v-divider>
    <v-spacer></v-spacer>
    <v-card-text>     
      <v-toolbar flat >        
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            class="mb-2"
            v-bind="attrs"
            v-on="on"
            v-show="!disabled"
          >
            New Request
          </v-btn>
        </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.name"
                      label="Request Name"
                      :disabled="disabled"                   
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.description"
                      label="Description"
                      :disabled="disabled"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-select
                      :items="statusArray"
                      label="Status"
                      v-model="editedItem.status"
                      dense
                      solo
                      v-show="disabled"
                    ></v-select>                   
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.createdby"
                      label="Created By"
                      :disabled="disabled"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
      <RequestList @edit-item="editItem" @delete-item="deleteItem" />
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Getter, namespace, Action } from 'vuex-class';
import { Guid } from 'guid-typescript';
import RequestList from './RequestList.vue';
const RequestModule = namespace('RequestModule');

@Component({
  components: {
    RequestList,
  }
})

export default class ManageRequestComponent extends Vue {
  @RequestModule.Getter('successStatus') public successStatus!: boolean;
  @RequestModule.Getter('errorStatus') public errorStatus!: boolean;
  @RequestModule.Action('addRequest') public addRequestStore!: any;
  @RequestModule.Action('updateRequest') public updateRequestStore!: any;
  @RequestModule.Action('deleteRequest') public deleteRequestStore!: any;
  @RequestModule.Action('startWorkFlow') public startWorkFlowStore!: any;
  @RequestModule.Action('loadRequestWF') public loadRequestWFStore!: any;
  @RequestModule.Action('approveRequestWF') public approveRequestWFStore!: any;
  @RequestModule.Getter('getTaskId') public getTaskId!: any;

  public form: boolean = false;
  private dialog: boolean = false;
  private dialogDelete: boolean = false;
  private disabled: boolean = false;
  private approverRole: boolean = false;
  private userRole: boolean = false;
  private editedIndex: number = -1;
  private editedItem: any = {
      name: '',
      description: '',
      status: '',
      createdby: '',
      transactionid: ''
  };
  private defaultItem: object = {
      name: '',
      description: '',
      status: '',
      createdby: ''
  };
  private statusArray: string[] = ['approved', 'rejected'];

  @Watch('dialog')
  public onPropertyChanged(value: boolean, oldValue: boolean) {
    this.dialog = value || this.close();
  }

  get formTitle() {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
  }
  private setEditable() {
    const userRoles = sessionStorage.getItem('user-roles');
    this.approverRole = !!userRoles ? userRoles.includes('approver_role') : false;
    this.userRole = !!userRoles ? userRoles.includes('user_role') : false;
    if (this.approverRole) {
      this.disabled = true;
    }
  }

  private mounted() {
    this.setEditable();
  }
  private editItem(item: any) {
    this.editedIndex = item.requestid;
    this.editedItem = Object.assign({}, item);
    this.dialog = true;
  }
  private deleteItem(item: any) {
    this.editedIndex = item.requestid;
    this.editedItem = Object.assign({}, item);
    this.dialogDelete = true;
  }
  private close() {
    this.dialog = false;
    this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
    });
    return this.dialog;
  }
  private save() {
    if (this.editedIndex > -1) {
      this.updateRequestStore(this.editedItem);
      if (this.approverRole) {
        // this.loadRequestWFStore(this.editedItem.transactionid);
        // console.log(this.editedItem.transactionid + ':' + this.getTaskId);
        let statusValue = '';
        if (this.editedItem.status === 'approved') {
          statusValue = 'approve';
        } else {
          statusValue = 'reject';
        }
        const jsonParam = {
          json:
          {
            payload: { variables: { action: { value: statusValue } } },
            transactionID: this.getTaskId
          }
        };
        // console.log(JSON.stringify(jsonParam));
        this.approveRequestWFStore(JSON.stringify(jsonParam));
      }
    } else {
      this.editedItem.transactionid = Guid.create().toString();
      this.addRequestStore(this.editedItem);
      const jsonParam = {
      variables: { transactionID: { value: this.editedItem.transactionid } }
      };
      this.startWorkFlowStore(JSON.stringify(jsonParam));
    }
    this.close();
  }
  private closeDelete() {
    this.dialogDelete = false;
    this.$nextTick(() => {
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
    });
    return this.dialogDelete;
  }
  private deleteItemConfirm() {
    this.deleteRequestStore(this.editedItem);
    this.closeDelete();
  }
}
</script>
 