<<template lang="pug">
v-app
  v-content
    v-container(fluid grid-list-md)
      opponents/
</template>

<script>
import Opponents from '~/components/Opponents'

export default {
  components: {
    Opponents
  }
}
</script>
