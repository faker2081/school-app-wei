import { Decimal } from 'decimal.js';//引入
class Cal {
    add(num1,num2) {
        return new Decimal(num1).add(new Decimal(num2))
    }
    subtract(num1,num2) {
        return new Decimal(num1).sub(new Decimal(num2))
    }
    multiply(num1,num2) {
        return new Decimal(num1).mul(new Decimal(num2))
    }
    chu(num1,num2) {
        return new Decimal(num1).div(new Decimal(num2))
    }
}
const cal =  new Cal();
export default cal;