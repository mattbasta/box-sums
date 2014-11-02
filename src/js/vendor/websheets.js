!function(e,t){function n(){this.sheets={},this.dependencies={}}function r(e){function t(){var n=e.substr(v);if(!n)return"EOF";var r,i;if(r=W.exec(n))return v+=r[0].length,t();if(r=A.exec(n))i=new a("boolean",r[0].toLowerCase());else if(r=k.exec(n))i=new a("string",JSON.parse(r[0]));else if(r=E.exec(n))i=new a("number",r[0]);else if(r=V.exec(n))i=new a("funcopen",r[1]);else if(r=D.exec(n))i=new a("sheetref",r[1]);else if(r=U.exec(n))i=new a("ident",r[0].toUpperCase());else if(r=N.exec(n))i=new a("rparen",")");else if(r=q.exec(n))i=new a("lparen","(");else if(r=R.exec(n))i=new a("binop_times",r[0]);else if(r=F.exec(n))i=new a("binop_add",r[0]);else if(r=P.exec(n))i=new a("binop_comp",r[0]);else if(r=O.exec(n))i=new a("comma",",");else if(r=L.exec(n))i=new a("percent","%");else{if(!(r=T.exec(n)))throw new SyntaxError("Unknown token: "+n);i=new a("colon",":")}return r&&(v+=r[0].length),i}function n(){return w=w||t()}function r(){var e=w||t();return w=null,e}function i(e){var t=n();return t&&t.type===e?r():null}function s(e){var t=r();if(t.type!==e)throw new SyntaxError("Expected "+e+", got "+t.type);return t}function h(){var e,t=n();if(t&&"-"===t.value?(t=!0,r()):t=!1,e=i("boolean"))return new o("boolean",{value:"true"===e.value});if(e=i("number")){var s=e.value,a=parseFloat(e.value);return i("percent")&&(s+="%",a/=100),new o("number",{value:a,raw:s})}if(e=i("string"))return new o("string",{value:e.value});if(e=i("ident")){var h=U.exec(e.value);return new o("identifier",{value:h[2]+h[4],pinRow:"$"===h[3],pinCol:"$"===h[1],raw:e.value})}throw new SyntaxError("Unrecognized primitive value")}function c(){var e=h();if(!e||"identifier"!==e.type)return e;if(i("colon")){var t=s("ident");e=new o("range",{start:e,end:new o("identifier",{value:t.value})})}return e}function u(){var e=i("funcopen");if(!e)return c();for(var t=[];n()&&!i("rparen");)t.length&&s("comma"),t.push(m());return new o("function",{name:e.value,args:t})}function l(){var e=i("sheetref");return e?new o("sheetlookup",{sheet:e.value,content:c()}):u()}function p(){if(!i("lparen"))return l();var e=m();return s("rparen"),e}function d(){var e=p(),t=i("binop_times");return t?new o("*"===t.value?"binop_mult":"/"===t.value?"binop_div":"binop_expon",{left:e,operator:t.value,right:d()}):e}function f(){var e=d(),t=i("binop_add");return t?new o("+"===t.value?"binop_add":"&"===t.value?"binop_concat":"binop_sub",{left:e,operator:t.value,right:f()}):e}function g(){var e=f(),t=i("binop_comp");if(!t)return e;var n;switch(t.value){case"<":n="binop_comp_lt";break;case"<=":n="binop_comp_lte";break;case">":n="binop_comp_gt";break;case">=":n="binop_comp_gte";break;case"=":n="binop_comp_eq";break;case"<>":n="binop_comp_neq"}return new o(n,{left:e,operator:t.value,right:g()})}function m(){return g()}if(e in $)return $[e].clone();var w,v=0,b=m();return e in Q?(Q[e]++,Q[e]>=j&&($[e]=b)):Q[e]=1,b}function i(e,t,n){I[n||t]=e[t].bind(e)}function s(e,t){for(var n,r=[],i=0;i<t.length;i++)n=t[i].run(sheet),n&&"object"==typeof n?r=r.concat(n):r.push(n);if(e=e.toLowerCase(),e in I)return I[e].apply(null,r);var s,a;switch(e){case"and":return r.map(_).reduce(function(e,t){return e&&t});case"average":return s=r.filter(b),s.length?s.reduce(m)/s.length:0;case"averagea":return r.map(_).reduce(m)/r.length;case"code":case"asc":return r[0].toString().charCodeAt(0)||0;case"chr":case"combin":return g(r[0])/g(r[0]-r[1]);case"concatenate":return r.reduce(function(e,t){return e.toString()+t.toString()});case"count":return r.filter(b).length;case"counta":return r.filter(function(e){return""!==e&&null!==e&&void 0!==e}).length;case"countblank":return r.filter(function(e){return""===e}).length;case"countif":return r.filter(function(e){return e==r[1]}).length;case"degrees":return 57.2957795*r[0];case"dollar":return"$"+v(0|r[0])+(r[1]?"."+parseFloat(r[0]).toFixed(r[1]).split(".")[1]:"");case"even":return 2*Math.ceil(r[0]/2);case"exact":return r[0].toString()===r[1].toString();case"fact":return g(r[0]);case"factdouble":return g(r[0],2);case"search":case"find":return r[1].toString().substr((r[2]||1)-1).indexOf(r[0].toString());case"fixed":return(r[2]?x:v)(r[0])+(r[1]?"."+parseFloat(r[0]).toFixed(r[1]).split(".")[1]:"");case"frequency":return r.slice(0,-1).filter(function(e){return e<=r[r.length-1]}).length;case"if":return r[0]?r[1]:r[2];case"isblank":return""===r[0]||null===r[0];case"iseven":return r[0]%2===0;case"isnottext":return"string"!=typeof r[0];case"isnumber":return"number"==typeof r[0];case"isodd":return r[0]%2!==0;case"istext":return"string"==typeof r[0];case"large":return r.slice(0,-1).sort().reverse()[r[r.length-1]];case"lower":case"lcase":return r[0].toString().toLowerCase();case"left":return r[0].toString().substr(0,r[1]||1);case"len":return r[0].toString().length;case"max":return Math.max.apply(Math,r.filter(b));case"maxa":return Math.max.apply(Math,r.map(_));case"median":return s=r.map(parseFloat).sort(),s.length%2===0?(s[(s.length-1)/2|0]+s[Math.ceil((s.length-1)/2)])/2:s[(s.length-1)/2];case"mid":return r[0].toString().substr((r[1]||1)-1,r[2]);case"min":return Math.min.apply(Math,r.filter(b));case"mina":return Math.min.apply(Math,r.map(_));case"mod":return r[0]%r[1];case"not":return!r[0];case"or":return r.reduce(function(e,t){return e||t});case"pi":return Math.PI;case"product":return r.reduce(function(e,t){return e*t});case"proper":return r[0].toString().split(/\s/).map(function(e){return e[0].toUpperCase()+e.substr(1)});case"quotient":return r[0]/r[1]|0;case"radians":return r[0]/57.2957795;case"randbetween":return Math.random()*(r[1]-r[0])+r[0];case"replace":return r[0].toString().substr(0,r[1]-1)+r[3].toString()+r[0].toString().substr(r[1]-1+r[2]);case"rept":return new Array(r[1]+1).join(r[0].toString());case"right":return r[0].toString().substr(-1*r[1]||-1);case"round":return Math.round(r[0]||0).toFixed(r[1]||0);case"fix":case"rounddown":return r[0]<0?Math.ceil(r[0]):Math.floor(r[0]);case"roundup":return r[0]>0?Math.ceil(r[0]):Math.floor(r[0]);case"sign":return r[0]/Math.abs(r[0])||0;case"space":return new Array(r[0]+1).join(" ");case"sqrtpi":return Math.sqrt(r[0]*Math.PI);case"stdev":return s=r.filter(b).map(_),a=s.reduce(m)/s.length,Math.sqrt(s.map(function(e){return Math.pow(e-a,2)}).reduce(m)/(s.length-1));case"stdeva":return s=r.map(_),a=s.reduce(m)/s.length,Math.sqrt(s.map(function(e){return Math.pow(e-a,2)}).reduce(m)/(s.length-1));case"stdevp":return s=r.filter(b).map(_),a=s.reduce(m)/s.length,Math.sqrt(s.map(function(e){return Math.pow(e-a,2)}).reduce(m)/s.length);case"stdevpa":return s=r.map(_),a=s.reduce(m)/s.length,Math.sqrt(s.map(function(e){return Math.pow(e-a,2)}).reduce(m)/s.length);case"t":case"str":return r[0].toString();case"sum":return r.map(_).reduce(m);case"upper":case"ucase":return r[0].toString().toUpperCase();case"value":case"val":return(/^\d+/.exec(r[0].toString().replace(/\s/g,""))||[""])[0];case"var":return s=r.filter(b).map(_),a=s.reduce(m)/s.length,s.map(function(e){return Math.pow(e-a,2)}).reduce(m)/(s.length-1);case"vara":return s=r.map(_),a=s.reduce(m)/s.length,s.map(function(e){return Math.pow(e-a,2)}).reduce(m)/(s.length-1);case"varp":return s=r.filter(b).map(_),a=s.reduce(m)/s.length,s.map(function(e){return Math.pow(e-a,2)}).reduce(m)/s.length;case"varpa":return s=r.map(_),a=s.reduce(m)/s.length,s.map(function(e){return Math.pow(e-a,2)}).reduce(m)/s.length}}function a(e,t){this.type=e,this.value=t}function o(e,t){this.type=e;for(var n in t)this[n]=t[n]}function h(e,t){for(var n=l(e.start.value),r=l(e.end.value),i=Math.min(n.row,r.row),s=Math.max(n.row,r.row),a=Math.min(n.col,r.col),o=Math.max(n.col,r.col),h=i;s>=h;h++)for(var c=a;o>=c;c++)t(h,c)}function c(t,n){this.elem=t,this.elem.className="websheet",n=C(n||{},X),M(this,n),this.columnWidths=[];for(var r=0;r<n.width;r++)this.columnWidths[r]=B;this.data=[],this.calculated=[],this.formatting=[],this.depUpdateQueue=null,this.dependencies={},this.dependants={},this.cellCache={},this.dragType=z,this.dragSource=null,d(e,"mouseup",this._windowMouseup=function(){this.dragType!==z&&(this.dragType=z,this.dragSource=null,this.elem.className="websheet")}.bind(this)),this.valueUpdates=new p,this.calculatedUpdates=new p,this.context=n.context||null,this.name=null}function u(e,t){var n,r="";e+=1;do n=t%26,t-=n,t/=26,r=String.fromCharCode(n+65)+r;while(t);return r+e}function l(e){if(e in Y)return Y[e];for(var t,n=/^([a-z]+)([0-9]+)$/i.exec(e),r=n[1],i=0;r;)t=r.charCodeAt(0)-65,i*=26,i+=t,r=r.substr(1);var s={col:i,row:n[2]-1};return Y[e]=s,s}function p(){var e={},t=[];this.fire=function(n){var r;for(r=0;r<t.length;r++)t[r].apply(null,arguments);if(n in e){var i=Array.prototype.slice.call(arguments,1);for(r=0;r<e[n].length;r++)e[n][r].apply(null,i)}};var n=this.on=function(t,n){t in e||(e[t]=[]),e[t].push(n)},r=this.onAll=function(t){name in e||(e[name]=[]),e[name].push(t)},i=this.off=function(t,n){if(t in e){var r=e[t].indexOf(n);-1!==r&&e[t].splice(r,1)}},s=this.offAll=function(e){var n=t.indexOf(e);-1!==n&&t[name].splice(n,1)};this.endpoint=function(e){return e=e||{},e.on=n,e.onAll=r,e.off=i,e.offAll=s,e}}function d(t,n,r){t.listeners=t.listeners||{},t.listeners[n]=t.listeners[n]||[],t.listeners[n].push(r),t.addEventListener(n,r,t!==e)}function f(t,n){t.listeners&&t.listeners[n]&&t.listeners[n].forEach(function(r){t.removeEventListener(n,r,t!==e)})}function g(e,t){return 2>e?e:e*g(e-(t||1))}function m(e,t){return e+t}function w(e){return e.reduce(function(e,t){return e+t},0)}function v(e){return e.toString().split(/(?=(?:\d\d\d)*$)/).join(",")}function b(e){return!S(parseFloat(e))}function y(e){var t=parseFloat(e);return S(t)?e:t}function _(e){var t=parseFloat(e);return S(t)?e?1:0:t}function x(e){return e}function M(e,t){t=t||{};for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e}function C(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=e[n]||t[n]);return e}function S(t){return e.isNaN(t)}n.prototype.register=function(e,t){this.sheets[t.toUpperCase()]=e,e.name=t},n.prototype.lookup=function(e,t){return e=e.toUpperCase(),e in this.sheets?this.sheets[e].getCalculatedValueAtID(t):null},n.prototype.setDependency=function(e,t,n,r,i){if(n=n.toUpperCase(),n in this.sheets){var s=e.name.toUpperCase()+"!"+t;this.dependencies[s]=this.dependencies[s]||[];var a=function(e,t){("value"!==t||"="!==e[0])&&i(e)};this.dependencies[s].push([n,r,a]),this.sheets[n].valueUpdates.on(r,a),this.sheets[n].calculatedUpdates.on(r,a)}},n.prototype.clearDependencies=function(e,t){var n=e.name.toUpperCase()+"!"+t;n in this.dependencies&&(this.dependencies[n].forEach(function(e){this.sheets[e[0]].valueUpdates.off(e[1],e[2]),this.sheets[e[0]].calculatedUpdates.off(e[1],e[2])},this),this.dependencies[n]=[])},c.WebSheetContext=n;var A=/^(true|false)/i,k=/^"([^\\]|\\.)*"/i,U=/^(\$?)(\w+)(\$?)(\d+)/i,E=/^((([1-9][0-9]*\.|0\.)[0-9]+)|([1-9][0-9]*)|0)/,R=/^(\/|\*|\^)/,F=/^(\+|\-|&)/,P=/^(<>|=|>=|<=|<|>)/,V=/^(\w+)\(/,D=/^(\w+)!/,N=/^\)/,q=/^\(/,O=/^,/,T=/^:/,L=/^%/,W=/^\s+/,j=10,Q={},$={},I={};i(Math,"abs"),i(Math,"acos"),i(Math,"acosh"),i(Math,"asin"),i(Math,"asinh"),i(Math,"atan"),i(Math,"atan2"),i(Math,"atanh"),i(Math,"ceil"),i(Math,"ceil","ceiling"),i(Math,"cos"),i(Math,"cosh"),i(Math,"exp"),i(Math,"floor","int"),i(Math,"floor"),i(Math,"log","ln"),i(Math,"log10","log10"),i(Math,"pow","power"),i(Math,"pow"),i(Math,"random","rand"),i(Math,"random"),i(Math,"sin"),i(Math,"sinh"),i(Math,"sqrt"),i(Math,"tan"),i(Math,"tanh"),i(String,"fromCharCode","char"),o.prototype.walk=function(e){if(e(this)!==!1)switch(this.type){case"range":return this.start.walk(e),void this.end.walk(e);case"function":return void this.args.forEach(function(t){t.walk(e)});case"sheetlookup":return void this.content.walk(e);case"binop_mult":case"binop_div":case"binop_add":case"binop_sub":case"binop_concat":case"binop_expon":this.left.walk(e),this.right.walk(e)}},o.prototype.toString=function(){switch(this.type){case"boolean":return this.value?"true":"false";case"string":return JSON.stringify(this.value);case"number":return this.raw.toString();case"identifier":return this.raw.toUpperCase();case"sheetlookup":return this.sheet+"!"+this.content.toString();case"range":return this.start.toString()+":"+this.end.toString();case"function":return this.name+"("+this.args.map(function(e){return e.toString()}).join(",")+")";case"binop_mult":return this.left.toString()+"*"+this.right.toString();case"binop_div":return this.left.toString()+"/"+this.right.toString();case"binop_add":return this.left.toString()+"+"+this.right.toString();case"binop_sub":return this.left.toString()+"-"+this.right.toString();case"binop_concat":return this.left.toString()+"&"+this.right.toString();case"binop_expon":return this.left.toString()+"^"+this.right.toString()}},o.prototype.clone=function(){switch(this.type){case"boolean":case"string":return new o(this.type,{value:this.value});case"number":return new o(this.type,{value:this.value,raw:this.raw});case"identifier":return new o(this.type,{value:this.value,pinRow:this.pinRow,pinCol:this.pinCol,raw:this.raw});case"sheetlookup":return new o(this.type,{sheet:this.sheet,content:this.content.clone()});case"range":return new o(this.type,{start:this.start.clone(),end:this.end.clone()});case"function":return new o(this.type,{name:this.name,args:this.args.map(function(e){return e.clone()})});case"binop_mult":case"binop_div":case"binop_add":case"binop_sub":case"binop_concat":case"binop_expon":return new o(this.type,{left:this.left.clone(),right:this.right.clone()})}},o.prototype.adjust=function(e,t){this.walk(function(n){if("identifier"===n.type){var r=l(n.value),i=r.row+(n.pinRow?0:e),s=r.col+(n.pinCol?0:t);n.value=u(i,s);var a=U.exec(n.value);n.raw=(n.pinCol?"$":"")+a[2]+(n.pinRow?"$":"")+a[4]}})},o.prototype.findCellDependencies=function(e){this.walk(function(t){if("identifier"===t.type)e(t.value);else if("range"===t.type)h(t,function(t,n){e(u(t,n))});else if("sheetlookup"===t.type)return!1})},o.prototype.findSheetDependencies=function(e){this.walk(function(t){return"sheetlookup"===t.type?(t.content.findCellDependencies(function(n){e(t.sheet,n)}),!1):void 0})},o.prototype.run=function(e){switch(this.type){case"boolean":case"number":case"string":return this.value;case"identifier":return e.getCalculatedValueAtID(this.value);case"sheetlookup":return this.content.run(e.getSheet(this.sheet));case"binop_mult":return this.left.run(e)*this.right.run(e);case"binop_div":return this.left.run(e)/this.right.run(e);case"binop_add":return parseFloat(this.left.run(e))+parseFloat(this.right.run(e));case"binop_sub":return this.left.run(e)-this.right.run(e);case"binop_concat":return this.left.run(e).toString()+this.right.run(e).toString();case"binop_expon":return Math.pow(this.left.run(e),this.right.run(e));case"binop_comp_lt":return parseFloat(this.left.run(e))<parseFloat(this.right.run(e));case"binop_comp_lte":return parseFloat(this.left.run(e))<=parseFloat(this.right.run(e));case"binop_comp_gt":return parseFloat(this.left.run(e))>parseFloat(this.right.run(e));case"binop_comp_gte":return parseFloat(this.left.run(e))>=parseFloat(this.right.run(e));case"binop_comp_eq":return this.left.run(e)==this.right.run(e);case"binop_comp_neq":return this.left.run(e)!=this.right.run(e);case"range":var t=[];return h(this,function(n,r){t.push(y(e.getCalculatedValueAtPos(n,r)))}),t}if("function"!==this.type)throw new TypeError("Unknown exression node");return s(this.name,this.args)},o.prototype.compile=function(){function e(e){var t=e.compile();return"num"===e.compiledReturnType()?t:"parseFloat("+t+")"}switch(this.type){case"boolean":case"number":case"string":return this.toString();case"identifier":return'sheet.getCalculatedValueAtID("'+this.value+'")';case"sheetlookup":return"(function(sheet){"+this.content.compile()+'}(sheet.getSheet("'+this.sheet+'")))';case"binop_mult":return"("+this.left.compile()+"*"+this.right.compile()+")";case"binop_div":return"("+this.left.compile()+"/"+this.right.compile()+")";case"binop_add":if(""===this.right.type)return"("+e(this.left)+"+"+e(this.right)+")";case"binop_sub":return"("+this.left.compile()+"-"+this.right.compile()+")";case"binop_concat":return"(("+this.left.compile()+").toString()+("+this.right.compile()+").toString())";case"binop_expon":return"Math.pow("+this.left.compile()+", "+this.right.compile()+")";case"binop_comp_lt":return"("+e(this.left)+" < "+e(this.right)+")";case"binop_comp_lte":return"("+e(this.left)+" <= "+e(this.right)+")";case"binop_comp_gt":return"("+e(this.left)+" > "+e(this.right)+")";case"binop_comp_gte":return"("+e(this.left)+" >= "+e(this.right)+")";case"binop_comp_eq":return"("+this.left.compile()+"=="+this.right.compile()+")";case"binop_comp_neq":return"("+this.left.compile()+"!="+this.right.compile()+")";case"range":var t=[];return h(this,function(e,n){t.push("parseNumMaybe(sheet.getCalculatedValueAtPos("+e+", "+n+"))")}),t.join(",");case"function":return'execFunc("'+this.name+'",['+this.args.map(function(e){return e.compile()}).join(",")+"])";default:throw new TypeError("Cannot compile unknown expression nodes")}},o.prototype.compiledReturnType=function(){switch(this.type){case"boolean":return"bool";case"number":return"num";case"string":return"str";case"identifier":return"mixed";case"sheetlookup":return"mixed";case"binop_mult":return"num";case"binop_div":return"num";case"binop_add":return"num";case"binop_sub":return"num";case"binop_concat":return"str";case"binop_expon":return"num";case"binop_comp_lt":return"bool";case"binop_comp_lte":return"bool";case"binop_comp_gt":return"bool";case"binop_comp_gte":return"bool";case"binop_comp_eq":return"bool";case"binop_comp_neq":return"bool";case"range":return"arr";case"function":return"mixed"}return"mixed"};var B=100,K=1,z=0,J=1,H=2,X={width:6,height:6};c.prototype.getSheet=function(e){if(!this.context)throw new Error("No context to extract sheet from");if(e=e.toUpperCase(),!(e in this.context.sheets))throw new Error("Undefined sheet requested");return this.context.sheet[e]},c.prototype.getCell=function(e){return e in this.cellCache?this.cellCache[e]:this.cellCache[e]=this.elem.querySelector('[data-id="'+e+'"]')},c.prototype.forceRerender=function(){var e=w(this.columnWidths);for(e+=K,this.elem.style.width=e+"px";this.elem.childNodes.length;)this.elem.removeChild(this.elem.firstChild);this.cellCache={};for(var n,r,i,s,a,o,h,c,l=[],p=0;p<this.height;p++){n=t.createElement("div"),n.style.width=e+"px",n.className="websheet-row",1>p&&(n.className+=" websheet-row-sticky"),this.elem.appendChild(n),r=this.data[p]||[],i=this.calculated[p]||[],s=this.formatting[p]||[];for(var d=0;d<this.width;d++)if(a=t.createElement("input"),a.className="websheet-cell",o=t.createElement("div"),o.className="websheet-cell-wrapper",o.style.width=this.columnWidths[d]-1+"px",o.appendChild(a),n.appendChild(o),a.value=i[d]||r[d]||"",a.setAttribute("data-id",a.title=u(p,d)),a.setAttribute("data-id-prev-col",u(p,d-1)),a.setAttribute("data-id-prev-row",u(p-1,d)),a.setAttribute("data-id-next-col",u(p,d+1)),a.setAttribute("data-id-next-row",u(p+1,d)),a.setAttribute("data-row",p),a.setAttribute("data-col",d),"="===a.value[0]&&l.push(this.setValueAtPosition.bind(this,p,d,a.value,!0)),h=s[d])for(c in h)h.hasOwnProperty(c)&&(a.style[c]=h[c])}this.initEvents(),l.forEach(function(e){e()})},c.prototype.getCalculatedValueAtID=function(e){var t=l(e);return this.getCalculatedValueAtPos(t.row,t.col)},c.prototype.getCalculatedValueAtPos=function(e,t){return y((this.calculated[e]||[])[t]||(this.data[e]||[])[t]||0)},c.prototype.getValueAtPos=function(e,t){return(this.data[e]||[])[t]||null},c.prototype.setValueAtPosition=function(e,t,n,r){var i=u(e,t),s=this.getCell(i);this.data[e]=this.data[e]||[],(this.data[e][t]!==n||r)&&(this.data[e][t]=n,this.calculated[e]&&delete this.calculated[e][t],this.clearDependants(i),this.valueUpdates.fire(i,n,"value"),"="===n[0]?this.calculateValueAtPosition(e,t,n.substr(1)):(this.updateDependencies(i),s&&(s.value=n)))},c.prototype.calculateValueAtPosition=function(e,t,n){if(n){var i,s=u(e,t),a=r(n);try{i=a.run(this),S(i)&&(i="#VALUE!")}catch(o){console.error(o),i="#ERROR!",a=null}this.calculated[e]=this.calculated[e]||[];var h=this.calculated[e][t]!==i;h&&(this.calculated[e][t]=i);var c=[];if(a&&(a.findCellDependencies(function(e){if(-1===c.indexOf(e)){c.push(e);var t;e in this.dependencies?(t=this.dependencies[e])&&-1===t.indexOf(s)&&t.push(s):this.dependencies[e]=[s]}}.bind(this)),this.context)){this.context.clearDependencies(this,s);var l=[];a.findSheetDependencies(function(r,i){if(this.context.sheets[r.toUpperCase()]){var a=r+"!"+i;-1===l.indexOf(a)&&(l.push(a),this.context.setDependency(this,s,r,i,function(){this.calculateValueAtPosition(e,t,n)}.bind(this)))}}.bind(this))}this.dependants[s]=c,this.getCell(s).value=i,h&&(this.updateDependencies(s),this.calculatedUpdates.fire(s,i,"calculated"))}},c.prototype.clearCell=function(e,t){var n=u(e,t),r=this.getCell(n);r&&(r.value="",e in this.data&&delete this.data[e][t],e in this.calculated&&delete this.calculated[e][t],this.clearDependants(n),this.dependants[n]=[])},c.prototype.loadData=function(e){for(;this.height<e.length;)this.addRow();for(;this.width<e[0].length;)this.addColumn();for(var t=0;t<e.length;t++){this.data[t]=this.data[t]||[];for(var n=0;n<e[t].length;n++)this.data[t][n]=e[t][n]}this.forceRerender()},c.parseExpression=function(e){return r(e)},c.prototype.clearDependants=function(e){var t=this.dependants[e];if(t){for(var n,r,i=0;i<t.length;i++)n=this.dependencies[t[i]],n&&(r=n.indexOf(e),-1!==r&&n.splice(r,1));this.context&&this.context.clearDependencies(this,e)}},c.prototype.updateDependencies=function(e){var t=this.dependencies[e];if(t){var n,r;if(this.depUpdateQueue)for(r=0;r<t.length;r++)-1===this.depUpdateQueue.indexOf(t[r])&&this.depUpdateQueue.push(t[r]);else{for(this.depUpdateQueue=t.concat([]),r=0;r<t.length;r++)this.depUpdateQueue.push(t[r]);for(;this.depUpdateQueue.length;)n=l(this.depUpdateQueue.shift()),this.calculateValueAtPosition(n.row,n.col,this.data[n.row][n.col].substr(1));this.depUpdateQueue=null}}},c.prototype.initEvents=function(){f(this.elem,"focus"),d(this.elem,"focus",this.onFocus.bind(this)),f(this.elem,"blur"),d(this.elem,"blur",this.onBlur.bind(this)),f(this.elem,"keyup"),d(this.elem,"keyup",this.onKeyup.bind(this)),f(this.elem,"keydown"),d(this.elem,"keydown",this.onKeydown.bind(this)),f(this.elem,"mousedown"),d(this.elem,"mousedown",this.onMousedown.bind(this)),f(this.elem,"mouseup"),d(this.elem,"mouseup",this.onMouseup.bind(this)),f(this.elem,"mouseover"),d(this.elem,"mouseover",this.onMouseover.bind(this))},c.prototype.onFocus=function(e){var t=0|e.target.getAttribute("data-row"),n=0|e.target.getAttribute("data-col");e.target.value=(this.data[t]||[])[n]||"",e.target.select(0,e.target.value.length),e.target.parentNode.className="websheet-cell-wrapper websheet-has-focus"},c.prototype.onBlur=function(e){var t=0|e.target.getAttribute("data-row"),n=0|e.target.getAttribute("data-col");this.setValueAtPosition(t,n,e.target.value),this.calculated[t]&&n in this.calculated[t]&&(e.target.value=this.calculated[t][n]),e.target.parentNode.className="websheet-cell-wrapper"},c.prototype.onKeydown=function(e){var t;37===e.keyCode&&0===e.target.selectionStart?t=this.getCell(e.target.getAttribute("data-id-prev-col")):39===e.keyCode&&e.target.selectionEnd===e.target.value.length&&(t=this.getCell(e.target.getAttribute("data-id-next-col"))),t&&(t.focus(),e.preventDefault())},c.prototype.onKeyup=function(e){var t;13===e.keyCode||40===e.keyCode?t=this.getCell(e.target.getAttribute("data-id-next-row")):38===e.keyCode&&(t=this.getCell(e.target.getAttribute("data-id-prev-row"))),t&&t.focus()},c.prototype.onMousedown=function(e){var t,n,r=e.target;if(r.classList.contains("websheet-has-focus")){if(e.preventDefault(),t=this.dragSource=r.firstChild.getAttribute("data-id"),n=l(t),this.setValueAtPosition(n.row,n.col,r.firstChild.value),e.layerX>r.clientWidth-10&&e.layerY>r.clientHeight-10)return void(this.dragType=H);this.dragType=J,this.elem.className+=" websheet-grabbing"}},c.prototype.onMouseup=function(e){var t,n,i,s=e.target;if(this.dragType&&s.classList.contains("websheet-cell"))if(n=l(this.dragSource),i=l(s.getAttribute("data-id")),this.dragType===J)this.setValueAtPosition(i.row,i.col,this.getValueAtPos(n.row,n.col)||""),this.clearCell(n.row,n.col),e.target.focus();else if(this.dragType===H&&(n.row===i.row||n.col===i.col)){var a,o,h=this.getValueAtPos(n.row,n.col)||"",c="="===h[0]&&r(h.substr(1));if(n.row===i.row)for(o=Math.min(n.col,i.col),t=o;t<=Math.max(n.col,i.col);t++)t!==n.col&&(c?(a=c.clone(),a.adjust(0,t-o),this.setValueAtPosition(n.row,t,"="+a.toString())):this.setValueAtPosition(n.row,t,h));else if(n.col===i.col)for(o=Math.min(n.row,i.row),t=o;t<=Math.max(n.row,i.row);t++)t!==n.row&&(c?(a=c.clone(),a.adjust(t-o,0),this.setValueAtPosition(t,n.col,"="+a.toString())):this.setValueAtPosition(t,n.col,h));else console.error("Cannot drag handle diagonally")}this.elem.className="websheet",this.dragType=0,this.dragSource=null;var u=this.elem.querySelectorAll(".websheet-cell-hover");for(t=0;t<u.length;t++)u[t].classList.remove("websheet-cell-hover")},c.prototype.onMouseover=function(e){if(this.dragType&&e.target.classList.contains("websheet-cell")){for(var t=[],n=this.elem.querySelectorAll(".websheet-cell-hover"),r=0;r<n.length;r++)t.push(n[r].firstChild.dataset.id);var i=e.target.dataset.id;if(i!==this.dragSource){if(this.dragType===H){var s,a,o=l(i),h=l(this.dragSource);if(o.col===h.col)for(r=Math.min(h.row,o.row);r<=Math.max(h.row,o.row);r++)s=u(r,h.col),-1!==(a=t.indexOf(s))?t.splice(a,1):this.getCell(s).parentNode.classList.add("websheet-cell-hover");else if(o.row===h.row)for(r=Math.min(h.col,o.col);r<=Math.max(h.col,o.col);r++)s=u(h.row,r),-1!==(a=t.indexOf(s))?t.splice(a,1):this.getCell(s).parentNode.classList.add("websheet-cell-hover")}else e.target.parentNode.classList.add("websheet-cell-hover");t.forEach(function(e){this.getCell(e).parentNode.classList.remove("websheet-cell-hover")},this)}}},c.prototype.addColumn=function(){this.width+=1,this.columnWidths.push(B),this.forceRerender()},c.prototype.addRow=function(){this.height+=1,this.data.push(new Array(this.width)),this.calculated.push(new Array(this.width)),this.formatting.push(new Array(this.width)),this.forceRerender()},c.prototype.insertColumnBefore=function(e){this.width+=1,this.columnWidths.splice(e,0,B);for(var t=0;t<this.height;t++)this.data[t]&&this.data[t].splice(e,0,null),this.calculated[t]&&this.calculated[t].splice(e,0,null),this.formatting[t]&&this.formatting[t].splice(e,0,null);this.forceRerender()},c.prototype.insertRowBefore=function(e){this.height+=1,this.data.splice(e,0,new Array(this.width)),this.calculated.splice(e,0,new Array(this.width)),this.formatting.splice(e,0,new Array(this.width)),this.forceRerender()},c.prototype.popColumn=function(){if(this.width<2)throw new Error("Cannot make spreadsheet that small");this.width-=1,this.columnWidths.pop();for(var e=0;e<this.height;e++)this.data[e]&&this.data[e].length>this.width&&this.data[e].pop(),this.calculated[e]&&this.calculated[e].length>this.width&&this.calculated[e].pop(),this.formatting[e]&&this.formatting[e].length>this.width&&this.formatting[e].pop();this.forceRerender()},c.prototype.popRow=function(){if(this.height<2)throw new Error("Cannot make spreadsheet that small");this.height-=1,this.data.pop(),this.calculated.pop(),this.formatting.pop(),this.forceRerender()},c.prototype.removeColumn=function(e){if(this.width<2)throw new Error("Cannot make spreadsheet that small");if(0>e||e>=this.width)throw new Error("Removing cells that do not exist");this.width-=1,this.columnWidths.splice(e,1);for(var t=0;t<this.height;t++)this.data[t]&&this.data[t].splice(e,1),this.calculated[t]&&this.calculated[t].splice(e,1),this.formatting[t]&&this.formatting[t].splice(e,1);this.forceRerender()},c.prototype.removeRow=function(e){if(this.height<2)throw new Error("Cannot make spreadsheet that small");if(0>e||e>=this.width)throw new Error("Removing cells that do not exist");this.height-=1,this.data.splice(e,1),this.calculated.splice(e,1),this.formatting.splice(e,1),this.forceRerender()};var Y={};e.define?e.define("websheet",function(){return c}):e.WebSheet=c}(window,document);
