var validPhone=(rule, value,callback)=>{
    if (!value){
        callback(new Error('请输入电话号码'))
    }else  if (!isvalidPhone(value)){
      callback(new Error('请输入正确的11位手机号码'))
    }else {
        callback()
    }
}

var validIdNum=(rule, value,callback)=>{
    if (!value) {
        return callback(new Error('证件号码不能为空'))
      } else if (!checkIdNum(value)) {
        return callback(new Error('证件号码不正确'))
      } else {
        callback()
      }
}


//  验证电话号码
function isvalidPhone(str) {
    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
    return reg.test(str)
  }

//   验证身份证号
function checkIdNum(str) {
    const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    return reg.test(str)
}