/**
 * 特殊结构赋值
 */
// 以声明的变量用于结构赋值
let x;
({x} = {x: 1});
// console.log(x);
// ---
// 解构赋值允许等号左边的模式之中，不放置任何变量名。
({} = [true, false]);
({} = 'abc');
({} = []);
// 上面的表达式虽然毫无意义，但是语法是合法的，可以执行。
// ---
// 由于数组本质是特殊的对象，因此可以对数组进行对象属性的解构。
let arr = [1, 2, 3];
let {0 : first, [arr.length - 1] : last} = arr;
console.log(first) // 1
console.log(last) // 3


/**
 * 字符串结构
 */
// 字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。
// let [a, b, c, d, e] = 'hello';
// 类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值。
let {length: len} = 'hello';
// console.log(len);


/**
 * 数值和布尔值的解构赋值
 */
// 解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。
// 数值和布尔值的包装对象都有toString属性，因此变量s都能取到值
let {toString: s1} = 123;
// console.log(s1 === Number.prototype.toString);

let {toString: s2} = true;
// console.log(s2 === Boolean.prototype.toString);


/**
 *  函数参数结构
 */
// 函数参数结构
function move1([x, y]) {
    return x + y;
}
// move1([1, 2])

[[1, 2], [3, 4]].map(([x, y]) => x + y);

// 解构变量默认值
function move2({x = 0, y = 0} = {}) {
    return [x, y];
}
// move2({x: 1, y: 2})
// move2({x: 1})

// 函数参数默认值
function move3({x, y} = {x: 0, y: 0}) {
    return [x, y];
}
// move3({x: 1, y: 2})
// move3({x: 1})

// undefined 触发函数参数的默认值
[1, undefined, 3].map((x = 'yes') => x);