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
function analyzeComparison(rows,group,items,selectedIds,years,weeks,exactPeriods,search){
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
function render({areaId,mod,key:storageKey,panel,allowedGroups=null,initialGroup=null}){
 const groups=CONFIG[mod.id]||{};
 const allGroups=Object.keys(groups);
 const groupNames=Array.isArray(allowedGroups)&&allowedGroups.length?
   allGroups.filter(id=>allowedGroups.includes(id)):allGroups;
 if(!groupNames.length){panel.innerHTML='<div class="module-empty">No hay catálogo de calidad para este módulo.</div>';return;}
 const demoRows=sampleQualityRecords(groups,mod.id);
 let storedRows=read(key(areaId,storageKey));
 let demoMode=true;
 let selectedGroup=groupNames.includes(initialGroup)?initialGroup:groupNames[0],
 records=demoMode?demoRows:storedRows,reportRows=[],reportHeaders=[];
 panel.innerHTML='<h3 class="quality-heading">Resultados de conformidad individual</h3>'+
 '<div class="quality-demo-banner" id="qDemoBanner" role="status"></div>'+
 '<div class="quality-toolbar"><label>Modalidad<select id="qGroup">'+groupNames.map(g=>'<option value="'+esc(g)+'">'+esc(groups[g].label)+'</option>').join("")+'</select></label>'+
 '<label>Año<select id="qYear"></select></label><label>Semana<select id="qWeek"></select></label>'+
 '<label>Colaborador<input id="qSearch" type="search" placeholder="Nombre o código"></label>'+
 '<label class="btn-primary quality-upload">Importar JSON<input type="file" id="qFile" accept=".json,application/json" hidden></label>'+
 '<button type="button" class="btn-secondary" id="qCSV">Exportar CSV</button>'+
 '<button type="button" class="btn-secondary" id="qToggleDemo">Ver registros reales</button></div>'+
 '<div class="module-notice" id="qNotice">Fórmulas: conformidad por ítem = 100 × (muestras reales − muestras con incumplimiento) / muestras reales; '+
 'conformidad total = 100 × muestras completamente conformes / muestras reales. Las muestras no realizadas se excluyen.</div>'+
 '<div id="qReport"></div>';
 const reportMarkup=panel.innerHTML;
 panel.innerHTML='<nav class="q-modebar" aria-label="Vista de Calidad">'+
 '<button type="button" id="qAnalysisButton" class="q-mode-btn active" aria-pressed="true">Análisis comparativo</button>'+
 '<button type="button" id="qReportButton" class="q-mode-btn" aria-pressed="false">Informe</button></nav>'+
 '<section id="qExplorePane" class="q-explore-pane">'+
   '<div class="q-explore-header"><div><h3>Comparar evaluaciones de calidad</h3>'+
   '<p>Selecciona varios años, semanas e ítems para comparar la conformidad en distintos momentos.</p></div>'+
   '<div class="q-explore-actions">'+
   '<label class="btn-primary quality-upload">Importar JSON<input id="qExploreFile" type="file" accept=".json,application/json" hidden></label>'+
   '<button type="button" class="btn-secondary" id="qXExport">Exportar comparación</button>'+
   '<button type="button" class="btn-secondary" id="qExploreDemo">Ver registros reales</button></div></div>'+
   '<div class="quality-demo-banner" id="qExploreBanner" role="status"></div>'+
   '<div class="q-explore-primary"><label>Modalidad<select id="qXGroup">'+
      groupNames.map(g=>'<option value="'+esc(g)+'">'+esc(groups[g].label)+'</option>').join("")+
      '</select></label><label>Colaborador<input id="qXWorker" type="search" list="qXPeople" '+
      'placeholder="Todos · escribir nombre o código" autocomplete="off"><datalist id="qXPeople"></datalist></label></div>'+
   '<div class="q-preset-bar"><span>Comparaciones rápidas</span>'+
   '<button type="button" id="qLast3">Últimas 3 semanas</button>'+
   '<button type="button" id="qFirst3">Semanas 1–3 · últimos 3 años</button>'+
   '<button type="button" id="qAllDates">Todo el historial</button></div>'+
   '<div class="q-explore-filters"><fieldset><legend>Años a comparar</legend>'+
   '<div class="q-select-actions"><button type="button" id="qXYearsAll">Todos</button>'+
   '<button type="button" id="qXYearsNone">Limpiar</button></div>'+
   '<div id="qXYears" class="q-check-options"></div></fieldset>'+
   '<fieldset><legend>Semanas a comparar</legend>'+
   '<div class="q-select-actions"><button type="button" id="qXWeeksAll">Todas</button>'+
   '<button type="button" id="qXWeeksNone">Limpiar</button></div>'+
   '<div id="qXWeeks" class="q-check-options q-week-options"></div></fieldset>'+
   '<fieldset class="q-items-filter"><legend>Ítems que deseas comparar</legend>'+
   '<div class="q-select-actions"><button type="button" id="qSelectItemsAll">Seleccionar todos</button>'+
   '<button type="button" id="qSelectItemsNone">Limpiar selección</button></div>'+
   '<div id="qXItems" class="q-check-options q-item-options"></div></fieldset></div>'+
   '<div class="q-explore-feedback" id="qXSelection" aria-live="polite"></div>'+
   '<div id="qXResults"></div></section>'+
 '<section id="qReportPane" hidden>'+reportMarkup+'</section>';
 let syncExplore=()=>{};
 const demoBanner=panel.querySelector("#qDemoBanner"),demoToggle=panel.querySelector("#qToggleDemo");
 const g=panel.querySelector("#qGroup"),y=panel.querySelector("#qYear"),w=panel.querySelector("#qWeek"),
 search=panel.querySelector("#qSearch"),area=panel.querySelector("#qReport"),note=panel.querySelector("#qNotice");
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
   if(c.pending&&!demoMode){area.innerHTML='<div class="module-notice">Mallas no tiene ítems configurados en el formulario original. No se inventan columnas.</div>';reportRows=[];return;}
   if(c.external&&!demoMode&&!items.length){area.innerHTML='<div class="module-notice">Los ítems del Cortador provienen de un catálogo externo que no está incluido en GitHub. Importe JSON con "registros" y "catalogoItems" para obtener los nombres reales.</div>';reportRows=[];return;}
   const rows=active().filter(r=>(!y.value||period(r)[0]===Number(y.value))&&(!w.value||period(r)[1]===Number(w.value))&&
     (!search.value||norm(worker(r)+" "+(r.colaborador||r.sembrador||"")).includes(norm(search.value))));
   const res=calc(rows,c,items);
   reportHeaders=["NOMBRE DEL COLABORADOR","MUESTRAS REALES",...items.map(x=>x[1]),"CONFORMIDAD TOTAL"];
   reportRows=res.rows.map(p=>[p.name,p.samples,...items.map(([id])=>pct(p.samples-p.issues.get(id),p.samples)),pct(p.pass,p.samples)]);
   const total=res.rows.reduce((s,p)=>s+p.samples,0),passed=res.rows.reduce((s,p)=>s+p.pass,0);
   const warning=demoMode&&(c.pending||c.external)?
     '<div class="module-notice"><strong>Solo demostración visual:</strong> estos criterios ilustrativos no existen en el catálogo original de esta modalidad. Se reemplazarán por los oficiales cuando estén disponibles.</div>':"";
   const head=reportHeaders.map((x,i)=>{
     const entry=i>=2&&i<items.length+2?c.meta?.[items[i-2][0]]:null;
     const details=entry?.subitems?.length?"Subítems: "+entry.subitems.join("; "):"";
     const tooltip=[details,entry?.nota||""].filter(Boolean).join(". ");
     return '<th'+(tooltip?' title="'+esc(tooltip)+'"':"")+'>'+esc(x)+
       (entry?'<small class="quality-criterion-kind">'+esc(entry.tipo||"")+'</small>':"")+'</th>';
   }).join("");
   const table='<div class="module-tablewrap"><table class="module-table quality-table"><thead><tr>'+head+'</tr></thead><tbody>'+
     (reportRows.length?reportRows.map(row=>'<tr>'+row.map(cell=>'<td>'+esc(cell)+'</td>').join("")+'</tr>').join(""):
     '<tr><td colspan="'+reportHeaders.length+'" class="module-empty">Sin evaluaciones reales para esta selección.</td></tr>')+'</tbody></table></div>';
   const weeks=new Map();
   active().filter(r=>!y.value||period(r)[0]===Number(y.value)).forEach(r=>{const [yr,week]=period(r);if(!yr||!week)return;
     const f=evaluate(r,c,items);if(f.unknown)return;const k=yr+"-"+week,v=weeks.get(k)||{yr,week,n:0,pass:0};
     v.n++;if(!f.failed.size)v.pass++;weeks.set(k,v);
   });
   const weekRows=[...weeks.values()].sort((a,b)=>b.yr-a.yr||b.week-a.week).slice(0,4);
   area.innerHTML=warning+'<div class="quality-stats"><div class="module-stat"><span>Muestras reales</span><strong>'+fmt.format(total)+'</strong></div>'+
     '<div class="module-stat"><span>Conformes</span><strong>'+fmt.format(passed)+'</strong></div>'+
     '<div class="module-stat"><span>Conformidad total</span><strong>'+pct(passed,total)+'</strong></div></div>'+
     (res.excluded?'<div class="module-notice">'+res.excluded+' muestra(s) sin correspondencia con el catálogo fueron excluidas para evitar resultados incorrectos.</div>':"")+
     table+'<div class="quality-week-table"><h4>Conformidad grupal · últimas 4 semanas con evaluaciones</h4>'+
     '<table class="module-table"><thead><tr><th>SEMANA</th><th>MUESTRAS</th><th>CONFORMIDAD GRUPAL</th></tr></thead><tbody>'+
     (weekRows.length?weekRows.map(v=>'<tr><td>'+v.yr+' - '+v.week+'</td><td>'+v.n+'</td><td>'+pct(v.pass,v.n)+'</td></tr>').join(""):
      '<tr><td colspan="3">Sin datos semanales</td></tr>')+'</tbody></table></div>';
 }
 demoToggle.addEventListener("click",()=>{
   demoMode=!demoMode;
   records=demoMode?demoRows:read(key(areaId,storageKey));
   y.value="";w.value="";search.value="";
   periods();refresh();syncExplore(true);
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
     periods();refresh();syncExplore(true);
   }catch(e){note.textContent="Error al importar: "+e.message;}finally{event.target.value="";}
 }
 panel.querySelector("#qFile").addEventListener("change",importQualityFile);
 panel.querySelector("#qExploreFile").addEventListener("change",importQualityFile);
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
  xgroup=panel.querySelector("#qXGroup"),xworker=panel.querySelector("#qXWorker"),
  xyears=panel.querySelector("#qXYears"),xweeks=panel.querySelector("#qXWeeks"),
  xitems=panel.querySelector("#qXItems"),xpeople=panel.querySelector("#qXPeople"),
  xresult=panel.querySelector("#qXResults"),xselection=panel.querySelector("#qXSelection"),
  xdemo=panel.querySelector("#qExploreDemo"),xbanner=panel.querySelector("#qExploreBanner");
 let selectedYears=null,selectedWeeks=null,selectedItems=new Set(),exactPeriods=null,exportComparison=null;
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
 function weeksAvailable(){return Array.from({length:53},(_,i)=>i+1)}
 function itemsAvailable(){return cols()}
 function drawChoices(element,key,rows,sel){
  element.innerHTML=rows.map(([value,label])=>'<label class="q-choice"><input type="checkbox" data-compare="'+
   key+'" value="'+esc(value)+'"'+(sel===null||sel.has(String(value))||sel.has(Number(value))?' checked':'')+
   '><span>'+esc(label)+'</span></label>').join("");
 }
 function renderChoices(resetItems=false){
  const items=itemsAvailable();
  if(resetItems||![...selectedItems].some(id=>items.some(([k])=>k===id)))
   selectedItems=new Set(items.length?[items[0][0]]:[]);
  xgroup.value=selectedGroup;
  xpeople.innerHTML=[...new Set(base().map(worker).filter(Boolean))].sort((a,b)=>a.localeCompare(b,"es"))
   .map(name=>'<option value="'+esc(name)+'"></option>').join("");
  drawChoices(xyears,"year",yearsAvailable().map(year=>[year,String(year)]),selectedYears);
  drawChoices(xweeks,"week",weeksAvailable().map(week=>[week,"S"+String(week).padStart(2,"0")]),selectedWeeks);
  drawChoices(xitems,"item",items,selectedItems);
  xdemo.textContent=demoMode?"Ver registros reales":"Ver datos de prueba";
  xbanner.hidden=!demoMode;
  xbanner.innerHTML=demoMode?
   '<strong>DATOS DE PRUEBA — COMPARACIÓN DEMOSTRATIVA</strong>'+
   '<span>Los registros históricos, nombres y porcentajes son ficticios y no se almacenan.</span>':"";
  exploreResult();
 }
 function readChoices(container,kind){
  const all=[...container.querySelectorAll('input[data-compare="'+kind+'"]')];
  const checked=all.filter(node=>node.checked).map(node=>node.value);
  return checked.length===all.length?null:new Set(checked.map(Number));
 }
 xyears.addEventListener("change",()=>{selectedYears=readChoices(xyears,"year");exactPeriods=null;exploreResult()});
 xweeks.addEventListener("change",()=>{selectedWeeks=readChoices(xweeks,"week");exactPeriods=null;exploreResult()});
 xitems.addEventListener("change",()=>{
  selectedItems=new Set([...xitems.querySelectorAll('input[data-compare="item"]:checked')].map(node=>node.value));
  exploreResult();
 });
 xworker.addEventListener("input",exploreResult);
 for(const [id,kind,value] of [
  ["qXYearsAll","year",null],["qXYearsNone","year",new Set()],
  ["qXWeeksAll","week",null],["qXWeeksNone","week",new Set()]
 ]){
  panel.querySelector("#"+id).addEventListener("click",()=>{
   if(kind==="year")selectedYears=value===null?null:new Set();
   else selectedWeeks=value===null?null:new Set();
   exactPeriods=null;renderChoices(false);
  });
 }
 xgroup.addEventListener("change",()=>{
  if(!groupNames.includes(xgroup.value))return;
  selectedGroup=xgroup.value;g.value=selectedGroup;
  selectedYears=null;selectedWeeks=null;exactPeriods=null;
  periods();refresh();renderChoices(true);
 });
 xdemo.addEventListener("click",()=>demoToggle.click());
 panel.querySelector("#qLast3").addEventListener("click",()=>{
  const periods=[...new Set(base().filter(r=>!xworker.value||norm(worker(r)+' '+
   (r.colaborador??r.sembrador??r.empleado??"")).includes(norm(xworker.value))).map(r=>{
   const [year,week]=period(r);return year&&week?year+'-'+String(week).padStart(2,"0"):"";
  }).filter(Boolean))].sort();
  const latest=periods.slice(-3);
  exactPeriods=new Set(latest);
  selectedYears=new Set(latest.map(p=>Number(p.slice(0,4))));
  selectedWeeks=new Set(latest.map(p=>Number(p.slice(5))));
  renderChoices(false);
 });
 panel.querySelector("#qFirst3").addEventListener("click",()=>{
  const thisYear=new Date().getFullYear();
  selectedYears=new Set([thisYear-2,thisYear-1,thisYear]);
  selectedWeeks=new Set([1,2,3]);
  exactPeriods=null;
  renderChoices(false);
 });
 panel.querySelector("#qAllDates").addEventListener("click",()=>{
  selectedYears=null;selectedWeeks=null;exactPeriods=null;
  renderChoices(false);
 });
 panel.querySelector("#qSelectItemsAll").addEventListener("click",()=>{
  selectedItems=new Set(itemsAvailable().map(row=>row[0]));renderChoices(false);
 });
 panel.querySelector("#qSelectItemsNone").addEventListener("click",()=>{
  selectedItems.clear();
  drawChoices(xitems,"item",itemsAvailable(),selectedItems);
  exploreResult();
 });
 panel.querySelector("#qXExport").addEventListener("click",()=>{
  if(!exportComparison||!exportComparison.rows.length)return;
  const quote=v=>{
   const str=String(v??"");
   const safe=/^[=+\-@]/.test(str)?"'"+str:str;
   return '"'+safe.replaceAll('"','""')+'"';
  };
  const csv="\uFEFF"+[exportComparison.headers,...exportComparison.rows]
   .map(row=>row.map(quote).join(";")).join("\r\n");
  const url=URL.createObjectURL(new Blob([csv],{type:"text/csv;charset=utf-8"}));
  const link=document.createElement("a");
  link.href=url;link.download=(demoMode?"DEMO-":"")+"comparacion-calidad-"+mod.id+"-"+selectedGroup+".csv";link.click();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
 });
 function exploreResult(){
  exportComparison=null;
  const items=itemsAvailable(),c=groups[selectedGroup],
   data=analyzeComparison(base(),c,items,selectedItems,selectedYears,selectedWeeks,exactPeriods,xworker.value);
  const {periods,chosen,excluded}=data;
  const total=periods.reduce((sum,r)=>sum+r.n,0);
  const chosenOk=periods.reduce((sum,r)=>sum+r.selected,0);
  const overall=periods.reduce((sum,r)=>sum+r.overall,0);
  const labels=periods.map(r=>r.label);
  const series=chosen.map(([id,name])=>({
   label:name,values:periods.map(r=>r.n?100*r.ids.get(id)/r.n:null)
  }));
  const format=(ok,n)=>n?pct(ok,n):"—";
  xselection.innerHTML='<strong>'+fmt.format(chosen.length)+'</strong> ítem(s) seleccionados · '+
   '<strong>'+fmt.format(periods.length)+'</strong> período(s) con evaluaciones'+
   (exactPeriods!==null?' · <strong>Últimas '+exactPeriods.size+' semanas con datos</strong>':"")+
   (xworker.value?' · Colaborador: <strong>'+esc(xworker.value)+'</strong>':"");
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
  exportComparison={headers:th,rows:periods.map(r=>[
   String(r.year),"S"+String(r.week).padStart(2,"0"),String(r.n),
   ...chosen.map(([id])=>format(r.ids.get(id),r.n)),format(r.selected,r.n)
  ])};
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
