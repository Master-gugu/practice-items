const ss2 = require('./singleton');
console.log(ss2);
console.log(global);


const as = {
    a: '1',
    b: '2'
}
let a = Symbol('a');
as[a] = '6';
as['a'] = '12';
console.log(as)