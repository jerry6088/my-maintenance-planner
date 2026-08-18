// v5 migration: restore Scag mower inventory and seed factory-based maintenance tasks without overwriting user edits.
(function(){
  const EQ_KEY='maintenancePlannerEquipmentV1';
  const TASK_KEY='maintenancePlannerTasksV1';
  const VER_KEY='maintenanceSeedV5';
  if(localStorage.getItem(VER_KEY)==='1') return;

  let equipment=[]; let tasks=[];
  try{equipment=JSON.parse(localStorage.getItem(EQ_KEY)||'[]')}catch{}
  try{tasks=JSON.parse(localStorage.getItem(TASK_KEY)||'[]')}catch{}
  if(!Array.isArray(equipment)) equipment=[];
  if(!Array.isArray(tasks)) tasks=[];

  // Preserve any hours/notes the user entered on the generic mower record.
  let mower=equipment.find(e=>/zero[- ]?turn mower/i.test(e.name||'')) || equipment.find(e=>/scag/i.test((e.make||'')+' '+(e.name||'')));
  if(mower){
    mower.name='Scag Freedom Z 52';
    mower.type='Mower';
    mower.make='Scag';
    mower.model=mower.model||'SMFZ-52';
    mower.serial=mower.serial||'K4007279';
    mower.meterType='hours';
    mower.notes=(mower.notes||'') + (mower.notes?' ':'') + '52-inch Scag zero-turn. Factory/service details can be refined when engine model is confirmed.';
  } else {
    mower={id:crypto.randomUUID(),name:'Scag Freedom Z 52',type:'Mower',year:'',make:'Scag',model:'SMFZ-52',meter:'',meterType:'hours',serial:'K4007279',notes:'52-inch Scag zero-turn. Add current engine hours and exact engine model when available.'};
    equipment.push(mower);
  }

  // Keep existing task links valid if they pointed to the generic mower name.
  tasks.forEach(t=>{if(/zero[- ]?turn mower/i.test(t.equipment||'')) t.equipment='Scag Freedom Z 52'});

  const d=(days)=>{const x=new Date();x.setHours(0,0,0,0);x.setDate(x.getDate()+days);return x.toISOString().slice(0,10)};
  const addTask=(name,category,equipmentName,days,value,unit,notes)=>{
    if(tasks.some(t=>t.name===name&&t.equipment===equipmentName)) return;
    tasks.push({id:crypto.randomUUID(),name,category,equipment:equipmentName,lastCompleted:'',nextDue:d(days),intervalValue:value,intervalUnit:unit,meterValue:'',cost:'',partNumber:'',notes});
  };

  // Scag factory guidance available without assuming the exact engine model.
  addTask('Scag engine oil service','Lawn & Outdoor','Scag Freedom Z 52',30,6,'months','SCAG factory hour meter guidance calls for the first engine-oil change at 20 hours. Ongoing oil intervals depend on the installed engine manual; update this task after confirming the Kohler engine model and last-service hours.');
  addTask('Grease Scag front caster yokes','Lawn & Outdoor','Scag Freedom Z 52',120,1,'years','SCAG guidance: front caster-yoke pivot bearing set is greased once a year or every 500 hours, whichever comes first.');
  addTask('Inspect Scag blades, belts and deck','Lawn & Outdoor','Scag Freedom Z 52',14,1,'months','Routine mower inspection reminder. Keep blades sharp and inspect belt/deck condition; refine exact hour interval when the matching operator manual is confirmed.');

  // 2020 Polaris Ranger XP 1000 factory periodic-maintenance intervals.
  const p='2020 Polaris Ranger 1000';
  addTask('Polaris general lubrication','Vehicles & UTV',p,45,3,'months','Factory interval: every 50 hours / 3 months / 500 miles, whichever comes first. Lubricate fittings, pivots, cables, etc.');
  addTask('Polaris inspect air filter','Vehicles & UTV',p,60,6,'months','Factory interval: every 50 hours / 6 months / 500 miles, whichever comes first. Inspect; replace as needed.');
  addTask('Polaris engine oil & filter','Vehicles & UTV',p,60,6,'months','Factory interval after break-in: every 100 hours / 6 months / 1,000 miles, whichever comes first.');
  addTask('Polaris inspect drive belt','Vehicles & UTV',p,120,12,'months','Factory interval: every 100 hours / 12 months / 1,000 miles, whichever comes first. Inspect and replace as needed.');
  addTask('Polaris change front gearcase fluid','Vehicles & UTV',p,120,12,'months','Factory interval: every 100 hours / 12 months / 1,000 miles, whichever comes first.');
  addTask('Polaris change transmission fluid','Vehicles & UTV',p,120,12,'months','Factory interval: every 100 hours / 12 months / 1,000 miles, whichever comes first.');
  addTask('Polaris inspect spark plug','Vehicles & UTV',p,120,12,'months','Factory interval: every 100 hours / 12 months / 1,000 miles, whichever comes first. Inspect; replace as needed.');
  addTask('Polaris change brake fluid','Vehicles & UTV',p,365,24,'months','Factory interval: every 200 hours / 24 months / 2,000 miles.');

  localStorage.setItem(EQ_KEY,JSON.stringify(equipment));
  localStorage.setItem(TASK_KEY,JSON.stringify(tasks));
  localStorage.setItem(VER_KEY,'1');
})();
