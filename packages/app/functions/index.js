// firebase deploy --only functions

/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
const admin = require("firebase-admin");
const { onCustomEventPublished } = require("firebase-functions/v2/eventarc");
const logger = require("firebase-functions/logger");
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

admin.initializeApp();
exports.onimageresized = onCustomEventPublished(
    "firebase.extensions.storage-resize-images.v1.onSuccess",
    async (event) => {
        logger.info("Received image resize completed event", event);
        // For example, write resized image details into Firestore.
        const path = event.data.outputs[0].outputFilePath;
        const userRef = path.split("/")[3].split("-")[0];
        const bucket = event.data.input.bucket;
        const publicUrl = `https://storage.googleapis.com/${bucket}/${path}`;
        if (path.includes("avatar")) {
            await admin.firestore().collection("users").doc(userRef).update({
                photo_url: publicUrl,
            });
        } else {
            await admin.firestore().collection("users").doc(userRef).update({
                photo_background: publicUrl,
            });
        }
    });
