'use strict';

// 引入hello模块（即使是当前路径也不要忘了写./）:
var greet = require('./hello');

var s = 'Michael';

greet(s); // Hello, Michael!
