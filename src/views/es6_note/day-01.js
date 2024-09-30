// var a = [];
// var i;
// for (i = 0; i < 10; i++) {
//   a[i] = function () {
//     console.log(i);
//   };
// }
// a[6](); // 10

// console.log(i);



// for (let i = 0; i < 3; i++) {
//     console.log(i);
//     let i = 'abc';
//     console.log(i);
// }


// 'use strict'

// Object.freeze(obj) 冻结对象，返回一个冻结后的对象
const foo = Object.freeze({
    name: 'lee'
})
// 严格模式下，以下修改会报错，非严格模式下修改无效，不会报错
foo.name = 'lee2'

// console.log(foo)


// 无法冻结对象的属性
const foo1 = Object.freeze({
    obj: {
        name: 'old'
    }
})

// foo1.obj.name = 'new'
// console.log(foo1)

// 彻底冻结对对象
let constantize = (obj) => {
    Object.freeze(obj);
    Object.keys(obj).forEach((key, i) => {
        if(typeof obj[key] == 'object') {
            constantize(obj[key]);
        }
    })
}
// constantize(foo1)

foo1.obj.name = 'new'
// console.log(foo1)


let fun = new Function('return this')()
// console.log(fun)

// console.log(globalThis)


// 二、结构赋值
// let [foo, [[bar], baz]] = [1, [[2], 3]];
// foo // 1
// bar // 2
// baz // 3

// 解构赋值允许指定默认值。
// let [foo = true] = [];
// foo // true

// 注意，ES6 内部使用严格相等运算符（===），判断一个位置是否有值。
// 所以，只有当一个数组成员严格等于undefined，默认值才会生效。
// let [x = 1] = [undefined];
// x // 1 默认值生效
// let [y = 1] = [null];
// y // null 默认值不生效

let obj = {
    p: [
      'Hello',
      { y: 'World' }
    ]
};
let { p: [x, { y }] } = obj;
//   x // "Hello"
//   y // "World"
//  此时p是匹配模式，不是变量，因此不会被赋值

// 生成器函数  yield 返回值
function* fibs() {
    let a = 0;
    let b = 1;
    while (true) {
        yield a;
        [a, b] = [b, a + b];
    }
}
// 事实上，只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值。
let arr = fibs()
// let [first, second, third, fourth, fifth, sixth] = fibs();
let [a, d, f, g, h, j, k , l, p] = fibs();
// console.log(arr) // 5
// console.log(a, d, f, g, h, j, k , l, p)
// console.log(fibs().next())


function* fibs(index) {
    index += 10
    yield index;
}
const gen = fibs(10);
// console.log(gen.next().value)

// 函数参数结构
function move({x = 0 , y = 0} = {}) {
    return [x, y];
}

// console.log(move({x: 7, y: 8}))
// console.log(move({x: 7}))


// 链判断运算符 ?.


// 
// let user = {
//     id: ''
// }
// user.id |= 2;
// console.log(user)


let m = 0;
// m = m || 5;
m |= 5;
// console.log(m); // 输出: 5


// Symbol 数据类型
let bs = Symbol('m');
let objs = {
    bs: 1,
    b: 2,
}
objs[bs] = 3

// console.log(objs)
// console.log(objs[bs])
// console.log(objs.bs)

let bs1 = Symbol('m');
// console.log(bs == bs1)

let sys = Symbol(0);
// console.log(Boolean(sys))

const sym = Symbol('foo');
// console.log(sym)
// console.log(sym.toString())
// console.log(typeof sym)
// console.log(typeof sym.toString())
// 返回Symbol值的描述
// console.log(sym.description)

// 作为属性名的 Symbol
let mySym = Symbol()
let op = {};
op[mySym] = 'Hello!';
let op1 = {
    [mySym]: 'Hello!'
}
let op2 = {}
Object.defineProperty(op2, mySym, {value: 'Hello!'});

// Symbol 值作为对象属性名时，不能用点运算符。
op.mySym = 'Hello World'
// console.log(op[mySym]); // undefined
// console.log(op['mySym']); // "Hello World"

// 对象内部 使用Symbol值定义属性时，Symbol值必须放在方括号之中。
let s = Symbol();
let objj = {
    [s]: function (arg) {
        console.log(arg)
    }
}
objj[s](123)

// Symbol类型还可以用于定义一组常量，保证这组常量的值都是不相等的。
const log = {}
log.levels = {
    DEBUG: Symbol('debug'),
    INFO: Symbol('info'),
    WARN: Symbol('warn')
}
// console.log(log.levels.DEBUG, 'debug message');
// console.log(log.levels.INFO, 'info message');

const COLOR_RED = Symbol();
const COLOR_GREEN = Symbol();
function getComplement(color) {
    switch (color) {
        case COLOR_RED:
            return COLOR_GREEN;
        case COLOR_GREEN:
            return COLOR_RED;
        default:
            throw new Error('Undefined color');
    }
}
// console.log(getComplement(COLOR_RED))


// Symbol.for()，Symbol.keyFor()
let ss1 = Symbol.for('foo');
let ss2 = Symbol.for('foo');

// console.log(ss1 === ss2); // true
// console.log(Symbol('foo') === Symbol('foo')); // false



function A() {
    this.loob = 'hello';
}
A.prototype.loou = 'world';

let Ad = new A();
let Ad1 = new A();
console.log(Ad)
console.log(Ad.loou)
console.log(Ad.loob)

Ad1.loob = 'hello World'

console.log(Ad)
console.log(Ad1)
console.log(Ad == Ad1);


