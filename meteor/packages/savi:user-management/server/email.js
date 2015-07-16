absoluteUrl = 'http://meteor.l2share.net:3001'; // Leave off trailing slash
Accounts.emailTemplates.siteName = 'savicontrols.com';
Accounts.emailTemplates.from = 'SAVI Controls <info@savicontrols.com>';
Accounts.emailTemplates.enrollAccount.subject = function(user) {
    return 'SAVI Controls - Your Dealer Account has been accepted!';
};
Accounts.emailTemplates.enrollAccount.html = function(user, url) {
    url = url.split('#')[1];
    var host = absoluteUrl;
    return 'Hello, ' + user.profile.firstName + '<br><br>' +
        'Your account is not yet activated. You must first <a href="' + host + url + '">verify your email by clicking here</a><br>' +
        'After verifying your account/email you may login.<br><br>'+
        '- SAVI Controls<br><br>' +
        'Do not reply to this email - Please contact <a href="mailto:support@savicontrols.com">support@savicontrols.com</a> for additional help';
};