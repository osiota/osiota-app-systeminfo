#!/usr/bin/env node

var si = require("./");

var node = {
	announce: ()=>{},
	publish: console.log,
};

si.init(node,{},{});
