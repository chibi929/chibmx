import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { BuefyNamespace } from 'buefy';

declare module 'vue/types/vue' {
  interface Vue {
    $axios: NuxtAxiosInstance;
    $buefy: BuefyNamespace;
  }
}
