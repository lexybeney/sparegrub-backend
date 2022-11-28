function welcomeEmail(firstName) {
  return `<html><h1>Welcome on board</h1><h2>Dear ${firstName},</h2><p>Thank you for signing up to SpareGrub, we hope you can't wait to get started on your food waste reduction journey!</p></html>`;
}

module.exports = welcomeEmail;
