一、let和const

// 'use strict'

// Object.freeze(obj) 冻结对象，返回一个冻结后的对象
const foo = Object.freeze({
    name: 'lee'
})
// 严格模式下，以下修改会报错，非严格模式下修改无效，不会报错
foo.name = 'lee2'

console.log(foo)

// 彻底冻结对对象函数
let constantize = (obj) => {
    Object.freeze(obj);
    Object.keys(obj).forEach((key, i) => {
        if(typeof obj[key] == 'object') {
            constantize(obj[key]);
        }
    })
}


ES2020 在语言标准的层面，引入 globalThis 作为顶层对象。也就是说，任何环境下，globalThis都是存在的，都可以从它拿到顶层对象，指向全局环境下的 this。
垫片库 global-this模拟了这个提案，可以在所有环境拿到 globalThis 。

二、解构赋值

// function*生成器函数  yield 返回值
function* fibs() {
    let a = 0;
    let b = 1;
    while (true) {
        yield a;
        [a, b] = [b, a + b];
    }
}

function* fibs(index) {
    index += 10
    yield index;
}
const gen = fibs(10);
console.log(gen.next().value)


三、Symbol 
object.getOwnPropertySymbols()方法， 可以获取指定对象的所有Symbol属性名，返回一个数组。
Reflect.ownKeys()方法可以返回所有类型的键名，包括常规键名和Symbol键名。
let obj = {
    [Symbol('my_key')]: 1,
    enum: 2,
    nonEnum: 3
}
Reflect.ownKeys(obj)
// ["enum", "nonEnum", Symbol(my_key)]

1.Symbol.for(), Symbol.keyFor()
Symbol.for()方法会根据给定的键，从全局Symbol注册表中查找对应的Symbol。如果找到了，就返回这个Symbol；否则，新建并注册一个以该字符串为名称的
Symbol.for('foo') === Symbol.for('foo') // true

Symbol.keyFor() 方法返回一个已登记的Symbol类型值的key。
const ss1 = Symbol.for('foo');
Symbol.keyFor(ss1) // "foo"
const ss2 = Symbol('foo');
Symbol.keyFor(ss2) // undefined