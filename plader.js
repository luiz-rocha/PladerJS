"use strict";

var _$ = (s) => document.querySelectorAll(s);

var app = {
  width: 300,
  height: 200,
  textColor: '#EEE',
  fontFamily: 'Arial',
  fontSize: 40,
  fontWeight: 'bold',
  text: 'IMAGE',
  bgColor: '#DDD',

  size: (s) => {
    app.width = s.split('x')[0];
    app.height = s.split('x')[1];
  },

  randomColor: () => '#' + ('00000' + (Math.random() * (1 << 24) | 0).toString(16)).slice(-6),

  color: (s) => s == 'random' ? app.randomColor() : s,

  params: {
    's': (s) => app.size(s),
    'size': (s) => app.size(s),

    'bg': (s) => app.bgColor = app.color(s),
    'background': (s) => app.bgColor = app.color(s),

    'fg': (s) => app.textColor = app.color(s),
    'foreground': (s) => app.textColor = app.color(s),

    'fs': (s) => app.fontSize = s,
    'font-size': (s) => app.fontSize = s,

    'ff': (s) => app.fontFamily = s,
    'font-family': (s) => app.fontFamily = s,

    'fw': (s) => app.fontWeight = s,
    'font-weight': (s) => app.fontWeight = s,

    't': (s) => app.text = s,
    'text': (s) => app.text = s
  },

  svg: () => `<svg width="${app.width}" height="${app.height}" xmlns="http://www.w3.org/2000/svg">
      <rect style="fill: ${app.bgColor};" width="${app.width}" height="${app.height}" x="0" y="0" />
      <text fill="${app.textColor}" font-family="${app.fontFamily}" font-size="${app.fontSize}" font-weight="${app.fontWeight}" x="50%" y="50%"
      text-anchor="middle" dominant-baseline="middle">${app.text}</text></svg>`,

  elements: () => _$('img[src^="plader.js"]'),

  encodeSVG: () => encodeURIComponent(
    app.svg()
      .replace(/[\t\n\r]/gim, '')
      .replace(/\s\s+/g, ' ')
      .replace(/'/gim, '\\i')
  ).replace(/\(/g, '%28')
    .replace(/\)/g, '%29'),

  run: () => {

    app.elements().forEach((e) => {

      var splittedURL = e.src.split('?');

      if (splittedURL.length > 1) {

        splittedURL.pop().split('/')
          .forEach((p) => {
            var splittedParam = p.split('=');

            var value = splittedParam.pop();
            var param = splittedParam.pop();

            try {
              app.params[param](value);
            } catch (_) {
              console.error(`Parameter [${param}] with value [${value}] is not suported!!`);
            }

          });
      }

      e.src = `data:image/svg+xml;charset=UTF-8,${app.encodeSVG()}`;

    });

  }
};

var runApp = (function runApp() {
  app.run();
}());