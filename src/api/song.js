import axios from 'axios'

export function getSongForSinger (singerId) {
  const url = '/api/singer/' + singerId + '/song'
  return axios({
    url: url,
    method: 'GET'
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
