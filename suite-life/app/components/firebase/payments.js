import { db } from "./firebase";
import { checkSuiteExists } from "./suites";

// Adds payment to suite and associates transaction with specified parties
export async function addNewPayment(suiteID, title, amount, payer, payees, details) {
    Promise(checkSuiteExists(suiteID))
    .then((res) => {
        let transactionID = 0; // auto-generate an ID?
        let transaction = {
            title: title,
            amount: amount,
            payer: payer,
            payees: payees,
            details: details,
            completed: false,
        }
        db.ref(`suites/${suiteID}/transactions/${transactionID}`).set(transaction);
    })
    .catch((err) => console.log(err));
}

// Mark payment as completed
export function completePayment(suiteID, transactionID){
    let transaction = db.ref(`suites/${suiteID}/transaction/${transactionID}`);
    return transaction.update({
        complete: true,
    });
}
