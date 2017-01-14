require('babel-register')();

//To get the tests running we need to write a require 
//hook for node which intercepts all image required
//and returns mocked sources for Image components
const m = require('module');
const originalLoader = m._load;
 
m._load = function hookedLoader(request, parent, isMain) {
  if (request.match(/.jpeg|.jpg|.png$/)) {
    return { uri: request };
  }
 
  return originalLoader(request, parent, isMain);
};