(()=>{
const C=window.CONFIG||{},$=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const MSG={tow:"Hello MECHOTOW, I need emergency car towing.",heavy:"Hello MECHOTOW, I need heavy-duty towing.",road:"Hello MECHOTOW, I need roadside mechanic assistance.",home:"Hello MECHOTOW, I would like a home mechanic visit.",recovery:"Hello MECHOTOW, I need vehicle recovery.",mech:"Hello MECHOTOW, I would like to book a mechanic.",breakdown:"Hello MECHOTOW, my vehicle has broken down and I need assistance."};
const tel=(C.phone||"").replace(/[^\d+]/g,""),wa=(C.whatsapp||"").replace(/\D/g,"");
const ts=$("#ts");let tt;const toast=m=>{ts.textContent=m;ts.classList.add("on");clearTimeout(tt);tt=setTimeout(()=>ts.classList.remove("on"),4500)};
const waURL=t=>"https://wa.me/"+wa+"?text="+encodeURIComponent(t);
$$("[data-call]").forEach(a=>{if(tel)a.href="tel:"+tel;else a.addEventListener("click",e=>{e.preventDefault();toast("Phone number not configured yet. Add it in js/config.js.")})});
$$("[data-wa]").forEach(a=>{if(wa){a.href=waURL(a.dataset.msg||MSG[a.dataset.wa]||MSG.tow);a.target="_blank";a.rel="noopener"}else a.addEventListener("click",e=>{e.preventDefault();toast("WhatsApp number not configured yet. Add it in js/config.js.")})});
$$("[data-phone]").forEach(e=>{e.textContent=C.phone||"Phone number to be confirmed";if(!C.phone)e.classList.add("ph")});
$$("[data-area]").forEach(e=>{e.textContent=C.area||"Service area to be confirmed. Contact us with your location.";if(!C.area)e.classList.add("ph")});
$$("[data-hours]").forEach(e=>{e.textContent=C.hours||"Business hours to be confirmed.";if(!C.hours)e.classList.add("ph")});
$$("[data-addr]").forEach(e=>{if(C.address)e.textContent=C.address;else e.remove()});
const soc=$("#soc");if(soc)(C.social||[]).forEach(s=>{const a=document.createElement("a");a.href=s.url;a.textContent=s.name;a.target="_blank";a.rel="noopener";a.style.marginRight="12px";soc.append(a)});
const cb=$("#cfgBanner");if(cb&&(!tel||!wa)){cb.classList.add("on");cb.textContent="Setup note: "+[!tel&&"phone number",!wa&&"WhatsApp number"].filter(Boolean).join(" and ")+" not configured yet. Open js/config.js and add them to activate calling and WhatsApp."}
$$("[data-yr]").forEach(e=>e.textContent=new Date().getFullYear());
const ld=$("#ld");if(ld){const j=JSON.parse(ld.textContent);if(tel)j.telephone=tel;if(C.area&&!j.areaServed)j.areaServed=C.area;if(C.hours)j.openingHours=C.hours;if(C.address)j.address=C.address;if(C.siteUrl)j.url=C.siteUrl;ld.textContent=JSON.stringify(j)}
const hd=$("#hd"),bg=$("#bg"),lk=$("#lk"),cl=()=>{lk.classList.remove("open");bg.setAttribute("aria-expanded",false)};
const sc=()=>hd.classList.toggle("s",scrollY>30);sc();addEventListener("scroll",sc,{passive:true});
bg.onclick=()=>{const o=lk.classList.toggle("open");bg.setAttribute("aria-expanded",o)};
addEventListener("keydown",e=>{if(e.key==="Escape")cl()});$$("#lk a").forEach(a=>a.addEventListener("click",cl));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.1});$$(".rv").forEach(e=>io.observe(e));
const pi=$("[data-par]");if(pi&&!matchMedia("(prefers-reduced-motion:reduce)").matches)addEventListener("scroll",()=>{if(scrollY<900)pi.style.translate="0 "+scrollY*.05+"px"},{passive:true});
const fm=$("#fm");if(fm){const q=new URLSearchParams(location.search).get("service");if(q&&$("#s"))$("#s").value=q;
fm.addEventListener("submit",e=>{e.preventDefault();let ok=true,first;
[["n",v=>v.trim().length>1],["p",v=>v.replace(/\D/g,"").length>=7],["s",v=>v],["l",v=>v.trim().length>2],["d",v=>v.trim().length>3]].forEach(([id,f])=>{const el=$("#"+id),bad=!f(el.value),p=el.parentElement;p.classList.remove("bad");void el.offsetWidth;p.classList.toggle("bad",bad);el.setAttribute("aria-invalid",bad);if(bad){ok=false;first=first||el}});
if(!ok){first.focus();return}
if(!wa){toast("WhatsApp number not configured yet. Add it in js/config.js.");return}
const m="*MECHOTOW Service Inquiry*\nService: "+$("#s").selectedOptions[0].text+"\nName: "+$("#n").value.trim()+"\nPhone: "+$("#p").value.trim()+"\nLocation: "+$("#l").value.trim()+"\nVehicle: "+($("#v").value.trim()||"Not provided")+"\nProblem: "+$("#d").value.trim();
window.open(waURL(m),"_blank","noopener");toast("WhatsApp opened. Press Send there to deliver your message.")})}

