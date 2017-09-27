export default class Blog {
  constructor (id, title, desc, img, content, time, typeId, views) {
    this.id = id
    this.title = title
    this.desc = desc
    this.img = img
    this.content = content
    this.time = timeConvert(time)
    this.typeId = typeId
    this.views = views
  }
}

function timeConvert (time) {
  let date = new Date(parseInt(time))
  let year = date.getFullYear()
  let month = date.getMonth()
  let day = date.getDate()
  // let hours = date.getHours()
  // let minutes = date.getMinutes()
  let resutl = year + '-' + month + '-' + day//  + '  ' + hours + ':' + minutes
  return resutl
}
