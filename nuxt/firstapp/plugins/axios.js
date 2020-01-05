import Vue from 'vue';

export default function({ $axios }) {
  $axios.onRequest((config) => {
    console.log('Making request to ' + config.url);
  });

  $axios.onError((error) => {
    Vue.toasted.error(error);
  });
}
