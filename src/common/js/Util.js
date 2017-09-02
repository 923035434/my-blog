function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle (arry) {
  let _arry = arry.slice()
  for (let i = 0; i < _arry.length; i++) {
    let randomInt = getRandomInt(0, i)
    let t = arry[i]
    arry[i] = arry[randomInt]
    arry[randomInt] = t
  }
  return _arry
}
