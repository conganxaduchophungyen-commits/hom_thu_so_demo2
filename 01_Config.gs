var APP_CONFIG = {
  APP_NAME: 'HÒM THƯ TỐ GIÁC TỘI PHẠM SỐ',
  ORG_NAME: 'CÔNG AN XÃ ĐỨC HỢP, TỈNH HƯNG YÊN',
  ADDRESS: 'Thôn Nho Lâm, xã Đức Hợp, tỉnh Hưng Yên',
  DUTY_PHONE: '02213.815.999',
  ALERT_EMAIL: 'conganxaduchopdangbai@gmail.com',
  ROOT_FOLDER_NAME: 'HOM_THU_TO_GIAC',
  SPREADSHEET_NAME: 'HOM_THU_TO_GIAC_DB',
  MAX_FILES: 5,
  MAX_FILE_BYTES: 10 * 1024 * 1024,
  SESSION_TTL_SECONDS: 21600,
  PUBLIC_TOKEN_LENGTH: 12,
  CASE_PREFIX: 'DH',
  TIMEZONE: 'Asia/Ho_Chi_Minh',
  ADMIN_LOGIN: 'admin',
  ADMIN_DEFAULT_PASSWORD: 'admin@123',
  PASSWORD_ITERATIONS: 12000,
  DEMO_DATA: false
};

var SHEETS = {
  CASES: 'CASES', USERS: 'USERS', PROCESS_HISTORY: 'PROCESS_HISTORY',
  LEGAL_RULES: 'LEGAL_RULES', ATTACHMENTS: 'ATTACHMENTS', AUDIT_LOG: 'AUDIT_LOG',
  NOTIFICATIONS: 'NOTIFICATIONS', SYSTEM_CONFIG: 'SYSTEM_CONFIG'
};

var CASE_FIELDS = ['caseId','publicTrackingCode','createdAt','updatedAt','category','priority','status','incidentDate','incidentLocation','village','description','relatedPersons','latitude','longitude','anonymous','reporterName','reporterPhone','reporterEmail','contactConsent','assignedTo','assignedAt','deadline','closedAt','resolution','source','attachmentFolderId'];
var USER_FIELDS = ['userId','email','fullName','loginName','role','department','villages','status','mustChangePassword','createdAt','lastLoginAt','passwordRecord'];
var HISTORY_FIELDS = ['historyId','caseId','action','fromStatus','toStatus','performedBy','performedAt','reason','note'];
var RULE_FIELDS = ['ruleId','category','priority','deadlineDays','requiredActions','active'];
var ATTACHMENT_FIELDS = ['attachmentId','caseId','fileName','mimeType','size','driveFileId','uploadedAt','uploadedBy'];
var AUDIT_FIELDS = ['logId','timestamp','userId','action','entity','entityId','ipOrSession','details'];
var NOTIFICATION_FIELDS = ['notificationId','caseId','recipient','type','message','createdAt','sentAt','status'];
var CONFIG_FIELDS = ['key','value','description'];

var ROLES = { SUPER_ADMIN:'SUPER_ADMIN', ADMIN:'ADMIN', LEAD:'LEAD', INTAKE:'INTAKE', PROCESSOR:'PROCESSOR', VIEWER:'VIEWER' };
var STATUSES = { NEW:'NEW', RECEIVED:'RECEIVED', CLASSIFIED:'CLASSIFIED', ASSIGNED:'ASSIGNED', PROCESSING:'PROCESSING', VERIFYING:'VERIFYING', WAITING_INFO:'WAITING_INFO', TRANSFERRED:'TRANSFERRED', RESOLVED:'RESOLVED', CLOSED:'CLOSED', REJECTED:'REJECTED', OUT_OF_SCOPE:'OUT_OF_SCOPE', CANCELLED:'CANCELLED' };
var STATE_TRANSITIONS = {
  NEW:['RECEIVED'], RECEIVED:['CLASSIFIED'], CLASSIFIED:['ASSIGNED','OUT_OF_SCOPE'], ASSIGNED:['PROCESSING','TRANSFERRED'],
  PROCESSING:['VERIFYING','WAITING_INFO','RESOLVED'], VERIFYING:['PROCESSING','RESOLVED'], WAITING_INFO:['PROCESSING','CANCELLED'],
  TRANSFERRED:['ASSIGNED'], RESOLVED:['CLOSED'], OUT_OF_SCOPE:['CLOSED'], CANCELLED:['CLOSED']
};
var CATEGORIES = [
  {value:'CRIME_TIP',label:'Tố giác tội phạm'}, {value:'CRIME_REPORT',label:'Tin báo về tội phạm'},
  {value:'ANTT',label:'Phản ánh ANTT'}, {value:'LAW_VIOLATION',label:'Phản ánh vi phạm pháp luật'},
  {value:'SOCIAL_EVIL',label:'Phản ánh tệ nạn xã hội'}, {value:'OTHER',label:'Thông tin khác'}
];
var PRIORITIES = [{value:'NORMAL',label:'Bình thường'},{value:'URGENT',label:'Khẩn'},{value:'CRITICAL',label:'Rất khẩn'}];
var VILLAGES = ['Đức An','Đức Trung','Phú Ninh','Nho Lâm','Hạnh Lâm','Vân Nghệ','Trung Hòa','Phú Cường','Quảng Lạc','Bắc Nam Phú','Tây Thịnh'];
var PUBLIC_STATUS_LABELS = {
  NEW:'Đã tiếp nhận', RECEIVED:'Đã tiếp nhận', CLASSIFIED:'Đang phân loại', ASSIGNED:'Đã chuyển cán bộ xử lý',
  PROCESSING:'Đang xác minh', VERIFYING:'Đang xác minh', WAITING_INFO:'Cần bổ sung thông tin', TRANSFERRED:'Đã chuyển cán bộ xử lý',
  RESOLVED:'Đã xử lý', CLOSED:'Kết thúc', OUT_OF_SCOPE:'Không thuộc thẩm quyền', CANCELLED:'Kết thúc'
};
var ROLE_PERMISSIONS = {
  SUPER_ADMIN:['*'], ADMIN:['USERS_MANAGE','CASE_VIEW_ALL','CASE_DELETE','CASE_ASSIGN','CASE_TRANSFER','CASE_STATUS','CASE_NOTE','DASHBOARD','AUDIT_VIEW','EXPORT'],
  LEAD:['CASE_VIEW_ALL','CASE_ASSIGN','CASE_TRANSFER','CASE_STATUS','CASE_NOTE','DASHBOARD','AUDIT_VIEW','EXPORT'],
  INTAKE:['CASE_VIEW_ALL','CASE_CLASSIFY','CASE_STATUS','CASE_NOTE','DASHBOARD'],
  PROCESSOR:['CASE_VIEW_ASSIGNED','CASE_STATUS','CASE_NOTE'],
  VIEWER:['CASE_VIEW_ASSIGNED','DASHBOARD']
};

function getPublicConfig_() {
  return {appName:APP_CONFIG.APP_NAME, orgName:APP_CONFIG.ORG_NAME, address:APP_CONFIG.ADDRESS, dutyPhone:APP_CONFIG.DUTY_PHONE, categories:CATEGORIES, priorities:PRIORITIES, villages:VILLAGES};
}
