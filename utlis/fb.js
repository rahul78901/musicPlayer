// Import the functions you need from the SDKs you need
import {
  initializeApp
} from "firebase/app";
import {
  getStorage
} from  "firebase/storage";
//TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBji4JmfD9Gn6jlbo_RJpL__HA2jFDlPjY",
  authDomain: "rahul-30102.firebaseapp.com",
  databaseURL: "https://rahul-30102.firebaseio.com",
  projectId: "rahul-30102",
  storageBucket: "rahul-30102.appspot.com",
  messagingSenderId: "1079041588112",
  appId: "1:1079041588112:web:824fe971bdac057309d115",
  measurementId: "G-XXBJ8QTR17"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

/*
module.exports=app;
module.exports.storage=storage;
*/

export default app;


