import{d as T,c as p,b as v,i as A,u as H,o as h,_ as N,r as l,j as V,w as k,k as j,a as _,p as D,l as R}from"./index-Gt6MHzNn.js";import{c as W,B as $,a as U,u as g,b as I}from"./BoardComponent-fnaLOOzN.js";const q={class:"winner"},z={key:0},F={key:1},G=T({__name:"WinnerComponent",props:{winner:{}},setup(d){const f=H();return(s,o)=>(h(),p("div",q,[s.winner==="player"?(h(),p("div",z,"Congratulations, you won!")):(h(),p("div",F,"Unfortunately, you lost!")),v(W,{onClick:o[0]||(o[0]=u=>A(f).push("/")),value:"New game"})]))}}),J=N(G,[["__scopeId","data-v-eeaf0238"]]),E=d=>(D("data-v-08341b67"),d=d(),R(),d),K={key:0},L={key:1,class:"container"},O={class:"boards"},Q={class:"board"},X=E(()=>_("p",null,"Player",-1)),Y={class:"board"},Z=E(()=>_("p",null,"Enemy",-1)),ee=T({__name:"SeaBattle",setup(d){const f=H(),s=l(new $),o=l(new $),u=l("player"),n=l(null),r=l(null),c=l(null),P=e=>{u.value!=="enemy"&&(e.isMissed||e.isHitted||(o.value.attackShip(e),!e.ship&&(u.value="enemy")))},x=()=>{var t,y,w,B,S,b;let e=s.value.cells[Math.floor(Math.random()*99)];for(e=s.value.cells[12];(e.isMissed||e.isHitted)&&!c.value;)e=s.value.cells[Math.floor(Math.random()*99)];if(r.value&&!((t=r.value.ship)!=null&&t.dead)){const i=r.value,m=s.value.cells.filter(a=>{var M,C;if(!(a.isHitted||a.isMissed)&&(i.y===((M=n.value)==null?void 0:M.y)&&a.y===i.y&&(a.x==i.x-1||a.x==i.x+1||a.x==n.value.x-1||a.x==n.value.x+1)||i.x===((C=n.value)==null?void 0:C.x)&&a.x===i.x&&(a.y==i.y-1||a.y==i.y+1||a.y==n.value.y-1||a.y==n.value.y+1)))return a});m.length&&(e=m[Math.floor(Math.random()*m.length)])}if((w=(y=r.value)==null?void 0:y.ship)!=null&&w.dead&&(n.value=null,r.value=null),e.ship&&((S=(B=n.value)==null?void 0:B.ship)==null?void 0:S.id)!==((b=e.ship)==null?void 0:b.id)&&(n.value=e),e.ship&&(r.value=e),s.value.attackShip(e),e.ship){setTimeout(()=>{x()},500);return}setTimeout(()=>{u.value="player"},500)};return V(()=>{const e=new U,t=g.get();t!==null&&(s.value.cells=t,o.value.autoShipPlace(e.ships))}),k(u,()=>{u.value==="enemy"&&setTimeout(()=>{x()},500)}),k(o.value,()=>{o.value.cells.some(e=>{var t;return e.ship&&!((t=e.ship)!=null&&t.dead)})||setTimeout(()=>{c.value="player"},500)}),k(s.value,()=>{s.value.cells.some(e=>{var t;return e.ship&&!((t=e.ship)!=null&&t.dead)})||setTimeout(()=>{c.value="enemy"},500)}),j(()=>g.set([])),(e,t)=>c.value?(h(),p("div",K,[v(J,{winner:c.value},null,8,["winner"])])):(h(),p("div",L,[v(W,{onClick:t[0]||(t[0]=y=>A(f).push("/")),value:"Start over"}),_("div",O,[_("div",Q,[X,v(I,{board:s.value},null,8,["board"])]),_("div",Y,[Z,v(I,{onAttack:P,enemy:"",board:o.value},null,8,["board"])])])]))}}),se=N(ee,[["__scopeId","data-v-08341b67"]]);export{se as default};
