
// datetime格式日期格式化
export function datetimeFormatter(type, value){
    if (type === 'year') {
      return `${value}年`
    }
    if (type === 'month') {
      return `${value}月`
    }
    if (type === 'day') {
      return `${value}日`
    }
    if (type === 'hour') {
      return `${value}时`
    }
    if (type === 'minute') {
      return `${value}分`
    }
    return value
}

// date格式日期格式化
export function dateFormatter(type, value){
    if (type === 'year') {
      return `${value}年`
    }
    if (type === 'month') {
      return `${value}月`
    }
    if (type === 'day') {
      return `${value}日`
    }
    return value
}

// time格式日期格式化
export function timeFormatter(type, value){
  if (type === 'hour') {
    return `${value}时`
  }
  if (type === 'minute') {
    return `${value}分`
  }
  return value
}