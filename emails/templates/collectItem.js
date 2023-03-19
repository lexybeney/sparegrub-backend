function collectItemEmail(
  firstName,
  itemName,
  itemQuantity,
  listerUsername,
  listerPostcode,
  listerPhone,
  collectionDetails
) {
  return `<html><h2>Hi ${firstName}, find the details to collect your item below:</h2><p>Item: ${itemName}</p><p>Quantity: ${itemQuantity}</p><p>Lister username: ${listerUsername}</p><p>Lister postcode: ${listerPostcode}</p><p>Lister phone number: ${listerPhone}</p><p>Collection details: ${collectionDetails}</p><br><p>Thank you for using SpareGrub!</p></html>`;
}

module.exports = collectItemEmail;
