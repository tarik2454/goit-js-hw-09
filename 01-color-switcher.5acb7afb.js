const e=document.querySelector("[data-start]"),t=document.querySelector("[data-stop]");let d=null;e.addEventListener("click",(function(){e.disabled=!0,t.disabled=!1,d=setInterval((()=>{document.body.style.background=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3)})),t.addEventListener("click",(function(){clearInterval(d),e.disabled=!1,t.disabled=!0}));
//# sourceMappingURL=01-color-switcher.5acb7afb.js.map
