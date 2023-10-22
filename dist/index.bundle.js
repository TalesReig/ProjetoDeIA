(()=>{"use strict";var a,o=function(a,o){this.coordenada=a,this.pai=o},n=function(){function a(a){this.rotas=a}return a.prototype.busca=function(a,n){var t=new o(a,null),r=[t],e=new Set;e.add(t.coordenada);for(var x=1,i=0,c=null;r.length>0&&null===c;){var s=r.shift();if(i++,this.isPrateleira(s.coordenada)){if(s.coordenada===n){c=s;break}}else for(var u=0,l=this.rotas.rotas[s.coordenada]||[];u<l.length;u++){var d=l[u];if(d===n){x++;var f=new o(d,s);e.add(d),c=f}else e.has(d)||(x++,f=new o(d,s),r.push(f),e.add(d))}}return[c,x,i]},a.prototype.isPrateleira=function(a){return!a.includes("x")},a.prototype.pegaCaminho=function(a,o,n){var t=[];if(null===a)console.log("Solução não encontrada.");else for(console.log("***Rota encontrada***");null!==a;)console.log(a.coordenada),t.push(a.coordenada),a=a.pai;return console.log("Vertices visitados: ",o),console.log("Vertices expandidos: ",n),t},a}(),t=function(a,o,n){this.caminho=a,this.qtdVisitados=o,this.qtdExpandidos=n},r=(a=function(o,n){return a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,o){a.__proto__=o}||function(a,o){for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(a[n]=o[n])},a(o,n)},function(o,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function t(){this.constructor=o}a(o,n),o.prototype=null===n?Object.create(n):(t.prototype=n.prototype,new t)});const e=function(a){function o(){return null!==a&&a.apply(this,arguments)||this}return r(o,a),o.prototype.realizaBusca=function(a,o){var n=this.busca(a,o),r=n[0],e=n[1],x=n[2],i=this.pegaCaminho(r,e,x);return new t(i,e,x)},o}(n);var x=function(){var a=function(o,n){return a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(a,o){a.__proto__=o}||function(a,o){for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(a[n]=o[n])},a(o,n)};return function(o,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function t(){this.constructor=o}a(o,n),o.prototype=null===n?Object.create(n):(t.prototype=n.prototype,new t)}}();const i=function(a){function n(){return null!==a&&a.apply(this,arguments)||this}return x(n,a),n.prototype.realizaBusca=function(a,o){var n=this.buscaProfundidade(a,o),r=n[0],e=n[1],x=n[2],i=this.pegaCaminho(r,e,x);return new t(i,e,x)},n.prototype.buscaProfundidade=function(a,n){if(a===n)return[null,0,0];for(var t=[new o(a,null)],r=new Set,e=1,x=0,i=null;t.length>=0&&null===i;){var c=t.pop();x++,r.add(c.coordenada);for(var s=0,u=this.rotas.rotas[c.coordenada];s<u.length;s++){var l=u[s];if(l===n){e++;var d=new o(l,c);r.add(l),i=d}else if(r.has(l))e++,d=new o(l,c),t.push(d),r.add(l);else{e++;d=new o(l,c);t.push(d)}}}return[i,e,x]},n}(n);var c,s=function(){function a(a){this.dicPrateleiraParaCoordenada={},this.rotas=a,this.inicializaDic()}return a.prototype.inicializaDic=function(){for(var a=1;a<=100;a++){var o=void 0;a>=1&&a<=10?o="0x"+a:a>=11&&a<=20?o="2x"+(a-10):a>=21&&a<=30?o="3x"+(a-20):a>=31&&a<=40?o="5x"+(a-30):a>=41&&a<=50?o="6x"+(a-40):a>=51&&a<=60?o="8x"+(a-50):a>=61&&a<=70?o="9x"+(a-60):a>=71&&a<=80?o="11x"+(a-70):a>=81&&a<=90?o="12x"+(a-80):a>=91&&a<=100&&(o="14x"+(a-90)),this.dicPrateleiraParaCoordenada[a.toString()]=o}},a.prototype.realizaBusca=function(a,o){var n=this.busca(a,o,[]),r=n.resultado,e=n.qtdVisitados,x=n.qtdExpandidos,i=this.pegaCaminho(r,e,x);return new t(i,e,x)},a.prototype.calculaDistancia=function(a,o){var n=this.dicPrateleiraParaCoordenada[o],t=a.split("x").map(Number),r=t[0],e=t[1],x=n.split("x").map(Number),i=x[0],c=x[1],s=Math.abs(i-r),u=Math.abs(c-e);return Math.sqrt(Math.pow(s,2)+Math.pow(u,2))},a.prototype.busca=function(a,o,n){var t=this.calculaDistancia(a,o),r=new u(a,null,0,t);n.push(r);for(var e=1,x=0,i=null;0!==n.length;){if(n.sort((function(a,o){return a.fn-o.fn})),(r=n.shift()).coordenada===o){i=r;break}if(!this.ehPrateleira(r.coordenada)){x+=1;var c=this.geraFilhos(r,o,n,e);n=c.newFronteira,e=c.newQtdVisitados}}return{resultado:i,qtdVisitados:e,qtdExpandidos:x}},a.prototype.ehPrateleira=function(a){return!a.includes("x")},a.prototype.ehAncestral=function(a,o){for(;null!==o;){if(a===o.coordenada)return!0;o=o.pai}return!1},a.prototype.geraFilhos=function(a,o,n,t){for(var r=0,e=this.rotas.rotas[a.coordenada];r<e.length;r++){var x=e[r];if(null===a.pai||!this.ehAncestral(x,a.pai))if(t+=1,this.ehPrateleira(x)){if(x===o){var i=new u(x,a,a.gn,0);n.push(i)}}else{var c=this.calculaDistancia(x,o),s=c,l=new u(x,a,a.gn+c,s);n.push(l)}}return{newFronteira:n,newQtdVisitados:t}},a.prototype.pegaCaminho=function(a,o,n){if(null===a)console.log("Solução não encontrada.");else{console.log("***Rota encontrada***");for(var t=[];null!==a;)t.push(a.coordenada+" - "+a.gn),a=a.pai;t.reverse();for(var r=0,e=t;r<e.length;r++){var x=e[r];console.log(x)}}return console.log("Estados visitados: ",o),console.log("Estados expandidos: ",n),[]},a}(),u=function(){function a(a,o,n,t){this.coordenada=a,this.pai=o,this.gn=n,this.hn=t}return Object.defineProperty(a.prototype,"fn",{get:function(){return this.hn},enumerable:!1,configurable:!0}),a}();!function(a){a[a.BuscaLargura=0]="BuscaLargura",a[a.BuscaProfundidade=1]="BuscaProfundidade",a[a.BuscaHeuristica=2]="BuscaHeuristica"}(c||(c={}));var l=function(a,o){this.coordenada=a,this.nome=o},d=new l("0x12","R1"),f=new l("1x12","R2"),p=new l("2x12","R3"),h=new l("3x12","R4"),v=new l("4x12","R5"),g=new function(){this.rotas={"0x0":["1x0"],"1x0":["0x0","1x1","2x0"],"2x0":["1x0","3x0"],"3x0":["2x0","4x0"],"4x0":["3x0","4x1","5x0"],"5x0":["4x0","6x0"],"6x0":["5x0","7x0"],"7x0":["6x0","7x1","8x0"],"8x0":["7x0","9x0"],"9x0":["8x0","10x0"],"10x0":["9x0","10x1","11x0"],"11x0":["10x0","12x0"],"12x0":["11x0","13x0"],"13x0":["12x0","13x1","13x0"],"14x0":["13x0"],"1x1":["1","1x2","11","1x0"],"4x1":["21","4x2","31","4x0"],"7x1":["41","7x2","51","7x0"],"10x1":["61","10x2","71","10x0"],"13x1":["81","13x2","91","13x0"],"1x2":["2","1x3","12","1x1"],"4x2":["22","4x3","32","4x1"],"7x2":["42","7x3","52","7x1"],"10x2":["62","10x3","72","10x1"],"13x2":["82","13x3","92","13x1"],"1x3":["3","1x4","13","1x2"],"4x3":["23","4x4","33","4x2"],"7x3":["43","7x4","53","7x2"],"10x3":["63","10x4","73","10x2"],"13x3":["83","13x4","93","13x2"],"1x4":["4","1x5","14","1x3"],"4x4":["24","4x5","34","4x3"],"7x4":["44","7x5","54","7x3"],"10x4":["64","10x5","74","10x3"],"13x4":["84","13x5","94","13x3"],"1x5":["5","1x6","15","1x4"],"4x5":["25","4x6","35","4x4"],"7x5":["45","7x6","55","7x4"],"10x5":["65","10x6","75","10x4"],"13x5":["85","13x6","95","13x4"],"1x6":["6","1x7","16","1x5"],"4x6":["26","4x7","36","4x5"],"7x6":["46","7x7","56","7x5"],"10x6":["66","10x7","76","10x5"],"13x6":["86","13x7","96","13x5"],"1x7":["7","1x8","17","1x6"],"4x7":["27","4x8","37","4x6"],"7x7":["47","7x8","57","7x6"],"10x7":["67","10x8","77","10x6"],"13x7":["87","13x8","97","13x6"],"1x8":["8","1x9","18","1x7"],"4x8":["28","4x9","38","4x7"],"7x8":["48","7x9","58","7x7"],"10x8":["68","10x9","78","10x7"],"13x8":["88","13x9","98","13x7"],"1x9":["9","1x10","19","1x8"],"4x9":["29","4x10","39","4x8"],"7x9":["49","7x10","59","7x8"],"10x9":["69","10x10","79","10x8"],"13x9":["89","13x10","99","13x8 "],"1x10":["10","1x11","20","1x9"],"4x10":["30","4x11","40","4x9"],"7x10":["50","7x11","60","7x9"],"10x10":["70","10x11","80","10x9"],"13x10":["90","13x11","100","13x9"],"0x11":["0x12","1x11"],"1x11":["0x11","1x12","2x11","1x10"],"2x11":["1x11","2x12","3x11"],"3x11":["2x11","3x12","4x11"],"4x11":["3x11","4x12","5x11","4x10"],"5x11":["4x11","6x11"],"6x11":["5x11","7x11"],"7x11":["6x11","8x0","7x10"],"8x11":["7x11","9x11"],"9x11":["8x11","10x11"],"10x11":["9x11","11x11","10x10"],"11x11":["10x11","12x11"],"12x11":["11x11","13x11"],"13x11":["12x0","13x1","14x0"],"14x11":["13x11"],"0x12":["0x11","1x12"],"1x12":["0x12","1x11","2x12"],"2x12":["1x12","2x11","3x12"],"3x12":["2x12","3x11","4x12"],"4x12":["3x12","4x11"]}},y=new e(g),w=new i(g),m=new s(g);function B(a,o,n,t,r){a.robo=d,o.robo=f,n.robo=p,t.robo=h,r.robo=v}function b(a){var o=a[0];return a.forEach((function(a){o.caminho.length>a.caminho.length&&(o.caminho=a.caminho,o=a)})),o}var P=document.getElementById("calcularBtn");null==P||P.addEventListener("click",(function(){var a=document.getElementById("algoritmo"),o=document.getElementById("prateleira"),n=(null==a?void 0:a.value)||"",r=(null==o?void 0:o.value)||"",e=new t([],0,0);if("0"===n)e=function(a){var o=y.realizaBusca(d.coordenada,a),n=y.realizaBusca(f.coordenada,a),t=y.realizaBusca(p.coordenada,a),r=y.realizaBusca(h.coordenada,a),e=y.realizaBusca(v.coordenada,a);return B(o,n,t,r,e),b([o,n,t,r,e])}(r);else if("1"===n)e=function(a){var o=w.realizaBusca(d.coordenada,a),n=w.realizaBusca(f.coordenada,a),t=w.realizaBusca(p.coordenada,a),r=w.realizaBusca(h.coordenada,a),e=w.realizaBusca(v.coordenada,a);return B(o,n,t,r,e),b([o,n,t,r,e])}(r);else{if("2"!==n)return void alert("Por favor, selecione um algoritmo válido (0, 1 ou 2).");e=function(a){var o=m.realizaBusca(d.coordenada,a),n=m.realizaBusca(f.coordenada,a),t=m.realizaBusca(p.coordenada,a),r=m.realizaBusca(h.coordenada,a),e=m.realizaBusca(v.coordenada,a);return B(o,n,t,r,e),b([o,n,t,r,e])}(r)}var x="Algoritmo escolhido: ".concat(c[parseInt(n,10)],"\n    \nPrateleira escolhida: ").concat(r,"\n    \nRobo mais Próximo: ").concat(e.robo.nome,"\n    \nCaminho: ").concat(e.caminho,"\n    \nQuantidade vertices visitados: ").concat(e.qtdVisitados,"\n    \nQuantidade vertices expandidos: ").concat(e.qtdExpandidos),i=document.getElementById("resultado");i&&(i.value=x)})),w.realizaBusca("0x12","10")})();
//# sourceMappingURL=index.bundle.js.map