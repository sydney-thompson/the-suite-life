import { auth, db } from "./firebase";

// gets one payment's data from firebase 
export async function loadPaymentData (firebaseID){
    /*db.ref(`/suites/test123/payments/${firebaseID}`).once('value', snapshot => {
        return snapshot.val();
        console.log(data);
        return {'amount': data.amount, 'completed': data.completed, 'details': data.details, 'payees': data.payees, 'payer': data.payer, 'title': data.title};
    }); */

    return new Promise((resolve, reject) => {
      const ref =  db.ref(`/suites/test123/payments/${firebaseID}`);
      ref
        .once("value", (snapshot) => {
          if (snapshot.exists()) {
            resolve(snapshot.val());
          } else {
            resolve({ code: "payment-not-found" });
          }
        })
        .catch(function (error) {
          reject(error);
        });
    });
  }

// function to push new payment to firebase
export async function addNewPayment (info){
    await db.ref(`/suites/test123/payments`).once('value', snapshot => {
      let data = snapshot.val()
      if(data == "None"){
        return db.ref('/suites/test123/payments/').set({
          amount: info.amount, 
          completed: info.completed,
          details: info.details,
          payees: info.payees,
          payer: info.payer,
          title: info.title
        });
      }
      else{
        return db.ref('/suites/test123/payments/').push({
            amount: info.amount, 
            completed: info.completed,
            details: info.details,
            payees: info.payees,
            payer: info.payer,
            title: info.title
        });
      }
    });
  }

// function to update data in firebase
export function updatePayment (info, firebaseID){
    return db.ref(`/suites/test123/payments/${firebaseID}`).set({
        amount: info.amount, 
        completed: info.completed,
        details: info.details,
        payees: info.payees,
        payer: info.payer,
        title: info.title
    });
  }

// deletes payment from firebase 
export function deletePayment (toDeleteID){
    let toDelete = db.ref(`/suites/test123/payments/${toDeleteID}`)
    toDelete.remove()
  }
