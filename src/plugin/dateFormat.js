
import leftpad from './leftpad'

export default (dateTime = new Date(), formatter) => {
  try {
    if (isNaN(Date.parse(new Date(dateTime)))) {
      return date
    }
    let date = new Date(dateTime)
    let Y = date.getFullYear()
    let M = date.getMonth() + 1
    let D = date.getDate()
    let h = date.getHours()
    let m = date.getMinutes()
    let s = date.getSeconds()

    return formatter.replace('yyyy', Y)
      .replace('MM', leftpad(M, 2))
      .replace('M', M)
      .replace('dd', leftpad(D, 2))
      .replace('d', D)
      .replace('hh', leftpad(h, 2))
      .replace('h', h)
      .replace('mm', leftpad(m, 2))
      .replace('m', m)
      .replace('ss', leftpad(s, 2))
      .replace('s', s)
  } catch (error) {
    return date
  }
}