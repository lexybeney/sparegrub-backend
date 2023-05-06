const SibApiV3Sdk = require("sib-api-v3-sdk");
let defaultClient = SibApiV3Sdk.ApiClient.instance;
let apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.SIB_API_KEY;
const { EMAIL_FROM_NAME } = require("../config");
const { EMAIL } = require("../config");

function sendEmail(toAddress, firstName, subject, content) {
  let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  sendSmtpEmail.subject = subject;
  sendSmtpEmail.htmlContent = content;
  sendSmtpEmail.sender = {
    name: EMAIL_FROM_NAME,
    email: EMAIL,
  };
  sendSmtpEmail.to = [{ email: toAddress, name: firstName }];

  apiInstance.sendTransacEmail(sendSmtpEmail).then(
    function (data) {
      console.log(
        "API called successfully. Returned data: " + JSON.stringify(data)
      );
    },
    function (error) {
      console.error(error);
    }
  );
}

module.exports = sendEmail;
