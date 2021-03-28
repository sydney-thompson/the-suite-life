import { auth, db } from "./firebase";

// gets one payment's data from firebase 
export function loadPaymentData (firebaseID){
    var returnData = []
    db.ref(`/suites/test123/payments/${firebaseID}`).once('value', snapshot => {
        let data = snapshot.val()
        returnData = {'amount': data.amount, 'completed': data.completed, 'details': data.details, 'payees': data.payees, 'payer': data.payer, 'title': data.title}
    });
    return returnData
  }

// function to push new payment to firebase
export function addNewPayment (info){
    db.ref(`/suites/test123/payments`).once('value', snapshot => {
      let data = snapshot.val()
      if(data == "None"){
        db.ref('/suites/test123/payments/').set({
          amount: info.amount, 
          completed: info.completed,
          details: info.details,
          payees: info.payees,
          payer: info.payer,
          title: info.title
        });
      }
      else{
        db.ref('/suites/test123/payments/').push({
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
    db.ref(`/suites/test123/payments/${firebaseID}`).set({
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
