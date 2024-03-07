function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = []
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{Y as m}from"./framework.nyVnLald.js";function f(E={}){const{immediate:p=!1,onNeedRefresh:a,onOfflineReady:i,onRegistered:s,onRegisteredSW:l,onRegisterError:o}=E;let e,c,r;const u=async(g=!0)=>{await c,await(r==null?void 0:r())};async function w(){if("serviceWorker"in navigator){const{Workbox:g}=await m(()=>import("./workbox-window.prod.es5.DFjpnwFp.js"),__vite__mapDeps([]));e=new g("/FrontEnd-Engineering-Guide/sw.js",{scope:"/FrontEnd-Engineering-Guide/",type:"classic"}),r=async()=>{await(e==null?void 0:e.messageSkipWaiting())};{let t=!1;const d=()=>{t=!0,e==null||e.addEventListener("controlling",n=>{n.isUpdate&&window.location.reload()}),a==null||a()};e.addEventListener("installed",n=>{typeof n.isUpdate>"u"?typeof n.isExternal<"u"?n.isExternal?d():!t&&(i==null||i()):n.isExternal?window.location.reload():!t&&(i==null||i()):n.isUpdate||i==null||i()}),e.addEventListener("waiting",d),e.addEventListener("externalwaiting",d)}e.register({immediate:p}).then(t=>{l?l("/FrontEnd-Engineering-Guide/sw.js",t):s==null||s(t)}).catch(t=>{o==null||o(t)})}}return c=w(),u}export{f as registerSW};
