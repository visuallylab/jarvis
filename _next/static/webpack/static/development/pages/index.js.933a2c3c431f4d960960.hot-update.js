webpackHotUpdate("static/development/pages/index.js",{

/***/ "./components/Jarvis/Listening.tsx":
/*!*****************************************!*\
  !*** ./components/Jarvis/Listening.tsx ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/asyncToGenerator */ "./node_modules/@babel/runtime-corejs2/helpers/esm/asyncToGenerator.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var react_spring__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-spring */ "./node_modules/react-spring/web.js");
/* harmony import */ var siriwave__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! siriwave */ "./node_modules/siriwave/dist/siriwave.m.js");
/* harmony import */ var _contexts_jarvisContext__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../contexts/jarvisContext */ "./contexts/jarvisContext.tsx");
/* harmony import */ var _services_JarvisService__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../services/JarvisService */ "./services/JarvisService.ts");









var Wrapper = Object(styled_components__WEBPACK_IMPORTED_MODULE_3__["default"])(react_spring__WEBPACK_IMPORTED_MODULE_4__["animated"].div).withConfig({
  displayName: "Listening__Wrapper",
  componentId: "sc-5n7f4t-0"
})(["position:absolute;top:2vh;right:2vw;width:84%;display:flex;flex-direction:column;align-items:center;border:solid 2px ", ";background:rgba(70,73,76,0.95);border-radius:", ";padding:8px;box-shadow:0px 0px 5px 2px #353535;p{margin:5px;}"], function (p) {
  return p.theme.colors.spaceGray;
}, function (p) {
  return p.theme.borderRadius;
});

var ListeningJarvis = function ListeningJarvis() {
  var wrapperRef = Object(react__WEBPACK_IMPORTED_MODULE_2__["useRef"])(null);
  var jarvisWave = Object(react__WEBPACK_IMPORTED_MODULE_2__["useRef"])(null);

  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_2__["useContext"])(_contexts_jarvisContext__WEBPACK_IMPORTED_MODULE_6__["JarvisContext"]),
      status = _useContext.status,
      response = _useContext.response,
      setStatus = _useContext.setStatus;

  var props = Object(react_spring__WEBPACK_IMPORTED_MODULE_4__["useSpring"])({
    transform: "translateX(".concat(status === _services_JarvisService__WEBPACK_IMPORTED_MODULE_7__["JarvisStatus"].Idle ? '150%' : '0%', ")"),
    onRest: function () {
      var _onRest = Object(_babel_runtime_corejs2_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])(
      /*#__PURE__*/
      _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log('rest', status);

                if (!(status === _services_JarvisService__WEBPACK_IMPORTED_MODULE_7__["JarvisStatus"].Active)) {
                  _context.next = 5;
                  break;
                }

                // when jarvis dialog show up, start listening
                jarvisWave.current.start();
                setStatus(_services_JarvisService__WEBPACK_IMPORTED_MODULE_7__["JarvisStatus"].Listening);
                return _context.abrupt("return");

              case 5:
                console.log(status);

                if (!(status === _services_JarvisService__WEBPACK_IMPORTED_MODULE_7__["JarvisStatus"].Idle)) {
                  _context.next = 9;
                  break;
                }

                jarvisWave.current.stop();
                return _context.abrupt("return");

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function onRest() {
        return _onRest.apply(this, arguments);
      }

      return onRest;
    }()
  });
  Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(function () {
    if (wrapperRef.current) {
      jarvisWave.current = new siriwave__WEBPACK_IMPORTED_MODULE_5__["default"]({
        container: document.getElementById('jarvis-wave'),
        width: wrapperRef.current.offsetWidth * 0.8,
        height: 40,
        style: 'ios9',
        amplitude: 3 // autostart: true,

      });
    }
  }, []);
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Wrapper, {
    style: props,
    ref: wrapperRef
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("b", null, "What can I help you ?...")), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    id: "jarvis-wave"
  }), react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("p", null, response.message));
};

/* harmony default export */ __webpack_exports__["default"] = (ListeningJarvis);

/***/ })

})
//# sourceMappingURL=index.js.933a2c3c431f4d960960.hot-update.js.map