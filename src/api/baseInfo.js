import axios from 'axios'

export function getBaseInfo () {
  const url = '/api/BlogSetting/BaseInfo'
  return axios({
    method: 'GET',
    url: url
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
