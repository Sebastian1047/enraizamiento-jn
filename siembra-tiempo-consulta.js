/* Siembra Campo: vista de consulta de tiempos de Labores JN, sin edición. */
(()=>{
"use strict";
const n=v=>v!==null&&v!==undefined&&v!==""&&Number.isFinite(Number(v))&&Number(v)>=0?Number(v):null;
const format=new Intl.NumberFormat("es-CO",{maximumFractionDigits:2});
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const id=r=>String(r?.colaborador??r?.empleado??r?.sembrador??r?.codigo??"").trim().toLowerCase();
const name=r=>String(r?.colaboradorNombre??r?.empleadoNombre??r?.sembradorNombre??r?.nombre??id(r)??"").trim();
const date=r=>String(r?.fecha??r?.fechaRegistro??"").slice(0,10);
const hour=m=>m===null?"—":format.format(m/60)+" h";
function values(t){
 const fields=["pausasMin","incapacidadMin","cambioLaborMin","capacitacionMin",
  "vacacionesMin","examenMedicoMin","descuentoMin"];
 const subtotal=fields.reduce((v,k)=>v+(n(t[k])??0),0);
 const other=n(t.otrosMin)??(n(t.otrasLaboresMin)===null?null:Math.max(0,n(t.otrasLaboresMin)-subtotal));
 const deductions=subtotal+(other??0);
 const base=n(t.horasLaboralesMin),extra=n(t.horasExtraMin)??0;
 const available=n(t.tiempoDisponibleMin)??(base===null?null:base+extra);
 const real=n(t.tiempoRealMin)??(available===null?null:Math.max(0,available-deductions));
 return {other,deductions,base,extra,available,real};
}
function qty(r){
 const stored=n(r.esquejes??r.totalEsquejes??r.cantidad);
 if(stored!==null)return stored;
 const lines=n(r.lineas),density=n(r.densidad);
 return lines!==null&&density!==null?lines*density:null;
}
function render(labor,times){
 const people=new Map(),byDay=new Map();
 const person=r=>{
  const key=id(r);if(!key)return null;
  if(!people.has(key))people.set(key,{key,name:name(r),qty:0,hasQty:false,hours:0,hasHours:false,entries:[]});
  const item=people.get(key),label=name(r);
  if(label&&label!==key&&(item.name===key||!item.name))item.name=label;
  return item;
 };
 labor.forEach(r=>{const p=person(r);if(!p)return;const count=qty(r);if(count!==null){p.qty+=count;p.hasQty=true}});
 times.forEach(r=>{const p=person(r);if(!p||!date(r))return;
  const key=date(r)+"|"+id(r),prev=byDay.get(key);
  if(!prev||String(r.updatedAt??r.createdAt??"")>=String(prev.updatedAt??prev.createdAt??""))
   byDay.set(key,r);
 });
 byDay.forEach(t=>{const p=person(t);if(!p)return;p.entries.push(t);const net=values(t).real;
  if(net!==null){p.hours+=net/60;p.hasHours=true}
 });
 const workers=[...people.values()].sort((a,b)=>a.name.localeCompare(b.name,"es"));
 const paired=workers.filter(p=>p.hasQty&&p.hasHours&&p.hours>0);
 const total=workers.reduce((s,p)=>s+(p.hasQty?p.qty:0),0);
 const sumOfMeans=paired.reduce((s,p)=>s+p.qty/p.hours,0);
 const pairedHours=paired.reduce((s,p)=>s+p.hours,0);
 const groupRate=pairedHours>0?paired.reduce((s,p)=>s+p.qty,0)/pairedHours:null;
 const cards=[
  ["Total esquejes",format.format(total),"Total del período"],
  ["Suma de promedios",paired.length?format.format(sumOfMeans):"—","Esquejes/hora individuales"],
  ["Rendimiento grupal",groupRate===null?"—":format.format(groupRate),"Esquejes por hora efectiva"]
 ].map(([label,value,desc])=>'<div class="siembra-time-kpi"><span>'+esc(label)+'</span><strong>'+
  esc(value)+'</strong><small>'+esc(desc)+'</small></div>').join("");
 const measure=(label,val)=>'<div class="siembra-time-field"><span>'+esc(label)+'</span><strong>'+esc(hour(val))+'</strong></div>';
 const workerRows=workers.map(p=>{
  const workerRate=p.hasQty&&p.hasHours&&p.hours>0?format.format(p.qty/p.hours):"—";
  const records=p.entries.sort((a,b)=>date(b).localeCompare(date(a)));
  const detail=records.length?records.map(t=>{
   const v=values(t);
   const inputs=[["Tiempo programado",v.base],["Horas extra",v.extra],["Pausas",n(t.pausasMin)],
    ["Incapacidad",n(t.incapacidadMin)],["Cambio de labor",n(t.cambioLaborMin)],
    ["Capacitación",n(t.capacitacionMin)],["Vacaciones",n(t.vacacionesMin)],
    ["Examen médico",n(t.examenMedicoMin)],["Otros",v.other],["Descuento",n(t.descuentoMin)]];
   const origin=String(t.modalidadRegistro??"");
   const label=origin==="grupal"?"Tiempo grupal":origin==="individual"?"Tiempo individual":"Registro de tiempos";
   return '<section class="siembra-time-day"><div class="siembra-time-day-title"><b>'+esc(date(t))+'</b><span>'+
    esc(label)+'</span></div><div class="siembra-time-grid">'+
    inputs.map(([key,value])=>measure(key,value)).join("")+'</div>'+
    '<div class="siembra-time-bottom">'+
    measure("Tiempo disponible",v.available)+measure("Total descuentos",v.deductions)+
    '<div class="siembra-time-field siembra-time-net"><span>Tiempo efectivo de la labor</span><strong>'+
    esc(hour(v.real))+'</strong></div></div>'+
    (t.observaciones?'<p class="siembra-time-obs"><b>Observaciones:</b> '+esc(t.observaciones)+'</p>':"")+
    '</section>';
  }).join(""):'<p class="siembra-time-no-entries">No hay tiempos guardados para este colaborador durante el período.</p>';
  return '<details class="siembra-time-person"><summary class="siembra-time-row">'+
   '<span class="siembra-time-person-name"><b>'+esc(p.name)+'</b><small>'+esc(p.key)+'</small><em>Ver tiempos</em></span>'+
   '<span>'+esc(p.hasQty?format.format(p.qty):"—")+'</span>'+
   '<span>'+esc(p.hasHours?format.format(p.hours)+" h":"—")+'</span>'+
   '<span class="siembra-time-rate">'+esc(workerRate)+'</span></summary>'+
   '<div class="siembra-time-details">'+detail+'</div></details>';
 }).join("");
 return '<section class="siembra-time-readonly">'+
  '<div class="siembra-time-heading"><div><h3>Tiempos de Siembra Campo</h3>'+
  '<p>Consulta de tiempos registrados en Labores JN. Selecciona un trabajador para ver el detalle.</p></div>'+
  '<span>Solo lectura</span></div>'+
  '<div class="siembra-time-summary">'+cards+'</div>'+
  '<div class="siembra-time-list">'+
  '<div class="siembra-time-list-header"><span>COLABORADOR / VER TIEMPOS</span><span>TOTAL ESQUEJES</span><span>TIEMPO EFECTIVO</span><span>RENDIMIENTO</span></div>'+
  (workers.length?workerRows:'<p class="siembra-time-empty">No hay colaboradores ni tiempos para los filtros seleccionados.</p>')+
  '</div>'+
  (paired.length<workers.filter(p=>p.hasQty).length?
   '<p class="siembra-time-hint">Los promedios se calculan solo para colaboradores con esquejes y tiempos efectivos conocidos.</p>':"")+
  '</section>';
}
function load(){
 if(typeof indexedDB==="undefined")return Promise.resolve(null);
 return new Promise(resolve=>{
  let db=null,ended=false;
  const done=result=>{if(ended)return;ended=true;try{db?.close()}catch{}resolve(result)};
  try{
   const req=indexedDB.open("labores-jn-offline");
   req.onupgradeneeded=()=>{try{req.transaction.abort()}catch{}};
   req.onerror=()=>done(null);
   req.onblocked=()=>done(null);
   req.onsuccess=()=>{
    db=req.result;
    const stores=["siembraRendimientoTiempos","siembras","siembraRendimientoRegistros"].filter(k=>db.objectStoreNames.contains(k));
    if(!stores.includes("siembraRendimientoTiempos")){done(null);return}
    const data={times:[],plantings:[],rendimiento:[]};
    const names={siembraRendimientoTiempos:"times",siembras:"plantings",siembraRendimientoRegistros:"rendimiento"};
    const transaction=db.transaction(stores,"readonly");
    transaction.onerror=()=>done(null);
    transaction.onabort=()=>done(null);
    transaction.oncomplete=()=>done(data);
    stores.forEach(key=>{const read=transaction.objectStore(key).getAll();
      read.onsuccess=()=>{data[names[key]]=Array.isArray(read.result)?read.result:[]};
    });
   };
  }catch{done(null)}
 });
}
window.SiembraTimeConsultation={render,values,load};
})();