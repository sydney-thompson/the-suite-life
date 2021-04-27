import { Alert } from "react-native";
import { auth, db } from "./firebase";

export async function get_suiteID() {
  /**
   * Get suite id of the currently logged-in user
   */
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
  /**
   * Load details for payment {firebaseID} from current user's suite
   * @param {string}  firebaseID  ID of payment to load
   */
  var suiteID = await getSuite();
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

export async function get_balance(ID_of_main_person, ID_of_sub_person) {
  /**
   * Get balance between main person and sub person
   * @param {string}  ID_of_main_person  ID of person to display (usually logged-in user)
   * @param {string}  ID_of_sub_person  ID of person to query (usually not logged-in user)
   */
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

export async function update_balance(
  /**
   * Update balance between main person and sub person
   * @param {string}  ID_of_main_person  ID of person to display (usually logged-in user)
   * @param {string}  ID_of_sub_person  ID of person to query (usually not logged-in user)
   * @param {number}  new_amount        New balance amount to update in firebase
   */
  ID_of_main_person,
  ID_of_sub_person,
  new_amount
) {
  await db
    .ref(`users/${ID_of_main_person}/balances/${ID_of_sub_person}`)
    .set(new_amount);
}

export async function addPaymentToBalance(suitemate1, suitemate2, amount) {
  /**
   * Incorporate payment to balance. Adds {amount} to balance owed TO suitemate1 BY suitemate2
   * @param {string}  suitemate1  ID of person to display (usually logged-in user)
   * @param {string}  suitemate2  ID of person to query (usually not logged-in user)
   * @param {number}  amount      Payment amount - owed TO suitemate1 BY suitemate2
   */
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
  /**
   * Incorporate payment to balance. Adds {payment_amount} to balance owed TO suitemate1 BY suitemate2
   * @param {string}  payer_ID  ID of payer (usually logged-in user)
   * @param {string}  payee_ID  ID of payee (usually not logged-in user)
   * @param {number}  payment_amount  Payment amount - owed TO payer BY payee
   */
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
  /**
   * Add new payment to firebase
   * @param {Object}  info    payment information - structured as follows:
   *      {
   *          amount: int,
   *          completed: boolean,
   *          details: string,
   *          payees: {
   *            suitemateID (string): boolean, (need entry for each suitemateID)
   *          },
   *          payer: string,
   *          title: string,
   *      }
   */
  var suiteID = await get_suiteID();

  // get number of payees
  const num_payees = info.payees.length;
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
  /**
   * Get user display name
   * @param {string}  user_id   ID of user to query
   */
  var name = "";
  // get name based on user id
  await db
    .ref(`users/${user_id}/name`)
    .once("value")
    .then(function (snapshot) {
      name = snapshot.val();
    });
  return name;
}

// function to update data in firebase
export async function updatePayment(info, firebaseID) {
  /**
   * Update payment {firebaseID} with information in info
   * @param {Object}  info    payment information - structured as follows:
   *      {
   *          amount: int,
   *          completed: boolean,
   *          details: string,
   *          payees: {
   *            suitemateID (string): boolean, (need entry for each suitemateID)
   *          },
   *          payer: string,
   *          title: string,
   *      }
   */
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

export async function deletePayment(suiteID, payment) {
  /**
   * Delete payment from firebase. Adjusts balances with users before deletion.
   * @param {string} suiteID   ID of suite to search for payment
   * @param {Object} payment   payment object structured as follows:
   *                           {
   *                               amount: int,
   *                               completed: boolean,
   *                               details: string,
   *                               id: string, (firebase ID of payment)
   *                               payees: string, (firebase ID of payee)
   *                               payer: string, (firebase ID of payer)
   *                               title: string,
   *                            }
   */
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

export async function getBalances() {
  /**
   * Get list of balances between current user and suitemates from firebase
   */
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
  /**
   * Mark {payment} object as complete in suite {suiteID}
   * @param {Object}  payment    payment information - structured as follows:
   *      {
   *          amount: int,
   *          completed: boolean,
   *          details: string,
   *          payees: string,
   *          payer: string,
   *          title: string,
   *      }
   */
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
  /**
   * Mark all payments in {payments} as complete (which also adjusts balance)
   * @param {string} suiteID   ID of suite to search for payments
   * @param {list} payments    list of payments to mark as complete.
   *                           Each payment should be structured as follows:
   *       {
   *          amount: int,
   *          completed: boolean,
   *          details: string,
   *          payees: string,
   *          payer: string,
   *          title: string,
   *      }
   */
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
  /**
   * Ask user for confirmation to perform balance, then balance
   * @param {string} name   Name of user to balance with
   * @param {string} info   Information to display in alert
   * @param {string} suiteID   ID of suite to which users belong
   * @param {list} transactions    list of payments to mark as complete.
   *                           Each payment should be structured as follows:
   *       {
   *          amount: int,
   *          completed: boolean,
   *          details: string,
   *          payees: string,
   *          payer: string,
   *          title: string,
   *      }
   */
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
