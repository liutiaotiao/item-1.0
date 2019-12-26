export function currentUrlToParams(key = null) {
  let paramsUrl = window.location.href.split("?");
  if (paramsUrl.length < 2) return key ? null : {};
  let paramsArr = paramsUrl[1].split("&");
  let paramsData = {};
  paramsArr.forEach(r => {
    let data = r.split("=");
    // just split once
    paramsData[data.shift()] = data.join("=");
  });
  if (key) return paramsData.hasOwnProperty(key) ? paramsData[key] : null;
  paramsData.sid = paramsData.token;
  return paramsData;
}

/**
 * 将对象转换为?a=5&b=7形式
 * @param obj
 * @param firstStr
 * @returns {string|string}
 */
export function obj2StrParams(obj, firstStr = "?") {
  let params = firstStr;

  for (let p in obj) {
    params += p + "=" + obj[p] + "&";
  }
  return params.substring(0, params.length - 1);
}

/**
 * 重置对象参数
 * @params -> Object
 * @arg = Array => []
 * @arg = Boolean => false
 * @arg = Number => null
 * @arg = String => ''
 * */
export function resetArgs(args, def = {}) {
  for (let key in args) {
    if (def.hasOwnProperty(key)) {
      args[key] = def[key];
    } else {
      if (Array.isArray(args[key])) args[key] = [];
      if ("string" == typeof args[key]) args[key] = "";
      if ("number" == typeof args[key]) args[key] = null;
      if ("boolean" == typeof args[key]) args[key] = false;
    }
  }
}

/**
 * @param obj
 * @param row
 */
export function fillerLeft(obj, row = {}) {
  for (let key in obj) {
    if (
      row.hasOwnProperty(key) &&
      row[key] !== null &&
      row[key] !== undefined
    ) {
      obj[key] = row[key];
    }
  }
}

export function getToken() {
  //todo
}
