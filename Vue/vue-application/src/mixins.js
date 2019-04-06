import {mapGetters, mapMutations} from 'vuex'
import * as TYPES from './store/mutation-types'

export const vuexMixins = {
  computed: {
    ...mapGetters([
      'lesson'
    ])
  },
  methods: {
    ...mapMutations({
      setLesson: TYPES.SET_LESSON
    })
  }
}
