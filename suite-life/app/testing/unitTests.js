import * as choreFunctions from "../components/firebase/chores";
import * as paymentFunctions from "../components/firebase/payments";
import * as suiteFunctions from "../components/firebase/suites";
import * as userFunctions from "../components/firebase/users";


// CHORES ******************************************************************************************************************************************

const TestChores = () => {

    let TESTER_CHORE = {"name": "N_UT", "frequency": "FR_UT", "assignees": "ASS_UT", "details": "DET_UT", "completed": "CMP_UT"};

    // addNewChores 
    let C_TEST_ID = null;
    choreFunctions.addNewChores(TESTER_CHORE);
    db.ref().child('suites').child('test123').child('chores').on('value', (snapshot)=>{
        let data = snapshot.val();
        let keys = Object.keys(data);
        keys.forEach((key) => { 
            if (data[key].name == "N_UT" && data[key].frequency == "FR_UT" && data[key].assignees == "ASS_UT" && data[key].details == "DET_UT" && data[key].completed == "CMP_UT") {
                console.log("CHORES/addNewChores: PASSED");
                C_TEST_ID = data[key].firebaseID;
            } else {
                console.log("CHORES/addNewChores: FAILED");
            }
        });
    });

    // loadChoreData
    let test_loadChoreData = choreFunctions.loadChoreData(C_TEST_ID);
    if (test_loadChoreData.name == "N_UT" && test_loadChoreData.frequency == "FR_UT" && test_loadChoreData.assignees == "ASS_UT" && test_loadChoreData.details == "DET_UT" && test_loadChoreData.completed == "CMP_UT") {
        console.log("CHORES/loadChoreData: PASSED");
    } else {
        console.log("CHORES/loadChoreData: FAILED");
    }

    // updateChore
    let U_TESTER_CHORE = {"name": "U_N_UT", "frequency": "U_FR_UT", "assignees": "U_ASS_UT", "details": "U_DET_UT", "completed": "U_CMP_UT"};
    choreFunctions.updateChore(U_TESTER_CHORE, C_TEST_ID);
    db.ref().child('suites').child('test123').child('chores').on('value', (snapshot)=>{
        let data = snapshot.val();
        let keys = Object.keys(data);
        keys.forEach((key) => { 
            if (data[key].name == "U_N_UT" && data[key].frequency == "U_FR_UT" && data[key].assignees == "U_ASS_UT" && data[key].details == "U_DET_UT" && data[key].completed == "U_CMP_UT") {
                console.log("CHORES/updateChore: PASSED");
            } else {
                console.log("CHORES/updateChore: FAILED");
            }
        });
    });

    // deleteChore
    choreFunctions.deleteChore(C_TEST_ID);
    db.ref(`/suites/test123/chores/${C_TEST_ID}`).once('value', snapshot => {
        let data = snapshot.val()
        if(data == "None") {
            console.log("CHORES/deleteChore: PASSED");
        } else { 
            console.log("CHORES/deleteChore: FAILED");
        }
    });
}


// PAYMENTS ******************************************************************************************************************************************

