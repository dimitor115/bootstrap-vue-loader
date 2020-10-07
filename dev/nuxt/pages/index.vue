<template>
  <div class="container">
    <div>
<!--      <logo />-->
      <h1 class="title">
        nuxt
      </h1>
      <h2 class="subtitle">
        Testing nuxt config
      </h2>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          class="button--green"
        >
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey"
        >
          GitHub
        </a>
        <b-button>test</b-button>
        <b-card>TEST</b-card>

        <b-button id="show-btn" @click="$bvModal.show('bv-modal-example')">Open Modal</b-button>

        <b-modal id="bv-modal-example" hide-footer>
          <template v-slot:modal-title>
            Using <code>$bvModal</code> Methods
          </template>
          <div class="d-block text-center">
            <h3>Hello From This Modal!</h3>
          </div>
          <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')">Close Me</b-button>
        </b-modal>

        <cta :is-link="true" :has-url-data="true">
          <b-card>Teest</b-card>
        </cta>
        <cta :is-link="true" :has-url-data="false">
        </cta>
      </div>
    </div>
  </div>
</template>

<script>
// import Logo from '~/components/Logo.vue'
import Cta from '~/components/cta.vue'

export default {
  components: {
    Cta,
    // Logo
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
