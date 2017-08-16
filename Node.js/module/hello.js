'use strict';//严格模式

var s = 'Hello';

function greet1(name) {
    console.log(s + ', ' + name + '!');
}

module.exports = greet1;//把函数greet作为模块的输出暴露出去，这样其他模块就可以使用greet函数了。