webpackHotUpdate("static/development/pages/index.js",{

/***/ "./services/JarvisService.ts":
/*!***********************************!*\
  !*** ./services/JarvisService.ts ***!
  \***********************************/
/*! exports provided: JarvisStatus, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JarvisStatus", function() { return JarvisStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return JarvisService; });
/* harmony import */ var _babel_runtime_corejs2_core_js_object_values__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/values */ "./node_modules/@babel/runtime-corejs2/core-js/object/values.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_values__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_values__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash/debounce */ "./node_modules/lodash/debounce.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_4__);





var JarvisStatus;

(function (JarvisStatus) {
  JarvisStatus["Idle"] = "IDLE";
  JarvisStatus["Active"] = "ACTIVE";
  JarvisStatus["Listening"] = "LISTENING";
  JarvisStatus["Recognizing"] = "RECOGNIZING";
})(JarvisStatus || (JarvisStatus = {}));

var regexp = {
  HEY_JARVIS: /[J|T|G|D]arv/g,
  STOP: /(thank you)|(stop)/g
};
var grammars = {
  heyJarvis: "\n    #JSGF V1.0 utf-8 en;\n    grammar heyJarvis;\n\n    <hey> = /10/ hey | /0.2/ Hey | /0.2/ Hi | /0.2/ hi;\n    public <Jarvis> = /100/ Jarvis | /1/ Travis | /0/ Carlos | /0/ Bobby | /0/ drop it | /0/ Gabby | /0/ gummies;\n    <listening> = <hey>* <Jarvis>;\n  ",
  stop: "\n    #JSGF V1.0 utf-8 en;\n    grammar stop;\n\n    <stop> = stop <Jarvis>*;\n    <thank you> = thank you <Jarvis>*;\n    "
};

// TODO:
// [refactor]: handle if recognition is undefined
var JarvisService =
/*#__PURE__*/
function () {
  function JarvisService(props) {
    var _this = this;

    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, JarvisService);

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_3__["default"])(this, "props", void 0);

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_3__["default"])(this, "recognition", void 0);

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_3__["default"])(this, "onresult", lodash_debounce__WEBPACK_IMPORTED_MODULE_4___default()(function (event) {
      var _this$props = _this.props,
          status = _this$props.status,
          setStatus = _this$props.setStatus,
          setResponse = _this$props.setResponse;
      var target = event.results[event.resultIndex]; // run before anything when matches "stop grammar",
      // set jarvis status to "Idle"

      if (regexp.STOP.exec(target[0].transcript) && target.isFinal) {
        setStatus(JarvisStatus.Idle);
        return;
      }

      switch (status.current) {
        case JarvisStatus.Idle:
          {
            if (regexp.HEY_JARVIS.exec(target[0].transcript)) {
              console.log('setste');
              setStatus(JarvisStatus.Active);
            }

            break;
          }

        case JarvisStatus.Listening:
          {
            if (regexp.HEY_JARVIS.exec(target[0].transcript)) {
              setStatus(JarvisStatus.Active);
            } // listening suggestion


            console.log('listening');
            break;
          }
      }

      console.log(event); // setResponse({
      //   message: target[0].transcript,
      //   confidence: target[0].confidence,
      //   isFinal: target.isFinal,
      // });
    }, 100));

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_3__["default"])(this, "onstart", function () {
      return _this.props.setEnabled(true);
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_3__["default"])(this, "onend", function () {
      _this.props.setEnabled(false);

      _this.props.setStatus(JarvisStatus.Idle);
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_3__["default"])(this, "onerror", function (event) {
      console.error('error', event);
    });

    this.props = props; // @ts-ignore

    var Recognition = window.SpeechRecognition || webkitSpeechRecognition;
    this.recognition = new Recognition();
    this.initialize();
    this.recognition.onresult = this.onresult;
    this.recognition.onstart = this.onstart;
    this.recognition.onend = this.onend;
    this.recognition.onerror = this.onerror; // default enable jarvis service

    this.enable(); // setTimeout(() => this.props.setStatus(JarvisStatus.Active), 1000);
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(JarvisService, [{
    key: "initialize",
    value: function initialize() {
      if (this.recognition) {
        var speechGrammarList = this.generateGrammarList();
        this.recognition.grammars = speechGrammarList;
        this.recognition.lang = 'en-US';
        this.recognition.continuous = true; // continuous results are returned for each recognition

        this.recognition.interimResults = true;
      }
    }
  }, {
    key: "generateGrammarList",
    value: function generateGrammarList() {
      var SpeechGrammarList = // @ts-ignore
      window.SpeechGrammarList || webkitSpeechGrammarList;
      var speechGrammarList = new SpeechGrammarList();

      _babel_runtime_corejs2_core_js_object_values__WEBPACK_IMPORTED_MODULE_0___default()(grammars).forEach(function (grammar) {
        return speechGrammarList.addFromString(grammar, 10);
      });

      return speechGrammarList;
    } // tslint:disable

  }, {
    key: "enable",
    value: function enable() {
      this.recognition.start();
    }
  }, {
    key: "disable",
    value: function disable() {
      this.recognition.stop();
    }
  }]);

  return JarvisService;
}();



/***/ })

})
//# sourceMappingURL=index.js.22ca6aed5d63f9a32d6d.hot-update.js.map