import { auth, db } from "./firebase";

export async function get_suiteID() {
  var uid = auth.currentUser.uid;
  var data = null;

  await db
    .ref(`users/${uid}/suiteID/`)
    .once("value")
    .then(function (snapshot) {
      data = snapshot.val();
    });
  return data;
}

// gets one payment's data from firebase
export async function loadPaymentData(firebaseID) {
  var suiteID = await get_suiteID();
  var returnData = [];
  await db
    .ref(`/suites/${suiteID}/payments/${firebaseID}`)
    .once("value", (snapshot) => {
      let data = snapshot.val();
      returnData = {
        amount: data.amount,
        completed: data.completed,
        details: data.details,
        payees: data.payees,
        payer: data.payer,
        title: data.title,
      };
    });
  return returnData;
}

// ID_of_main_person:
//     balances:
//         ID_of_sub_person: balance
export async function get_balance(ID_of_main_person, ID_of_sub_person) {
  var curr_balance = 0;
  // update payer information
  await db
    .ref(`users/${ID_of_main_person}/balances/${ID_of_sub_person}`)
    .once("value")
    .then(function (snapshot) {
      curr_balance = snapshot.val();
    });
  return balance_data;
}

// ID_of_main_person:
//     balances:
//         ID_of_sub_person: balance
export async function update_balance(
  ID_of_main_person,
  ID_of_sub_person,
  new_amount
) {
  await db
    .ref(`users/${ID_of_main_person}/balances/${ID_of_sub_person}`)
    .set(new_amount);
}

export async function add_transaction_balance(
  payer_ID,
  payee_ID,
  payment_amount
) {
  var curr_balance = 0;
  // update payer information
  curr_balance = await get_balance(payer_ID, payee_ID);
  update_balance(payer_ID, payee_ID, curr_balance + payment_amount);
  // update payee information
  curr_balance = await get_balance(payee_ID, payer_ID);
  update_balance(payee_ID, payer_ID, curr_balance - payment_amount);
}

// function to push new payment to firebase
export async function addNewPayment(info) {
  var suiteID = await get_suiteID();
  await db.ref("/suites/" + suiteID + "/payments/").push({
    amount: info.amount,
    completed: info.completed,
    details: info.details,
    payees: info.payees,
    payer: info.payer,
    title: info.title,
  });
  // loop through payees
  const num_payees = info.payees.keys().length;
  const payee_amount = floor(info.amount / (num_payees + 1));
  //  info.payees.forEach(payee => {
  //    add_transaction_balance (info.payer, payee, payee_amount)
  //  });
}

// function to update data in firebase
export async function updatePayment(info, firebaseID) {
  var suiteID = await get_suiteID();
  await db.ref(`/suites/${suiteID}/payments/${firebaseID}`).set({
    amount: info.amount,
    completed: info.completed,
    details: info.details,
    payees: info.payees,
    payer: info.payer,
    title: info.title,
  });
}

// deletes payment from firebase
export async function deletePayment(toDeleteID) {
  var suiteID = await get_suiteID();
  let toDelete = await db.ref(`/suites/${suiteID}/payments/${toDeleteID}`);
  await toDelete.remove();
}
