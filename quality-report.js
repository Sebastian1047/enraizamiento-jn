/* Informes de calidad: patrón de evaluacion-siembra, criterios de Labores JN. */
(()=>{"use strict";
const CONFIG={"siembra-campo":{"campo":{"label":"Siembra Campo","items":[["2","Estado de la planta"],["3","Distribución"],["4","Densidad"],["5","Profundidad de la planta"],["6","Planta inclinada"],["7","Ubicación de mangueras"],["8","Selección de esqueje"],["9","Siembra con marcador"],["10","Aseo sitio de trabajo"],["11","Uso de EPP"],["12","Acuerdos de oro"],["13","Conteo de líneas"]],"conformIds":["-Infinity"],"meta":{"2":{"tipo":"Número","subitems":["Botrytis severa","Daño mecánico"]},"3":{"tipo":"Número"},"4":{"tipo":"Número"},"5":{"tipo":"Número"},"6":{"tipo":"Número"},"7":{"tipo":"X"},"8":{"tipo":"Número"},"9":{"tipo":"X"},"10":{"tipo":"X"},"11":{"tipo":"X"},"12":{"tipo":"X"},"13":{"tipo":"X"}}}},"desbotonado-mallas":{"spider":{"label":"Spider / Cremon","items":[["1","Plantas con Botón o Tocón"],["2","Plantas con Tocón Largo"],["3","Daño Mecánico"],["4","Desbotón a 15 cm de la Base"],["5","Aseo Caminos"]],"conformIds":["-Infinity"],"meta":{"1":{"tipo":"Número"},"2":{"tipo":"Número"},"3":{"tipo":"Número","subitems":["Tallos partidos","Desbotón de tallo principal","Tallos heridos en tocón"]},"4":{"tipo":"X"},"5":{"tipo":"X"}}},"pompon":{"label":"Pompón","items":[["1","Tallos con Botón Principal"],["2","Tallos con Tocón Largo"],["3","Daño Mecánico"],["4","Aseo de Labor"]],"conformIds":["-Infinity"],"meta":{"1":{"tipo":"Número","nota":"tolerancia: 3 plantas con boton"},"2":{"tipo":"Número","nota":"tocon 1 cm max"},"3":{"tipo":"Número","subitems":["Tallos partidos","Exceso de desbotonado","Tallos heridos en tocón"],"nota":"tolerancia: tres tallos por sitio"},"4":{"tipo":"X"}}},"mallas":{"label":"Mallas","items":[["2","Estado de la Malla"],["3","Posición de la Malla"],["4","Daño Mecánico"],["5","Enmallado Oportuno"],["6","Uso de las Herramientas"],["7","Estado de la Flor"]],"conformIds":[],"meta":{"2":{"tipo":"Número","subitems":["Sucia","Rota","Mojada"]},"3":{"tipo":"Número","subitems":["Muy arriba","Muy abajo"]},"4":{"tipo":"X"},"5":{"tipo":"X"},"6":{"tipo":"X"},"7":{"tipo":"X"}}}},"corte":{"cortador-pompon":{"label":"Cortador - Pompón","items":[["2","Deshoje"],["3","Daño mecánico en la flor"],["17","Daño mecánico en el follaje"],["4","Peso del ramo y/o número de tallos"],["5","Número de puntos florales por tallo"],["6","Cauchos"],["7","Longitud del ramo"],["8","Base del ramo"],["9","Alineación de la flor"],["10","Follaje"],["11","Fitosanidad"],["12","Presentación del ramo"],["13","Hidratación"],["14","Aperturas"],["16","Acuerdos de oro"]],"conformIds":["1"],"meta":{"2":{"tipo":"X"},"3":{"tipo":"Número","subitems":["Cabezas de flor","Penunculos quebrados"]},"4":{"tipo":"X"},"5":{"tipo":"X"},"6":{"tipo":"Número","subitems":["Alimenacion","Numero de vueltas","Ubicacion"]},"7":{"tipo":"Número","subitems":["Corto","Largo"]},"8":{"tipo":"Número","subitems":["Corte parejo","Tallos rasgados","Pata leñosa"]},"9":{"tipo":"X"},"10":{"tipo":"Número","subitems":["Amarillento","Quemado","Deshidratado","Necrótico","Sucio"]},"11":{"tipo":"Número","subitems":["Botrytis","Stemphylium","Quemazón","Minador","Trips","Áfidos","Gusano cogollero"]},"12":{"tipo":"Número","subitems":["Estado del capuchon","Ubicacion del capuchon","Flor sucia"]},"13":{"tipo":"Número","subitems":["Cantidad","Ramos en balde","Agua en balde"]},"14":{"tipo":"Número","subitems":["Abierto","Cerrado","Mezclas"]},"16":{"tipo":"X"},"17":{"tipo":"Número","subitems":["Hojas quebradas","Maltrato"]}}},"cortador-spider":{"label":"Cortador - Spider","items":[["2","Deshoje"],["3","Daño mecánico en la flor"],["17","Daño mecánico en el follaje"],["4","Peso del ramo y/o número de tallos"],["5","Número de puntos florales por tallo"],["6","Cauchos"],["7","Longitud del ramo"],["8","Base del ramo"],["9","Alineación de la flor"],["10","Follaje"],["11","Fitosanidad"],["12","Presentación del ramo"],["13","Hidratación"],["14","Aperturas"],["16","Acuerdos de oro"]],"conformIds":["1"],"meta":{"2":{"tipo":"X"},"3":{"tipo":"Número","subitems":["Cabezas de flor","Penunculos quebrados"]},"4":{"tipo":"X"},"5":{"tipo":"X"},"6":{"tipo":"Número","subitems":["Alimenacion","Numero de vueltas","Ubicacion"]},"7":{"tipo":"Número","subitems":["Corto","Largo"]},"8":{"tipo":"Número","subitems":["Corte parejo","Tallos rasgados","Pata leñosa"]},"9":{"tipo":"X"},"10":{"tipo":"Número","subitems":["Amarillento","Quemado","Deshidratado","Necrótico","Sucio"]},"11":{"tipo":"Número","subitems":["Botrytis","Stemphylium","Quemazón","Minador","Trips","Áfidos","Gusano cogollero"]},"12":{"tipo":"Número","subitems":["Estado del capuchon","Ubicacion del capuchon","Flor sucia"]},"13":{"tipo":"Número","subitems":["Cantidad","Ramos en balde","Agua en balde"]},"14":{"tipo":"Número","subitems":["Abierto","Cerrado","Mezclas"]},"16":{"tipo":"X"},"17":{"tipo":"Número","subitems":["Hojas quebradas","Maltrato"]}}},"garruchero":{"label":"Transportador","items":[["2","Cuidado de Ramos Campo"],["3","Hidratación en Balde"],["4","Cantidad de Ramos en Balde"],["5","Cuidado de Ramos Poscosecha"],["6","Descargue de Flor en Sala"],["7","EE PP"]],"conformIds":["1"],"meta":{"2":{"tipo":"Número"},"3":{"tipo":"Número","subitems":["Balde sin solución inicial","Tallos sin contacto con solución"]},"4":{"tipo":"X"},"5":{"tipo":"X"},"6":{"tipo":"Número"},"7":{"tipo":"X"}}},"recogedor":{"label":"Recogedor","items":[["3","Cuidado de Ramos"],["4","Marcación de etiquetas"],["5","Cantidad"],["6","Hidratación en Balde"],["7","Mezcla de Medidas"],["8","Ramos en la Malla Caminos"],["9","Desplazamiento de Baldes"],["10","Acuerdos de Oro"]],"conformIds":["1"],"meta":{"3":{"tipo":"Número"},"4":{"tipo":"Número"},"5":{"tipo":"Número"},"6":{"tipo":"Número"},"7":{"tipo":"Número"},"8":{"tipo":"Número"},"9":{"tipo":"Número"},"10":{"tipo":"Número"}}}},"bandejas-enraizamiento":{"bandejas":{"label":"Bandejas Enraizamiento","items":[["2","Estado de Esqueje"],["3","Ubicación del Esqueje"],["4","Esqueje Inclinado"],["5","Espacios Vacíos"],["6","Daño Mecánico"],["7","Hundimiento del Sustrato al momento de la Siembra"],["8","Marcación"]],"conformIds":["-Infinity","1"],"meta":{"2":{"tipo":"X"},"3":{"tipo":"Número"},"4":{"tipo":"Número"},"5":{"tipo":"X"},"6":{"tipo":"Número","subitems":["Esqueje partido","Esqueje sin cogollo"]},"7":{"tipo":"X"},"8":{"tipo":"X"}}}},"preparacion-camas":{"preparacion":{"label":"Preparación Camas","items":[["2","Limpieza de Terreno"],["3","Distribución de Enmiendas"],["4","Nivelación del Suelo"],["5","(Estado, Distribución y Cantidad de Durmientes)"],["6","Profundidad de la Preparación"],["7","Riego"],["8","Aseo"],["9","Instalación de la Malla"],["10","Instalación de Mangueras de Goteo"]],"conformIds":["-Infinity","1"],"meta":{"2":{"tipo":"X"},"3":{"tipo":"X"},"4":{"tipo":"X"},"5":{"tipo":"X"},"6":{"tipo":"X"},"7":{"tipo":"X"},"8":{"tipo":"X"},"9":{"tipo":"X"},"10":{"tipo":"X"}}}},"empacador-rendimiento":{"empacador":{"label":"Empacador","items":[["2","Área de Empaque limpia y Ordenada"],["3","Tipo de Caja"],["4","Simetría"],["5","Ubicación del logo de capuchón"],["6","Código Empaque"],["7","Presentación de Ramos"],["8","Número de Ramos por Caja"],["9","Especificaciones de PO, SO y OM"],["10","Marcación / Código"],["11","Daño Mecánico"],["12","UPC y Capuchón Manchado, rasgado"]],"conformIds":["1"]}},"surtidor-rendimiento":{"surtidor":{"label":"Surtidor","items":[["2","Surtido"],["3","Apertura"],["4","Daño Mecánico"],["5","Marcación"]],"conformIds":["1"]}},"zunchador-rendimiento":{"zunchador":{"label":"Zunchador","items":[["2","Zunchos"],["3","Daño mecánico"]],"conformIds":["1"]}},"digitador-rendimiento":{"digitador":{"label":"Digitador","items":[["2","Mala marcación"]],"conformIds":["1"]}},"aspersion-rendimiento":{"aspersion":{"label":"Aspersión","items":[["2","Conocimiento del Programa de Aplicación"],["3","Uso Correcto de EPP´S"],["4","Herramientas de Aspersión"],["5","Desagüe antes de la Aplicación"],["6","Dirección de las Boquillas"],["7","Cobertura"],["8","Rendimiento de la Labor"],["9","Paso Sincronizado"],["10","Orden y Aseo"],["11","Horarios de la Labor"],["12","Acuerdos de Oro"]],"conformIds":["1"]}},"tanquista-rendimiento":{"tanquista":{"label":"Tanquista","items":[["2","Conocimiento del Programa de Aplicación"],["3","Uso Correcto de EPP´S"],["4","Premezcla"],["5","Preparación de la mezcla"],["6","Equipos"],["7","Avisos Informativos"],["8","Orden y Aseo"],["9","Horarios de la Labor"],["10","Acuerdos de Oro"]],"conformIds":["1"]}}};
const fmt=new Intl.NumberFormat("es-CO",{maximumFractionDigits:2});
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const norm=v=>String(v??"").trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
const pct=(ok,n)=>n>0?Math.round(100*ok/n)+"%":"—";
const key=(area,id)=>"flowerlogix_jn_data_"+area+"_"+id;
const read=k=>{try{const r=JSON.parse(localStorage.getItem(k)||"[]");return Array.isArray(r)?r:[]}catch{return[]}};
const date=r=>String(r.fecha||r.fechaRegistro||"").slice(0,10);
const worker=r=>String(r.colaboradorNombre||r.sembradorNombre||r.empleadoNombre||r.nombreColaborador||r.nombre||r.colaborador||r.sembrador||r.empleado||"");
function period(r){
 let y=Number(r.anio||r.ano||r.AnioEvaluacion),w=Number(r.semana||r.NumeroSemana);
 if(Number.isInteger(y)&&y>2000&&Number.isInteger(w)&&w>=1&&w<=53)return [y,w];
 const d=date(r);if(!/^\d{4}-\d{2}-\d{2}$/.test(d))return [null,null];
 const day=new Date(d+"T12:00:00Z");if(!Number.isFinite(day.getTime()))return [null,null];
 const wd=(day.getUTCDay()+6)%7;day.setUTCDate(day.getUTCDate()-wd+3);
 const year=day.getUTCFullYear(),begin=new Date(Date.UTC(year,0,4));
 begin.setUTCDate(begin.getUTCDate()-(begin.getUTCDay()+6)%7+3);
 return [year,1+Math.round((day-begin)/(7*86400000))];
}
function compareWeekDays(value){
 const match=/^(\d{4})-S(\d{2})$/.exec(String(value??""));
 if(!match)return [];
 const year=Number(match[1]),week=Number(match[2]);
 if(week<1||week>53)return [];
 const january4=new Date(Date.UTC(year,0,4));
 const monday=new Date(Date.UTC(year,0,4-((january4.getUTCDay()+6)%7)+7*(week-1)));
 const days=Array.from({length:7},(_,i)=>{
  const current=new Date(monday);current.setUTCDate(monday.getUTCDate()+i);
  return current.toISOString().slice(0,10);
 });
 return period({fecha:days[0]}).join("-")===year+"-"+week?days:[];
}
function comparisonDropdown(name,title){
 return '<div class="q-compare-select-field">'+
 '<span class="q-compare-field-label">'+title+'</span>'+
 '<details class="q-filter-dropdown q-compare-choice" id="qX'+name+'Drop">'+
 '<summary class="q-filter-trigger">'+
 '<strong id="qX'+name+'Summary">Todos</strong></summary>'+
 '<div class="q-filter-popup"><div class="q-select-actions">'+
 '<button type="button" id="qX'+name+'All">Todos</button>'+
 '<button type="button" id="qX'+name+'None">Limpiar</button></div>'+
 '<div id="qX'+name+'" class="q-check-options"></div></div></details></div>';
}
function real(r){const s=norm(r.tipo||r.estadoMuestra||r.resolucion||"");
 return r&&r.esMuestraReal!==false&&!r.noRealizarMuestra&&!/no.?realizar.?muestra|no.?evaluada|sin.?muestra/.test(s);
}
function rowRole(r,groups){
 const stated=norm(r.__calidadGrupo||r.vistaCalidad||r.vista||r.rol||r.subtipo||r.tipoRol);
 if(groups[stated])return stated;
 if(groups["cortador-pompon"]&&(stated==="cortador"||r.modalidad!=null)){
   if(Number(r.modalidad)===2)return "cortador-spider";
   if(Number(r.modalidad)===1)return "cortador-pompon";
 }
 if(groups.spider&&/spider|cremon/.test(stated))return "spider";
 if(groups.pompon&&/pompon/.test(stated))return "pompon";
 const keys=Object.keys(groups);return keys.length===1?keys[0]:"";
}
function evaluate(r,config,items){
 const raw=Array.isArray(r.fallosDetalle)?r.fallosDetalle:
   Array.isArray(r.incumplimientos)?r.incumplimientos:
   Array.isArray(r.items)?r.items:Array.isArray(r.failures)?r.failures:
   Array.isArray(r.detalles)?r.detalles:Array.isArray(r.observaciones)?r.observaciones:[];
 const values=raw.length?raw:(Array.isArray(r.itemsNombres)?r.itemsNombres:[]);
 const ids=new Map(items.map(([id,name])=>[String(id),String(id)]));
 const names=new Map(items.map(([id,name])=>[norm(name),String(id)]));
 const failed=new Set();let unknown=false;
 for(const v of values){
   if(v&&typeof v==="object"&&v.cantidad!==undefined&&Number(v.cantidad)<=0)continue;
   const item=v&&typeof v==="object"?v.idItemDocumento??v.idItem??v.itemId??v.id??v.item??v.nombre??v.name??v.idObservacion:v;
   const txt=String(item??"").trim();
   if(!txt)continue;
   if(config.conformIds.includes(txt)||/^(ramo\s+)?conforme$/.test(norm(txt)))continue;
   const found=ids.get(txt)||names.get(norm(txt));
   if(found)failed.add(found);else unknown=true;
 }
 return {failed,unknown};
}
function catalogOverview(items,group){
 if(!items.length)return "";
 const meta=group.meta||{};
 const count=items.filter(([id])=>meta[id]?.subitems?.length).length;
 const rows=items.map(([id,label])=>{
   const detail=meta[id]||{},sub=detail.subitems||[];
   return '<tr><td>'+esc(label)+'</td>'+
     '<td>'+esc(detail.tipo||"No especificado")+'</td>'+
     '<td>'+(sub.length?sub.map(esc).join(" · "):"—")+'</td>'+
     '<td>'+esc(detail.nota||"—")+'</td></tr>';
 }).join("");
 return '<details class="quality-criteria-details"'+(count?" open":"")+'>'+
  '<summary>Ítems del formulario y subítems ('+items.length+' ítems; '+count+' con subítems)</summary>'+
  '<div class="module-tablewrap"><table class="module-table quality-criteria-table">'+
  '<thead><tr><th>ÍTEM</th><th>REGISTRO</th><th>SUBÍtems / CAUSAS</th><th>TOLERANCIA</th></tr></thead>'+
  '<tbody>'+rows+'</tbody></table></div>'+
  '<p class="quality-criteria-help">X indica marcación del incumplimiento; Número indica cantidad de fallas. '+
  'La conformidad de la tabla principal se calcula por ítem, aun cuando tenga varios subítems.</p></details>';
}

function compareSvg(series,periodLabels){
 const active=series.filter(s=>s.values.some(v=>v!==null&&Number.isFinite(v)));
 if(!active.length||!periodLabels.length)return '<p class="q-explore-empty">No hay suficientes evaluaciones para dibujar la comparación.</p>';
 const w=940,h=320,left=50,right=18,top=24,bottom=58,plotW=w-left-right,plotH=h-top-bottom;
 const sx=i=>left+(periodLabels.length===1?plotW/2:i*plotW/(periodLabels.length-1));
 const sy=value=>top+plotH-Math.max(0,Math.min(100,value))/100*plotH;
 const palette=["#147b4b","#3264a8","#b57122","#9a4b8c","#37868a","#6c8437"];
 let svg=[];
 for(let tick=0;tick<=4;tick++){
  const value=tick*25,y=sy(value);
  svg.push('<line x1="'+left+'" x2="'+(w-right)+'" y1="'+y+'" y2="'+y+
    '" stroke="#dbe8df" stroke-dasharray="4 5"/>');
  svg.push('<text x="'+(left-9)+'" y="'+(y+4)+'" text-anchor="end" font-size="13" fill="#64766b">'+value+'%</text>');
 }
 periodLabels.forEach((name,i)=>{
  if(periodLabels.length>15&&i%2===1)return;
  const x=sx(i);
  svg.push('<text x="'+x+'" y="'+(h-20)+'" text-anchor="end" transform="rotate(-28 '+x+' '+(h-20)+
  ')" font-size="11" fill="#556d5f">'+esc(name)+'</text>');
 });
 active.slice(0,5).forEach((set,index)=>{
  const color=palette[index%palette.length],pieces=[];let points=[];
  set.values.forEach((v,i)=>{
   if(v===null||!Number.isFinite(v)){if(points.length)pieces.push(points);points=[];return;}
   points.push([sx(i),sy(v)]);
  });
  if(points.length)pieces.push(points);
  pieces.forEach(p=>svg.push('<polyline points="'+p.map(v=>v.join(",")).join(" ")+
   '" stroke="'+color+'" stroke-width="3" fill="none" stroke-linejoin="round" stroke-linecap="round"/>'));
  set.values.forEach((v,i)=>{
   if(v===null||!Number.isFinite(v))return;
   const x=sx(i),y=sy(v);
   svg.push('<circle cx="'+x+'" cy="'+y+'" r="4" fill="'+color+'"><title>'+
     esc(set.label+' · '+periodLabels[i]+': '+Math.round(v*10)/10+'%')+'</title></circle>');
  });
 });
 return '<div class="q-explore-legend">'+active.slice(0,5).map((set,i)=>
   '<span><i style="background:'+palette[i%palette.length]+'"></i>'+esc(set.label)+'</span>').join("")+'</div>'+
   '<svg class="q-explore-chart" viewBox="0 0 '+w+' '+h+'" role="img" aria-label="Evolución de conformidad por ítem y período">'+
   svg.join("")+'</svg>'+
   (active.length>5?'<p class="q-explore-help">El gráfico muestra cinco ítems como máximo; la tabla incluye todos los seleccionados.</p>':"");
}
function analyzeComparison(rows,group,items,selectedIds,years,weeks,exactPeriods,search,selectedDays=null){
 const validIds=new Set(items.map(x=>x[0]));
 const chosen=items.filter(([id])=>selectedIds.has(id)&&validIds.has(id));
 const out=new Map(),invalid=[];
 rows.forEach(r=>{
  if(!real(r))return;
  const [year,week]=period(r);
  if(!year||!week)return;
  const per=year+'-'+String(week).padStart(2,"0");
  if(exactPeriods!==null&&!exactPeriods.has(per))return;
  if(exactPeriods===null&&((years!==null&&!years.has(year))||(weeks!==null&&!weeks.has(week))))return;
  if(search&&!norm(worker(r)+' '+(r.colaborador??r.sembrador??r.empleado??"")).includes(norm(search)))return;
  if(selectedDays!==null&&selectedDays!==""){
   const stamp=date(r);
   if(typeof selectedDays==="string"){if(stamp!==selectedDays)return;}
   else{
    if(!/^\d{4}-\d{2}-\d{2}$/.test(stamp))return;
    const d=new Date(stamp+"T12:00:00Z");
    if(!Number.isFinite(d.getTime())||!selectedDays.has((d.getUTCDay()+6)%7))return;
   }
  }
  const ev=evaluate(r,group,items);
  if(ev.unknown){invalid.push(r);return;}
  let row=out.get(per);
  if(!row){row={year,week,label:year+' · S'+String(week).padStart(2,"0"),n:0,overall:0,selected:0,ids:new Map(chosen.map(([id])=>[id,0]))};out.set(per,row)}
  row.n++;
  if(!ev.failed.size)row.overall++;
  if(!chosen.some(([id])=>ev.failed.has(id)))row.selected++;
  for(const [id] of chosen)if(!ev.failed.has(id))row.ids.set(id,row.ids.get(id)+1);
 });
 return {periods:[...out.values()].sort((a,b)=>a.year-b.year||a.week-b.week),chosen,excluded:invalid.length};
}

function calc(records,group,items){
 const people=new Map();let excluded=0;
 for(const r of records){
   const failure=evaluate(r,group,items);
   if(failure.unknown){excluded++;continue;}
   const id=String(r.colaborador||r.sembrador||r.empleado||worker(r)||"Sin código");
   if(!people.has(id))people.set(id,{name:worker(r)||id,id,samples:0,pass:0,issues:new Map(items.map(([item])=>[item,0]))});
   const p=people.get(id);p.samples++;if(!failure.failed.size)p.pass++;
   for(const id of failure.failed)p.issues.set(id,p.issues.get(id)+1);
 }
 return {rows:[...people.values()].sort((a,b)=>a.name.localeCompare(b.name,"es")),excluded};
}
// Vista previa determinista: nunca se guarda en localStorage ni se mezcla con datos importados.
const DEMO_PEOPLE=[
  ["DEMO-001","Ana Pérez (ejemplo)"],
  ["DEMO-002","Carlos Ruiz (ejemplo)"],
  ["DEMO-003","María López (ejemplo)"],
  ["DEMO-004","Juan Torres (ejemplo)"]
];
function demoItems(group){
 if(group.items.length)return group.items;
 return [["demo-a","Criterio ilustrativo A (no oficial)"],
         ["demo-b","Criterio ilustrativo B (no oficial)"],
         ["demo-c","Criterio ilustrativo C (no oficial)"]];
}
function sampleQualityRecords(groups,modId){
 const rows=[];
 for(const [roleIndex,[groupId,group]] of Object.entries(groups).entries()){
   const items=demoItems(group);
   const seed=modId.length+roleIndex*3;
   for(let week=0;week<4;week++){
     for(let personIndex=0;personIndex<DEMO_PEOPLE.length;personIndex++){
       const [code,name]=DEMO_PEOPLE[personIndex];
       for(let revision=0;revision<4;revision++){
         const n=personIndex*7+week*5+revision+seed;
         const pattern=n%7;
         const fails=pattern===1||pattern===4?[items[n%items.length][0]]:
           pattern===6?[items[n%items.length][0],items[(n+1)%items.length][0]]:[];
         const stamp=new Date(Date.UTC(2026,8,14+7*week+revision)).toISOString().slice(0,10);
         rows.push({id:"DEMO-"+modId+"-"+groupId+"-"+week+"-"+personIndex+"-"+revision,
           __calidadGrupo:groupId, fecha:stamp, anio:2026, semana:38+week,
           colaborador:code,colaboradorNombre:name,revision:revision+1,
           incumplimientos:fails,esMuestraReal:true,__soloDemostracion:true});
       }
     }
   }
 }
 // Semanas 1-3 de tres años para probar comparaciones históricas sin importar datos reales.
 for(const [roleIndex,[groupId,group]] of Object.entries(groups).entries()){
  const items=demoItems(group);
  for(let year=2024;year<=2026;year++)for(let week=1;week<=3;week++)
   for(let personIndex=0;personIndex<DEMO_PEOPLE.length;personIndex++)
    for(let revision=0;revision<2;revision++){
     const [code,name]=DEMO_PEOPLE[personIndex],jan4=new Date(Date.UTC(year,0,4));
     const monday=4-((jan4.getUTCDay()+6)%7)+7*(week-1)+revision;
     const stamp=new Date(Date.UTC(year,0,monday)).toISOString().slice(0,10);
     const n=(year-2020)*3+week*5+personIndex*7+revision+roleIndex*3;
     const fails=n%5===0?[items[n%items.length][0]]:n%9===2?[items[n%items.length][0],items[(n+1)%items.length][0]]:[];
     rows.push({id:"DEMO-HIST-"+modId+"-"+groupId+"-"+year+"-"+week+"-"+personIndex+"-"+revision,
      __calidadGrupo:groupId,fecha:stamp,anio:year,semana:week,colaborador:code,colaboradorNombre:name,
      revision:revision+1,incumplimientos:fails,esMuestraReal:true,__soloDemostracion:true});
    }
 }
 return rows;
}

const QUALITY_BRAND={
 logo:"https://sebastian1047.github.io/labores-jn-2/icons/jardines-san-nicolas.jpg",
 assurance:"https://sebastian1047.github.io/labores-jn-2/icons/aseguramiento.png",
 company:"JARDINES DE SAN NICOLÁS S.A.S."
};
let qualityPdfLibraryPromise=null;
function loadQualityPdfLibrary(){
 if(window.jspdf?.jsPDF)return Promise.resolve();
 if(qualityPdfLibraryPromise)return qualityPdfLibraryPromise;
 qualityPdfLibraryPromise=new Promise((resolve,reject)=>{
  const script=document.createElement("script");
  script.src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
  script.async=true;
  script.onload=()=>window.jspdf?.jsPDF?resolve():reject(new Error("El generador PDF no está disponible."));
  script.onerror=()=>reject(new Error("No se pudo cargar la biblioteca PDF. Comprueba tu conexión."));
  document.head.appendChild(script);
 }).catch(error=>{qualityPdfLibraryPromise=null;throw error});
 return qualityPdfLibraryPromise;
}
function qualityPDFLogo(url){
 if(typeof Image==="undefined")return Promise.resolve(null);
 return new Promise(resolve=>{
  const image=new Image();
  image.crossOrigin="anonymous";
  image.onload=()=>{
   try{
    const canvas=document.createElement("canvas");
    canvas.width=image.naturalWidth;canvas.height=image.naturalHeight;
    if(!canvas.width||!canvas.height)throw Error("Logo vacío");
    canvas.getContext("2d").drawImage(image,0,0);
    resolve({data:canvas.toDataURL("image/png"),ratio:canvas.width/canvas.height});
   }catch{resolve(null)}
  };
  image.onerror=()=>resolve(null);
  image.src=url;
 });
}
function qualityPDFText(pdf,value,x,y,options={}){
 pdf.text(String(value??""),x,y,options);
}
function qualityPDFHeader(pdf,payload,logos={}){
 const green=[29,93,61],border=[160,178,164];
 const moduleId=payload.moduleId;
 const areaName=moduleId==="siembra-campo"?"SIEMBRA EN CAMPO":payload.group.label.toUpperCase();
 const indicator=moduleId==="siembra-campo"?"METEORO":"CALIDAD DE LA LABOR";
 const responsible=moduleId==="siembra-campo"?"ERASMO GOMEZ":"—";
 const edge=8,x2=85,x3=192,width=281;
 pdf.setDrawColor(...border);pdf.setLineWidth(.19);
 pdf.rect(edge,8,width,46);
 pdf.line(x2,8,x2,31);pdf.line(x3,8,x3,54);
 pdf.line(edge,31,x3,31);pdf.line(edge,38,x3,38);
 pdf.setFont("helvetica","bold");pdf.setTextColor(...green);pdf.setFontSize(14);
 qualityPDFText(pdf,"Jardines de",11,17);
 qualityPDFText(pdf,"San Nicolás",11,23);
 pdf.setFontSize(7);qualityPDFText(pdf,"S.A.S.",11,27);
 pdf.setTextColor(38,53,43);pdf.setFontSize(9);
 qualityPDFText(pdf,"RUTA DE APRENDIZAJE",(x2+x3)/2,19,{align:"center"});
 pdf.setFontSize(7.9);
 qualityPDFText(pdf,"JARDINES DE SAN NICOLÁS S.A.S.",(edge+x3)/2,35.7,{align:"center"});
 pdf.setFontSize(9.2);pdf.setFont("helvetica","bold");
 qualityPDFText(pdf,"ASEGURAMIENTO",(x3+289)/2,28,{align:"center"});
 pdf.setFontSize(5.8);pdf.setFont("helvetica","normal");
 qualityPDFText(pdf,"CONTROL DE CALIDAD",(x3+289)/2,33,{align:"center"});
 if(logos.logo){
  const aw=70,ah=19,ratio=logos.logo.ratio;
  const w=Math.min(aw,ah*ratio),h=w/ratio;
  pdf.setFillColor(255,255,255);pdf.rect(9,9,74,20,"F");
  pdf.addImage(logos.logo.data,"PNG",11+(aw-w)/2,9+(ah-h)/2,w,h);
 }
 if(logos.assurance){
  const aw=65,ah=37,ratio=logos.assurance.ratio;
  const w=Math.min(aw,ah*ratio),h=w/ratio;
  pdf.setFillColor(255,255,255);pdf.rect(200,9,81,37,"F");
  pdf.addImage(logos.assurance.data,"PNG",208+(aw-w)/2,10+(ah-h)/2,w,h);
 }

 pdf.setFontSize(7.2);
 const labels=[["INDICADOR",indicator],["ÁREA",areaName],["RESPONSABLE",responsible]];
 for(let i=0;i<3;i++){
  const y=38+i*(16/3);
  pdf.line(edge,y+16/3,x3,y+16/3);
  pdf.line(85,y,85,y+16/3);
  pdf.setFont("helvetica","bold");
  qualityPDFText(pdf,labels[i][0],11,y+3.45);
  pdf.setFont("helvetica","normal");
  qualityPDFText(pdf,labels[i][1],(85+x3)/2,y+3.45,{align:"center"});
 }
 return {indicator,areaName};
}
function qualityPDFReport(pdf,payload,logos={}){
 const pageWidth=297,pageHeight=210,margin=8,right=289,width=281;
 const items=payload.items,rows=payload.rows,weeks=payload.weekRows;
 const {indicator}=qualityPDFHeader(pdf,payload,logos);
 pdf.setDrawColor(154,174,158);pdf.setLineWidth(.17);
 let y=56;
 if(payload.isDemo){
  pdf.setFillColor(255,241,212);pdf.rect(margin,y,width,6,"FD");
  pdf.setFont("helvetica","bold");pdf.setTextColor(116,77,21);pdf.setFontSize(7.2);
  qualityPDFText(pdf,"DATOS DE PRUEBA - INFORME DEMOSTRATIVO, NO VÁLIDO COMO EVALUACIÓN REAL",148.5,y+4,{align:"center"});
  y+=8;
 }
 const period=payload.current?
   "SEMANA "+payload.current.week+" - "+payload.current.yr:"SIN EVALUACIONES";
 pdf.setTextColor(34,52,41);pdf.setFillColor(241,245,242);
 pdf.rect(margin,y,width,7,"FD");
 pdf.setFont("helvetica","bold");pdf.setFontSize(8);
 qualityPDFText(pdf,"RESULTADOS CONFORMIDAD INDIVIDUAL "+period,148.5,y+4.7,{align:"center"});
 y+=7;
 // Every column has an allocated area. No HTML scroll containers or screenshots.
 const n=items.length+2,workerW=items.length>17?49:62,totalW=22,
  unitW=(width-workerW-totalW)/(n-2),colWidths=[workerW,...items.map(()=>unitW),totalW];
 const xs=[margin];for(const w of colWidths)xs.push(xs[xs.length-1]+w);
 const available=177-y,preferred=rows.length<=12?7.2:5.2;
 const rowHeight=Math.max(3.1,Math.min(preferred,Math.max(3.1,(available-19)/Math.max(rows.length,1))));
 // Reserva altura suficiente para nombres de ítems en varias líneas.
 const headHeight=items.length>=15?27:25;
 const needed=headHeight+Math.max(1,rows.length)*rowHeight;
 const chartStart=Math.min(150,Math.max(122,y+needed+6));
 const footerY=188;
 let rowH=rowHeight;
 if(y+headHeight+Math.max(1,rows.length)*rowH+4>chartStart)
  rowH=Math.max(2.9,(chartStart-y-headHeight-4)/Math.max(1,rows.length));
 // Encabezados claros y texto oscuro. Restablecer el color para CADA
 // celda evita que jsPDF herede el color de otros elementos del informe.
 for(let i=0;i<n;i++){
  pdf.setFillColor(247,250,248);
  pdf.setDrawColor(157,177,162);
  pdf.setLineWidth(.18);
  pdf.rect(xs[i],y,colWidths[i],headHeight,"FD");
  const name=i===0?"NOMBRE DEL COLABORADOR":i===n-1?"CONFORMIDAD TOTAL":items[i-1][1];
  const cellWidth=colWidths[i],maxTextWidth=Math.max(5,cellWidth-2.2);
  let fontSize=i===0?7.2:items.length>=15?6.2:7.0,lines=[];
  pdf.setFont("helvetica","bold");
  // Reducir el tamaño solo si hace falta; jamás suprimir el nombre
  // mediante slice, como hacía la versión anterior.
  do{
   pdf.setFontSize(fontSize);
   lines=pdf.splitTextToSize(String(name),maxTextWidth);
   if(lines.length*fontSize*.39<=headHeight-3.1)break;
   fontSize-=.25;
  }while(fontSize>=4.4);
  const lineHeight=fontSize*.39;
  const firstLineY=y+(headHeight-(lines.length-1)*lineHeight)/2+fontSize*.12;
  pdf.setTextColor(22,47,34);
  lines.forEach((line,j)=>{
   qualityPDFText(pdf,line,
    i===0?xs[i]+1.3:xs[i]+cellWidth/2,
    firstLineY+j*lineHeight,{align:i===0?"left":"center"});
  });
 }
 y+=headHeight;
 const body=rows.length?rows:[{name:"Sin evaluaciones",samples:0,pass:0,issues:new Map()}];
 body.forEach((row,index)=>{
  for(let i=0;i<n;i++){
   if(i===n-1)pdf.setFillColor(237,246,239);
   else if(index%2===1)pdf.setFillColor(250,252,250);
   else pdf.setFillColor(255,255,255);
   pdf.rect(xs[i],y,colWidths[i],rowH,"FD");
   let value=i===0?row.name:i===n-1?pct(row.pass,row.samples):
      pct(row.samples-(row.issues.get(items[i-1][0])||0),row.samples);
   pdf.setTextColor(38,57,43);
   const font=i===0?Math.max(4.4,Math.min(6.4,rowH*.88)):
     Math.max(4.5,Math.min(6.6,rowH));
   pdf.setFontSize(font);pdf.setFont("helvetica",i===n-1?"bold":"normal");
   if(i===0){
    const max=colWidths[0]-3.2;
    const parts=pdf.splitTextToSize(String(value),max).slice(0,rowH>=6?2:1);
    parts.forEach((line,j)=>qualityPDFText(pdf,line,xs[0]+1.6,
      y+rowH/2-(parts.length-1)*1.55+j*3.1+1.45));
   }else qualityPDFText(pdf,value,xs[i]+colWidths[i]/2,y+rowH/2+1.4,{align:"center"});
  }
  y+=rowH;
 });
 let bottomY=Math.max(y+6,Math.min(157,chartStart));
 // Keep the entire graphical block inside the printable area.
 const bottomH=Math.min(49,footerY-bottomY-6);
 if(bottomH>23){
  pdf.setFont("helvetica","bold");pdf.setFontSize(7.4);
  pdf.setTextColor(42,65,46);
  qualityPDFText(pdf,indicator+" - CONFORMIDAD GRUPAL (SEMANAL)",188,bottomY,{align:"center"});
  bottomY+=4;
  const y0=bottomY,tableW=78,tableX=margin;
  pdf.setFillColor(242,247,244);
  pdf.rect(tableX,y0,tableW,7,"FD");
  pdf.setFontSize(6.25);
  qualityPDFText(pdf,"SEMANAS",tableX+19,y0+4.5,{align:"center"});
  qualityPDFText(pdf,"CONFORMIDAD GRUPAL",tableX+58,y0+4.5,{align:"center"});
  const borderX=tableX+38;
  pdf.line(borderX,y0,borderX,y0+7+Math.max(1,weeks.length)*7);
  weeks.forEach((row,i)=>{
   const top=y0+7+i*7;
   pdf.setFillColor(255,255,255);pdf.rect(tableX,top,tableW,7,"FD");
   pdf.line(borderX,top,borderX,top+7);
   pdf.setFont("helvetica","normal");pdf.setFontSize(6.25);
   qualityPDFText(pdf,"SEMANA "+row.week+" - "+row.yr,tableX+1.5,top+4.5);
   qualityPDFText(pdf,pct(row.pass,row.n),tableX+tableW-3,top+4.5,{align:"right"});
  });
  if(!weeks.length)qualityPDFText(pdf,"Sin evaluaciones",tableX+2,y0+11);
  // Bar chart: vector primitives stay inside fixed graph bounds.
  const graphX=97,graphRight=285,graphTop=y0+4,graphBottom=Math.min(footerY-9,y0+bottomH-8);
  const gh=Math.max(8,graphBottom-graphTop), gw=graphRight-graphX;
  for(let t=0;t<=4;t++){
   const v=t*25,gy=graphBottom-gh*v/100;
   pdf.setDrawColor(219,230,220);pdf.line(graphX,gy,graphRight,gy);
   pdf.setFont("helvetica","normal");pdf.setFontSize(5.3);
   pdf.setTextColor(77,102,83);
   qualityPDFText(pdf,v+"%",graphX-2,gy+1.3,{align:"right"});
  }
  const gap=gw/Math.max(weeks.length,1);
  weeks.forEach((row,i)=>{
   const v=row.n?100*row.pass/row.n:0;
   const bw=Math.min(24,gap*.50),bx=graphX+gap*(i+.5)-bw/2;
   const by=graphBottom-gh*v/100;
   pdf.setFillColor(101,128,116);pdf.setDrawColor(73,100,81);
   pdf.rect(bx,by,bw,graphBottom-by,"FD");
   pdf.setTextColor(40,63,47);pdf.setFont("helvetica","bold");pdf.setFontSize(6);
   qualityPDFText(pdf,pct(row.pass,row.n),bx+bw/2,Math.max(graphTop+1.9,by-1.7),{align:"center"});
   pdf.setFontSize(5.6);
   qualityPDFText(pdf,"S"+row.week,bx+bw/2,graphBottom+4,{align:"center"});
  });
 }
 if(payload.excluded){
  pdf.setTextColor(108,75,51);pdf.setFontSize(6);
  qualityPDFText(pdf,payload.excluded+" muestras sin clasificar, excluidas de los cálculos.",margin,184);
 }
 const labels=payload.moduleId==="siembra-campo"?
  ["JEFE PRODUCCIÓN","SUPERVISOR (J)","SUPERVISOR (M)","JEFE SAVIA - METEORO"]:
  ["JEFE DE ÁREA","SUPERVISOR (J)","SUPERVISOR (M)","ASEGURAMIENTO"];
 pdf.setDrawColor(136,158,141);pdf.setTextColor(48,69,51);pdf.setFont("helvetica","normal");pdf.setFontSize(7);
 for(let i=0;i<4;i++){
  const fx=margin+(i%2)*width/2,fy=footerY+Math.floor(i/2)*7.5;
  pdf.rect(fx,fy,width/2,7.5);
  qualityPDFText(pdf,labels[i],fx+2,fy+4.5);
 }
 return {names:rows.map(r=>r.name),weeks:weeks.map(r=>r.week),page:1,tableEnd:y,footerY};
}
function qualityWeeklyGraph(weeks){
 if(!weeks.length)return '<div class="quality-paper-nochart">Sin evaluaciones semanales para graficar.</div>';
 const W=610,H=224,L=50,R=16,T=25,B=47,plotH=H-T-B,plotW=W-L-R;
 const y=v=>T+plotH*(1-v/100);
 const lines=[];
 for(let mark=0;mark<=100;mark+=25){
  const height=y(mark);
  lines.push('<line x1="'+L+'" x2="'+(W-R)+'" y1="'+height+'" y2="'+height+
   '" stroke="#d7ded8" stroke-width=".85" stroke-dasharray="4 4"/>'+
   '<text x="'+(L-9)+'" y="'+(height+4)+'" font-size="11" text-anchor="end" fill="#4b6253">'+mark+'%</text>');
 }
 weeks.forEach((row,i)=>{
  const share=plotW/weeks.length,x=L+i*share+share*.25,width=Math.min(75,share*.5);
  const level=row.n?100*row.pass/row.n:0,barY=y(level);
  lines.push('<rect x="'+x+'" y="'+barY+'" width="'+width+'" height="'+Math.max(0,T+plotH-barY)+
   '" fill="#658074" stroke="#51685c" stroke-width=".8"/>'+
   '<text x="'+(x+width/2)+'" y="'+Math.max(12,barY-7)+'" font-size="12" text-anchor="middle" font-weight="700" fill="#344b3c">'+pct(row.pass,row.n)+'</text>'+
   '<text x="'+(x+width/2)+'" y="'+(H-21)+'" font-size="11" text-anchor="middle" fill="#4c5e53">SEMANA '+row.week+'</text>'+
   '<text x="'+(x+width/2)+'" y="'+(H-7)+'" font-size="10" text-anchor="middle" fill="#758176">'+row.yr+'</text>');
 });
 return '<svg class="quality-paper-chart" role="img" aria-label="Gráfica de conformidad grupal semanal" viewBox="0 0 '+W+' '+H+'">'+
  lines.join("")+'</svg>';
}
function qualityPaperReport({moduleId,group,items,rows,weekRows,current,excluded,isDemo}){
 const currentPeriod=current?('SEMANA '+current.week+' · '+current.yr):'SIN EVALUACIONES';
 const head=items.map(([,name])=>'<th scope="col">'+esc(name)+'</th>').join("");
 const first=rows.map(r=>'<tr><th scope="row" class="quality-paper-worker" title="'+esc(r.name)+'">'+esc(r.name)+'</th>'+
   items.map(([id])=>'<td>'+pct(r.samples-(r.issues.get(id)||0),r.samples)+'</td>').join("")+
   '<td class="quality-paper-total">'+pct(r.pass,r.samples)+'</td></tr>').join("");
 const details=weekRows.map(row=>'<tr><th scope="row">SEMANA '+row.week+' · '+row.yr+'</th>'+
  '<td>'+pct(row.pass,row.n)+'</td></tr>').join("");
 const areaName=moduleId==="siembra-campo"?"SIEMBRA EN CAMPO":group.label.toUpperCase();
 const responsible=moduleId==="siembra-campo"?"ERASMO GOMEZ":"—";
 const indicator=moduleId==="siembra-campo"?"METEORO":"CALIDAD DE LA LABOR";
 const signing=moduleId==="siembra-campo"?
  ["JEFE PRODUCCIÓN","SUPERVISOR (J)","SUPERVISOR (M)","JEFE SAVIA - METEORO"]:
  ["JEFE DE ÁREA","SUPERVISOR (J)","SUPERVISOR (M)","ASEGURAMIENTO"];
 return '<article class="quality-paper-report">'+
  '<header class="quality-paper-head">'+
   '<div class="quality-paper-logo"><img src="'+esc(QUALITY_BRAND.logo)+'" alt="Jardines de San Nicolás"></div>'+
   '<div class="quality-paper-route">RUTA DE<br>APRENDIZAJE</div>'+
   '<div class="quality-paper-assurance"><img src="'+esc(QUALITY_BRAND.assurance)+'" alt="Aseguramiento"></div>'+
   '<div class="quality-paper-company">'+esc(QUALITY_BRAND.company)+'</div>'+
   '<div class="quality-paper-meta"><div>INDICADOR</div><div>'+esc(indicator)+'</div>'+
    '<div>ÁREA</div><div>'+esc(areaName)+'</div>'+
    '<div>RESPONSABLE</div><div>'+esc(responsible)+'</div></div>'+
  '</header>'+
  (isDemo?'<div class="quality-paper-demowarning">DATOS DE PRUEBA — INFORME DEMOSTRATIVO, NO VÁLIDO COMO EVALUACIÓN REAL</div>':'')+
  '<h3 class="quality-paper-title">RESULTADOS CONFORMIDAD INDIVIDUAL '+esc(currentPeriod)+'</h3>'+
  '<div class="quality-paper-table-scroll"><table class="quality-paper-main-table'+
    (items.length>12?' quality-paper-many-cols':'')+'"><thead><tr><th scope="col">NOMBRE DEL COLABORADOR</th>'+
    head+'<th scope="col">Conformidad Total</th></tr></thead><tbody>'+
    (first||'<tr><td colspan="'+(items.length+2)+'" class="quality-paper-empty">No hay evaluaciones para este período.</td></tr>')+
   '</tbody></table></div>'+
  '<section class="quality-paper-bottom">'+
   '<div class="quality-paper-weeks"><table><thead><tr><th>SEMANAS</th><th>CONFORMIDAD GRUPAL</th></tr></thead><tbody>'+
    (details||'<tr><td colspan="2">Sin evaluaciones semanales</td></tr>')+
   '</tbody></table></div>'+
   '<div class="quality-paper-chart-wrap"><h4>'+esc(indicator)+' · CONFORMIDAD GRUPAL (SEMANAL)</h4>'+
    qualityWeeklyGraph(weekRows)+'</div>'+
  '</section>'+
  (excluded?'<p class="quality-paper-excluded">'+fmt.format(excluded)+' muestra(s) sin correspondencia con el catálogo excluidas del cálculo.</p>':'')+
  '<footer class="quality-paper-signatures">'+signing.map(n=>'<div>'+esc(n)+'</div>').join("")+'</footer>'+
  '</article>';
}

function render({areaId,mod,key:storageKey,panel,allowedGroups=null,initialGroup=null}){
 const groups=CONFIG[mod.id]||{};
 const allGroups=Object.keys(groups);
 const groupNames=Array.isArray(allowedGroups)&&allowedGroups.length?
   allGroups.filter(id=>allowedGroups.includes(id)):allGroups;
 if(!groupNames.length){panel.innerHTML='<div class="module-empty">No hay catálogo de calidad para este módulo.</div>';return;}
 const demoRows=sampleQualityRecords(groups,mod.id);
 let storedRows=read(key(areaId,storageKey));
 let demoMode=storedRows.length===0;
 let selectedGroup=groupNames.includes(initialGroup)?initialGroup:groupNames[0],
 records=demoMode?demoRows:storedRows,reportRows=[],reportHeaders=[],pdfFilename="informe-calidad.pdf",reportPayload=null;
 panel.innerHTML='<h3 class="quality-heading">Resultados de conformidad individual</h3>'+
 '<div class="quality-demo-banner" id="qDemoBanner" role="status"></div>'+
 '<div class="quality-internal-controls" hidden style="display:none" aria-hidden="true">'+
 '<select id="qGroup">'+groupNames.map(g=>'<option value="'+esc(g)+'">'+esc(groups[g].label)+'</option>').join("")+'</select>'+
 '<select id="qYear"></select><select id="qWeek"></select>'+
 '<input id="qSearch" type="search" value="">'+
 '<input id="qFile" type="file" accept=".json,application/json">'+
 '<button type="button" id="qCSV">Exportar CSV</button>'+
 '<button type="button" id="qToggleDemo">Ver registros reales</button></div>'+
 '<div class="module-notice" id="qNotice" hidden style="display:none"></div>'+
 '<div class="quality-report-actions">'+
 '<div class="quality-report-period-group"><span class="quality-report-period-caption">PERÍODO DEL INFORME</span>'+
 '<div class="quality-report-period-filters">'+
 '<label for="qReportYear">Año<select id="qReportYear" aria-label="Año del informe"></select></label>'+
 '<label for="qReportWeek">Semana<select id="qReportWeek" aria-label="Semana del informe"></select></label></div></div>'+
 '<div class="quality-report-action-buttons">'+
 '<button type="button" class="btn-primary" id="qDownloadReport">Descargar</button>'+
 '<button type="button" class="btn-secondary" id="qPrintReport">Imprimir</button></div>'+
 '<span id="qPdfStatus" class="quality-pdf-status" role="status" aria-live="polite"></span></div>'+
 '<div id="qReport"></div>';
 const reportMarkup=panel.innerHTML;
 panel.innerHTML='<nav class="q-modebar" aria-label="Vista de Calidad">'+
 '<button type="button" id="qAnalysisButton" class="q-mode-btn active" aria-pressed="true">Análisis comparativo</button>'+
 '<button type="button" id="qReportButton" class="q-mode-btn" aria-pressed="false">Informe</button></nav>'+
 '<section id="qExplorePane" class="q-explore-pane">'+
   '<div class="q-explore-header"><div><h3>Comparar evaluaciones de calidad</h3>'+
   '<p>Selecciona varios años, semanas e ítems para comparar la conformidad en distintos momentos.</p></div>'+
   '</div>'+
   '<div class="quality-demo-banner" id="qExploreBanner" role="status"></div>'+
   '<div class="q-explore-controls q-compare-controls">'+
   '<div class="q-compare-heading"><div><span class="q-explore-filter-caption">CONSULTAR RESULTADOS</span>'+
    '<p>Elige a quién y en qué período comparar la calidad.</p></div>'+
    '<div class="performance-person-switch q-compare-person-switch" role="group" aria-label="Consultar personas">'+
     '<button type="button" id="qXPersonGroup" class="active" aria-pressed="true">Todas las personas</button>'+
     '<button type="button" id="qXPersonOne" aria-pressed="false">Una persona</button></div></div>'+
   '<div class="q-compare-filter-fields">'+
 '<label>Colaborador<input id="qXWorker" type="search" list="qXPeople" disabled '+
 'placeholder="Todas las personas de esta labor" autocomplete="off"><datalist id="qXPeople"></datalist></label>'+
 comparisonDropdown("Years","Año")+
 comparisonDropdown("Weeks","Semana")+
 comparisonDropdown("Days","Día")+'</div>'+
 '<div class="q-compare-secondary">'+
 '<details class="q-filter-dropdown q-filter-items" id="qXItemsDrop">'+
 '<summary class="q-filter-trigger"><span>Ítems que deseas comparar</span>'+
 '<strong id="qXItemsSummary">1 ítem seleccionado</strong></summary>'+
 '<div class="q-filter-popup"><div class="q-select-actions">'+
 '<button type="button" id="qSelectItemsAll">Seleccionar todos</button>'+
 '<button type="button" id="qSelectItemsNone">Limpiar selección</button></div>'+
 '<div id="qXItems" class="q-check-options q-item-options"></div></div></details></div>'+
 '<div class="q-explore-feedback q-compare-selection" id="qXSelection" role="status" aria-live="polite" aria-atomic="true"></div>'+
   '</div>'+
   '<div id="qXResults"></div></section>'+
 '<section id="qReportPane" hidden>'+reportMarkup+'</section>';
 let syncExplore=()=>{};
 const demoBanner=panel.querySelector("#qDemoBanner"),demoToggle=panel.querySelector("#qToggleDemo");
 const g=panel.querySelector("#qGroup"),y=panel.querySelector("#qYear"),w=panel.querySelector("#qWeek"),
 search=panel.querySelector("#qSearch"),area=panel.querySelector("#qReport"),note=panel.querySelector("#qNotice"),
 reportYear=panel.querySelector("#qReportYear"),reportWeek=panel.querySelector("#qReportWeek");
 g.value=selectedGroup;
 function setViewNotice(){
   demoBanner.hidden=!demoMode;
   demoBanner.innerHTML=demoMode?
     '<strong>DATOS DE PRUEBA — VISTA DEMOSTRATIVA</strong><span>Los nombres, fechas, resultados y porcentajes son ficticios. No se almacenan ni se mezclan con datos reales.</span>':"";
   demoToggle.textContent=demoMode?"Ver registros reales":"Ver datos de prueba";
   panel.querySelector("#qCSV").textContent=demoMode?"Exportar CSV de prueba":"Exportar CSV";
 }
 const active=()=>records.filter(r=>real(r)&&rowRole(r,groups)===selectedGroup);
 const cols=()=>{const c=groups[selectedGroup],saved=read(key(areaId,mod.id+"_quality_catalog_"+selectedGroup));
 return (demoMode?demoItems(c):(c.external&&saved.length?saved:c.items)).filter(x=>Array.isArray(x)&&x.length===2)
 .filter(x=>!c.conformIds.includes(String(x[0]))&&!/^(ramo\s+)?conforme$/.test(norm(x[1])))
 .map(x=>[String(x[0]),String(x[1])]);};
 function periods(){
   const rows=active(),previousY=y.value,previousW=w.value;
   const years=[...new Set(rows.map(r=>period(r)[0]).filter(Boolean))].sort((a,b)=>b-a);
   y.innerHTML='<option value="">Todos los años</option>'+years.map(n=>'<option>'+n+'</option>').join("");
   y.value=years.some(n=>String(n)===previousY)?previousY:"";
   const weeks=[...new Set(rows.filter(r=>!y.value||period(r)[0]===Number(y.value)).map(r=>period(r)[1]).filter(Boolean))].sort((a,b)=>b-a);
   w.innerHTML='<option value="">Todas las semanas</option>'+weeks.map(n=>'<option>'+n+'</option>').join("");
   w.value=weeks.some(n=>String(n)===previousW)?previousW:"";
 }
 function refresh(){
   const c=groups[selectedGroup],items=cols();
   setViewNotice();
   const all=active();
   const periodsOfRows=new Map();
   for(const row of all){
     const [yr,week]=period(row);
     if(!yr||!week)continue;
     const k=yr+'-'+String(week).padStart(2,"0");
     if(!periodsOfRows.has(k))periodsOfRows.set(k,{yr,week,records:[]});
     periodsOfRows.get(k).records.push(row);
   }
   const chronological=[...periodsOfRows.values()].sort((a,b)=>a.yr-b.yr||a.week-b.week);
   // El informe presenta una sola semana, no el conjunto de semanas del análisis.
   // Por defecto selecciona la más reciente con evaluaciones; permite volver a
   // cualquier año y semana que tenga registros para esta modalidad.
   const years=[...new Set(chronological.map(p=>p.yr))].sort((a,b)=>b-a);
   const chosenYear=years.includes(Number(reportYear.value))?
     Number(reportYear.value):years[0]??null;
   reportYear.innerHTML=years.length?
     years.map(value=>'<option value="'+value+'">'+value+'</option>').join(""):
     '<option value="">Sin años con evaluaciones</option>';
   reportYear.value=chosenYear===null?"":String(chosenYear);
   const availableWeeks=chronological.filter(p=>p.yr===chosenYear);
   const chosenWeek=availableWeeks.find(p=>String(p.week)===reportWeek.value)??availableWeeks.at(-1)??null;
   reportWeek.innerHTML=availableWeeks.length?
     availableWeeks.map(p=>'<option value="'+p.week+'">Semana '+String(p.week).padStart(2,"0")+'</option>').join(""):
     '<option value="">Sin semanas con evaluaciones</option>';
   reportWeek.value=chosenWeek?String(chosenWeek.week):"";
   const selected=chosenWeek;
   pdfFilename="informe-calidad-"+mod.id+"-"+selectedGroup+
     (selected?"-"+selected.yr+"-semana-"+String(selected.week).padStart(2,"0"):"")+
     (demoMode?"-DEMO":"")+".pdf";
   const weekRecords=selected?selected.records:[];
   const res=calc(weekRecords,c,items);
   reportHeaders=["NOMBRE DEL COLABORADOR","MUESTRAS REALES",...items.map(x=>x[1]),"CONFORMIDAD TOTAL"];
   reportRows=res.rows.map(p=>[p.name,p.samples,...items.map(([id])=>pct(p.samples-(p.issues.get(id)||0),p.samples)),pct(p.pass,p.samples)]);
   // La gráfica y la tabla de cuatro semanas terminan en la semana elegida,
   // nunca incluyen semanas posteriores al informe consultado.
   const selectedIndex=selected?chronological.indexOf(selected):-1;
   const weeks=(selectedIndex<0?[]:chronological.slice(Math.max(0,selectedIndex-3),selectedIndex+1)).map(p=>{
     const result=calc(p.records,c,items);
     return {yr:p.yr,week:p.week,
      n:result.rows.reduce((sum,r)=>sum+r.samples,0),
      pass:result.rows.reduce((sum,r)=>sum+r.pass,0)};
   });
   reportPayload={moduleId:mod.id,group:c,items,rows:res.rows,weekRows:weeks,
     current:selected,excluded:res.excluded,isDemo:demoMode};
   area.innerHTML=qualityPaperReport(reportPayload);
 }
 reportYear.addEventListener("change",()=>{
   // Al cambiar el año, seleccionar su última semana con registros.
   reportWeek.value="";
   refresh();
 });
 reportWeek.addEventListener("change",refresh);
 panel.querySelector("#qPrintReport").addEventListener("click",()=>window.print());
 panel.querySelector("#qDownloadReport").addEventListener("click",async()=>{
   const button=panel.querySelector("#qDownloadReport");
   const status=panel.querySelector("#qPdfStatus");
   if(button.disabled||!reportPayload)return;
   button.disabled=true;
   button.textContent="Generando PDF…";
   status.textContent="";
   try{
     await loadQualityPdfLibrary();
     const pdf=new window.jspdf.jsPDF({unit:"mm",format:"a4",orientation:"landscape",compress:true});
     const [logo,assurance]=await Promise.all([
       qualityPDFLogo(QUALITY_BRAND.logo),qualityPDFLogo(QUALITY_BRAND.assurance)
     ]);
     const result=qualityPDFReport(pdf,reportPayload,{logo,assurance});
     if(!result.names.length&&!reportPayload.isDemo){
       status.textContent="No hay evaluaciones reales para esta modalidad; se descargará el informe sin resultados.";
     }
     if(pdf.internal.getNumberOfPages()!==1)throw new Error("El PDF no tiene una sola página.");
     await pdf.save(pdfFilename);
     status.textContent="PDF descargado con tabla, gráfica y firmas.";
   }catch(error){
     console.error("No se pudo generar el PDF de calidad:",error);
     status.textContent="Error al descargar. Prueba Imprimir → Guardar como PDF.";
   }finally{
     button.disabled=false;
     button.textContent="Descargar";
   }
 });
 demoToggle.addEventListener("click",()=>{
   demoMode=!demoMode;
   records=demoMode?demoRows:read(key(areaId,storageKey));
   y.value="";w.value="";search.value="";
   periods();refresh();syncExplore(true,true);
 });
 g.addEventListener("change",()=>{selectedGroup=g.value;periods();refresh();syncExplore(true)});
 y.addEventListener("change",()=>{periods();refresh()});w.addEventListener("change",refresh);search.addEventListener("input",refresh);
 async function importQualityFile(event){
   const file=event.target.files[0];if(!file)return;
   try{
     if(file.size>5*1024*1024)throw Error("Archivo superior a 5 MB.");
     const raw=JSON.parse(await file.text()),list=Array.isArray(raw)?raw:raw.registros;
     if(!Array.isArray(list)||list.length>20000||!list.every(x=>x&&typeof x==="object"&&!Array.isArray(x)))
       throw Error("Se espera una lista JSON de registros (máximo 20.000).");
     const catalog=Array.isArray(raw.catalogoItems)?raw.catalogoItems:null;
     if(catalog&&groups[selectedGroup].external){const items=catalog.map(x=>Array.isArray(x)?x:[x.id??x.idItem,x.nombre??x.name])
       .filter(x=>x?.length===2&&x[0]!=null&&x[1]);localStorage.setItem(key(areaId,mod.id+"_quality_catalog_"+selectedGroup),JSON.stringify(items));}
     storedRows=list.map(x=>({...x,__calidadGrupo:rowRole(x,groups)||selectedGroup}));
     records=storedRows;demoMode=false;
     localStorage.setItem(key(areaId,storageKey),JSON.stringify(storedRows));
     note.textContent=records.length+" evaluaciones importadas localmente. Los registros sin modalidad se asignaron a "+groups[selectedGroup].label+". Sin conexión automática a Producción.";
     periods();refresh();syncExplore(true,true);
   }catch(e){note.textContent="Error al importar: "+e.message;}finally{event.target.value="";}
 }
 panel.querySelector("#qFile").addEventListener("change",importQualityFile);
 panel.querySelector("#qCSV").addEventListener("click",()=>{
   if(!reportRows.length)return;
   const quote=v=>'"'+String(v??"").replaceAll('"','""')+'"';
   const csv="\uFEFF"+[reportHeaders,...reportRows].map(row=>row.map(quote).join(";")).join("\r\n");
   const url=URL.createObjectURL(new Blob([csv],{type:"text/csv;charset=utf-8"}));
   const a=document.createElement("a");a.href=url;a.download=(demoMode?"DEMO-":"")+"calidad-"+areaId+"-"+mod.id+"-"+selectedGroup+".csv";a.click();
   setTimeout(()=>URL.revokeObjectURL(url),1500);
 });

 const xp=panel.querySelector("#qExplorePane"),rp=panel.querySelector("#qReportPane"),
  xa=panel.querySelector("#qAnalysisButton"),xi=panel.querySelector("#qReportButton"),
  xworker=panel.querySelector("#qXWorker"),
  xyears=panel.querySelector("#qXYears"),xweeks=panel.querySelector("#qXWeeks"),
  xdays=panel.querySelector("#qXDays"),
  xgroup=panel.querySelector("#qXPersonGroup"),xone=panel.querySelector("#qXPersonOne"),
  xitems=panel.querySelector("#qXItems"),xpeople=panel.querySelector("#qXPeople"),
  xresult=panel.querySelector("#qXResults"),xselection=panel.querySelector("#qXSelection"),
  xbanner=panel.querySelector("#qExploreBanner"),
  xyearsSummary=panel.querySelector("#qXYearsSummary"),
  xweeksSummary=panel.querySelector("#qXWeeksSummary"),
  xdaysSummary=panel.querySelector("#qXDaysSummary"),
  xitemsSummary=panel.querySelector("#qXItemsSummary");
 const variantButtons=[...panel.querySelectorAll("[data-quality-variant]")];
 let selectedYears=undefined,selectedWeeks=undefined,selectedDays=null,
  selectedItems=new Set(),personMode="grupal";
 function showMode(mode){
  const report=mode==="informe";
  xp.hidden=report;rp.hidden=!report;
  xa.classList.toggle("active",!report);
  xi.classList.toggle("active",report);
  xa.setAttribute("aria-pressed",String(!report));
  xi.setAttribute("aria-pressed",String(report));
  if(report)refresh();else exploreResult();
 }
 xa.addEventListener("click",()=>showMode("analisis"));
 xi.addEventListener("click",()=>showMode("informe"));
 function base(){return active();}
 function yearsAvailable(){
  const values=new Set(base().map(r=>period(r)[0]).filter(Boolean));
  const now=new Date().getFullYear();
  for(let year=now-2;year<=now;year++)values.add(year);
  return [...values].sort((a,b)=>b-a);
 }
 function weeksAvailable(){
  return [...new Set(base().filter(r=>selectedYears==null||
   selectedYears.has(period(r)[0])).map(r=>period(r)[1]).filter(Boolean))]
   .sort((a,b)=>a-b);
 }
 function itemsAvailable(){return cols()}
 const dayNames=["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];
 const canSelectDays=()=>selectedYears instanceof Set&&selectedYears.size===1&&
  selectedWeeks instanceof Set&&selectedWeeks.size===1;
 function dayOptions(){
  const years=selectedYears!=null?[...selectedYears]:[];
  const weeks=selectedWeeks!=null?[...selectedWeeks]:[];
  const dates=years.length===1&&weeks.length===1?
   compareWeekDays(years[0]+"-S"+String(weeks[0]).padStart(2,"0")):[];
  return dayNames.map((name,i)=>[i,name+(dates[i]?" "+dates[i].slice(8,10)+"/"+dates[i].slice(5,7):"")]);
 }
 function syncComparisonPeriod(reset=false){
  const years=yearsAvailable();
  const withData=[...new Set(base().map(r=>period(r)[0]).filter(Boolean))].sort((a,b)=>b-a);
  if(reset||selectedYears===undefined)
   selectedYears=new Set([withData[0]??years[0]??new Date().getFullYear()]);
  else if(selectedYears!==null)selectedYears=new Set([...selectedYears].filter(y=>years.includes(y)));
  drawChoices(xyears,"year",years.map(y=>[y,String(y)]),selectedYears);
  const weeks=weeksAvailable();
  if(reset||selectedWeeks===undefined)selectedWeeks=new Set(weeks.length?[weeks[weeks.length-1]]:[]);
  else if(selectedWeeks!==null&&selectedWeeks.size){
   selectedWeeks=new Set([...selectedWeeks].filter(w=>weeks.includes(w)));
   if(!selectedWeeks.size&&weeks.length)selectedWeeks=new Set([weeks[weeks.length-1]]);
  }
  drawChoices(xweeks,"week",weeks.map(w=>[w,"Semana "+String(w).padStart(2,"0")]),selectedWeeks);
  const enabled=canSelectDays(),daysMenu=panel.querySelector("#qXDaysDrop");
  if(!enabled){selectedDays=null;daysMenu.open=false;}
  daysMenu.inert=!enabled;
  daysMenu.classList.toggle("is-disabled",!enabled);
  daysMenu.setAttribute("aria-disabled",String(!enabled));
  daysMenu.title=enabled?"Elige uno, varios o todos los días":
   "Selecciona exactamente un año y una semana para habilitar los días";
  drawChoices(xdays,"day",dayOptions(),selectedDays);
 }
 function updateFilterSummaries(){
  const items=itemsAvailable(),days=dayOptions();
  xyearsSummary.textContent=selectedYears===null?"Todos los años":
   !selectedYears?.size?"Ningún año":
   selectedYears.size===1?String([...selectedYears][0]):selectedYears.size+" años";
  xweeksSummary.textContent=selectedWeeks===null?"Todas las semanas":
   !selectedWeeks?.size?"Ninguna semana":
   selectedWeeks.size===1?"Semana "+String([...selectedWeeks][0]).padStart(2,"0"):selectedWeeks.size+" semanas";
  xdaysSummary.textContent=selectedDays===null?"Todos los días":
   !selectedDays.size?"Ningún día":
   selectedDays.size===1?(days.find(row=>row[0]===[...selectedDays][0])?.[1]??"Un día"):
   selectedDays.size+" días";
  xitemsSummary.textContent=!selectedItems.size?"Ningún ítem":
   selectedItems.size===items.length?"Todos los ítems ("+items.length+")":
   selectedItems.size===1?(items.find(([id])=>selectedItems.has(id))?.[1]??"1 ítem"):
   selectedItems.size+" ítems seleccionados";
  for(const [id,sel] of [["qXYearsDrop",selectedYears],["qXWeeksDrop",selectedWeeks],["qXDaysDrop",selectedDays]])
   panel.querySelector("#"+id).classList.toggle("is-specific",sel!==null&&sel?.size>0);
 }
 const dropdowns=[
  panel.querySelector("#qXYearsDrop"),panel.querySelector("#qXWeeksDrop"),
  panel.querySelector("#qXDaysDrop"),panel.querySelector("#qXItemsDrop")
 ];
 dropdowns.forEach(menu=>menu.addEventListener("toggle",()=>{
  if(menu.open)dropdowns.forEach(other=>{if(other!==menu)other.open=false});
 }));
 function drawChoices(element,key,rows,sel){
  element.innerHTML=rows.map(([value,label])=>'<label class="q-choice"><input type="checkbox" data-compare="'+
   key+'" value="'+esc(value)+'"'+(sel===null||sel.has(String(value))||sel.has(Number(value))?' checked':'')+
   '><span>'+esc(label)+'</span></label>').join("");
 }
 function renderChoices(resetItems=false,resetPeriods=false){
  const items=itemsAvailable();
  if(resetItems||![...selectedItems].some(id=>items.some(([itemId])=>itemId===id)))
   selectedItems=new Set(items.length?[items[0][0]]:[]);
  variantButtons.forEach(button=>{
   const active=button.dataset.qualityVariant===selectedGroup;
   button.classList.toggle("active",active);
   button.setAttribute("aria-pressed",String(active));
  });
  xpeople.innerHTML=[...new Set(base().map(worker).filter(Boolean))].sort((a,b)=>a.localeCompare(b,"es"))
   .map(name=>'<option value="'+esc(name)+'"></option>').join("");
  syncComparisonPeriod(resetPeriods);
  drawChoices(xitems,"item",items,selectedItems);
  xbanner.hidden=!demoMode;
  xbanner.innerHTML=demoMode?
   '<strong>DATOS DE PRUEBA — COMPARACIÓN DEMOSTRATIVA</strong>'+
   '<span>Los registros históricos, nombres y porcentajes son ficticios y no se almacenan.</span>':"";
  exploreResult();
 }
 function readChoices(container,kind){
  const all=[...container.querySelectorAll('input[data-compare="'+kind+'"]')];
  const chosen=all.filter(node=>node.checked).map(node=>Number(node.value));
  return all.length&&chosen.length===all.length?null:new Set(chosen);
 }
 const setPersonMode=mode=>{
  personMode=mode;
  const grouped=mode==="grupal";
  xworker.disabled=grouped;
  if(grouped)xworker.value="";
  xworker.placeholder=grouped?"Todas las personas de esta labor":"Buscar nombre o código";
  for(const [button,on] of [[xgroup,grouped],[xone,!grouped]]){
   button.classList.toggle("active",on);
   button.setAttribute("aria-pressed",String(on));
  }
  exploreResult();
 };
 xgroup.addEventListener("click",()=>setPersonMode("grupal"));
 xone.addEventListener("click",()=>setPersonMode("individual"));
 xyears.addEventListener("change",()=>{
  selectedYears=readChoices(xyears,"year");selectedDays=null;syncComparisonPeriod();exploreResult();
 });
 xweeks.addEventListener("change",()=>{
  selectedWeeks=readChoices(xweeks,"week");selectedDays=null;syncComparisonPeriod();exploreResult();
 });
 xdays.addEventListener("change",()=>{
  if(!canSelectDays())return;
  selectedDays=readChoices(xdays,"day");exploreResult();
 });
 xitems.addEventListener("change",()=>{
  selectedItems=new Set([...xitems.querySelectorAll('input[data-compare="item"]:checked')].map(node=>node.value));
  exploreResult();
 });
 xworker.addEventListener("input",exploreResult);
 for(const [id,kind,all] of [
  ["qXYearsAll","year",true],["qXYearsNone","year",false],
  ["qXWeeksAll","week",true],["qXWeeksNone","week",false],
  ["qXDaysAll","day",true],["qXDaysNone","day",false]
 ]){
  panel.querySelector("#"+id).addEventListener("click",()=>{
   if(kind==="day"&&!canSelectDays())return;
   const selection=all?null:new Set();
   if(kind==="year"){selectedYears=selection;selectedDays=null;}
   else if(kind==="week"){selectedWeeks=selection;selectedDays=null;}
   else selectedDays=selection;
   syncComparisonPeriod();exploreResult();
  });
 }
 variantButtons.forEach(button=>button.addEventListener("click",()=>{
  const group=button.dataset.qualityVariant;
  if(!groupNames.includes(group)||group===selectedGroup)return;
  selectedGroup=group;g.value=selectedGroup;
  selectedYears=undefined;selectedWeeks=undefined;selectedDays=null;
  periods();refresh();renderChoices(true);
 }));
 panel.querySelector("#qSelectItemsAll").addEventListener("click",()=>{
  selectedItems=new Set(itemsAvailable().map(row=>row[0]));renderChoices(false);
 });
 panel.querySelector("#qSelectItemsNone").addEventListener("click",()=>{
  selectedItems.clear();
  drawChoices(xitems,"item",itemsAvailable(),selectedItems);
  exploreResult();
 });
 function exploreResult(){
  updateFilterSummaries();
  const items=itemsAvailable(),c=groups[selectedGroup],
   searched=personMode==="individual"?xworker.value.trim():"",
   data=personMode==="individual"&&!searched?
    {periods:[],chosen:items.filter(([id])=>selectedItems.has(id)),excluded:0}:
    analyzeComparison(base(),c,items,selectedItems,selectedYears,selectedWeeks,null,searched,
     canSelectDays()?selectedDays:null);
  const {periods,chosen,excluded}=data;
  const total=periods.reduce((sum,r)=>sum+r.n,0);
  const chosenOk=periods.reduce((sum,r)=>sum+r.selected,0);
  const overall=periods.reduce((sum,r)=>sum+r.overall,0);
  const labels=periods.map(r=>r.label);
  const series=chosen.map(([id,name])=>({
   label:name,values:periods.map(r=>r.n?100*r.ids.get(id)/r.n:null)
  }));
  const format=(ok,n)=>n?pct(ok,n):"—";
  const who=personMode==="grupal"?"Todas las personas":searched?"Persona: "+searched:"Selecciona una persona";
  const descriptions=[who,xyearsSummary.textContent,xweeksSummary.textContent,
   xdaysSummary.textContent,xitemsSummary.textContent];
  xselection.innerHTML='<span class="performance-selection-caption">CONSULTA ACTUAL</span>'+
   '<span class="performance-selection-detail">'+descriptions.map(v=>'<span>'+esc(v)+'</span>')
    .join('<span class="performance-selection-separator" aria-hidden="true">·</span>')+
   '</span><strong class="performance-selection-total">'+fmt.format(total)+
    " "+(total===1?"evaluación":"evaluaciones")+'</strong>';
  if(!chosen.length){
   xresult.innerHTML='<div class="q-explore-empty">Selecciona al menos un ítem para comparar sus resultados.</div>';
   return;
  }
  const metrics='<div class="quality-stats q-explore-stats">'+
   '<div class="module-stat"><span>Evaluaciones comparadas</span><strong>'+fmt.format(total)+'</strong></div>'+
   '<div class="module-stat"><span>Conformidad de ítems seleccionados</span><strong>'+format(chosenOk,total)+'</strong></div>'+
   '<div class="module-stat"><span>Conformidad total (todos los ítems)</span><strong>'+format(overall,total)+'</strong></div>'+
   '</div>';
  const th=['AÑO','SEMANA','EVALUACIONES',...chosen.map(row=>row[1]),'CONFORMIDAD SELECCIONADA'];
  const header='<tr>'+th.map(v=>'<th>'+esc(v)+'</th>').join("")+'</tr>';
  const cells=periods.length?periods.map(r=>'<tr><td>'+r.year+'</td><td>S'+
    String(r.week).padStart(2,"0")+'</td><td>'+r.n+'</td>'+
    chosen.map(([id])=>'<td>'+format(r.ids.get(id),r.n)+'</td>').join("")+
    '<td><strong>'+format(r.selected,r.n)+'</strong></td></tr>').join(""):
    '<tr><td colspan="'+th.length+'" class="module-empty">No hay evaluaciones para los años, semanas, ítems y colaborador seleccionados.</td></tr>';
  xresult.innerHTML=metrics+'<div class="q-explore-visual"><h4>Evolución de conformidad por período</h4>'+
   '<p>Cada línea representa un ítem. Los valores corresponden al porcentaje de evaluaciones sin incumplimiento del ítem.</p>'+
   compareSvg(series,labels)+'</div>'+
   '<div class="module-tablewrap q-explore-table"><table class="module-table"><thead>'+header+
   '</thead><tbody>'+cells+'</tbody></table></div>'+
   '<p class="q-explore-help">La conformidad seleccionada exige que una evaluación no presente fallas en ninguno de los ítems elegidos. '+
   'La conformidad total considera todos los ítems del formulario, aunque solo compares uno. '+
   'Los períodos sin evaluaciones no generan porcentajes.'+
   (excluded?' Se excluyeron '+excluded+' evaluaciones con fallas sin identificar.':'')+'</p>';
 }
 syncExplore=renderChoices;
 periods();refresh();renderChoices(true);

}
window.QualityReports={render,calc,evaluate,analyzeComparison,config:CONFIG,sampleQualityRecords,demoItems};
})();
