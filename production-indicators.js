/* FlowerLogix · Tableros de Producción: Rendimiento / Calidad / Resumen Ejecutivo. */
(()=>{"use strict";
const TYPES={
 "siembra-campo":{unit:"esquejes",title:"Esquejes sembrados",qty:r=>valid(r.lineas)&&valid(r.densidad)?Number(r.lineas)*Number(r.densidad):num(r.cantidad??r.totalEsquejes)},
 "desbotonado-mallas":{unit:"tallos",title:"Tallos trabajados",qty:r=>num(r.tallos)},
 "corte":{unit:null,title:"Horas efectivas",qty:()=>null},
 "bandejas-enraizamiento":{unit:"esquejes",title:"Esquejes sembrados",qty:r=>num(r.cantidad??r.totalEsquejes??r.totalEsquejesSembrados)},
 "preparacion-camas":{unit:null,title:"Horas efectivas",qty:()=>null}
};
const WORKERS=[["DEMO-001","Ana Pérez (ejemplo)"],["DEMO-002","Carlos Ruiz (ejemplo)"],
 ["DEMO-003","María López (ejemplo)"],["DEMO-004","Juan Torres (ejemplo)"]];
const nf=new Intl.NumberFormat("es-CO",{maximumFractionDigits:1});
const clean=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const norm=v=>String(v??"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").trim().toLowerCase();
const valid=v=>v!==null&&v!==undefined&&v!==""&&Number.isFinite(Number(v))&&Number(v)>=0;
const num=v=>valid(v)?Number(v):null;
const date=r=>String(r?.fecha??r?.fechaRegistro??"").slice(0,10);
const workerName=r=>String(r?.sembradorNombre??r?.colaboradorNombre??r?.empleadoNombre??r?.nombreColaborador??
 r?.nombre??r?.sembrador??r?.colaborador??r?.empleado??"Sin identificar");
const workerCode=r=>String(r?.sembrador??r?.colaborador??r?.empleado??workerName(r)).trim();
const pct=(v,n)=>n>0?nf.format(100*v/n)+"%":"—";
const viewDate=d=>/^\d{4}-\d{2}-\d{2}$/.test(d)?d.slice(8,10)+"/"+d.slice(5,7)+"/"+d.slice(0,4):d;
function isoWeek(v){
 const str=typeof v==="object"?date(v):String(v);
 if(!/^\d{4}-\d{2}-\d{2}$/.test(str))return "";
 const d=new Date(str+"T12:00:00Z");if(!Number.isFinite(d.getTime()))return "";
 d.setUTCDate(d.getUTCDate()+3-(d.getUTCDay()+6)%7);
 const y=d.getUTCFullYear(),first=new Date(Date.UTC(y,0,4));
 first.setUTCDate(first.getUTCDate()+3-(first.getUTCDay()+6)%7);
 return y+"-S"+String(1+Math.round((d-first)/604800000)).padStart(2,"0");
}
function sampleLabor(modId){
 let rows=[];
 for(let w=0;w<6;w++)for(let i=0;i<4;i++){
  const [id,name]=WORKERS[i],stamp=new Date(Date.UTC(2026,8,7+w*7+i)).toISOString().slice(0,10);
  const h=5.65+((w+i)%5)*.27;
  const row={fecha:stamp,sembrador:id,sembradorNombre:name,colaborador:id,colaboradorNombre:name,
   bloque:"B"+(i%3+1),cama:"C"+(i+1),horasTrabajadas:Number(h.toFixed(2)),
   tiempoRealMin:Math.round(h*60),__soloDemostracion:true};
  if(modId==="siembra-campo"){row.lineas=5+w+i;row.densidad=[117,130,112,170][i]}
  if(modId==="desbotonado-mallas"){row.tallos=960+w*115+i*90;row.mediosCuadros=3+w%3}
  if(modId==="bandejas-enraizamiento"){row.cantidad=950+w*120+i*75}
  if(modId==="corte"){row.rol=["cortador","transportador","recogedor","cortador"][i]}
  rows.push(row);
 }
 return rows;
}
function sampleTimes(modId){
 if(modId!=="bandejas-enraizamiento")return [];
 return sampleLabor(modId).map(row=>({
  fecha:row.fecha,sembrador:row.sembrador,horasExtraMin:30,
  desplazamientoMin:15,calisteniaMin:15,capacitacionMin:15,otrasLaboresMin:70
 }));
}
function sourceQuality(modId){
 const quality=window.QualityReports;
 return quality?.config?.[modId]??{};
}
function sampleQuality(modId){
 const quality=window.QualityReports,groups=sourceQuality(modId);
 return quality?.sampleQualityRecords?.(groups,modId)??[];
}
function effectiveHours(row){
 if(valid(row.horasTrabajadas))return Number(row.horasTrabajadas);
 if(valid(row.horas))return Number(row.horas);
 if(valid(row.tiempoRealMin))return Number(row.tiempoRealMin)/60;
 return null;
}
function bandejasTimeHours(r){
 if(!r)return null;
 const mins=key=>num(r[key])??0;
 const categories=mins("desplazamientoMin")+mins("calisteniaMin")+mins("capacitacionMin");
 // La aplicación de origen incluye estas tres categorías en otrasLaboresMin.
 const aggregated=num(r.otrasLaboresMin);
 const extras=mins("horasExtraMin")+(num(r.horasExtra)??0)*60;
 const other=aggregated!==null?Math.max(0,aggregated-categories):
   mins("pMadresMin")+mins("pAbuelasMin");
 return Math.max(0,(435+extras-categories-other)/60);
}
function enrichedLabor(modId,rows,times){
 if(modId!=="bandejas-enraizamiento")return rows.map(r=>({...r,__horasEfectivas:effectiveHours(r)}));
 const sum=new Map(),byDay=new Map();
 const group=r=>date(r)+"|"+workerCode(r);
 rows.forEach(r=>{const q=TYPES[modId].qty(r);if(q!==null)sum.set(group(r),(sum.get(group(r))??0)+q)});
 times.forEach(r=>{if(date(r)&&workerCode(r))byDay.set(group(r),bandejasTimeHours(r))});
 return rows.map(r=>{
  const hours=byDay.get(group(r)),total=sum.get(group(r)),quantity=TYPES[modId].qty(r);
  return {...r,__horasEfectivas:hours!==undefined&&total>0&&quantity!==null?
    hours*quantity/total:effectiveHours(r)};
 });
}
function filterPeriod(rows,from,to,search){
 return rows.filter(r=>(!from||date(r)>=from)&&(!to||date(r)<=to)&&
  (!search||norm(workerName(r)+" "+workerCode(r)).includes(norm(search))));
}
function metric(label,value,sub=""){
 return '<div class="kpi-card"><span>'+clean(label)+'</span><strong>'+clean(value)+'</strong>'+
  (sub?'<small>'+clean(sub)+'</small>':"")+'</div>';
}
function weekly(rows,measure){
 const results=new Map();
 rows.forEach(r=>{const key=isoWeek(r);if(!key)return;
  const value=measure(r);
  if(value===null)return;
  results.set(key,(results.get(key)??0)+value);
 });
 return [...results.entries()].sort(([a],[b])=>a.localeCompare(b)).slice(-8)
   .map(([label,value])=>({label:label.replace(/^20\d{2}-/,""),value}));
}
function graphPanel(title,subtitle,body){
 return '<article class="dash-graph"><div class="dash-graph-heading"><h4>'+clean(title)+'</h4>'+
  (subtitle?'<span>'+clean(subtitle)+'</span>':"")+'</div>'+body+'</article>';
}
const placeholder=message=>'<div class="dash-no-data">'+clean(message)+'</div>';
function lineGraph(data,caption,percent=false){
 if(!data.length||data.every(p=>p.value===null))return placeholder("No hay datos suficientes para graficar.");
 const W=650,H=270,L=48,R=20,T=25,B=48,ww=W-L-R,hh=H-T-B;
 const real=data.filter(d=>Number.isFinite(d.value));
 let ceiling=percent?100:Math.max(...real.map(d=>d.value),1)*1.13;
 ceiling=Math.max(ceiling,percent?100:1);
 const sx=i=>L+(data.length===1?ww/2:i*ww/(data.length-1));
 const sy=v=>T+hh-(v/ceiling)*hh;
 let chunks=[],current=[];
 data.forEach((p,i)=>{if(p.value===null){if(current.length)chunks.push(current);current=[]}else current.push([sx(i),sy(p.value)])});
 if(current.length)chunks.push(current);
 const svg=[];
 for(let tick=0;tick<=4;tick++){
  const val=ceiling*tick/4,y=sy(val);
  svg.push('<line x1="'+L+'" y1="'+y+'" x2="'+(W-R)+'" y2="'+y+'" stroke="#e3ede7" stroke-dasharray="4 4"/>');
  svg.push('<text x="'+(L-9)+'" y="'+(y+4)+'" text-anchor="end" font-size="12" fill="#64776c">'+clean(percent?Math.round(val)+"%":nf.format(val))+'</text>');
 }
 for(const points of chunks){
  svg.push('<polyline fill="none" stroke="#15704d" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" points="'+points.map(p=>p.join(",")).join(" ")+'"/>');
 }
 data.forEach((p,i)=>{
  const x=sx(i);
  svg.push('<text x="'+x+'" y="'+(H-16)+'" text-anchor="middle" font-size="12" fill="#64776c">'+clean(p.label)+'</text>');
  if(p.value!==null){
   const y=sy(p.value);
   svg.push('<circle cx="'+x+'" cy="'+y+'" r="5" fill="#15704d"><title>'+clean(p.label+" · "+nf.format(p.value)+(percent?"%":""))+'</title></circle>');
  }
 });
 return '<svg class="dash-svg" viewBox="0 0 '+W+' '+H+'" role="img" aria-label="'+clean(caption)+'">'+svg.join("")+'</svg>';
}
function barGraph(data,caption,unit="",maxRows=6){
 const rows=data.filter(r=>Number.isFinite(r.value)).sort((a,b)=>b.value-a.value).slice(0,maxRows);
 if(!rows.length)return placeholder("Aún no hay datos comparables.");
 const W=650,L=180,R=65,barH=36,H=rows.length*barH+24,avail=W-L-R,highest=Math.max(...rows.map(x=>x.value),1);
 const parts=[];
 rows.forEach((r,i)=>{
  const y=i*barH+14,w=avail*Math.max(0,r.value)/highest;
  const label=String(r.label),shown=label.length>25?label.slice(0,24)+"…":label;
  parts.push('<text x="'+(L-12)+'" y="'+(y+17)+'" font-size="12" text-anchor="end" fill="#345342">'+clean(shown)+'</text>'+
   '<rect x="'+L+'" y="'+y+'" width="'+avail+'" height="22" rx="5" fill="#eff5f1"/>'+
   '<rect x="'+L+'" y="'+y+'" width="'+w+'" height="22" rx="5" fill="#238457"><title>'+
    clean(label+" · "+nf.format(r.value)+" "+unit)+'</title></rect>'+
   '<text x="'+(L+Math.min(w+7,avail+8))+'" y="'+(y+16)+'" font-size="11" fill="#314a3d">'+clean(nf.format(r.value))+'</text>');
 });
 return '<svg class="dash-svg" viewBox="0 0 '+W+' '+H+'" role="img" aria-label="'+clean(caption)+'">'+parts.join("")+'</svg>';
}
function personRanking(rows,measure){
 const map=new Map();
 rows.forEach(r=>{const v=measure(r);if(v===null)return;
  const id=workerCode(r),p=map.get(id)??{label:workerName(r),value:0};
  p.value+=v;map.set(id,p)});
 return [...map.values()];
}
function qualityRole(r,groups){
 const role=norm(r.__calidadGrupo??r.vistaCalidad??r.vista??r.rol??r.subtipo??r.tipoRol);
 if(groups[role])return role;
 if(groups["cortador-pompon"]&&(r.modalidad!=null||role==="cortador")){
  if(Number(r.modalidad)===2)return "cortador-spider";
  if(Number(r.modalidad)===1)return "cortador-pompon";
 }
 if(groups.spider&&/spider|cremon/.test(role))return "spider";
 if(groups.pompon&&role.includes("pompon"))return "pompon";
 const keys=Object.keys(groups);return keys.length===1?keys[0]:"";
}
function qualityCatalog(modId,groupId){
 const groups=sourceQuality(modId),group=groups[groupId];if(!group)return [];
 let stored=[];
 if(group.external){
  try{stored=JSON.parse(localStorage.getItem("flowerlogix_jn_data_produccion_"+modId+
   "_quality_catalog_"+groupId)||"[]")}catch{}
 }
 const list=Array.isArray(stored)&&stored.length?stored:group.items;
 return (list||[]).filter(i=>Array.isArray(i)&&i.length>=2)
  .map(i=>[String(i[0]),String(i[1])]).filter(([id,name])=>
    !group.conformIds?.includes(id)&&!/^(ramo\s+)?conforme$/.test(norm(name)));
}
function failuresOf(r,group,items){
 if(r.esMuestraReal===false||r.noRealizarMuestra===true)return null;
 const state=norm(r.estadoMuestra??r.resolucion??"");
 if(/no.?realizar.?muestra|no.?evaluada|sin.?muestra/.test(state))return null;
 const raw=Array.isArray(r.fallosDetalle)?r.fallosDetalle:
  Array.isArray(r.incumplimientos)?r.incumplimientos:
  Array.isArray(r.items)?r.items:Array.isArray(r.itemsNombres)?r.itemsNombres:
  Array.isArray(r.failures)?r.failures:null;
 if(!raw&&!r.conformeSeleccionado)return null;
 if(items.length===0)return null;
 const ids=new Map(items.map(([id])=>[id,id])),names=new Map(items.map(([id,name])=>[norm(name),id]));
 const failed=new Set();let unknown=false;
 for(const value of raw??[]){
  if(value&&typeof value==="object"&&valid(value.cantidad)&&Number(value.cantidad)===0)continue;
  const item=value&&typeof value==="object"?(value.idItem??value.itemId??value.id??value.item??value.nombre??value.name):value;
  const key=String(item??"").trim();
  if(!key||group.conformIds?.includes(key)||/^(ramo\s+)?conforme$/.test(norm(key)))continue;
  const id=ids.get(key)??names.get(norm(key));
  if(id!==undefined)failed.add(id);else unknown=true;
 }
 return unknown?null:failed;
}
function qualityRows(modId,rows,groupId,from,to,search){
 const groups=sourceQuality(modId),group=groups[groupId],items=qualityCatalog(modId,groupId);
 if(!group)return {items,rows:[],excluded:0};
 const matching=filterPeriod(rows,from,to,search).filter(r=>qualityRole(r,groups)===groupId);
 let excluded=0;
 const mapped=[];
 matching.forEach(r=>{const f=failuresOf(r,group,items);if(f===null){excluded++;return}mapped.push({...r,__failures:f})});
 return {items,rows:mapped,excluded};
}
function qualityData(rows,items){
 const total=rows.length,ok=rows.filter(r=>r.__failures.size===0).length;
 const defects=items.map(([id,label])=>({label,value:rows.filter(r=>r.__failures.has(id)).length}))
  .filter(d=>d.value>0).sort((a,b)=>b.value-a.value);
 const weeks=new Map(),persons=new Map();
 rows.forEach(r=>{
  const k=isoWeek(r);if(k){const item=weeks.get(k)??{label:k.replace(/^20\d{2}-/,""),n:0,ok:0};
   item.n++;if(!r.__failures.size)item.ok++;weeks.set(k,item)}
  const id=workerCode(r),p=persons.get(id)??{label:workerName(r),n:0,ok:0};
  p.n++;if(!r.__failures.size)p.ok++;persons.set(id,p);
 });
 return {total,ok,rate:total?100*ok/total:null,defects,
  weeks:[...weeks.entries()].sort(([a],[b])=>a.localeCompare(b)).slice(-8).map(([,v])=>({label:v.label,value:100*v.ok/v.n})),
  people:[...persons.values()].filter(v=>v.n>0).map(v=>({label:v.label,value:100*v.ok/v.n,n:v.n}))};
}
function sampleAlert(text){return '<div class="dash-sample"><strong>DATOS DE PRUEBA</strong> '+clean(text)+'</div>'}
function sharedNotice(demo,missing){
 return demo?sampleAlert("Cifras y gráficos ilustrativos; no se guardan ni se mezclan con registros reales."):
  '<div class="module-notice">Datos reales importados localmente; sin sincronización automática con Producción.'+
  (missing?' '+clean(missing):"")+'</div>';
}
function laborStats(modId,rows){
 const type=TYPES[modId],qty=rows.map(r=>type.qty(r)).filter(v=>v!==null),
  good=rows.filter(r=>type.qty(r)!==null&&r.__horasEfectivas!==null&&r.__horasEfectivas>0);
 const total=qty.reduce((s,v)=>s+v,0);
 const hours=rows.map(r=>r.__horasEfectivas).filter(v=>v!==null&&v>=0).reduce((s,v)=>s+v,0);
 const known=rows.filter(r=>r.__horasEfectivas!==null);
 const pairedHours=good.reduce((s,r)=>s+r.__horasEfectivas,0);
 const pairedQty=good.reduce((s,r)=>s+type.qty(r),0);
 return {type,total,qtyCount:qty.length,hours,hoursCount:known.length,
  workerCount:new Set(rows.map(workerCode)).size,days:new Set(rows.map(date).filter(Boolean)).size,
  rate:pairedHours>0?pairedQty/pairedHours:null};
}
function chartsLabor(modId,rows){
 const stats=laborStats(modId,rows),qtyMode=stats.type.unit!==null&&stats.qtyCount>0,
   measure=qtyMode?r=>stats.type.qty(r):r=>r.__horasEfectivas;
 const mainTitle=qtyMode?stats.type.title:"Horas efectivas";
 return '<div class="dash-graphs">'+
  graphPanel("Evolución semanal",mainTitle+" por semana",
    lineGraph(weekly(rows,measure),"Evolución semanal de "+mainTitle.toLowerCase()))+
  graphPanel("Colaboradores",mainTitle+" por colaborador",
    barGraph(personRanking(rows,measure),"Comparación de colaboradores",qtyMode?stats.type.unit:"horas"))+
  graphPanel("Distribución de la labor","Por bloque o rol",
    barGraph((()=>{
      const groups=new Map();
      rows.forEach(r=>{
        const k=modId==="corte"?String(r.rolNombre??r.rol??"Sin rol"):
          String(r.bloque??"Sin bloque");
        const v=measure(r);if(v===null)return;
        groups.set(k,(groups.get(k)??0)+v);
      });
      return [...groups].map(([label,value])=>({label,value}));
    })(),"Desglose de actividad",qtyMode?stats.type.unit:"horas"))+
  '</div>';
}
function sectionRend(modId,rows){
 const s=laborStats(modId,rows),unit=s.type.unit;
 return '<div class="dash-kpis">'+
  metric("Registros de labor",nf.format(rows.length))+
  metric(unit?s.type.title:"Horas efectivas",unit?(s.qtyCount?nf.format(s.total):"—"):
   (s.hoursCount?nf.format(s.hours)+" h":"—"))+
  metric(unit?"Rendimiento ("+unit+"/hora)":"Colaboradores",unit?
   (s.rate!==null?nf.format(s.rate):"—"):nf.format(s.workerCount),
   unit&&s.rate===null?"Requiere producción y horas comparables":"")+
  metric("Horas efectivas",s.hoursCount?nf.format(s.hours)+" h":"—",
   s.hoursCount?nf.format(s.hoursCount)+" registros con horas":"Sin tiempos asociados")+'</div>'+
  chartsLabor(modId,rows);
}
function sectionQuality(modId,rows,role,from,to,search){
 const q=qualityRows(modId,rows,role,from,to,search),s=qualityData(q.rows,q.items);
 return '<div class="dash-kpis">'+metric("Muestras evaluadas",nf.format(s.total))+
  metric("Conformidad general",s.rate===null?"—":nf.format(s.rate)+"%")+
  metric("Evaluaciones conformes",nf.format(s.ok))+
  metric("Criterios con fallas",nf.format(s.defects.length))+'</div>'+
  '<div class="dash-graphs">'+
  graphPanel("Conformidad por semana","Porcentaje de muestras conformes",lineGraph(s.weeks,"Conformidad semanal",true))+
  graphPanel("Principales incumplimientos","Número de evaluaciones con falla",barGraph(s.defects,"Principales criterios con incumplimientos","evaluaciones"))+
  graphPanel("Conformidad por colaborador","Porcentaje de muestras conformes",barGraph(s.people,"Comparación de calidad por colaborador","%",6))+
  '</div>'+
  (q.excluded?'<div class="module-notice">'+nf.format(q.excluded)+
   ' evaluaciones no se pudieron clasificar o no se realizaron; se excluyen de los porcentajes.</div>':"")+
  (!q.items.length?'<div class="module-notice">No hay criterios reales disponibles para esta modalidad. No se generan resultados de calidad ficticios.</div>':"");
}
function summarySection(modId,labor,quality,role,from,to,search){
 const s=laborStats(modId,labor),q=qualityRows(modId,quality,role,from,to,search),
  qual=qualityData(q.rows,q.items),hasQty=s.type.unit!==null&&s.qtyCount>0;
 const kpis='<div class="dash-kpis">'+
  metric(hasQty?s.type.title:"Horas efectivas",hasQty?nf.format(s.total):
    (s.hoursCount?nf.format(s.hours)+" h":"—"))+
  metric(hasQty?"Productividad ("+s.type.unit+"/hora)":"Personal en labor",
    hasQty?(s.rate===null?"—":nf.format(s.rate)):nf.format(s.workerCount))+
  metric("Conformidad calidad",qual.rate===null?"—":nf.format(qual.rate)+"%")+
  metric("Incumplimientos detectados",nf.format(qual.defects.reduce((v,x)=>v+x.value,0)))+'</div>';
 const l=weekly(labor,hasQty?r=>s.type.qty(r):r=>r.__horasEfectivas);
 return kpis+'<div class="dash-graphs">'+
   graphPanel("Producción / actividad semanal",hasQty?s.type.title:"Horas efectivas",
     lineGraph(l,"Actividad semanal"))+
   graphPanel("Evolución de conformidad","Porcentaje semanal de muestras conformes",
     lineGraph(qual.weeks,"Conformidad por semana",true))+
   graphPanel("Fallas que requieren atención","Principales incumplimientos",
     barGraph(qual.defects,"Fallas más repetidas","evaluaciones"))+
   '</div><div class="dash-executive-text"><strong>Lectura ejecutiva</strong><p>'+
   (s.rate!==null?"Productividad observada: "+nf.format(s.rate)+" "+s.type.unit+"/hora. ":
    "La productividad por hora no puede calcularse sin unidades realizadas y horas comparables. ")+
   (qual.rate!==null?"Conformidad observada: "+nf.format(qual.rate)+"% de "+
    nf.format(qual.total)+" evaluaciones. ":"No hay evaluaciones clasificables para establecer la conformidad. ")+
   'Las comparaciones entre productividad y calidad por persona requieren identificadores coincidentes.</p></div>';
}
function render({areaId,mod,view,panel,getRecords}){
 if(areaId!=="produccion"||!TYPES[mod.id])return false;
 const roles=sourceQuality(mod.id),roleIDs=Object.keys(roles);
 const realLabor=getRecords(areaId,mod.id),realQuality=getRecords(areaId,mod.id+"_calidad"),
  realTimes=getRecords(areaId,mod.id+"_tiempos");
 const fakeLabor=sampleLabor(mod.id),fakeQuality=sampleQuality(mod.id),fakeTimes=sampleTimes(mod.id);
 let demo=view==="rendimiento"?!realLabor.length:view==="calidad"?!realQuality.length:
  !realLabor.length&&!realQuality.length;
 let currentRole=roleIDs[0]??"";
 panel.innerHTML='<div class="dash-controlbar"><div class="dash-controlgroup">'+
   '<label>Desde<input type="date" id="dashFrom"></label><label>Hasta<input type="date" id="dashTo"></label>'+
   '<label>Colaborador<input type="search" id="dashWorker" placeholder="Nombre o código"></label>'+
   (view==="rendimiento"||!roleIDs.length?"":'<label>Modalidad<select id="dashRole">'+roleIDs.map(id=>
    '<option value="'+clean(id)+'">'+clean(roles[id].label)+'</option>').join("")+'</select></label>')+
   '</div><button type="button" class="btn-secondary" id="dashDemoButton">Ver registros reales</button></div>'+
   '<div id="dashFeedback"></div><div id="dashContents"></div>';
 const find=id=>panel.querySelector("#"+id),
 from=find("dashFrom"),to=find("dashTo"),worker=find("dashWorker"),
 role=find("dashRole"),msg=find("dashFeedback"),output=find("dashContents"),switcher=find("dashDemoButton");
 const renderNow=()=>{
  const labor=filterPeriod(enrichedLabor(mod.id,demo?fakeLabor:realLabor,demo?fakeTimes:realTimes),
   from.value,to.value,worker.value);
  const quality=demo?fakeQuality:realQuality;
  const unfiltered=filterPeriod(quality,from.value,to.value,worker.value);
  const note=(!demo&&!labor.length&&!unfiltered.length)?"No hay datos reales para el período o los filtros seleccionados.":"";
  msg.innerHTML=sharedNotice(demo,note);
  switcher.textContent=demo?"Ver registros reales":"Ver datos de prueba";
  if(role)currentRole=role.value;
  if(view==="rendimiento")output.innerHTML=sectionRend(mod.id,labor);
  else if(view==="calidad")output.innerHTML=sectionQuality(mod.id,quality,currentRole,from.value,to.value,worker.value);
  else output.innerHTML=summarySection(mod.id,labor,quality,currentRole,from.value,to.value,worker.value);
 };
 [from,to,worker].forEach(input=>input.addEventListener("input",renderNow));
 if(role)role.addEventListener("change",renderNow);
 switcher.addEventListener("click",()=>{demo=!demo;renderNow()});
 renderNow();return true;
}
window.ProductionIndicators={render,isoWeek,qualityRole,failuresOf,bandejasTimeHours,qualityData,
 sampleLabor,sampleQuality,sourceQuality,enrichedLabor};
})();