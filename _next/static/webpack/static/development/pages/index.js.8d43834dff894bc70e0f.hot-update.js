webpackHotUpdate("static/development/pages/index.js",{

/***/ "./components/Jarvis/Listening.tsx":
/*!*****************************************!*\
  !*** ./components/Jarvis/Listening.tsx ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var react_spring__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-spring */ "./node_modules/react-spring/web.js");
/* harmony import */ var siriwave__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! siriwave */ "./node_modules/siriwave/dist/siriwave.m.js");
/* harmony import */ var _contexts_jarvisContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../contexts/jarvisContext */ "./contexts/jarvisContext.tsx");
/* harmony import */ var _services_JarvisService__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/JarvisService */ "./services/JarvisService.ts");







var Wrapper = Object(styled_components__WEBPACK_IMPORTED_MODULE_1__["default"])(react_spring__WEBPACK_IMPORTED_MODULE_2__["animated"].div).withConfig({
  displayName: "Listening__Wrapper",
  componentId: "sc-5n7f4t-0"
})(["position:absolute;top:2vh;right:2vw;width:84%;display:flex;flex-direction:column;align-items:center;border:solid 2px ", ";background:rgba(70,73,76,0.95);border-radius:", ";padding:8px;box-shadow:0px 0px 5px 2px #353535;p{margin:5px;}"], function (p) {
  return p.theme.colors.spaceGray;
}, function (p) {
  return p.theme.borderRadius;
});

var ListeningJarvis = function ListeningJarvis() {
  var wrapperRef = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);
  var jarvisWave = Object(react__WEBPACK_IMPORTED_MODULE_0__["useRef"])(null);

  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(_contexts_jarvisContext__WEBPACK_IMPORTED_MODULE_4__["JarvisContext"]),
      status = _useContext.status,
      response = _useContext.response,
      setStatus = _useContext.setStatus;

  var props = Object(react_spring__WEBPACK_IMPORTED_MODULE_2__["useSpring"])({
    transform: "translateX(".concat(status === _services_JarvisService__WEBPACK_IMPORTED_MODULE_5__["JarvisStatus"].Idle ? '0%' : '0%', ")")
  });
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    if (jarvisWave.current) {
      if (status === _services_JarvisService__WEBPACK_IMPORTED_MODULE_5__["JarvisStatus"].Active && !jarvisWave.current.run) {
        console.log(status, '~~~~~~~~~~~~~~~~~~~~'); // when jarvis dialog show up, start listening

        jarvisWave.current.setSpeed(0.2);
        jarvisWave.current.setAmplitude(3);
        jarvisWave.current.start();
        setStatus(_services_JarvisService__WEBPACK_IMPORTED_MODULE_5__["JarvisStatus"].Listening);
        return;
      }

      console.log(status);

      if (status === _services_JarvisService__WEBPACK_IMPORTED_MODULE_5__["JarvisStatus"].Idle) {
        console.log(status, 'IDLE~~~~~~~~~~~~~~~~~~~~', jarvisWave.current);
        jarvisWave.current.stop();
        jarvisWave.current.setAmplitude(0);
        return;
      }
    }
  }, [status]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(function () {
    if (wrapperRef.current) {
      jarvisWave.current = new siriwave__WEBPACK_IMPORTED_MODULE_3__["default"]({
        container: document.getElementById('jarvis-wave'),
        width: wrapperRef.current.offsetWidth * 0.8,
        height: 40,
        style: 'ios9',
        amplitude: 3,
        autostart: true
      }); // siriwave has some bug so we need to autostart then stop immediately

      jarvisWave.current.stop();
      jarvisWave.current.setAmplitude(0);
    }
  }, []);
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Wrapper, {
    style: props,
    ref: wrapperRef
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", null, "What can I help you ?...")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    id: "jarvis-wave"
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, response.message));
};

/* harmony default export */ __webpack_exports__["default"] = (ListeningJarvis);

/***/ })

})
//# sourceMappingURL=index.js.8d43834dff894bc70e0f.hot-update.js.map