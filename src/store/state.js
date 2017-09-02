import {playMode} from '../common/js/config'

const state = {
  singer: {},
  playing: false,
  playList: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  fullScreen: false
}

export default state
