export default class Song {
  constructor ({musicId, name, singer, imgUrl, albumName, url}) {
    this.musicId = musicId
    this.name = name
    this.singer = singer
    this.imgUrl = imgUrl
    this.albumName = albumName
    this.url = url
  }
}

export function createSong (musicData) {
  return new Song({
    musicId: musicData.musicId,
    name: musicData.name,
    singer: musicData.singer,
    imgUrl: musicData.imgUrl,
    albumName: musicData.albumName,
    url: 'http://ws.stream.qqmusic.qq.com/' + musicData.musicId + '.m4a?fromtag=46'
  })
}
