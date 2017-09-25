import axios from 'axios'

export function getAllBlogs () {
  const url = '/api/blog'
  return axios({
    method: 'get',
    url: url
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
