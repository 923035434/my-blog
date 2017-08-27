import axios from 'axios'

export function getSingerList () {
  const url = '/api/singer'

  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}
