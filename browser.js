const jsdom = require('jsdom');

export default (documentLoaded) => {
  
  // Mock Image class since it's not found by default in jsdom
  global.Image = class Image {
    get complete() {
      return true;
    }
  };

  global.navigator = {
    userAgent: 'node.js',
  };

  jsdom.env({
    html: '<html><head></head><body></body></html>',
    scripts: [
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyDprLBydJ0AZz3cuy-Z7aocRhv1BpW1-70&libraries=places',
    ],
    done: (err, win) => {
      global.window = win;
      global.document = win.document;
      global.google = win.google;

      // Add other common globals
      Object.keys(win).forEach((property) => {
        if (typeof global[property] === 'undefined') {
          global[property] = win[property];
        }
      });
      documentLoaded();
    },
  });
};