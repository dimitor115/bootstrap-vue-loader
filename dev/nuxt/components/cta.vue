<template>
  <component
    :is="hasUrlData ? 'b-link' : 'div'"
    v-if="isLink">
    <slot>
      <b-button>test</b-button>
    </slot>
  </component>
</template>
<script>
  import {BLink} from 'bootstrap-vue'
  export default {
    components: {BLink},
    props: ['hasUrlData', 'isLink']
  }
</script>
