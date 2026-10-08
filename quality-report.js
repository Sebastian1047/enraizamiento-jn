/* Informes de calidad: patrón de evaluacion-siembra, criterios de Labores JN. */
(()=>{"use strict";
const CONFIG={"siembra-campo":{"campo":{"label":"Siembra Campo","items":[["2","Estado de la planta"],["3","Distribución"],["4","Densidad"],["5","Profundidad de la planta"],["6","Planta inclinada"],["7","Ubicación de mangueras"],["8","Selección de esqueje"],["9","Siembra con marcador"],["10","Aseo sitio de trabajo"],["11","Uso de EPP"],["12","Acuerdos de oro"],["13","Conteo de líneas"]],"conformIds":["-Infinity"]}},"desbotonado-mallas":{"spider":{"label":"Spider / Cremon","items":[["1","Plantas con Botón o Tacón"],["2","Plantas con Tacón Largo"],["3","Daño Mecánico"],["4","Desbotón a 15 cm de la Base"],["5","Aseo Caminos"]],"conformIds":["-Infinity"]},"pompon":{"label":"Pompón","items":[["1","Tallos con Botón Principal"],["2","Tallos con Tacón Largo"],["3","Daño Mecánico"],["4","Aseo de Labor"]],"conformIds":["-Infinity"]},"mallas":{"label":"Mallas","items":[],"conformIds":[],"pending":true}},"corte":{"cortador-pompon":{"label":"Cortador - Pompón","items":[],"conformIds":["1"],"external":true},"cortador-spider":{"label":"Cortador - Spider","items":[],"conformIds":["1"],"external":true},"garruchero":{"label":"Transportador","items":[["2","Cuidado de Ramos Campo"],["3","Hidratación en Balde"],["4","Cantidad de Ramos en Balde"],["5","Cuidado de Ramos Poscosecha"],["6","Descargue de Flor en Sala"],["7","EE PP"]],"conformIds":["1"]},"recogedor":{"label":"Recogedor","items":[["3","Cuidado de Ramos"],["4","Marcación de etiquetas"],["5","Cantidad"],["6","Hidratación en Balde"],["7","Mezcla de Medidas"],["8","Ramos en la Malla Caminos"],["9","Desplazamiento de Baldes"],["10","Acuerdos de Oro"]],"conformIds":["1"]}},"bandejas-enraizamiento":{"bandejas":{"label":"Bandejas Enraizamiento","items":[["2","Estado de Esqueje"],["3","Ubicación del Esqueje"],["4","Esqueje Inclinado"],["5","Espacios Vacíos"],["6","Daño Mecánico"],["7","Hundimiento del Sustrato al momento de la Siembra"],["8","Marcación"]],"conformIds":["-Infinity","1"]}},"preparacion-camas":{"preparacion":{"label":"Preparación Camas","items":[["2","Limpieza de Terreno"],["3","Distribución de Enmiendas"],["4","Nivelación del Suelo"],["5","(Estado, Distribución y Cantidad de Durmientes)"],["6","Profundidad de la Preparación"],["7","Riego"],["8","Aseo"],["9","Instalación de la Malla"],["10","Instalación de Mangueras de Goteo"]],"conformIds":["-Infinity","1"]}},"empacador-rendimiento":{"empacador":{"label":"Empacador","items":[["2","Área de Empaque limpia y Ordenada"],["3","Tipo de Caja"],["4","Simetría"],["5","Ubicación del logo de capuchón"],["6","Código Empaque"],["7","Presentación de Ramos"],["8","Número de Ramos por Caja"],["9","Especificaciones de PO, SO y OM"],["10","Marcación / Código"],["11","Daño Mecánico"],["12","UPC y Capuchón Manchado, rasgado"]],"conformIds":["1"]}},"surtidor-rendimiento":{"surtidor":{"label":"Surtidor","items":[["2","Surtido"],["3","Apertura"],["4","Daño Mecánico"],["5","Marcación"]],"conformIds":["1"]}},"zunchador-rendimiento":{"zunchador":{"label":"Zunchador","items":[["2","Zunchos"],["3","Daño mecánico"]],"conformIds":["1"]}},"digitador-rendimiento":{"digitador":{"label":"Digitador","items":[["2","Mala marcación"]],"conformIds":["1"]}},"aspersion-rendimiento":{"aspersion":{"label":"Aspersión","items":[["2","Conocimiento del Programa de Aplicación"],["3","Uso Correcto de EPP´S"],["4","Herramientas de Aspersión"],["5","Desagüe antes de la Aplicación"],["6","Dirección de las Boquillas"],["7","Cobertura"],["8","Rendimiento de la Labor"],["9","Paso Sincronizado"],["10","Orden y Aseo"],["11","Horarios de la Labor"],["12","Acuerdos de Oro"]],"conformIds":["1"]}},"tanquista-rendimiento":{"tanquista":{"label":"Tanquista","items":[["2","Conocimiento del Programa de Aplicación"],["3","Uso Correcto de EPP´S"],["4","Premezcla"],["5","Preparación de la mezcla"],["6","Equipos"],["7","Avisos Informativos"],["8","Orden y Aseo"],["9","Horarios de la Labor"],["10","Acuerdos de Oro"]],"conformIds":["1"]}}};
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
 const raw=Array.isArray(r.incumplimientos)?r.incumplimientos:
   Array.isArray(r.items)?r.items:Array.isArray(r.failures)?r.failures:
   Array.isArray(r.detalles)?r.detalles:Array.isArray(r.observaciones)?r.observaciones:[];
 const values=raw.length?raw:(Array.isArray(r.itemsNombres)?r.itemsNombres:[]);
 const ids=new Map(items.map(([id,name])=>[String(id),String(id)]));
 const names=new Map(items.map(([id,name])=>[norm(name),String(id)]));
 const failed=new Set();let unknown=false;
 for(const v of values){
   const item=v&&typeof v==="object"?v.idItem??v.itemId??v.id??v.item??v.nombre??v.name??v.idObservacion:v;
   const txt=String(item??"").trim();
   if(!txt)continue;
   if(config.conformIds.includes(txt)||/^(ramo\s+)?conforme$/.test(norm(txt)))continue;
   const found=ids.get(txt)||names.get(norm(txt));
   if(found)failed.add(found);else unknown=true;
 }
 return {failed,unknown};
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
 return rows;
}
function render({areaId,mod,key:storageKey,panel}){
 const groups=CONFIG[mod.id]||{};const groupNames=Object.keys(groups);
 if(!groupNames.length){panel.innerHTML='<div class="module-empty">No hay catálogo de calidad para este módulo.</div>';return;}
 const demoRows=sampleQualityRecords(groups,mod.id);
 let storedRows=read(key(areaId,storageKey));
 let demoMode=storedRows.length===0;
 let selectedGroup=groupNames[0],records=demoMode?demoRows:storedRows,reportRows=[],reportHeaders=[];
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
 const demoBanner=panel.querySelector("#qDemoBanner"),demoToggle=panel.querySelector("#qToggleDemo");
 const g=panel.querySelector("#qGroup"),y=panel.querySelector("#qYear"),w=panel.querySelector("#qWeek"),
 search=panel.querySelector("#qSearch"),area=panel.querySelector("#qReport"),note=panel.querySelector("#qNotice");
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
   const head=reportHeaders.map(x=>'<th>'+esc(x)+'</th>').join("");
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
   periods();refresh();
 });
 g.addEventListener("change",()=>{selectedGroup=g.value;periods();refresh()});
 y.addEventListener("change",()=>{periods();refresh()});w.addEventListener("change",refresh);search.addEventListener("input",refresh);
 panel.querySelector("#qFile").addEventListener("change",async event=>{
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
     periods();refresh();
   }catch(e){note.textContent="Error al importar: "+e.message;}finally{event.target.value="";}
 });
 panel.querySelector("#qCSV").addEventListener("click",()=>{
   if(!reportRows.length)return;
   const quote=v=>'"'+String(v??"").replaceAll('"','""')+'"';
   const csv="\uFEFF"+[reportHeaders,...reportRows].map(row=>row.map(quote).join(";")).join("\r\n");
   const url=URL.createObjectURL(new Blob([csv],{type:"text/csv;charset=utf-8"}));
   const a=document.createElement("a");a.href=url;a.download=(demoMode?"DEMO-":"")+"calidad-"+areaId+"-"+mod.id+"-"+selectedGroup+".csv";a.click();
   setTimeout(()=>URL.revokeObjectURL(url),1500);
 });
 periods();refresh();
}
window.QualityReports={render,calc,evaluate,config:CONFIG,sampleQualityRecords,demoItems};
})();