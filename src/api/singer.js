import axios from 'axios'

export function getSingerList () {
  const url = '/api/singer'

  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getSingerDetail (singerId) {
  const url = '/api/song'
  return axios.get(url, {params: {singerId: singerId}}).then((res) => {
    return Promise.resolve(res.data)
  })
}
