/* FlowerLogix JN — Rendimiento de Producción: personas/grupo, año/semana/día y Labor/Tiempos */
(()=>{
"use strict";
const MODS={
 "siembra-campo":{unit:"esquejes",label:"Esquejes estimados",quantity:r=>{
   if(num(r.lineas)!==null&&num(r.densidad)!==null)return num(r.lineas)*num(r.densidad);
   return num(r.totalEsquejes??r.totalEsquejesSembrados??r.cantidad);
 }},
 "desbotonado-mallas":{unit:"tallos",label:"Tallos realizados",quantity:r=>{
   const stored=num(r.tallos??r.tallosRealizados);
   if(stored!==null)return stored;
   const stems=num(r.tallosCama??r.tallosPorCama);
   const medium=num(r.mediosCuadros??r.mediosCuadrados??r.mediosCuadrosHechos);
   const eliminated=num(r.erradicaciones??0);
   return stems!==null&&medium!==null&&eliminated!==null&&eliminated<=stems?
     (stems-eliminated)/16*medium:null;
 }},
 "corte":{unit:null,label:"Actividad registrada",quantity:()=>null},
 "bandejas-enraizamiento":{unit:"esquejes",label:"Esquejes sembrados",quantity:r=>num(r.cantidad??r.totalEsquejes??r.totalEsquejesSembrados)},
 "preparacion-camas":{unit:null,label:"Actividad registrada",quantity:()=>null}
};
const fmt=new Intl.NumberFormat("es-CO",{maximumFractionDigits:2});
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const normalize=v=>String(v??"").trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
const num=v=>v!==null&&v!==undefined&&v!==""&&Number.isFinite(Number(v))&&Number(v)>=0?Number(v):null;
const day=r=>String(r?.fecha??r?.fechaRegistro??"").slice(0,10);
const code=r=>String(r?.sembrador??r?.colaborador??r?.empleado??r?.codigo??r?.codOperario??r?.sembradorId??r?.empleadoId??r?.trabajador??r?.sembradorNombre??r?.colaboradorNombre??r?.empleadoNombre??r?.nombre??"").trim().toLowerCase();
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
 // El registro original de Desbotonado/Mallas guarda este resultado
 // ya descontado. Evitar recalcularlo con una jornada distinta.
 if(num(r.tiempoRealMin)!==null)return num(r.tiempoRealMin)/60;
 const minutes=k=>num(r[k])??0;
 const components=["horasExtraMin","horasExtra","desplazamientoMin","calisteniaMin","capacitacionMin","otrasLaboresMin","pMadresMin","pAbuelasMin"];
 if(!components.some(k=>num(r[k])!==null)){
   if(num(r.tiempoRealMin)!==null)return num(r.tiempoRealMin)/60;
   if(num(r.horasLaboralesMin)!==null)return num(r.horasLaboralesMin)/60;
   if(num(r.horasTrabajadas)!==null)return num(r.horasTrabajadas);
 }
 const extras=minutes("horasExtraMin")||minutes("horasExtra")*60;
 const jornada=num(r.horasLaboralesMin)??435;
 const categories=minutes("desplazamientoMin")+minutes("calisteniaMin")+minutes("capacitacionMin");
 const aggregate=num(r.otrasLaboresMin);
 const extraTasks=aggregate===null?
   minutes("pMadresMin")+minutes("pAbuelasMin"):Math.max(0,aggregate-categories);
 return Math.max(0,(jornada+extras-categories-extraTasks)/60);
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
// Muestras ficticias únicamente en memoria, para las tres modalidades.
function demoDesbotonado(){
 const groups=[
  {tipoLabor:"Desbotón Pompón",prefix:"P",people:[
   ["DEMO-P01","Ana Pérez (ejemplo)"],["DEMO-P02","Carlos Ruiz (ejemplo)"],
   ["DEMO-P03","María López (ejemplo)"],["DEMO-P04","Juan Torres (ejemplo)"]]},
  {tipoLabor:"Desbotón Spider",prefix:"S",people:[
   ["DEMO-S01","Laura Gómez (ejemplo)"],["DEMO-S02","Andrés Díaz (ejemplo)"],
   ["DEMO-S03","Natalia Ríos (ejemplo)"],["DEMO-S04","Pedro Vargas (ejemplo)"]]},
  {tipoLabor:"Malla",prefix:"M",people:[
   ["DEMO-M01","Paola Castro (ejemplo)"],["DEMO-M02","Jorge Moreno (ejemplo)"],
   ["DEMO-M03","Diana Pardo (ejemplo)"],["DEMO-M04","Luis Medina (ejemplo)"]]}
 ];
 // Cuatro semanas ISO de 2026, incluida la semana actual.
 const dates=["2026-09-24","2026-10-01","2026-10-08","2026-10-15"];
 const labor=[],times=[];
 groups.forEach((group,g)=>{
  dates.forEach((fecha,weekIndex)=>{
   group.people.forEach(([colaborador,colaboradorNombre],personIndex)=>{
    const extra=(personIndex+weekIndex)%3===0?30:0;
    const desplazamiento=10+5*(personIndex%2);
    const calistenia=15,capacitacion=weekIndex%2===0?10:0;
    const otrasLabores=15+5*(g%3);
    const tiempoRealMin=435+extra-desplazamiento-calistenia-capacitacion-otrasLabores;
    times.push({id:"DEMO-T-"+group.prefix+"-"+weekIndex+"-"+personIndex,
      __soloDemostracion:true,fecha,colaborador,colaboradorNombre,
      horasLaboralesMin:435,horasExtraMin:extra,desplazamientoMin:desplazamiento,
      calisteniaMin:calistenia,capacitacionMin:capacitacion,
      otrasLaboresMin:desplazamiento+calistenia+capacitacion+otrasLabores,
      pMadresMin:otrasLabores,pAbuelasMin:0,tiempoRealMin});
    for(let camaIndex=0;camaIndex<2;camaIndex++){
     const mediosCuadros=6+((weekIndex+personIndex+camaIndex+g)%5)*2;
     const tallosCama=960+((weekIndex*2+personIndex+camaIndex+g)%5)*160;
     const erradicaciones=(weekIndex+personIndex+camaIndex)%3*16;
     const tallos=(tallosCama-erradicaciones)/16*mediosCuadros;
     labor.push({id:"DEMO-L-"+group.prefix+"-"+weekIndex+"-"+personIndex+"-"+camaIndex,
       __soloDemostracion:true,fecha,colaborador,colaboradorNombre,
       tipoLabor:group.tipoLabor,bloque:"B"+(g+1)+"-"+(personIndex%2+1),
       cama:"C"+(personIndex*2+camaIndex+1),
       mediosCuadros,tallosCama,erradicaciones,tallos,
       observaciones:"Registro ficticio para visualizar la tabla"});
    }
   });
  });
 });
 return {labor,times};
}
// Adaptación de Tiempos en Bancos / Siembra / Cosecha de CalidadJSWebAsync.
// Los valores de pantalla están en horas; los registros locales se guardan en minutos.
const TIME_INPUTS=[
 ["pTFBase","Jornada laboral","Horas laborales programadas"],
 ["pTFExtra","Horas extra","Tiempo extra trabajado"],
 ["pTFMove","Desplazamiento","Desplazamiento durante la jornada"],
 ["pTFGym","Calistenia","Tiempo de calistenia"],
 ["pTFTrain","Capacitación","Capacitación o reunión"],
 ["pTFMadres","Plantas madres","Tiempo en plantas madres"],
 ["pTFAbuelas","Plantas abuelas","Tiempo en plantas abuelas"],
 ["pTFPause","Pausas","Pausas adicionales"],
 ["pTFChange","Cambio de labor","Tiempo de cambio de actividad"],
 ["pTFIncap","Incapacidad","Horas de incapacidad"],
 ["pTFVac","Vacaciones","Horas de vacaciones"],
 ["pTFMedical","Examen médico","Tiempo de examen médico"],
 ["pTFOther","Otras labores","Otras actividades no incluidas arriba"]
];
function scheduledHours(date){
 if(!/^\d{4}-\d{2}-\d{2}$/.test(date))return 7.25;
 const weekday=new Date(date+"T12:00:00Z").getUTCDay();
 return weekday===6?5.75:weekday===0?0:7.25;
}
function timeHours(input){
 const str=String(input??"").trim().replace(",",".");
 return str!==""&&Number.isFinite(Number(str))&&Number(str)>=0?Number(str):null;
}
function timeFormCalculation(form){
 const values={};
 for(const [id] of TIME_INPUTS){
  const v=timeHours(form[id]);
  if(v===null||v>24)return {error:"Revisa las horas: deben ser números entre 0 y 24."};
  values[id]=v;
 }
 if(values.pTFBase<=0)return {error:"Las horas laborales deben ser mayores que cero."};
 const available=values.pTFBase+values.pTFExtra;
 const deducted=TIME_INPUTS.slice(2).reduce((sum,[id])=>sum+values[id],0);
 if(deducted>available+0.00001)return {error:"Las actividades descontadas superan las horas laborales más las extras."};
 const roundMinutes=h=>Math.round(h*60);
 const base=roundMinutes(values.pTFBase),extra=roundMinutes(values.pTFExtra);
 const deductions=TIME_INPUTS.slice(2).reduce((sum,[id])=>sum+roundMinutes(values[id]),0);
 if(deductions>base+extra)return {error:"El total de minutos descontados supera la jornada disponible."};
 return {values,base,extra,deductions,minutes:base+extra-deductions,net:(base+extra-deductions)/60};
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
 if(mod==="desbotonado-mallas"){
  const headers=["Nombre de la persona","Bloque","Cama","Medios cuadrados hechos",
   "Tallos por cama","Tallos realizados","Rendimiento por hora"];
  return {headers,rows:rows.map(r=>[
   person(r),r.bloque??"—",r.cama??"—",
   num(r.mediosCuadros??r.mediosCuadrados??r.mediosCuadrosHechos)===null?"—":
    fmt.format(num(r.mediosCuadros??r.mediosCuadrados??r.mediosCuadrosHechos)),
   num(r.tallosCama??r.tallosPorCama)===null?"—":
    fmt.format(num(r.tallosCama??r.tallosPorCama)),
   r.__rendQty===null?"—":fmt.format(r.__rendQty),
   r.__rendRate===null?"—":fmt.format(r.__rendRate)
  ])};
 }
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
 const headers=["Fecha","Colaborador","Horas laborales","Horas extra","Desplazamiento",
 "Calistenia","Capacitación","Plantas madres","Plantas abuelas","Otras actividades",
 "Tiempo efectivo (h)"];
 const data=rows.map(r=>{
  const categories=(num(r.desplazamientoMin)??0)+(num(r.calisteniaMin)??0)+(num(r.capacitacionMin)??0);
  const other=num(r.otrasLaboresMin),exclusivo=other===null?
   (num(r.pMadresMin)??0)+(num(r.pAbuelasMin)??0):Math.max(0,other-categories);
  const otherOnly=Math.max(0,exclusivo-(num(r.pMadresMin)??0)/60-(num(r.pAbuelasMin)??0)/60);
  return [day(r),names.get(dayPerson(r))||person(r),
   fmt.format((num(r.horasLaboralesMin)??435)/60),
   fmt.format((num(r.horasExtraMin)??((num(r.horasExtra)??0)*60))/60),
   fmt.format((num(r.desplazamientoMin)??0)/60),
   fmt.format((num(r.calisteniaMin)??0)/60),
   fmt.format((num(r.capacitacionMin)??0)/60),
   fmt.format((num(r.pMadresMin)??0)/60),
   fmt.format((num(r.pAbuelasMin)??0)/60),
   fmt.format(otherOnly),
   netHours(r)===null?"—":fmt.format(netHours(r))];
 });
 return {headers,rows:data};
}
function render({areaId,mod,panel,getRecords,selectedVariant=null}){
 if(areaId!=="produccion"||!MODS[mod.id])return false;
 const config=MODS[mod.id],dataKey=id=>"flowerlogix_jn_data_"+areaId+"_"+id;
 const origin=getRecords(areaId,mod.id),originTimes=getRecords(areaId,mod.id+"_tiempos");
 const matches=r=>!selectedVariant||window.ProductionIndicators?.matchLaborVariant?.(mod.id,r,selectedVariant);
 let labor=origin,times=originTimes,
     demo=(mod.id==="bandejas-enraizamiento"&&!origin.length)||
          (mod.id==="desbotonado-mallas"&&!origin.some(matches));
 const example=mod.id==="desbotonado-mallas"?demoDesbotonado():demoBandejas();
 let personMode="grupal",periodMode="anio",detailMode="labor";
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
 (["bandejas-enraizamiento","desbotonado-mallas"].includes(mod.id)?
   '<button type="button" class="btn-secondary" id="pDemo">Ver registros reales</button>':"")+
 '</div>'+
 '<section id="pTimeForm" class="performance-time-form" hidden>'+
 '<div class="performance-time-head"><div><h3>Registrar tiempo de la labor</h3>'+
 '<p>Formulario basado en Tiempos de Bancos, Siembra y Cosecha. Datos en horas; cálculo automático del tiempo efectivo.</p></div></div>'+
 '<div class="performance-time-grid performance-time-identity">'+
 '<label>Fecha de la labor<input type="date" id="pTFDate" required></label>'+
 '<label>Código o nombre del trabajador<input type="text" id="pTFWorker" list="pTFPeople" placeholder="Buscar o escribir código" autocomplete="off" required><datalist id="pTFPeople"></datalist></label>'+
 '<label>Nombre del trabajador<input type="text" id="pTFName" placeholder="Nombre completo" required></label></div>'+
 '<div class="performance-time-grid">'+
 TIME_INPUTS.slice(0,5).map(([id,label,help])=>'<label title="'+esc(help)+'">'+esc(label)+' (h)'+
 '<input id="'+id+'" type="number" min="0" max="24" step="any" inputmode="decimal" value="0"></label>').join("")+'</div>'+
 '<details class="performance-time-more"><summary>Otras actividades y descuentos</summary>'+
 '<div class="performance-time-grid">'+
 TIME_INPUTS.slice(5).map(([id,label,help])=>'<label title="'+esc(help)+'">'+esc(label)+' (h)'+
 '<input id="'+id+'" type="number" min="0" max="24" step="any" inputmode="decimal" value="0"></label>').join("")+
 '</div></details>'+
 '<div class="performance-time-result"><div><span>Tiempo disponible</span><strong id="pTFAvailable">—</strong></div>'+
 '<div><span>Tiempo de otras actividades</span><strong id="pTFDeducted">—</strong></div>'+
 '<div><span>Tiempo efectivo de la labor</span><strong id="pTFNet">—</strong></div></div>'+
 '<p class="performance-time-help">Tiempo efectivo = jornada laboral + horas extra − desplazamiento − calistenia − capacitación − plantas madres/abuelas − pausas − cambio de labor − incapacidad − vacaciones − examen médico − otras labores. Cada categoría se resta una sola vez. Jornada sugerida: 7,25 h entre semana y 5,75 h el sábado.</p>'+
 '<div class="performance-time-buttons"><button type="button" id="pTFSave" class="btn-primary">Guardar tiempo</button>'+
 '<button type="button" id="pTFClear" class="btn-secondary">Limpiar formulario</button></div>'+
 '<p id="pTFStatus" role="status" aria-live="polite" class="performance-time-status"></p></section>'+
 '<div id="pNote" class="module-notice"></div>'+
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
 const findWorker=(entry)=>{
  const normalized=normalize(entry);
  return activeLabor().find(r=>normalize(code(r))===normalized||normalize(person(r))===normalized)
   ||activeTimes().find(r=>normalize(code(r))===normalized||normalize(person(r))===normalized);
 };
 const getTimeFormValues=()=>Object.fromEntries(TIME_INPUTS.map(([id])=>[id,$(id).value]));
 const calculateForm=()=>{
  const calc=timeFormCalculation(getTimeFormValues());
  if(calc.error){
   $("pTFAvailable").textContent="—";$("pTFDeducted").textContent="—";
   $("pTFNet").textContent=calc.error;return calc;
  }
  $("pTFAvailable").textContent=fmt.format((calc.base+calc.extra)/60)+" h";
  $("pTFDeducted").textContent=fmt.format(calc.deductions/60)+" h";
  $("pTFNet").textContent=fmt.format(calc.net)+" h";
  return calc;
 };
 const resetTimeForm=(keepIdentity=false)=>{
  if(!keepIdentity){
   const now=new Date();
   const today=new Date(now.getTime()-now.getTimezoneOffset()*60000).toISOString().slice(0,10);
   $("pTFDate").value=day(activeLabor().at(-1))||today;
   $("pTFWorker").value="";$("pTFName").value="";
  }
  TIME_INPUTS.forEach(([id])=>$(id).value=id==="pTFBase"?String(scheduledHours($("pTFDate").value)):"0");
  $("pTFStatus").textContent="";calculateForm();
 };
 // Importante: los registros de tiempo de una modalidad no se atribuyen
 // automáticamente a otra modalidad del mismo colaborador/día.
 const taggedTime=r=>String(r.__laborGrupo??r.tipoLabor??r.tipoRol??"").trim()!=="";
 const belongsTimeToVariant=r=>!selectedVariant||matches(r);
 const matchesTimeRecord=(r,workerKey,fecha)=>{
  if(day(r)!==fecha||code(r)!==workerKey)return false;
  if(!selectedVariant)return !taggedTime(r);
  return taggedTime(r)&&belongsTimeToVariant(r);
 };
 const fillExisting=()=>{
  const dateValue=$("pTFDate").value,entry=$("pTFWorker").value.trim();
  const candidate=findWorker(entry);
  if(candidate && !$("pTFName").value.trim())$("pTFName").value=person(candidate);
  if(!candidate||!dateValue)return;
  const found=times.find(r=>matchesTimeRecord(r,code(candidate),dateValue));
  if(!found)return;
  const valueInHours=key=>String(Number(((num(found[key])??0)/60).toFixed(3)));
  const map={
   pTFBase:"horasLaboralesMin",pTFExtra:"horasExtraMin",pTFMove:"desplazamientoMin",
   pTFGym:"calisteniaMin",pTFTrain:"capacitacionMin",pTFMadres:"pMadresMin",
   pTFAbuelas:"pAbuelasMin",pTFPause:"pausasMin",pTFChange:"cambioLaborMin",
   pTFIncap:"incapacidadMin",pTFVac:"vacacionesMin",pTFMedical:"examenMedicoMin"
  };
  Object.entries(map).forEach(([id,key])=>$(id).value=valueInHours(key));
  const components=["desplazamientoMin","calisteniaMin","capacitacionMin",
   "pMadresMin","pAbuelasMin","pausasMin","cambioLaborMin",
   "incapacidadMin","vacacionesMin","examenMedicoMin"];
  const exclusive=Math.max(0,(num(found.otrasLaboresMin)??0)-
   components.reduce((sum,key)=>sum+(num(found[key])??0),0));
  $("pTFOther").value=String(Number((exclusive/60).toFixed(3)));
  $("pTFStatus").textContent="Registro existente: al guardar se actualizará el tiempo de este trabajador y fecha.";
  calculateForm();
 };
 TIME_INPUTS.forEach(([id])=>$(id).addEventListener("input",calculateForm));
 $("pTFDate").addEventListener("change",()=>{
  $("pTFBase").value=String(scheduledHours($("pTFDate").value));
  $("pTFStatus").textContent="";fillExisting();calculateForm();
 });
 $("pTFWorker").addEventListener("change",()=>{
  const match=findWorker($("pTFWorker").value);
  if(match){$("pTFWorker").value=String(match.sembrador??match.colaborador??match.empleado??match.codigo??code(match));
   $("pTFName").value=person(match);}
  else $("pTFName").value="";
  $("pTFStatus").textContent="";fillExisting();
 });
 $("pTFClear").addEventListener("click",()=>resetTimeForm());
 $("pTFSave").addEventListener("click",()=>{
  const status=$("pTFStatus");
  if(demo){status.textContent="Estás viendo datos de prueba. Selecciona «Ver registros reales» antes de guardar.";return}
  const fecha=$("pTFDate").value,typed=$("pTFWorker").value.trim(),known=findWorker(typed);
  const id=known?code(known):typed.toLowerCase();
  const name=$("pTFName").value.trim()||(known?person(known):"");
  if(!/^\d{4}-\d{2}-\d{2}$/.test(fecha)){status.textContent="Selecciona una fecha válida.";return}
  if(!id||!name){status.textContent="Ingresa el código y el nombre del trabajador.";return}
  const calc=calculateForm();
  if(calc.error){status.textContent=calc.error;return}
  if(calc.minutes<=0){status.textContent="El tiempo efectivo de la labor debe ser mayor que cero.";return}
  const minutes=id=>Math.round(calc.values[id]*60);
  const categorical=["pTFMove","pTFGym","pTFTrain","pTFMadres","pTFAbuelas",
   "pTFPause","pTFChange","pTFIncap","pTFVac","pTFMedical","pTFOther"];
  const obj={fecha,colaborador:id,colaboradorNombre:name,
   horasLaboralesMin:calc.base,horasExtraMin:calc.extra,
   desplazamientoMin:minutes("pTFMove"),calisteniaMin:minutes("pTFGym"),
   capacitacionMin:minutes("pTFTrain"),pMadresMin:minutes("pTFMadres"),
   pAbuelasMin:minutes("pTFAbuelas"),pausasMin:minutes("pTFPause"),
   cambioLaborMin:minutes("pTFChange"),incapacidadMin:minutes("pTFIncap"),
   vacacionesMin:minutes("pTFVac"),examenMedicoMin:minutes("pTFMedical"),
   otrasLaboresMin:categorical.reduce((sum,key)=>sum+minutes(key),0),
   tiempoDisponibleMin:calc.base+calc.extra,tiempoRealMin:calc.minutes,
   ...(selectedVariant?{__laborGrupo:selectedVariant}:{}),
   origen:"FlowerLogix JN - formulario de tiempos"};
  const existing=times.findIndex(r=>matchesTimeRecord(r,id,fecha));
  if(existing>=0)times[existing]={...times[existing],...obj};
  else times.push(obj);
  try{localStorage.setItem(dataKey(mod.id+"_tiempos"),JSON.stringify(times))}
  catch(error){status.textContent="No fue posible guardar en este navegador: "+error.message;return}
  refresh();
  status.textContent=(existing>=0?"Tiempo actualizado":"Tiempo guardado")+
    " para "+name+" · "+fecha+" · "+fmt.format(calc.net)+" h efectivas.";
 });
 const asLabel=(value,label)=>'<div class="module-stat"><span>'+esc(label)+'</span><strong>'+esc(value)+'</strong></div>';
 const refresh=()=>{
  const baseLabor=activeLabor(),baseTimes=activeTimes();
  $("pTimeForm").hidden=detailMode!=="tiempos";
  $("pTFSave").disabled=demo;
  // El selector conserva lo escrito mientras cambian las tablas/filtros.
  if(!$("pTFDate").value)resetTimeForm();
  $("pTFPeople").innerHTML=[...new Map([...baseLabor,...baseTimes].map(r=>[code(r),person(r)]))]
   .filter(([id])=>Boolean(id))
   .map(([id,name])=>'<option value="'+esc(id)+'" label="'+esc(name)+'"></option>').join("");
  // Only time records belonging to workers and days of THIS labor.
  const dayKeys=new Set(baseLabor.map(dayPerson));
  // El registro de tiempos de Desbotonado es por persona/día, no por
  // Pompón, Spider o Mallas. No atribuir una jornada completa a una de
  // esas labores si el mismo día hizo otras modalidades.
  const laborTypesByDay=new Map();
  if(mod.id==="desbotonado-mallas"){
   (demo?example.labor:labor).forEach(r=>{
    const key=dayPerson(r);
    if(!laborTypesByDay.has(key))laborTypesByDay.set(key,new Set());
    const type=normalize(r.__laborGrupo??r.tipoLabor??r.tipoLaborNombre??"");
    if(type)laborTypesByDay.get(key).add(type);
   });
  }
  const tiedTimes=baseTimes.filter(r=>{
   // Los tiempos nuevos identifican explícitamente a qué labor pertenecen.
   if(taggedTime(r))return belongsTimeToVariant(r);
   // Los tiempos antiguos compartidos solo se atribuyen a una modalidad
   // cuando fue la única labor de esa persona ese día.
   if(!selectedVariant)return true;
   if(!dayKeys.has(dayPerson(r)))return false;
   return mod.id!=="desbotonado-mallas"||
     (laborTypesByDay.get(dayPerson(r))?.size??0)<=1;
  });
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
  const filteredTimes=tiedTimes.filter(r=>inPeriod(r)&&matchesWorker(r)&&
    (filteredKeys.has(dayPerson(r))||taggedTime(r)||!selectedVariant));
  const enriched=joinLabor(mod.id,filteredLabor,filteredTimes);
  const stats=summary(enriched,filteredTimes,mod.id);
  const unit=config.unit,quantity=unit&&stats.qty!==null?fmt.format(stats.qty):"—";
  const registeredTime=new Map(filteredTimes.map(r=>[dayPerson(r)+"|"+(r.__laborGrupo??""),netHours(r)]));
  const registeredHours=[...registeredTime.values()].filter(v=>v!==null);
  const totalTime=registeredHours.reduce((sum,h)=>sum+h,0);
  $("pStats").innerHTML=[
   asLabel(fmt.format(detailMode==="tiempos"?new Set(filteredTimes.map(code).filter(Boolean)).size:stats.people),"Colaboradores"),
   asLabel(fmt.format(detailMode==="tiempos"?filteredTimes.length:stats.records),
     detailMode==="tiempos"?"Registros de tiempos":"Registros de labor"),
   asLabel(unit?quantity:fmt.format(new Set(filteredLabor.map(day).filter(Boolean)).size),
     unit?config.label:"Días con labor"),
   asLabel(detailMode==="tiempos"?(registeredHours.length?fmt.format(totalTime)+" h":"—"):
     (stats.hours===null?"—":fmt.format(stats.hours)+" h"),"Tiempo efectivo"),
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
 if($("pDemo"))$("pDemo").addEventListener("click",()=>{
  demo=!demo;selectedYear="";selectedWeek="";selectedDay="";
  resetTimeForm();refresh();
 });
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
    // Si hay submodalidades, conservar los tiempos de las otras labores.
    const incoming=selectedVariant?rows.map(r=>taggedTime(r)?r:{...r,__laborGrupo:selectedVariant}):rows;
    times=selectedVariant?
      [...times.filter(r=>!taggedTime(r)||!belongsTimeToVariant(r)),...incoming]:
      incoming;
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
window.PerformanceReports={render,weekKey,netHours,joinLabor,summary,displayLabor,displayTimes,demoDesbotonado};
})();