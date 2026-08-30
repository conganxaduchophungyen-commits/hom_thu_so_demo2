function getDatabase_() {
  var props = PropertiesService.getScriptProperties();
  var id = props.getProperty('DB_SPREADSHEET_ID');
  if (!id) throw new Error('DATABASE_NOT_INITIALIZED');
  return SpreadsheetApp.openById(id);
}
function getRootFolder_() {
  var id = PropertiesService.getScriptProperties().getProperty('ROOT_FOLDER_ID');
  if (!id) throw new Error('DRIVE_NOT_INITIALIZED');
  return DriveApp.getFolderById(id);
}
function sheet_(name) { var s=getDatabase_().getSheetByName(name); if(!s) throw new Error('SHEET_NOT_FOUND:'+name); return s; }
function ensureSheet_(ss,name,headers) { var s=ss.getSheetByName(name)||ss.insertSheet(name); if(s.getLastRow()===0){s.getRange(1,1,1,headers.length).setValues([headers]);s.setFrozenRows(1);} return s; }
function getRows_(name, fields, limit) { var s=sheet_(name), n=s.getLastRow(); if(n<2)return []; var values=s.getRange(2,1,Math.min(n-1,limit||n-1),fields.length).getValues(); return values.map(function(r){var o={};fields.forEach(function(f,i){o[f]=normalizeCell_(r[i]);});return o;}); }
function appendRow_(name,fields,obj){var s=sheet_(name);s.appendRow(fields.map(function(f){return obj[f]===undefined?'':obj[f];}));}
function updateRowById_(name,idField,id,fields,obj){var s=sheet_(name), data=s.getDataRange().getValues(); for(var i=1;i<data.length;i++){if(String(data[i][fields.indexOf(idField)])===String(id)){s.getRange(i+1,1,1,fields.length).setValues([fields.map(function(f){return obj[f]===undefined?data[i][fields.indexOf(f)]:obj[f];})]);return true;}} return false;}
function findRowById_(name,idField,id,fields){var s=sheet_(name), idx=fields.indexOf(idField), data=s.getDataRange().getValues(); for(var i=1;i<data.length;i++){if(String(data[i][idx])===String(id)){var o={};fields.forEach(function(f,j){o[f]=normalizeCell_(data[i][j]);});return o;}}return null;}
function normalizeCell_(v){if(v instanceof Date)return Utilities.formatDate(v,APP_CONFIG.TIMEZONE,"yyyy-MM-dd'T'HH:mm:ss"); return v;}
function now_(){return new Date();}
