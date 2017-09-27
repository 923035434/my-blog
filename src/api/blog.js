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

export function getCount () {
  const url = '/api/Blog/GetCount'
  return axios({
    method: 'get',
    url: url
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function addViews (id) {
  const url = '/api/Blog/' + id + '/AddViews'
  return axios({
    method: 'post',
    url: url
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
