function Singleton() {
    this.name = 'Singleton'
}

if(!global._sing) {
    global._sing = new Singleton();
}
console.log(global._sing)
// module.exports = global._sing;

module.exports = global._sing;


// let singletonInstance = null;
// function initSing() {
//     if(!singletonInstance) {
//         singletonInstance = new Singleton()
//     }
//     return singletonInstance;
// }

// module.exports = initSing();