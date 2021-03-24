export interface RequestState {
  requestHeaders: [];
  request: RequestModel;
  requestList: RequestModel[];
  loading?: boolean;
  successStatus?: boolean;
  successWFStatus?: boolean;
  errorStatus?: boolean;
  taskid: string;
  statusUpdated?: boolean;
  processdefinitionid: string;
  wfXML: any;
}
export interface RequestModel {
  name: string;
  description: string;
  requestid: string;
  status: string;
  createdby: string;
  created_at: string;
  updated_at: string;
  updated: string;
  transactionid: string;
}
