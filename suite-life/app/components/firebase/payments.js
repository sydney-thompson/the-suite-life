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

  export async function get_suiteID (){
    var uid = auth.currentUser.uid;
    var data = null 
  
    await db.ref(`users/${uid}/suiteID/`).once('value').then(function(snapshot) {
      data = snapshot.val(); 
    });
    return data 
  }

  // function to push new payment to firebase
  export async function addNewPayment (info){
    var suiteID = await get_suiteID();
    await db.ref('/suites/' + suiteID + '/payments/').push({
        amount: info.amount, 
        completed: info.completed,
        details: info.details,
        payees: info.payees,
        payer: info.payer,
        title: info.title
        });
      }
