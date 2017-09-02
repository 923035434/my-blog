import * as types from './mutation-types'

const mutations = {
  [types.SET_SINGER] (state, singer) {
    state.singer = singer
  },
  [types.SET_CURRENT_INDEX] (state, index) {
    state.currentIndex = index
  },
  [types.SET_PLAY_LIST] (state, playList) {
    state.playList = playList
  },
  [types.SET_MODE] (state, mode) {
    state.mode = mode
  },
  [types.SET_PLAYING] (state, playing) {
    state.playing = playing
  },
  [types.SET_SEQUENCE_LIST] (state, sequenceList) {
    state.sequenceList = sequenceList
  },
  [types.SET_FULL_SCREEN] (state, isfull) {
    state.fullScreen = isfull
  }
}

export default mutations
