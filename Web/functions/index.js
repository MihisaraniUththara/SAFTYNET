/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const twilio = require('twilio');

admin.initializeApp();

const accountSid = 'ACbe04c754862c81702a6ae30aac6ef585'; // Replace with your Twilio Account SID
const authToken = '7b2b01d29670ea2501c1f2d079a0e010';   // Replace with your Twilio Auth Token
const twilioPhoneNumber = '+16814122791'; // Replace with your Twilio Phone Number

const client = twilio(accountSid, authToken);

exports.sendDutyNotification = functions.https.onCall(async (data, context) => {
  const { phoneNumber, message } = data;

  try {
    await client.messages.create({
      body: message,
      from: twilioPhoneNumber,
      to: phoneNumber,
    });
    return { success: true, message: 'Message sent successfully' };
  } catch (error) {
    console.error('Error sending SMS:', error);
    return { success: false, message: 'Failed to send message' };
  }
});

