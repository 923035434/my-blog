export default class Song {
  constructor (id, musicId, name, singer, imgUrl, albumName, url) {
    this.id = id
    this.musicId = musicId
    this.name = name
    this.singer = singer
    this.imgUrl = imgUrl
    this.albumName = albumName
    this.url = url
  }
}

export function createSongListForData (data, singer) {
  let list = []
  for (var item in data) {
    list.push(new Song(data[item].id, data[item].musicId, data[item].name, singer, data[item].imgUrl, data[item].albumName, data[item].url))
  }
  return list
}

