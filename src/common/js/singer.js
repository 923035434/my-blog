export default class Singer {
  constructor (id, singerId, name, img) {
    this.id = id
    this.singerId = singerId
    this.name = name
    this.img = img
  }
}

export function createSingerListForData (data) {
  let list = []
  for (var item in data) {
    list.push(new Singer(data[item].id, data[item].singerId, data[item].name, data[item].img))
  }
  return list
}
