<template>
  <div>
    <TheHeader @sidenav-toggle="displaySidenav = !displaySidenav" />
    <TheSidenav
      :show="displaySidenav"
      @close="displaySidenav = false" />
    <nuxt/>
  </div>
</template>

<script>
import TheHeader from '@/components/Navigation/TheHeader'
import TheSidenav from '@/components/Navigation/TheSidenav'

export default {
  components: {
    TheHeader,
    TheSidenav
  },
  data() {
    return {
      displaySidenav: false
    }
  }
}
</script>


<style>
html {
  font-family: 'Ubuntu', sans-serif;
}
body {
  margin: 0;
}
</style>