const ddw=$(".dd"),ddb=$("#ddbtn");if(ddw){const pg=location.pathname.split("/").pop()||"index.html";if($$("#ddm a").some(a=>a.getAttribute("href")===pg))ddb.classList.add("cur");
const ct=o=>{ddw.classList.toggle("open",o);ddb.setAttribute("aria-expanded",o)};ddb.addEventListener("click",e=>{e.stopPropagation();ddw.classList.add("ready");ct(!ddw.classList.contains("open"))});
document.addEventListener("click",e=>{if(!ddw.contains(e.target))ct(false)});addEventListener("keydown",e=>{if(e.key==="Escape"){ct(false)}});}
const rl=$("#rvList");if(rl){const mk=(t,c,x)=>{const e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e},st=n=>"★".repeat(n)+"☆".repeat(5-n);
let L=(C.reviews||[]).filter(r=>r&&r.text&&r.name&&r.rating>=1&&r.rating<=5).sort((a,b)=>b.rating-a.rating),smp=false;
if(!L.length&&C.showSampleReviews){smp=true;L=[5,5,4,4,3].map((n,i)=>({name:"Sample Customer "+(i+1)+" (SAMPLE)",rating:n,text:"SAMPLE PREVIEW ONLY. This is placeholder text, not a real customer review.",service:"Placeholder"}));const sb=$("#rvSample");if(sb)sb.classList.add("on")}
if(!L.length){$("#rvEmpty").hidden=false}else{if(!smp)$("#rvSummary").hidden=false;const av=L.reduce((s,r)=>s+r.rating,0)/L.length;
$("#rvAvg").textContent=av.toFixed(1);$("#rvStars").textContent=st(Math.round(av));$("#rvCount").textContent="Based on "+L.length+" review"+(L.length>1?"s":"");
const bars=$("#rvBars");for(let n=5;n>=1;n--){const c=L.filter(r=>Math.round(r.rating)===n).length,r=mk("div","bar");r.append(mk("span","",n+"★"));const tr=mk("i"),f=mk("b");f.style.width=(c/L.length*100)+"%";tr.append(f);r.append(tr,mk("span","",c));bars.append(r)}
L.forEach((r,i)=>{const c=mk("article","rc rv");c.style.setProperty("--d",(i%3)*.1+"s");const s=mk("div","stars",st(Math.round(r.rating)));s.setAttribute("aria-label",r.rating+" out of 5 stars");c.append(s,mk("p","",r.text),mk("b","",r.name),mk("span","",[r.city,r.service].filter(Boolean).join(" · ")));rl.append(c);io.observe(c)})}}

$$("[data-map]").forEach(w=>{const q0=w.dataset.map||C.mapQuery||C.address||C.area||"Pakistan";const box=w.querySelector(".mapbox"),lnk=w.querySelector(".mapbar a");
const ld=document.createElement("div");ld.className="ml";ld.textContent="Loading map…";box.append(ld);
const load=q=>{box.querySelector("iframe")?.remove();const f=document.createElement("iframe");f.title="Map of "+q;f.loading="lazy";f.referrerPolicy="no-referrer-when-downgrade";f.allowFullscreen=true;f.src="https://www.google.com/maps?q="+encodeURIComponent(q)+"&output=embed";f.addEventListener("load",()=>{f.classList.add("ok");ld.remove()});box.append(f);if(lnk)lnk.href="https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(q)};
load(q0);w.querySelectorAll(".mchip").forEach(b=>b.addEventListener("click",()=>{w.querySelectorAll(".mchip").forEach(x=>x.setAttribute("aria-pressed",x===b));if(!box.querySelector(".ml")){box.append(ld)}load(b.dataset.q)}))});
})();