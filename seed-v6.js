// v6: add manufacturer-based maintenance checks without overwriting user-entered meters or equipment edits.
(function(){
 const EQ='maintenancePlannerEquipmentV1',TK='maintenancePlannerTasksV1',VK='maintenanceSeedV6';
 if(localStorage.getItem(VK)==='1') return;
 let eq=[],tasks=[];try{eq=JSON.parse(localStorage.getItem(EQ)||'[]')}catch{};try{tasks=JSON.parse(localStorage.getItem(TK)||'[]')}catch{};
 if(!Array.isArray(eq))eq=[];if(!Array.isArray(tasks))tasks=[];
 const d=n=>{const x=new Date();x.setHours(0,0,0,0);x.setDate(x.getDate()+n);return x.toISOString().slice(0,10)};
 const add=(name,cat,equipment,days,val,unit,notes)=>{if(!tasks.some(t=>t.name===name&&t.equipment===equipment))tasks.push({id:crypto.randomUUID(),name,category:cat,equipment,lastCompleted:'',nextDue:d(days),intervalValue:val,intervalUnit:unit,meterValue:'',cost:'',partNumber:'',notes});};
 const renameGenericMower=()=>{let m=eq.find(e=>/scag freedom z 52/i.test(e.name||''))||eq.find(e=>/zero[- ]?turn mower/i.test(e.name||''));if(m){const old=m.name;m.name='Scag Freedom Z 52';m.type='Mower';m.make='Scag';m.meterType='hours';tasks.forEach(t=>{if(t.equipment===old)t.equipment=m.name});}else eq.push({id:crypto.randomUUID(),name:'Scag Freedom Z 52',type:'Mower',year:'',make:'Scag',model:'Freedom Z 52',meter:'',meterType:'hours',serial:'',notes:'52-inch Scag Freedom Z. Enter exact engine model/serial when available for engine-specific service intervals.'});};
 renameGenericMower();
 // SCAG: chassis / mower checks. Engine-specific oil/filter schedule remains dependent on installed engine manual.
 const s='Scag Freedom Z 52';
 add('SCAG pre-use safety & mower inspection','Lawn & Outdoor',s,1,1,'months','Manufacturer-style operating check: inspect blades/deck, belts, tires, fasteners, controls, guards and visible leaks. Increase frequency during mowing season.');
 add('SCAG caster-yoke pivot grease','Lawn & Outdoor',s,180,12,'months','SCAG guidance: grease front caster-yoke pivot bearings annually or every 500 hours, whichever comes first.');
 add('SCAG engine oil first-service check','Lawn & Outdoor',s,7,0,'days','SCAG hour-meter guidance calls for initial engine-oil service at 20 hours. Ongoing oil/filter interval must follow the exact installed engine manual; keep this task until engine model is entered.');
 add('SCAG hydro / drive system inspection','Lawn & Outdoor',s,90,6,'months','Inspect hydro drive/transaxles, cooling fans, hoses, leaks, parking brake and drive belt. Use exact Freedom Z operator manual and transaxle instructions for fluid/filter intervals.');
 // Polaris 2020 Ranger XP 1000 official periodic chart.
 const p='2020 Polaris Ranger 1000';
 add('Polaris fuel system inspection','Vehicles & UTV',p,30,1,'months','Factory: 25 h / monthly / 200 mi. Inspect fuel lines/fittings for leaks and abrasion.');
 add('Polaris general lubrication','Vehicles & UTV',p,45,3,'months','Factory: 50 h / 3 months / 500 mi, whichever comes first. Lubricate fittings, pivots and cables.');
 add('Polaris air filter inspection','Vehicles & UTV',p,60,6,'months','Factory: 50 h / 6 months / 500 mi. Inspect; replace as needed. Severe use requires more frequent service.');
 add('Polaris cooling system inspection','Vehicles & UTV',p,60,6,'months','Factory: 50 h / 6 months / 500 mi. Check coolant strength, hoses, radiator and leaks; pressure-test yearly.');
 add('Polaris engine oil & filter','Vehicles & UTV',p,60,6,'months','Factory: 100 h / 6 months / 1,000 mi after break-in, whichever comes first.');
 add('Polaris drive belt inspection','Vehicles & UTV',p,120,12,'months','Factory: 100 h / 12 months / 1,000 mi. Inspect and replace as needed.');
 add('Polaris front gearcase fluid','Vehicles & UTV',p,120,12,'months','Factory: change at 100 h / 12 months / 1,000 mi.');
 add('Polaris transmission fluid','Vehicles & UTV',p,120,12,'months','Factory: change at 100 h / 12 months / 1,000 mi.');
 add('Polaris spark plug inspection','Vehicles & UTV',p,120,12,'months','Factory: 100 h / 12 months / 1,000 mi. Inspect; replace as needed.');
 add('Polaris wheel bearing / wiring inspection','Vehicles & UTV',p,120,12,'months','Factory: 100 h / 12 months / 1,000 mi. Inspect wheel bearings and wiring condition/routing.');
 add('Polaris brake fluid change','Vehicles & UTV',p,365,24,'months','Factory: 200 h / 24 months / 2,000 mi. Change DOT 4 brake fluid.');
 // 2021 Expedition: Ford owner-manual based recurring checks. Oil follows IOLM.
 const ex='2021 Ford Expedition';
 add('Expedition oil-life monitor service','Vehicles & UTV',ex,90,6,'months','Ford: change engine oil/filter when the Intelligent Oil-Life Monitor indicates; do not exceed the owner-manual maximum. Update the task after each oil change.');
 add('Expedition tire / brake / multipoint inspection','Vehicles & UTV',ex,180,12,'months','Ford scheduled maintenance: rotate tires and inspect tire wear, brakes, cooling system and perform a multipoint inspection at scheduled service intervals.');
 add('Expedition severe-use review','Vehicles & UTV',ex,180,12,'months','Ford: towing, heavy loads, dusty conditions, extended idling and temperature extremes can require more frequent service. Review usage and apply severe schedule when applicable.');
 // 2002 F-150: Ford owner-manual normal schedule available online.
 const f='2002 Ford F-150';
 add('F-150 oil/filter & inspection service','Vehicles & UTV',f,90,12,'months','Ford normal schedule: engine oil/filter, tire rotation, brake inspection, cooling-system inspection, exhaust inspection and multipoint inspection every 1 year or 6,000 miles.');
 add('F-150 fuel filter replacement','Vehicles & UTV',f,180,12,'months','Ford normal schedule: external fuel filter every 37,000 miles. Use current mileage to determine next due point.');
 add('F-150 accessory belt inspection','Vehicles & UTV',f,180,12,'months','Ford normal schedule: inspect accessory drive belt(s) at 100,000 miles, then every other oil change until replaced.');
 add('F-150 major drivetrain fluids','Vehicles & UTV',f,365,12,'months','Ford normal schedule: at 150,000 miles change automatic transmission fluid/filter; for 4WD also front axle, rear axle and transfer-case fluids; replace accessory drive belt(s).');
 add('F-150 coolant replacement review','Vehicles & UTV',f,365,12,'months','Ford schedule: initial coolant replacement at 10 years/200,000 miles, then every 5 years/100,000 miles. Verify service history because this truck is beyond the initial age interval.');
 // 2014 Passat: VW official scheduled service intervals.
 const vw='2014 Volkswagen Passat';
 add('Passat scheduled VW service','Vehicles & UTV',vw,180,12,'months','Volkswagen factory maintenance is mileage/time based. VW publishes service points at 30k/36mo, 40k/48mo, 50k/60mo, 60k/72mo, 70k/84mo, 80k/96mo, 90k/108mo and 100k/120mo. Use current mileage and service history to identify the next applicable service.');
 add('Passat annual maintenance review','Vehicles & UTV',vw,180,12,'months','VW recommends scheduled maintenance within about 1,000 miles of the specified interval or one year from the last scheduled maintenance, whichever occurs first.');
 // Legacy equipment: official current sites direct owners back to the original manual; add required checks without inventing hour intervals.
 add('Honda Recon factory maintenance review','Vehicles & UTV','2007 Honda Recon 250',90,6,'months','Honda directs owners to the maintenance section of the original owner manual; service frequency must be increased for wet, dusty or full-throttle use. Check oil, air cleaner, brakes, tires, steering/suspension, final drive, battery and controls; enter exact intervals when the 2007 manual is available.');
 add('Mahindra 4530 factory maintenance review','Property','2006 Mahindra 4530',90,6,'months','Mahindra recommends following the tractor operator-manual preventive-maintenance schedule and keeping hour-based records. Check engine oil/filter, fuel/air filters, radiator/coolant, tires, battery, hydraulics, leaks and grease points. Enter exact 4530 hour intervals when the legacy operator manual is available.');
 add('Mahindra grease & attachment inspection','Property','2006 Mahindra 4530',30,3,'months','Mahindra guidance: inspect attachments regularly; grease moving points and PTO shaft as applicable; inspect hydraulic hoses, connectors, damage and leaks.');
 add('1996 Chevy factory schedule review','Vehicles & UTV','1996 Chevy 1500',90,6,'months','Legacy GM schedule should be matched to the original owner/maintenance manual and engine/drivetrain. Until that manual is entered, track oil/filter, tires, brakes, coolant, belts/hoses, transmission, differential/transfer-case fluids and chassis inspection without assigning unverified factory mileage intervals.');
 localStorage.setItem(EQ,JSON.stringify(eq));localStorage.setItem(TK,JSON.stringify(tasks));localStorage.setItem(VK,'1');
})();