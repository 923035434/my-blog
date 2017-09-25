import axios from 'axios'

export function getMImg () {
  const url = '/api/BlogSetting/M_BgImg/Select'
  return axios({
    method: 'GET',
    url: url
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
