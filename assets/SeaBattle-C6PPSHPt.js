import{d as T,c as m,a as d,t as P,b as v,i as $,u as H,o as k,_ as N,r as l,j as V,w as y,k as j,p as R,l as U}from"./index-CboMY-I1.js";import{c as W,B as g,a as q,u as A,b as I}from"./BoardComponent-CE4Q2YC7.js";const z={class:"winner"},F=T({__name:"WinnerComponent",props:{winner:{}},setup(p){const h=H();return(s,o)=>(k(),m("div",z,[d("h2",null,P(s.winner==="player"?"Congratulations, you win!":"Unfortunately, you lost!"),1),v(W,{onClick:o[0]||(o[0]=u=>$(h).push("/")),value:"New game"})]))}}),G=N(F,[["__scopeId","data-v-6303b817"]]),D=p=>(R("data-v-43ad6452"),p=p(),U(),p),J={key:0},K={key:1,class:"container"},L={class:"boards"},O={class:"board"},Q=D(()=>d("p",null,"Player",-1)),X={class:"board"},Y=D(()=>d("p",null,"Enemy",-1)),Z=T({__name:"SeaBattle",setup(p){const h=H(),s=l(new g),o=l(new g),u=l("player"),n=l(null),r=l(null),c=l(null),E=e=>{u.value!=="enemy"&&(e.isMissed||e.isHitted||(o.value.attackShip(e),!e.ship&&(u.value="enemy")))},x=()=>{var t,f,w,S,B,b;let e=s.value.cells[Math.floor(Math.random()*99)];for(;(e.isMissed||e.isHitted)&&!c.value;)e=s.value.cells[Math.floor(Math.random()*99)];if(r.value&&!((t=r.value.ship)!=null&&t.dead)){const i=r.value,_=s.value.cells.filter(a=>{var M,C;if(!(a.isHitted||a.isMissed)&&(i.y===((M=n.value)==null?void 0:M.y)&&a.y===i.y&&(a.x==i.x-1||a.x==i.x+1||a.x==n.value.x-1||a.x==n.value.x+1)||i.x===((C=n.value)==null?void 0:C.x)&&a.x===i.x&&(a.y==i.y-1||a.y==i.y+1||a.y==n.value.y-1||a.y==n.value.y+1)))return a});_.length&&(e=_[Math.floor(Math.random()*_.length)])}if((w=(f=r.value)==null?void 0:f.ship)!=null&&w.dead&&(n.value=null,r.value=null),e.ship&&((B=(S=n.value)==null?void 0:S.ship)==null?void 0:B.id)!==((b=e.ship)==null?void 0:b.id)&&(n.value=e),e.ship&&(r.value=e),s.value.attackShip(e),e.ship){setTimeout(()=>{x()},500);return}setTimeout(()=>{u.value="player"},500)};return V(()=>{const e=new q,t=A.get();if(t===null)return h.push("/");s.value.cells=t,o.value.autoShipPlace(e.ships)}),y(u,()=>{u.value==="enemy"&&setTimeout(()=>{x()},500)}),y(o.value,()=>{o.value.cells.some(e=>{var t;return e.ship&&!((t=e.ship)!=null&&t.dead)})||setTimeout(()=>{c.value="player"},500)}),y(s.value,()=>{s.value.cells.some(e=>{var t;return e.ship&&!((t=e.ship)!=null&&t.dead)})||setTimeout(()=>{c.value="enemy"},500)}),j(()=>A.set([])),(e,t)=>c.value?(k(),m("div",J,[v(G,{winner:c.value},null,8,["winner"])])):(k(),m("div",K,[v(W,{onClick:t[0]||(t[0]=f=>$(h).push("/")),value:"Start over"}),d("div",L,[d("div",O,[Q,v(I,{board:s.value},null,8,["board"])]),d("div",X,[Y,v(I,{onAttack:E,enemy:"",board:o.value},null,8,["board"])])])]))}}),ae=N(Z,[["__scopeId","data-v-43ad6452"]]);export{ae as default};