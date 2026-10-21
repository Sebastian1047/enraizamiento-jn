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
 const people=new Map(),dedup=new Map();
 const ensure=r=>{const key=id(r);if(!key)return null;if(!people.has(key))people.set(key,{key,name:name(r),labor:[],times:[]});const p=people.get(key);if(name(r)&&name(r)!==key)p.name=name(r);return p;};
 labor.forEach(r=>ensure(r)?.labor.push(r));
 times.forEach(r=>{const p=ensure(r);if(!p||!date(r))return;const key=p.key+"|"+date(r),prior=dedup.get(key);if(!prior||String(r.updatedAt??r.createdAt??"")>=String(prior.updatedAt??prior.createdAt??""))dedup.set(key,r)});
 dedup.forEach(r=>ensure(r)?.times.push(r));
 const records=[...people.values()].sort((a,b)=>a.name.localeCompare(b.name,"es"));
 const percent=v=>Math.max(0,Math.min(100,v));
 const bars=(label,val,max)=>'<div class="siembra-demo-meter"><span>'+esc(label)+'</span><i><b style="width:'+percent(max>0?val/max*100:0).toFixed(1)+'%"></b></i><strong>'+esc(hour(val))+'</strong></div>';
 const summaries=records.map(p=>{
  const results=p.times.map(values),programmed=results.reduce((z,v)=>z+(v.base??0),0),
    available=results.reduce((z,v)=>z+(v.available??0),0),
    effective=results.reduce((z,v)=>z+(v.real??0),0), qtyTotal=p.labor.reduce((z,r)=>z+(qty(r)??0),0);
  const byDate=new Map();
  p.times.forEach(t=>{const d=date(t);if(!byDate.has(d))byDate.set(d,[]);byDate.get(d).push(t)});
  const details=[...byDate].sort((a,b)=>b[0].localeCompare(a[0])).map(([d,ts])=>
    '<div class="siembra-demo-date"><div class="siembra-demo-date-title">▾ '+esc(d.split("-").reverse().join("/"))+
    ' — Programado '+esc(hour(ts.reduce((z,t)=>z+(values(t).base??0),0)))+
    ' · Disponible '+esc(hour(ts.reduce((z,t)=>z+(values(t).available??0),0)))+
    ' · Efectivo '+esc(hour(ts.reduce((z,t)=>z+(values(t).real??0),0)))+'</div>'+
    ts.map((t,i)=>{const v=values(t);const fields=[["Tiempo programado",v.base],["Horas extra",v.extra],["Pausas",n(t.pausasMin)],["Incapacidad",n(t.incapacidadMin)],["Cambio de labor",n(t.cambioLaborMin)],["Capacitación",n(t.capacitacionMin)],["Vacaciones",n(t.vacacionesMin)],["Examen médico",n(t.examenMedicoMin)],["Otros",v.other],["Descuento",n(t.descuentoMin)]];
    return '<div class="siembra-demo-entry"><div class="siembra-demo-entry-header"><strong>Registro #'+(i+1)+'</strong><span>'+esc(t.modalidadRegistro==="grupal"?"Tiempo grupal":t.modalidadRegistro==="individual"?"Tiempo individual":"Tiempo registrado")+'</span></div>'+
      '<div class="siembra-demo-fields">'+fields.map(([k,m])=>'<div><small>'+esc(k)+'</small><b>'+esc(hour(m))+'</b></div>').join("")+'</div>'+
      '<div class="siembra-demo-totals"><span>Tiempo disponible: <b>'+esc(hour(v.available))+'</b></span><span>Descuentos: <b>'+esc(hour(v.deductions))+'</b></span><span>Tiempo efectivo: <b>'+esc(hour(v.real))+'</b></span></div>'+
      (t.observaciones?'<p>Observaciones: '+esc(t.observaciones)+'</p>':"")+'</div>';
    }).join("")+'</div>').join("");
  return '<details class="siembra-demo-person"><summary class="siembra-demo-person-summary"><span class="siembra-demo-worker"><strong>'+esc(p.name)+'</strong><small>'+esc(p.key)+'</small></span>'+
    '<span class="siembra-demo-meters">'+bars("PROGRAMADO",programmed,programmed)+bars("DISPONIBLE",available,programmed)+bars("EFECTIVO",effective,programmed)+'</span>'+
    '<span class="siembra-demo-count">'+p.times.length+' reg.</span></summary><div class="siembra-demo-expanded">'+details+
    '<p class="siembra-demo-quantity">Esquejes registrados en el período: <b>'+esc(format.format(qtyTotal))+'</b></p></div></details>';
 }).join("");
 const sample=records.some(p=>[...p.labor,...p.times].some(r=>r.__soloDemostracion));
 return '<section class="siembra-demo-view">'+
  '<div class="siembra-demo-heading"><div><h3>Rendimiento · Siembra Campo</h3><p>Selecciona un colaborador para consultar el detalle de sus tiempos por fecha.</p></div><span>Solo lectura</span></div>'+
  (sample?'<p class="siembra-demo-test">DATOS DE PRUEBA — Información ficticia únicamente para visualizar el diseño. No corresponde a registros reales.</p>':"")+
  (records.length?summaries:'<p class="siembra-time-empty">No hay datos para los filtros seleccionados.</p>')+'</section>';
}
function demo(){
 const people=[["PRUEBA001","ANA MARÍA GÓMEZ",1200],["PRUEBA002","CARLOS ANDRÉS RUIZ",980],["PRUEBA003","LAURA PATRICIA TORRES",1350]];
 const labor=[],times=[];
 people.forEach(([id,name,qty],i)=>{
   ["2026-10-20","2026-10-21"].forEach((fecha,j)=>{
     const base=435,extra=i===1?30:0;
     const pauses=15,training=i===2?30:10,change=j===0?15:0,other=i===0?20:10;
     const discounts=pauses+training+change+other;
     labor.push({__soloDemostracion:true,fecha,colaborador:id,colaboradorNombre:name,cantidad:qty+j*80,bloque:"Bloq "+(i+1),cama:"Cama "+(142+i*2+j)});
     times.push({__soloDemostracion:true,fecha,colaborador:id,colaboradorNombre:name,horasLaboralesMin:base,horasExtraMin:extra,pausasMin:pauses,capacitacionMin:training,cambioLaborMin:change,otrosMin:other,incapacidadMin:0,vacacionesMin:0,examenMedicoMin:0,descuentoMin:0,otrasLaboresMin:discounts,tiempoDisponibleMin:base+extra,tiempoRealMin:base+extra-discounts,modalidadRegistro:j===0?"grupal":"individual",observaciones:j===1?"Registro ficticio para revisar el diseño":""});
   });
 });
 return {labor,times};
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
window.SiembraTimeConsultation={render,values,load,demo};
})();