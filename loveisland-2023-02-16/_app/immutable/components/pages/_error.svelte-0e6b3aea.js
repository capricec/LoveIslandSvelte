import{S as g,i as _,s as f,k as h,q as c,l as v,m as $,r as l,h as b,b as E,F as p,u as m,B as d,K as S}from"../../chunks/index-99d287b0.js";import{s as q}from"../../chunks/singletons-c9d7fbeb.js";const x=()=>{const s=q;return{page:{subscribe:s.page.subscribe},navigating:{subscribe:s.navigating.subscribe},updated:s.updated}},k={subscribe(s){return x().page.subscribe(s)}};function y(s){let e,r=s[0].status+"",n,o,i=s[0].error.message+"",u;return{c(){e=h("h1"),n=c(r),o=c(": "),u=c(i)},l(a){e=v(a,"H1",{});var t=$(e);n=l(t,r),o=l(t,": "),u=l(t,i),t.forEach(b)},m(a,t){E(a,e,t),p(e,n),p(e,o),p(e,u)},p(a,[t]){t&1&&r!==(r=a[0].status+"")&&m(n,r),t&1&&i!==(i=a[0].error.message+"")&&m(u,i)},i:d,o:d,d(a){a&&b(e)}}}function B(s,e,r){let n;return S(s,k,o=>r(0,n=o)),[n]}let H=class extends g{constructor(e){super(),_(this,e,B,y,f,{})}};export{H as default};
