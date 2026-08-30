/**
 * HÒM THƯ TỐ GIÁC TỘI PHẠM SỐ
 * Công an xã Đức Hợp, tỉnh Hưng Yên
 * Entry points của Google Apps Script Web App.
 */
function doGet(e) {
  var page = (e && e.parameter && e.parameter.page) || 'index';
  var allowed = ['index','citizen','track','login','dashboard','case-detail','admin'];
  if (allowed.indexOf(page) === -1) page = 'index';
  var t = HtmlService.createTemplateFromFile(page);
  t.appConfig = getPublicConfig_();
  return t.evaluate()
    .setTitle(APP_CONFIG.APP_NAME)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport','width=device-width, initial-scale=1');
}

function doPost(e) {
  try {
    var body = parseRequestBody_(e);
    var action = body.action || '';
    var result = dispatchApi_(action, body.payload || body);
    return jsonOutput_(result);
  } catch (err) {
    return jsonOutput_(errorResponse_(err));
  }
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function dispatchApi_(action, payload) {
  switch (action) {
    case 'submitCase': return submitPublicCase(payload);
    case 'trackCase': return trackPublicCase(payload);
    case 'login': return loginUser(payload);
    case 'changePassword': return changeOwnPassword(payload);
    case 'logout': return logoutUser(payload);
    case 'getDashboard': return getDashboard(payload);
    case 'searchCases': return searchCases(payload);
    case 'getCase': return getCaseDetail(payload);
    case 'assignCase': return assignCase(payload);
    case 'transferCase': return transferCase(payload);
    case 'updateCaseStatus': return updateCaseStatus(payload);
    case 'addCaseNote': return addCaseNote(payload);
    case 'closeCase': return closeCase(payload);
    case 'getProcessHistory': return getProcessHistory(payload);
    case 'getAuditLog': return getAuditLog(payload);
    case 'listUsers': return listUsers(payload);
    case 'saveUser': return saveUser(payload);
    case 'deleteUser': return deleteUser(payload);
    case 'resetPassword': return resetUserPassword(payload);
    case 'deleteCase': return deleteCase(payload);
    case 'runDeadlineCheck': return runDeadlineCheck();
    default: return fail_('UNKNOWN_ACTION','Thao tác không được hỗ trợ.');
  }
}

function parseRequestBody_(e) {
  if (!e || !e.postData || !e.postData.contents) return {};
  var text = e.postData.contents;
  try { return JSON.parse(text); } catch (_) {}
  return e.parameter || {};
}

function jsonOutput_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
