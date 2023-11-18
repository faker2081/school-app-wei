/* 验证空 */
export function validateBlank(value) {
  if (!value) {
    return false
  }
  return true;
}

/* 验证手机号 */
export function validatePhone(value) {
  const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
  if (!value) {
    return false
  } else {
    return reg.test(value);
  }
}

/* 验证身份证号 */
export function validateIdCard(value) {
  const reg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  if (!value) {
    return false
  } else {
    return reg.test(value);
  }
}

/* 验证正整数 */
export function validatePositiveInteger(value) {
  const reg = /^[1-9]\d*$/;
  if (!value) {
    return false
  } else {
    return reg.test(value);
  }
}
/* 验证整数 */
export function validateInteger(value) {
  const reg = /^(-|\+)?\d+$/;
  if (!value) {
    return false
  } else {
    return reg.test(value);
  }
}
/* 验证2位小数 */
export function validateDoubleTwo(value) {
  const reg = /(^[1-9](\d+)?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/;
  if (!value) {
    return false
  } else {
    return reg.test(value);
  }
}
/* 验证密码格式 */
export function validateSetPassword(value) {
  const reg = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9]).{8,16}$/;
  if (!value) {
    return false
  } else {
    return reg.test(value);
  }
}
/* 过滤表情 */
export function emojiFilter(value) {
  const reg = /[^\u4E00-\u9FA5|\d|\a-zA-Z|\r\n\s,.?!，。？！…—&$=()-+/*{}[\]]|\s/g;
  if (value) {
    return value.replace(reg, '').trim()
  } else {
    return value;
  }
}

/* 身份证脱敏 */
export function idcardFilter(value) {
  if (value) {
    return value.replace(/^(.{4}).+(.{4})$/,"$1****$2")
  } else {
    return value;
  }
}

/* 手机号过滤 */
export function phoneFilter(value) {
  if (value) {
    return value.replace(/^(.{3}).+(.{4})$/,"$1****$2")
  } else {
    return value;
  }
}

/* 校验正整数过滤 */
export function checkInt(value,max){
  const reg = /^(-|\+)?\d+$/;
  if(reg.test(value)){
    if(value<max && value>0){
       return true
    }else{
       return false
    }
  }else{
    return false
  }
}
/* 验证统一社会性代码 */
export function validateSocialCode(value) {
    let firstarray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    let firstkeys = [3, 7, 9, 10, 5, 8, 4, 2];
    let secondarray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'T', 'U', 'W', 'X', 'Y'];
    let secondkeys = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28];
    let code = value.toUpperCase();
    if (code.length !== 18) {
        return false;
    }
    let reg = /^\w\w\d{6}\w{9}\w$/;
    if (!reg.test(code)) {
        return false;
    }
    reg = /^[1,5,9,Y]\w\d{6}\w{9}\w$/;
    if (!reg.test(code)) {
        return false;
    }
    reg = /^(11|12|13|19|51|52|53|59|91|92|93|Y1)\d{6}\w{9}\w$/;
    if (!reg.test(code)) {
        return false;
    }
    reg = /^(11|12|13|19|51|52|53|59|91|92|93|Y1)\d{6}\w{9}\w$/;
    if (!reg.test(code)) {
        return false;
    }
    let firstkey = calc(code.substr(8), firstarray, firstkeys, 11);
    let firstword;
    if (firstkey < 10) {
        firstword = firstkey;
    }
    if (firstkey == 10) {
        firstword = 'X';
    } else if (firstkey == 11) {
        firstword = '0';
    }
    if (firstword != code.substr(16, 1)) {
        return false;
    }
    let secondkey = calc(code,secondarray,secondkeys, 31);
    let secondword = secondarray[secondkey];
    if (!secondword || secondword !== code.substr(17, 1)) {
        return false;
    }
    let word = code.substr(0, 16) + firstword + secondword;
    if (code !== word) {

        return false;
    }
    return true;

};

const calc = (code, array1, array2, b) => {
    let count = 0;
    for (let i = 0; i < array2.length; i++) {
        let a = code[i];
        count += array2[i] * array1.indexOf(a);
    }
    let remainder = count % b;
    return remainder === 0 ? 0 : b - remainder;
};


export function validateDoubleThree(value) {
  const reg = /^[1-9]\d{0,8}(\.\d{1,3})?$/;
  if (!value) {
    return false
  } else {
    return reg.test(value);
  }
}

export default {
    validateBlank,
    validatePhone,
    validateIdCard,
    validatePositiveInteger,
    validateInteger,
    validateDoubleTwo,
    validateSetPassword,
    emojiFilter,
    idcardFilter,
    phoneFilter,
    checkInt,
    validateSocialCode,
    validateDoubleThree
}