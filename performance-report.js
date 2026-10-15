/* FlowerLogix JN — Rendimiento de Producción: personas/grupo, año/semana/día y Labor/Tiempos */
(()=>{
"use strict";
const MODS={
 "siembra-campo":{unit:"esquejes",label:"Esquejes estimados",quantity:r=>{
   if(num(r.lineas)!==null&&num(r.densidad)!==null)return num(r.lineas)*num(r.densidad);
   return num(r.totalEsquejes??r.totalEsquejesSembrados??r.cantidad);
 }},
 "desbotonado-mallas":{unit:"tallos",label:"Tallos registrados",quantity:r=>num(r.tallos)},
 "corte":{unit:null,label:"Actividad registrada",quantity:()=>null},
 "bandejas-enraizamiento":{unit:"esquejes",label:"Esquejes sembrados",quantity:r=>num(r.cantidad??r.totalEsquejes??r.totalEsquejesSembrados)},
 "preparacion-camas":{unit:null,label:"Actividad registrada",quantity:()=>null}
};
const fmt=new Intl.NumberFormat("es-CO",{maximumFractionDigits:2});
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const normalize=v=>String(v??"").trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
const num=v=>v!==null&&v!==undefined&&v!==""&&Number.isFinite(Number(v))&&Number(v)>=0?Number(v):null;
const day=r=>String(r?.fecha??r?.fechaRegistro??"").slice(0,10);
const code=r=>String(r?.sembrador??r?.colaborador??r?.empleado??r?.codigo??r?.trabajador??r?.sembradorNombre??r?.colaboradorNombre??r?.empleadoNombre??r?.nombre??"").trim().toLowerCase();
const person=r=>String(r?.sembradorNombre??r?.colaboradorNombre??r?.empleadoNombre??r?.nombreColaborador??r?.trabajadorNombre??r?.nombre??r?.sembrador??r?.colaborador??r?.empleado??r?.codigo??"Sin identificar");
const dayPerson=r=>day(r)+"|"+code(r);
function weekKey(value){
 const dstr=typeof value==="object"?day(value):String(value??"");
 if(!/^\d{4}-\d{2}-\d{2}$/.test(dstr))return "";
 const d=new Date(dstr+"T12:00:00Z");if(!Number.isFinite(d.getTime()))return "";
 d.setUTCDate(d.getUTCDate()+3-(d.getUTCDay()+6)%7);
 const year=d.getUTCFullYear(),anchor=new Date(Date.UTC(year,0,4));
 anchor.setUTCDate(anchor.getUTCDate()+3-(anchor.getUTCDay()+6)%7);
 return year+"-S"+String(1+Math.round((d-anchor)/604800000)).padStart(2,"0");
}
function netHours(r){
 if(!r)return null;
 const minutes=k=>num(r[k])??0;
 const components=["horasExtraMin","horasExtra","desplazamientoMin","calisteniaMin","capacitacionMin","otrasLaboresMin","pMadresMin","pAbuelasMin"];
 if(!components.some(k=>num(r[k])!==null)){
   if(num(r.tiempoRealMin)!==null)return num(r.tiempoRealMin)/60;
   if(num(r.horasLaboralesMin)!==null)return num(r.horasLaboralesMin)/60;
   if(num(r.horasTrabajadas)!==null)return num(r.horasTrabajadas);
 }
 const extras=minutes("horasExtraMin")||minutes("horasExtra")*60;
 const categories=minutes("desplazamientoMin")+minutes("calisteniaMin")+minutes("capacitacionMin");
 const aggregate=num(r.otrasLaboresMin);
 const extraTasks=aggregate===null?
   minutes("pMadresMin")+minutes("pAbuelasMin"):Math.max(0,aggregate-categories);
 return Math.max(0,(435+extras-categories-extraTasks)/60);
}
function demoBandejas(){
 const labor=[
  {fecha:"2026-10-08",sembrador:"DEMO01",sembradorNombre:"Sembrador de prueba 1",bloque:"B1",cama:"C1",cantidad:1200},
  {fecha:"2026-10-08",sembrador:"DEMO01",sembradorNombre:"Sembrador de prueba 1",bloque:"B1",cama:"C2",cantidad:600},
  {fecha:"2026-10-08",sembrador:"DEMO02",sembradorNombre:"Sembrador de prueba 2",bloque:"B2",cama:"C3",cantidad:1000},
  {fecha:"2026-10-07",sembrador:"DEMO03",sembradorNombre:"Sembrador de prueba 3",bloque:"B3",cama:"C1",cantidad:850}];
 const times=[
  {fecha:"2026-10-08",sembrador:"DEMO01",horasExtraMin:30,desplazamientoMin:15,calisteniaMin:15,capacitacionMin:15,otrasLaboresMin:60},
  {fecha:"2026-10-08",sembrador:"DEMO02",horasExtraMin:15,desplazamientoMin:15,calisteniaMin:15,capacitacionMin:15,otrasLaboresMin:45},
  {fecha:"2026-10-07",sembrador:"DEMO03",horasExtraMin:0,desplazamientoMin:15,calisteniaMin:15,capacitacionMin:15,otrasLaboresMin:60}];
 return {labor,times};
}
function joinLabor(modId,labor,times){
 const config=MODS[modId],hoursByDay=new Map(),quantByDay=new Map(),rows=[];
 times.forEach(t=>{
  if(!day(t)||!code(t))return;
  hoursByDay.set(dayPerson(t),netHours(t)); // último ajuste del día
 });
 labor.forEach(r=>{
  const qty=config.quantity(r),key=dayPerson(r);
  if(qty!==null)quantByDay.set(key,(quantByDay.get(key)||0)+qty);
 });
 labor.forEach(r=>{
  const qty=config.quantity(r),key=dayPerson(r),logged=hoursByDay.get(key);
  const explicit=num(r.horasTrabajadas??r.horasEfectivas??r.horas);
  const hours=logged!==undefined && logged!==null?
   (qty!==null&&quantByDay.get(key)>0?logged*qty/quantByDay.get(key):
     (labor.filter(x=>dayPerson(x)===key).length===1?logged:null)):
   explicit;
  rows.push({...r,__rendQty:qty,__rendHours:hours,__rendRate:hours!==null&&hours>0&&qty!==null?qty/hours:null});
 });
 return rows;
}
function summary(labor,shownTimes,modId){
 const qty=labor.map(r=>r.__rendQty).filter(v=>v!==null),
       totalQty=qty.reduce((a,b)=>a+b,0);
 const matched=labor.filter(r=>r.__rendQty!==null&&r.__rendHours!==null&&r.__rendHours>0);
 const pairedQty=matched.reduce((s,r)=>s+r.__rendQty,0);
 const pairedHours=matched.reduce((s,r)=>s+r.__rendHours,0);
 const includedDayKeys=new Set(labor.map(dayPerson));
 const matchedTimes=shownTimes.filter(r=>includedDayKeys.has(dayPerson(r)));
 const uniqueHours=new Map();
 matchedTimes.forEach(r=>uniqueHours.set(dayPerson(r),netHours(r)));
 const actualHours=uniqueHours.size?[...uniqueHours.values()].filter(v=>v!==null).reduce((a,b)=>a+b,0):
   labor.reduce((s,r)=>s+(r.__rendHours??0),0);
 const known=uniqueHours.size?[...uniqueHours.values()].some(v=>v!==null):
   labor.some(r=>r.__rendHours!==null);
 return {records:labor.length,people:new Set(labor.map(code).filter(Boolean)).size,
   qty:qty.length?totalQty:null,rate:pairedHours>0?pairedQty/pairedHours:null,
   hours:known?actualHours:null};
}
function htmlTable(headers,rows,empty){
 return '<div class="module-tablewrap"><table class="module-table performance-table"><thead><tr>'+
 headers.map(x=>'<th>'+esc(x)+'</th>').join("")+'</tr></thead><tbody>'+
 (rows.length?rows.map(row=>'<tr>'+row.map(x=>'<td>'+esc(x)+'</td>').join("")+'</tr>').join(""):
  '<tr><td colspan="'+headers.length+'" class="module-empty">'+esc(empty)+'</td></tr>')+
 '</tbody></table></div>';
}
function displayLabor(mod,rows){
 if(mod==="bandejas-enraizamiento"){
  const h=["Fecha","Nombre del sembrador","Bloque","Cama","Total esquejes sembrados","Horas trabajadas","Promedio esquejes/hora"];
  const sums=new Map();
  rows.forEach(r=>{
   const k=JSON.stringify([day(r),code(r),r.bloque??"",r.cama??""]);
   if(!sums.has(k))sums.set(k,{fecha:day(r),name:person(r),bloque:r.bloque??"",cama:r.cama??"",qty:0,known:false,hours:0});
   const item=sums.get(k);item.qty+=r.__rendQty??0;
   if(r.__rendHours!==null){item.known=true;item.hours+=r.__rendHours;}
  });
  return {headers:h,rows:[...sums.values()].sort((a,b)=>b.fecha.localeCompare(a.fecha)).map(r=>
   [r.fecha,r.name,r.bloque,r.cama,fmt.format(r.qty),r.known?fmt.format(r.hours):"—",r.hours>0?fmt.format(r.qty/r.hours):"—"])};
 }
 const rawKeys=[...new Set(rows.flatMap(r=>Object.keys(r).filter(k=>!k.startsWith("__"))))].slice(0,28);
 const order=["fecha","sembradorNombre","colaboradorNombre","empleadoNombre","bloque","cama"];
 const keys=[...rawKeys].sort((a,b)=>{
  const i=order.indexOf(a),j=order.indexOf(b);
  return i>=0&&j>=0?i-j:i>=0?-1:j>=0?1:0;
 });
 const config=MODS[mod];
 const h=[...keys,...(config.unit?["Horas efectivas","Rendimiento ("+config.unit+"/h)"]:[])];
 const raw=rows.map(r=>[...keys.map(k=>{
  const v=r[k];return v!==null&&typeof v==="object"?JSON.stringify(v):v??"";
 }),...(config.unit?[r.__rendHours===null?"—":fmt.format(r.__rendHours),r.__rendRate===null?"—":fmt.format(r.__rendRate)]:[])]);
 return {headers:h.length?h:["Fecha","Colaborador"],rows:raw};
}
function displayTimes(rows,names=new Map()){
 const headers=["Fecha","Colaborador","Horas extra","Desplazamiento","Calistenia","Capacitación","Otras labores","Tiempo efectivo (h)"];
 const data=rows.map(r=>{
  const categories=(num(r.desplazamientoMin)??0)+(num(r.calisteniaMin)??0)+(num(r.capacitacionMin)??0);
  const other=num(r.otrasLaboresMin),exclusivo=other===null?
   (num(r.pMadresMin)??0)+(num(r.pAbuelasMin)??0):Math.max(0,other-categories);
  return [day(r),names.get(dayPerson(r))||person(r),fmt.format((num(r.horasExtraMin)??((num(r.horasExtra)??0)*60))/60),
   fmt.format((num(r.desplazamientoMin)??0)/60),fmt.format((num(r.calisteniaMin)??0)/60),
   fmt.format((num(r.capacitacionMin)??0)/60),fmt.format(exclusivo/60),
   netHours(r)===null?"—":fmt.format(netHours(r))];
 });
 return {headers,rows:data};
}
function render({areaId,mod,panel,getRecords,selectedVariant=null}){
 if(areaId!=="produccion"||!MODS[mod.id])return false;
 const config=MODS[mod.id],dataKey=id=>"flowerlogix_jn_data_"+areaId+"_"+id;
 const origin=getRecords(areaId,mod.id),originTimes=getRecords(areaId,mod.id+"_tiempos");
 let labor=origin,times=originTimes,demo=mod.id==="bandejas-enraizamiento"&&!origin.length;
 const example=demoBandejas();
 let personMode="grupal",periodMode="anio",detailMode="labor";
 const matches=r=>!selectedVariant||window.ProductionIndicators?.matchLaborVariant?.(mod.id,r,selectedVariant);
 const areaText=selectedVariant?String(selectedVariant):mod.name;
 panel.innerHTML='<div class="performance-controls">'+
 '<div class="performance-person"><label class="performance-worker">Buscar colaborador'+
 '<input type="search" id="pWorker" placeholder="Nombre o código" list="pWorkers" autocomplete="off">'+
 '<datalist id="pWorkers"></datalist></label>'+
 '<div class="performance-person-switch" role="group" aria-label="Alcance del rendimiento">'+
 '<button type="button" data-person-mode="grupal" class="active" aria-pressed="true">Rendimiento grupal</button>'+
 '<button type="button" data-person-mode="individual" aria-pressed="false">Una persona</button></div></div>'+
 '<nav class="performance-period-nav" aria-label="Consultar rendimiento por período">'+
 '<button type="button" class="active" data-period-mode="anio" aria-pressed="true">Por año</button>'+
 '<button type="button" data-period-mode="semana" aria-pressed="false">Por semana</button>'+
 '<button type="button" data-period-mode="dia" aria-pressed="false">Por fecha (día)</button></nav>'+
 '<div class="performance-period-fields"><label id="pYearLabel">Año<select id="pYear"></select></label>'+
 '<label id="pWeekLabel" hidden>Semana<select id="pWeek"></select></label>'+
 '<label id="pDayLabel" hidden>Fecha<input id="pDay" type="date"></label></div>'+
 '<nav class="performance-detail-nav" aria-label="Registros de rendimiento">'+
 '<button type="button" class="active" data-detail-mode="labor" aria-pressed="true">Labor</button>'+
 '<button type="button" data-detail-mode="tiempos" aria-pressed="false">Tiempos</button></nav>'+
 '<div class="performance-actions"><label class="btn-primary quality-upload">Importar JSON de <span id="pImportKind">Labor</span>'+
 '<input type="file" id="pImport" accept=".json,application/json" hidden></label>'+
 '<button type="button" class="btn-secondary" id="pCSV">Exportar CSV</button>'+
 (mod.id==="bandejas-enraizamiento"?'<button type="button" class="btn-secondary" id="pDemo">Ver registros reales</button>':"")+
 '</div><div id="pNote" class="module-notice"></div>'+
 '<div id="pDemoNote" class="quality-demo-banner" hidden></div>'+
 '<div id="pStats" class="module-summary analysis-metrics"></div>'+
 '<div id="pResult" aria-live="polite"></div></div>';
 const $=id=>panel.querySelector("#"+id),worker=$("pWorker"),year=$("pYear"),week=$("pWeek"),date=$("pDay");
 const buttons=[...panel.querySelectorAll("[data-person-mode]")],
  periods=[...panel.querySelectorAll("[data-period-mode]")],
  details=[...panel.querySelectorAll("[data-detail-mode]")];
 let selectedYear="",selectedWeek="",selectedDay="",visible=[],visibleType="labor";
 const activeLabor=()=> (demo?example.labor:labor).filter(matches);
 const activeTimes=()=>demo?example.times:times;
 const asLabel=(value,label)=>'<div class="module-stat"><span>'+esc(label)+'</span><strong>'+esc(value)+'</strong></div>';
 const refresh=()=>{
  const baseLabor=activeLabor(),baseTimes=activeTimes();
  // Only time records belonging to workers and days of THIS labor.
  const dayKeys=new Set(baseLabor.map(dayPerson));
  const tiedTimes=baseTimes.filter(r=>dayKeys.has(dayPerson(r)));
  const available=[...new Set([...baseLabor.map(day),...tiedTimes.map(day)]
     .filter(v=>/^\d{4}-\d{2}-\d{2}$/.test(v)))].sort();
  const isoWeeks=[...new Set(available.map(weekKey).filter(Boolean))].sort();
  const years=[...new Set(available.map(v=>String(v.slice(0,4)))
    .concat(isoWeeks.map(v=>v.slice(0,4))))].sort((a,b)=>b.localeCompare(a));
  if(!years.includes(selectedYear))selectedYear=years[0]??new Date().getFullYear().toString();
  year.innerHTML=years.length?years.map(n=>'<option value="'+n+'">'+n+'</option>').join(""):
    '<option value="'+selectedYear+'">'+selectedYear+'</option>';
  year.value=selectedYear;
  const yearWeeks=isoWeeks.filter(v=>v.startsWith(selectedYear+"-"));
  if(!yearWeeks.includes(selectedWeek))selectedWeek=yearWeeks.at(-1)??"";
  week.innerHTML=yearWeeks.length?yearWeeks.map(v=>'<option value="'+v+'">Semana '+v.slice(-2)+'</option>').join(""):
    '<option value="">Sin semanas con registros</option>';
  week.value=selectedWeek;
  if(!available.includes(selectedDay))selectedDay=available.at(-1)??"";
  date.value=selectedDay;
  $("pYearLabel").hidden=periodMode==="dia";
  $("pWeekLabel").hidden=periodMode!=="semana";
  $("pDayLabel").hidden=periodMode!=="dia";
  worker.disabled=personMode==="grupal";worker.placeholder=personMode==="grupal"?
    "Todas las personas de esta labor":"Buscar nombre o código";
  $("pWorkers").innerHTML=[...new Map(baseLabor.map(r=>[code(r),person(r)]))].map(([id,name])=>
    '<option value="'+esc(name)+'">'+esc(id)+'</option>').join("");
  const inPeriod=r=>{
   const d=day(r);
   if(periodMode==="dia")return Boolean(selectedDay)&&d===selectedDay;
   if(periodMode==="semana")return Boolean(selectedWeek)&&weekKey(d)===selectedWeek;
   return d.startsWith(selectedYear+"-");
  };
  const matchesWorker=r=>personMode==="grupal"||!worker.value.trim()||
   normalize(person(r)+" "+code(r)).includes(normalize(worker.value));
  const filteredLabor=baseLabor.filter(r=>inPeriod(r)&&matchesWorker(r));
  const filteredKeys=new Set(filteredLabor.map(dayPerson));
  const filteredTimes=tiedTimes.filter(r=>inPeriod(r)&&filteredKeys.has(dayPerson(r)));
  const enriched=joinLabor(mod.id,filteredLabor,filteredTimes);
  const stats=summary(enriched,filteredTimes,mod.id);
  const unit=config.unit,quantity=unit&&stats.qty!==null?fmt.format(stats.qty):"—";
  $("pStats").innerHTML=[
   asLabel(fmt.format(stats.people),"Colaboradores"),
   asLabel(fmt.format(stats.records),"Registros de labor"),
   asLabel(unit?quantity:fmt.format(new Set(filteredLabor.map(day).filter(Boolean)).size),
     unit?config.label:"Días con labor"),
   asLabel(stats.hours===null?"—":fmt.format(stats.hours)+" h","Tiempo efectivo"),
   ...(unit?[asLabel(stats.rate===null?"—":fmt.format(stats.rate),unit+"/hora")]:[])
  ].join("");
  visibleType=detailMode;
  const nameByDate=new Map(baseLabor.map(r=>[dayPerson(r),person(r)]));
  const result=detailMode==="labor"?displayLabor(mod.id,enriched):displayTimes(filteredTimes,nameByDate);
  visible=result.rows;
  $("pResult").innerHTML='<h3 class="quality-heading">'+(detailMode==="labor"?"Registros de labor":"Registros de tiempos")+'</h3>'+
   htmlTable(result.headers,result.rows,"Sin registros para la labor y el período seleccionados.");
  $("pImportKind").textContent=detailMode==="labor"?"Labor":"Tiempos";
  $("pNote").textContent=personMode==="grupal"?
    "Rendimiento grupal: se incluyen todas las personas que realizaron esta labor en el período seleccionado. "+
    "La productividad por hora se calcula con cantidades y horas comparables, sin sumar jornadas duplicadas.":
    "Consulta individual. Escribe el nombre o código de la persona para filtrar sus registros. "+
    "Los resultados proceden de JSON importados localmente; no hay sincronización automática.";
  $("pDemoNote").hidden=!demo;
  $("pDemoNote").innerHTML=demo?'<strong>DATOS DE PRUEBA — VISTA DEMOSTRATIVA</strong>'+
    '<span>Los registros y tiempos son ficticios y no se almacenan.</span>':"";
  if($("pDemo"))$("pDemo").textContent=demo?"Ver registros reales":"Ver datos de prueba";
  if(detailMode==="tiempos"&&!filteredTimes.length&&filteredLabor.length)
    $("pResult").insertAdjacentHTML("beforeend",'<p class="page-description">No hay tiempos asociados a esta labor para el período elegido.</p>');
 };
 function activate(buttons,key,value){
  buttons.forEach(btn=>{const a=btn.dataset[key]===value;btn.classList.toggle("active",a);btn.setAttribute("aria-pressed",String(a))});
 }
 buttons.forEach(b=>b.addEventListener("click",()=>{
  personMode=b.dataset.personMode;activate(buttons,"personMode",personMode);refresh();
 }));
 periods.forEach(b=>b.addEventListener("click",()=>{
  periodMode=b.dataset.periodMode;activate(periods,"periodMode",periodMode);refresh();
 }));
 details.forEach(b=>b.addEventListener("click",()=>{
  detailMode=b.dataset.detailMode;activate(details,"detailMode",detailMode);refresh();
 }));
 worker.addEventListener("input",refresh);
 year.addEventListener("change",()=>{selectedYear=year.value;selectedWeek="";refresh()});
 week.addEventListener("change",()=>{selectedWeek=week.value;refresh()});
 date.addEventListener("change",()=>{selectedDay=date.value;refresh()});
 if($("pDemo"))$("pDemo").addEventListener("click",()=>{demo=!demo;selectedYear="";selectedWeek="";selectedDay="";refresh()});
 $("pImport").addEventListener("change",async event=>{
  const file=event.target.files[0];if(!file)return;
  try{
   if(file.size>5*1024*1024)throw Error("El archivo supera 5 MB.");
   const doc=JSON.parse(await file.text()),mode=detailMode;
   const keys=mode==="labor"?["labor","bandejasEnraizamiento","registros"]:
     ["tiempos","bandejasTiempos","registros"];
   const rows=Array.isArray(doc)?doc:keys.map(k=>doc?.[k]).find(Array.isArray);
   if(!Array.isArray(rows)||rows.length>20000||!rows.every(r=>r&&typeof r==="object"&&!Array.isArray(r)))
    throw Error("Se requiere un arreglo de registros JSON válido, máximo 20.000.");
   if(rows.some(r=>!day(r)||!code(r)))throw Error("Cada registro necesita fecha y colaborador.");
   if(mode==="labor"){
    const incoming=rows.map(r=>{
     if(!selectedVariant||r.__laborGrupo||r.tipoLabor||r.rol||r.tipoRol)return r;
     return {...r,__laborGrupo:selectedVariant};
    });
    if(selectedVariant)labor=[...labor.filter(r=>!matches(r)),...incoming];
    else labor=incoming;
    localStorage.setItem(dataKey(mod.id),JSON.stringify(labor));
   }else{
    // Importados para el módulo; no afectar registros de labor.
    times=rows;
    localStorage.setItem(dataKey(mod.id+"_tiempos"),JSON.stringify(times));
   }
   demo=false;selectedYear="";selectedWeek="";selectedDay="";
   refresh();
   $("pNote").textContent="Se importaron "+rows.length+" registros de "+(mode==="labor"?"labor":"tiempos")+
     " y se guardaron en este navegador. Los datos de otras labores se conservan.";
  }catch(error){$("pNote").textContent="Error al importar: "+error.message;}
  finally{event.target.value="";}
 });
 $("pCSV").addEventListener("click",()=>{
  const table=panel.querySelector(".performance-table");
  if(!table||!visible.length)return;
  const headings=[...table.querySelectorAll("thead th")].map(x=>x.textContent);
  const quote=value=>{
   const v=String(value??""),safe=/^[=+\-@]/.test(v)?"'"+v:v;
   return '"'+safe.replaceAll('"','""')+'"';
  };
  const csv="\uFEFF"+[headings,...visible].map(r=>r.map(quote).join(";")).join("\r\n");
  const url=URL.createObjectURL(new Blob([csv],{type:"text/csv;charset=utf-8"}));
  const link=document.createElement("a");link.href=url;
  link.download="rendimiento-"+mod.id+"-"+visibleType+(demo?"-DEMO":"")+".csv";link.click();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
 });
 refresh();
 return true;
}
window.PerformanceReports={render,weekKey,netHours,joinLabor,summary,displayLabor,displayTimes};
})();