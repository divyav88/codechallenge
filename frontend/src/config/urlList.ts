export const BASE_URL =
  process.env.VUE_APP_API_BASE_URL || 'http://localhost:6402/';

export const REQUESTURL = 'requests/all';
export const ADDREQUESTURL = 'requests/add';
export const EDITREQUESTURL = 'requests/<requestid>';

export const CAMUNDABASEURL = process.env.VUE_APP_CAMUNDA_BPM_ENGINE_URL || 'http://localhost:6401';
export const CAMUNDABPMNDEF = process.env.VUE_APP_CAMUNDA_BPM_PROCESSDEF_KEY || 'FOICCBPMNFILE1';
