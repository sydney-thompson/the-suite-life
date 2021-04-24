import { Alert } from "react-native";
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
  return curr_balance;
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

export async function addPaymentToBalance(suitemate1, suitemate2, amount) {
  await db
    .ref(`users/${suitemate1}/balances/`)
    .once("value")
    .then(async (snapshot) => {
      if (snapshot.exists()) {
        const balances = snapshot.val();
        const newBalance =
          parseFloat(balances[suitemate2]) + parseFloat(amount);
        await update_balance(suitemate1, suitemate2, newBalance);
      }
    });
}

export async function add_transaction_balance(
  payer_ID,
  payee_ID,
  payment_amount
) {
  var curr_balance = 0;
  // update payer information
  curr_balance = await get_balance(payer_ID, payee_ID);
  update_balance(
    payer_ID,
    payee_ID,
    Number(curr_balance) + Number(payment_amount)
  );
  // update payee information
  curr_balance = await get_balance(payee_ID, payer_ID);
  update_balance(payee_ID, payer_ID, curr_balance - payment_amount);
}

// function to push new payment to firebase
export async function addNewPayment(info) {
  var suiteID = await get_suiteID();

  // get number of payees
  const num_payees = info.payees.length;
  //const num_payees = info.payees.keys().length;
  // get amount each person pays
  var payee_amount = Number(info.amount) / (num_payees + 1);
  payee_amount = payee_amount.toFixed(2);

  // loop through payees sending a transaction for each
  await info.payees.forEach((payee) => {
    db.ref("/suites/" + suiteID + "/payments/").push({
      amount: payee_amount,
      completed: info.completed,
      details: info.details,
      payees: payee,
      payer: info.payer,
      title: info.title,
    });
  });

  // loop through payees updating transaction
  await info.payees.forEach((payee) => {
    add_transaction_balance(info.payer, payee, payee_amount);
  });
}

export async function get_name(user_id) {
  var name = "";
  // get name based on user id
  await db
    .ref(`users/${user_id}/name`)
    .once("value")
    .then(function (snapshot) {
      name = snapshot.val();
    });
  //console.log(name)
  return name;
}

export async function check_payer(info) {
  var suiteID = await get_suiteID();
  var data = [];
  // get list of users in a suite
  await db
    .ref(`suites/${suiteID}/users`)
    .once("value")
    .then(function (snapshot) {
      data = snapshot.val();
    });
  // for each user id in suite/suiteID/users
  for (var suitemate in data) {
    var suitemate_uid = data[suitemate]["uid"];
    // get name to compare
    var this_name = await get_name(suitemate_uid);
    // check if names are the same
    if (this_name.toLowerCase() == info.payer.toLowerCase()) {
      // return user id if names the same
      return suitemate_uid;
    }
  }
  // return "" if no matching name found
  return "";
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
export async function deletePayment(suiteID, payment) {
  const choreRef = await db.ref(`/suites/${suiteID}/payments/${payment.id}/`);
  await choreRef.remove();

  if (!payment.completed) {
    await addPaymentToBalance(
      payment.payer,
      payment.payees,
      -1 * parseFloat(payment.amount)
    );
    await addPaymentToBalance(
      payment.payees,
      payment.payer,
      parseFloat(payment.amount)
    );
  }
  return `done - ${payment.id}`;
}

// gets balances from firebase and formats them for use on payment screen
export async function getBalances() {
  var uid = auth.currentUser.uid;
  var balances = [];

  // get balances
  await db.ref(`users/${uid}/balances`).once("value", (snapshot) => {
    balances = snapshot.val();
  });

  // get list of suitemate ids
  if (balances) {
  var suitemate_ids = Object.keys(balances);
  var formatted_balances = [];
  // loop over suitemate ids
  for (var suitemate_id in suitemate_ids) {
    // get name of suitemate
    var name = await get_name(suitemate_ids[suitemate_id]);
    // get id of suitemate
    var id = suitemate_ids[suitemate_id];
    // get value suitemate owes
    var value = balances[suitemate_ids[suitemate_id]];
    // push all info to array that will be returned
    formatted_balances.push({
      name: name,
      id: id,
      value: value,
    });
  }
  }

  // return formatted information
  return formatted_balances;
}

export async function completePayment(suiteID, payment) {
  const choreRef = await db.ref(`/suites/${suiteID}/payments/${payment.id}/`);
  await choreRef.update({
    completed: true,
  });

  await addPaymentToBalance(
    payment.payer,
    payment.payees,
    -1 * parseFloat(payment.amount)
  );
  await addPaymentToBalance(
    payment.payees,
    payment.payer,
    parseFloat(payment.amount)
  );
  return `done - ${payment.id}`;
}

export async function balancePayments(suiteID, payments) {
  try {
    for (let index = 0; index < payments.length; index++) {
      if (!payments[index].completed) {
        const completedPromise = await completePayment(
          suiteID,
          payments[index]
        );
      }
    }
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function handleBalance(name, info, suiteID, transactions) {
  Alert.alert(
    info,
    `This will clear your balance with ${name}. Please ensure that outstanding balances with ${name} are resolved in full before continuing.`,
    [
      {
        text: "Continue",
        onPress: () => {
          balancePayments(suiteID, transactions).then((res) => {});
        },
      },
      {
        text: "Cancel",
      },
    ],
    { cancelable: false }
  );
}
