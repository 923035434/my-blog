import axios from 'axios'

export function getSinger () {
  const url = '/api/Singer'
  return axios({
    url: url,
    method: 'GET'
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
