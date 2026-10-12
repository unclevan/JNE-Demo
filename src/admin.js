import {createApp} from 'vue';
import AdminApp from './admin/AdminApp.vue';

let adminApp=null;
let adminInstance=null;

export function mountAdmin(options){
  if(adminApp) return;
  adminApp=createApp(AdminApp,options);
  adminInstance=adminApp.mount('#app');
}

export function syncAdminRoute(){
  adminInstance?.syncRoute();
}

export function unmountAdmin(){
  if(!adminApp) return;
  adminApp.unmount();
  adminApp=null;
  adminInstance=null;
}
