(() => {
 const book=document.querySelector("#book"), page=document.querySelector("#turningPage");
 const next=document.querySelector("#nextPage"), prev=document.querySelector("#prevPage");
 const open=document.querySelector("#openBook"), status=document.querySelector("#pageStatus");
 const stage=document.querySelector("#bookStage"); let isOpen=false;
 function render(){page.classList.toggle("turned",isOpen);book.classList.toggle("is-open",isOpen);prev.disabled=!isOpen;next.disabled=isOpen;status.textContent=isOpen?"PÁGINA · 02 / 02":"CAPA · 01 / 02";open.textContent=isOpen?"Voltar à capa ↶":"Explorar o livro ↗";book.setAttribute("aria-label",isOpen?"Livro aberto, página 2":"Livro fechado, capa");}
 function flip(value){isOpen=value;render();}
 next.addEventListener("click",()=>flip(true));prev.addEventListener("click",()=>flip(false));
 open.addEventListener("click",()=>{flip(!isOpen);stage.scrollIntoView({behavior:"smooth",block:"center"});});
 book.addEventListener("click",()=>flip(!isOpen));book.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();flip(!isOpen);}});
 const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
 if(!reduce&&window.matchMedia("(hover: hover) and (pointer: fine)").matches){
 stage.addEventListener("pointermove",e=>{const r=stage.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;if(!isOpen)book.style.transform="rotateY("+(-21+x*12)+"deg) rotateX("+(5-y*8)+"deg) rotateZ("+(-5+x*3)+"deg)";});
 stage.addEventListener("pointerleave",()=>{book.style.transform="";});
 }
 render();
})();