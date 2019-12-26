export default (num = '', len = 0) => {
  let str = Array(len).fill(0).join('') + num
  return str.slice(0 - len)
}