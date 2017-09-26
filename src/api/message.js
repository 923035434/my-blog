import axios from 'axios'

export function sendMessage (param) {
  const url = '/api/Message'
  return axios({
    url: url,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: param
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