const TestPayments = () => {

    let TESTER_PAYMENT = {"amount": "AM_UT", "completed": "CMP_UT", "details": "DET_UT", "payees": "PYS_UT", "payer": "PYR_UT"};

    // addNewPayment
    let P_TEST_ID = null;
    paymentFunctions.addNewPayment(TESTER_PAYMENT);
    db.ref().child('suites').child('test123').child('payments').on('value', (snapshot)=>{
        let data = snapshot.val();
        let keys = Object.keys(data);
        keys.forEach((key) => { 
            if (data[key].amount == "AM_UT" && data[key].completed == "CMP_UT" && data[key].details == "DET_UT" && data[key].payees == "PYS_UT" && data[key].payer == "PYR_UT") {
                console.log("PAYMENTS/addNewPayment: PASSED");
                P_TEST_ID = data[key].firebaseID;
            } else {
                console.log("PAYMENTS/addNewPayment: FAILED");
            }
        });
    });

    // loadPaymentData
    let test_loadPaymentData = paymentFunctions.loadPaymentData(P_TEST_ID);
    if (test_loadPaymentData.amount == "AM_UT" && test_loadPaymentData.completed == "CMP_UT" && test_loadPaymentData.details == "DET_UT" && test_loadPaymentData.payees == "PYS_UT" && test_loadPaymentData.payer == "PYR_UT") {
        console.log("PAYMENTS/loadPaymentData: PASSED");
    } else {
        console.log("PAYMENTS/loadPaymentData: FAILED");
    }

    // updatePayment
    let U_TESTER_PAYMENT = {"amount": "U_AM_UT", "completed": "U_CMP_UT", "details": "U_DET_UT", "payees": "U_PYS_UT", "payer": "U_PYR_UT"};
    paymentFunctions.updatePayment(U_TESTER_PAYMENT, P_TEST_ID);
    db.ref().child('suites').child('test123').child('chores').on('value', (snapshot)=>{
        let data = snapshot.val();
        let keys = Object.keys(data);
        keys.forEach((key) => { 
            if (data[key].amount == "U_AM_UT" && data[key].completed == "U_CMP_UT" && data[key].details == "U_DET_UT" && data[key].payees == "U_PYS_UT" && data[key].payer == "U_PYR_UT") {
                console.log("PAYMENT/updatePayment: PASSED");
            } else {
                console.log("PAYMENT/updatePayment: FAILED");
            }
        });
    });

    // deletePayment
    paymentFunctions.deletePayment(P_TEST_ID);
    db.ref(`/suites/test123/payments/${P_TEST_ID}`).once('value', snapshot => {
        let data = snapshot.val()
        if(data == "None") {
            console.log("PAYMENTS/deletePayment: PASSED");
        } else { 
            console.log("PAYMENTS/deletePayment: FAILED");
        }
    });
}


// SUITES ******************************************************************************************************************************************

const TestSuites = () => {

    let S_TEST_ID = 99999999;

    // createSuite(suiteID, suiteName)
    suiteFunctions.createSuite(S_TEST_ID, "S_UT");
    db.ref(`/suites/${S_TEST_ID}`).once('value', snapshot => {
        let data = snapshot.val()
        if(data.name == "S_UT") {
            console.log("SUITES/createSuite: PASSED");
        } else { 
            console.log("SUITES/createSuite: FAILED");
        }
    });
    
    // checkSuiteExists(suiteID)
    if (suiteFunctions.checkSuiteExists(S_TEST_ID) == true) {
        console.log("SUITES/checkSuiteExists: PASSED");
    } else {
        console.log("SUITES/checkSuiteExists: FAILED");
    }

    // addUserToSuite(suiteID, uid)
    let S_TEST_UID = "UID_UT";
    suiteFunctions.addUserToSuite(S_TEST_ID, S_TEST_UID);
    db.ref(`/suites/${S_TEST_ID}/users/${S_TEST_UID}`).once('value', snapshot => {
        let data = snapshot.val()
        if(data == "None") {
            console.log("SUITES/addUserToSuite: FAILED");
        } else { 
            console.log("SUITES/addUserToSuite: PASSED");
        }
    });

    // getRules()
    getRules().then((rules) => {
        if (rules == "") {
            console.log("SUITES/getRules: FAILED");
        } else {
            console.log("SUITES/getRules: PASSED");
        }
    });
    
    // deleteSuite()
    paymentFunctions.deleteSuite(S_TEST_ID);
    db.ref(`/suites/${S_TEST_ID}`).once('value', snapshot => {
        let data = snapshot.val()
        if(data == "None") {
            console.log("SUITES/deleteSuite: PASSED");
        } else { 
            console.log("SUITES/deleteSuite: FAILED");
        }
    });
}

PaymentChores();
TestChores();