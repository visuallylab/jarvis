(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{"7lKP":function(t,n,e){(window.__NEXT_P=window.__NEXT_P||[]).push(["/contact-us",function(){var t=e("LOdK");return{page:t.default||t}}])},BJm1:function(t,n,e){"use strict";var o=e("vOnD");n.a=o.c.section.withConfig({displayName:"Section",componentId:"sc-1qfip17-0"})(["position:relative;width:100%;height:",";display:flex;flex-direction:",";justify-content:",";align-items:",";min-height:",";transition:0.5s;transform:",";"," z-index:1;"],function(t){return t.fullscreen?"100vh":"initial"},function(t){var n=t.row;return void 0!==n&&n?"row":"column"},function(t){return t.justifyContent||"center"},function(t){return t.alignItems||"center"},function(t){return t.fullscreen?"100vh":"initial"},function(t){return t.focus?"scale(1.05)":"inital"},function(t){return t.src&&"\n    background: url(".concat(t.src,") no-repeat center/cover;\n  ")})},C34g:function(t,n,e){"use strict";var o=e("vOnD");n.a=o.c.h2.withConfig({displayName:"Title",componentId:"sc-1yqcnqm-0"})(["font-size:3rem;font-weight:bold;margin-top:0;margin-bottom:1rem;letter-spacing:2.4px;line-height:1.3;transition:1s;transform:",";opacity:",";"],function(t){return void 0===t.focus||t.focus?"intial":"translateY(-30px)"},function(t){return void 0===t.focus||t.focus?"1":"0"})},CzwD:function(t,n,e){"use strict";var o=e("q1tI");n.a=function(){var t=Object(o.useRef)(0),n=Object(o.useState)({x:window.scrollX,y:window.scrollY,oldX:window.scrollX,oldY:window.scrollY}),e=n[0],i=n[1];return Object(o.useEffect)(function(){var n=function(){cancelAnimationFrame(t.current),t.current=requestAnimationFrame(function(){i(function(t){return{x:window.scrollX,y:window.scrollY,oldX:t.x,oldY:t.y}})})};return window.addEventListener("scroll",n,{capture:!1,passive:!0}),function(){cancelAnimationFrame(t.current),window.removeEventListener("scroll",n)}},[]),e}},GkJL:function(t,n,e){"use strict";var o=e("q1tI"),i=e.n(o),r=e("m/Pd"),c=e.n(r),a=e("vOnD"),l=e("o59O"),u=i.a.createElement,s=function(t){var n=t.children;return u(a.a,{theme:function(t){return t.color=t.colors.white,t.backgroundColor=t.colors.black,t}},u(i.a.Fragment,null,n))},m=i.a.createElement,d=function(t){var n=t.children;return m(a.a,{theme:function(t){return t.color=t.colors.lightBlack,t.backgroundColor=t.colors.white,t}},m(i.a.Fragment,null,n))},f=e("0RWw"),p=e("C/iq"),h=e("YFqc"),g=e.n(h),w=e("xQut"),b=e("r9c7"),v=e("cBaE"),y=e("k7Sn"),x=i.a.createElement,_=a.c.div.withConfig({displayName:"LogoTitle__Wrapper",componentId:"i5m0r8-0"})(["cursor:pointer;display:flex;align-items:center;height:100%;"]),C=a.c.img.withConfig({displayName:"LogoTitle__Logo",componentId:"i5m0r8-1"})(["height:95%;"]),O=a.c.p.withConfig({displayName:"LogoTitle__Title",componentId:"i5m0r8-2"})(["margin-left:0.8rem;font-weight:bold;letter-spacing:1px;color:",";font-size:",";"],function(t){return t.theme.colors.primary},function(t){return t.theme.fontSize.big}),I=function(t){var n=t.title,e=void 0===n?"VISUALLYLAB":n;return x(_,{onClick:function(){return y.Router.push("/")}},x(C,{src:Object(v.a)("/static/logo.svg")}),x(O,null,e))},k=e("CzwD"),j=i.a.createElement,N=a.c.header.withConfig({displayName:"Header__Container",componentId:"h8yxc3-0"})(["will-change:transform;position:fixed;z-index:",";top:0;left:0;right:0;height:50px;display:flex;padding:5px 4%;align-items:center;justify-content:space-between;border-bottom:solid 0.5px #979797;background-color:",";transition:all 0.3s ease-in;transform:",";","{height:54px;}","{height:60px;}"],function(t){return t.theme.z.high},function(t){return t.theme.backgroundColor},function(t){return t.hideUp?"translateY(-100%)":"none"},Object(b.a)("desktop"),Object(b.a)("largeDesktop")),S=a.c.ul.withConfig({displayName:"Header__RightWrapper",componentId:"h8yxc3-1"})(["display:flex;align-items:center;"]),z=a.c.li.withConfig({displayName:"Header__Section",componentId:"h8yxc3-2"})(["cursor:pointer;margin-right:0.5rem;color:",";letter-spacing:0.51px;&:hover{font-weight:400;}"],function(t){return t.theme.colors.primary}),q=function(){var t=Object(k.a)(),n=t.y,e=t.oldY;return Object(o.useMemo)(function(){return j(N,{hideUp:n>0&&n>e},j(I,null),j(S,null,j(g.a,{href:"/service"},j(z,null,"\u667a\u6167\u5546\u696d\u6c7a\u7b56\u65b9\u6848")),j(g.a,{href:"/demo"},j(w.a,null,"\u9ad4\u9a57"))))},[n>0&&n>e])},E=e("BJm1"),L=e("C34g"),F=e("RjlK"),Y=e("iQ1S"),B=i.a.createElement,D=Object(a.c)(E.a).withConfig({displayName:"Footer__StyledSection",componentId:"sc-1pb4xyu-0"})(["color:",";"],function(t){return t.theme.colors.white}),T=Object(a.c)(F.a).withConfig({displayName:"Footer__StyledSubTitle",componentId:"sc-1pb4xyu-1"})(["color:",";"],function(t){return t.theme.colors.white}),R=a.c.ul.withConfig({displayName:"Footer__Ul",componentId:"sc-1pb4xyu-2"})(["margin-top:3rem;"]),X=a.c.li.withConfig({displayName:"Footer__Li",componentId:"sc-1pb4xyu-3"})(["font-size:",";font-weight:400;letter-spacing:0.51px;padding:0;display:flex;align-items:center;margin-bottom:1rem;"],function(t){return t.theme.fontSize.bigger}),J=a.c.div.withConfig({displayName:"Footer__IconWrapper",componentId:"sc-1pb4xyu-4"})(["border:solid 1px white;width:2rem;height:2rem;border-radius:50%;margin-right:1rem;display:flex;align-items:center;justify-content:center;> img{width:70%;height:70%;}"]),K=a.c.div.withConfig({displayName:"Footer__Mask",componentId:"sc-1pb4xyu-5"})(["position:absolute;top:0;left:0;bottom:0;right:0;background-color:rgba(0,0,0,0.3);z-index:-1;"]),P=function(){return B(D,{fullscreen:!0,as:"footer",src:Object(v.a)("/static/images/bg-footer.jpg")},B(K,null),B(L.a,null,"\u6211\u5011\u671f\u8a31\u81ea\u5df1\u6253\u9020\u7684\u662f\u66f4\u8cbc\u8fd1\u4eba\u5fc3\u7684\u7522\u54c1"),B(T,null,"\u6211\u5011\u7684\u6280\u8853\u5c07\u7528\u4f86\u50b3\u905e\u66f4\u591a\u6eab\u6696\u3001\u66f4\u591a\u50f9\u503c\uff0c\u6253\u9020\u4eba\u6027\u5316\u7684\u79d1\u6280\u7522\u54c1\u3002"),B(R,null,B(X,null,B(J,null,B("img",{src:Object(v.a)("/static/images/home.svg")})),B("p",null,"\u53f0\u5317\u5e02\u57fa\u9686\u8def\u4e00\u6bb5186\u865f3\u6a13\u4e4b6")),B(X,null,B(J,null,B("img",{src:Object(v.a)("/static/images/mail.svg")})),B("a",{href:"contact@visuallylab.com"},"contact@visuallylab.com")),B(X,null,B(J,null,B("img",{src:Object(v.a)("/static/images/fb.svg")})),B("a",{href:"https://www.facebook.com/visuallylab/",target:"_blank"},"@visuallylab"))),B(Y.a,{color:"white"}))},A=i.a.createElement,Q=a.c.main.withConfig({displayName:"Home__Main",componentId:"sc-150psn7-0"})(["width:100vw;padding:0;"]);n.a=function(t){var n=t.mode,e=void 0===n?"light":n,o=t.children,i=t.title,r=void 0===i?p.b:i;return A("light"===e?d:s,null,A(Q,null,A(c.a,null,A("title",null,r)),A(q,null),o,A(P,null),A(f.a,null),A(l.a,null)))}},LOdK:function(t,n,e){"use strict";e.r(n);var o=e("ln6h"),i=e.n(o),r=e("2wwy"),c=e.n(r),a=e("O40h"),l=e("q1tI"),u=e.n(l),s=e("GkJL"),m=e("C/iq"),d=u.a.createElement,f=function(){return d(s.a,{mode:"light"},"contact-us")};f.getInitialProps=Object(a.a)(i.a.mark(function t(){return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",{namespacesRequired:c()(m.f)});case 1:case"end":return t.stop()}},t)})),n.default=f},RjlK:function(t,n,e){"use strict";var o=e("vOnD");n.a=o.c.h3.withConfig({displayName:"SubTitle",componentId:"fag5q5-0"})(["font-weight:500;color:",";font-size:",";margin-top:0;margin-bottom:0.5rem;letter-spacing:1.2px;transition:1s 0.4s;transform:",";opacity:",";"],function(t){return t.theme.colors.lightGrey},function(t){return t.theme.fontSize.big},function(t){return void 0===t.focus||t.focus?"intial":"translateY(-30px)"},function(t){return void 0===t.focus||t.focus?"1":"0"})},iQ1S:function(t,n,e){"use strict";var o=e("q1tI"),i=e.n(o),r=e("YFqc"),c=e.n(r),a=e("vOnD"),l=e("xQut"),u=e("r9c7"),s=i.a.createElement,m=Object(a.c)(l.a).withConfig({displayName:"ContactUsButton__StyledButton",componentId:"sc-11g7463-0"})(["margin-top:1rem;border-width:2px;font-size:",";padding:0.5rem 0;width:130px;","{width:160px;}"],function(t){return t.theme.fontSize.big},Object(u.a)("desktop"));n.a=function(t){var n=t.className,e=t.color,o=void 0===e?"white":e;return s(c.a,{href:"/contact-us"},s(m,{className:n,outline:!0,color:o},"\u806f\u7d61\u6211\u5011"))}},xQut:function(t,n,e){"use strict";var o=e("vOnD");n.a=o.c.button.withConfig({displayName:"Button",componentId:"sc-1xff8yy-0"})(["cursor:pointer;min-width:7rem;padding:0.5em;border-radius:30px;background-color:",";color:",";font-weight:400;letter-spacing:0.51px;transition:all 0.1s linear;white-space:nowrap;pointer-events:auto;&:hover{opacity:0.95;}&:active{transform:scale(1.05);}",""],function(t){return t.color||t.theme.colors.primary},function(t){return t.theme.colors.white},function(t){var n=t.color?t.color:"inherit";return t.outline&&"\n      border: solid 1px;\n      border-color: ".concat(n,";\n      background-color: transparent;\n      color: ").concat(n,";\n      :hover {\n        background-color: ").concat(n,";\n        color: ").concat("white"===t.color?t.theme.colors.lightBlack:t.theme.colors.white,";\n      }\n    ")})}},[["7lKP",1,0]]]);