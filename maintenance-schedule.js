// Recommended starter maintenance tasks. Dates are placeholders from first load and can be edited anytime.
(function(){
 const KEY='maintenancePlannerTasksV1', VER='maintenanceScheduleSeedV1';
 if(localStorage.getItem(VER)==='1') return;
 const tasks=JSON.parse(localStorage.getItem(KEY)||'[]');
 const d=n=>{const x=new Date();x.setHours(0,0,0,0);x.setDate(x.getDate()+n);return x.toISOString().slice(0,10)};
 const add=(name,category,equipment,days,value,unit,notes,part='')=>{if(!tasks.some(t=>t.name===name&&t.equipment===equipment))tasks.push({id:crypto.randomUUID(),name,category,equipment,lastCompleted:'',nextDue:d(days),intervalValue:value,intervalUnit:unit,meterValue:'',cost:'',partNumber:part,notes});};
 add('Replace HVAC return filter','HVAC & Filters','Main HVAC Outdoor Unit',30,1,'months','Starter interval. Adjust for filter type, pets, dust and actual condition.','Enter filter size');
 add('HVAC seasonal inspection & coil check','HVAC & Filters','Main HVAC Outdoor Unit',90,6,'months','Inspect outdoor coil, electrical connections, drain, airflow and general operation. Professional service as needed.');
 add('Clean condensate drain','HVAC & Filters','Main HVAC Outdoor Unit',60,6,'months','Inspect and flush condensate drain to reduce algae/clog risk.');
 add('Inspect air handler & blower area','HVAC & Filters','Goodman Indoor Air Handler',90,6,'months','Check cleanliness, drain pan, blower area and signs of moisture.');
 add('Clean refrigerator coils / ventilation area','Home','GE Refrigerator',60,6,'months','Vacuum accessible condenser/ventilation areas and clean around/under refrigerator.');
 add('Replace refrigerator water filter','Home','GE Refrigerator',90,6,'months','Adjust interval based on water use and filter indicator.','Enter water filter part number');
 add('Clean dishwasher filter & inspect spray arms','Home','GE Dishwasher',30,1,'months','Clean filter/sump area and inspect spray arms for blockage or damage.');
 add('Run dishwasher cleaning cycle','Home','GE Dishwasher',45,1,'months','Use dishwasher-safe cleaner and inspect door seals.');
 add('Washer cleaning cycle','Home','GE Top Load Washer',30,1,'months','Run tub-clean cycle and inspect hoses/connections for leaks.');
 add('Inspect washer hoses','Home','GE Top Load Washer',120,6,'months','Check fill and drain hoses for bulges, cracks, rubbing and leaks.');
 add('Clean microwave grease filters','Home','Maytag Microwave',60,2,'months','Clean reusable grease filters and inspect vent area.');
 add('Clean range / oven','Home','Electric Double-Oven Range',90,3,'months','Clean cooktop and ovens; inspect door seals and heating performance.');
 ['2014 Volkswagen Passat','2021 Ford Expedition','2002 Ford F-150','1996 Chevy 1500'].forEach(v=>{
   add('Oil & filter service check','Vehicles & UTV',v,90,6,'months','Starter time-based reminder. Update mileage and use the manufacturer interval for your engine/oil.','Enter oil/filter parts');
   add('Tire pressure, tread & rotation check','Vehicles & UTV',v,60,6,'months','Check pressure/tread; rotate based on mileage and tire wear.');
   add('Inspect fluids, battery, belts & hoses','Vehicles & UTV',v,120,6,'months','General under-hood inspection. Adjust after service history is entered.');
 });
 add('Engine oil & filter service','Vehicles & UTV','2020 Polaris Ranger 1000',60,6,'months','Starter reminder until engine hours and last service are entered. Track oil/filter and service hours.','Enter oil/filter parts');
 add('Inspect drive belt & clutches','Vehicles & UTV','2020 Polaris Ranger 1000',90,6,'months','Inspect belt condition, clutch cleanliness/operation and unusual noise.');
 add('Oil service & general inspection','Vehicles & UTV','2007 Honda Recon 250',60,6,'months','Starter reminder until mileage/hours and last service are entered.');
 add('Engine oil & filter service','Property','2006 Mahindra 4530',60,6,'months','Starter reminder until tractor hours and last service are entered. Follow hour-based manual intervals once known.','Enter oil/filter parts');
 add('Grease & inspect tractor','Property','2006 Mahindra 4530',30,3,'months','Grease applicable fittings; inspect fluids, tires, hoses and attachments.');
 add('Mower oil & filter service','Lawn & Outdoor','Zero-Turn Mower',30,6,'months','Starter reminder until mower model, engine hours and last service are entered.','Enter oil/filter parts');
 add('Inspect mower blades & deck belt','Lawn & Outdoor','Zero-Turn Mower',14,1,'months','Inspect blade condition, deck belt, pulleys and debris buildup during mowing season.');
 localStorage.setItem(KEY,JSON.stringify(tasks));
 localStorage.setItem(VER,'1');
})();
