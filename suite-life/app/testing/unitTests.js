import * as choreFunctions from "../components/firebase/chores";
import * as paymentFunctions from "../components/firebase/payments";
import * as suiteFunctions from "../components/firebase/suites";
import * as userFunctions from "../components/firebase/users";


// CHORES 

const TestChores = () => {

    let TESTER_CHORE = {"name": "N_UT", "frequency": "FR_UT", "assignees": "ASS_UT", "details": "DET_UT", "completed": "CMP_UT"};

    // addNewChores
    let TEST_ID = null;
    choreFunctions.addNewChores(TESTER_CHORE);
    db.ref().child('suites').child('test123').child('chores').on('value', (snapshot)=>{
        let data = snapshot.val();
        let keys = Object.keys(data);
        keys.forEach((key) => { 
            if (data[key].name == "N_UT" && data[key].frequency == "FR_UT" && data[key].assignees == "ASS_UT" && data[key].details == "DET_UT" && data[key].completed == "CMP_UT") {
                console.log("CHORES/addNewChores: PASSED");
                TEST_ID = data[key].firebaseID;
            } else {
                console.log("CHORES/addNewChores: FAILED");
            }
        });
    });

    // loadChoreData
    let test_loadChoreData = choreFunctions.loadChoreData(TEST_ID);
    if (test_loadChoreData.name == "N_UT" && test_loadChoreData.frequency == "FR_UT" && test_loadChoreData.assignees == "ASS_UT" && test_loadChoreData.details == "DET_UT" && test_loadChoreData.completed == "CMP_UT") {
        console.log("CHORES/loadChoreData: PASSED");
    } else {
        console.log("CHORES/loadChoreData: FAILED");
    }

    // updateChore
    let U_TESTER_CHORE = {"name": "U_N_UT", "frequency": "U_FR_UT", "assignees": "U_ASS_UT", "details": "U_DET_UT", "completed": "U_CMP_UT"};
    choreFunctions.addNewChores(TESTER_CHORE);
    choreFunctions.updateChore(U_TESTER_CHORE, TEST_ID);
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
    choreFunctions.deleteChore(TEST_ID);
    db.ref(`/suites/test123/chores/${TEST_ID}`).once('value', snapshot => {
        let data = snapshot.val()
        if(data == "None") {
            console.log("CHORES/deleteChore: PASSED");
        } else { 
            console.log("CHORES/deleteChore: FAILED");
        }
    });
}

const PaymentChores = () => {

    let TESTER_PAYMENT = {"amount": "AM_UT", "completed": "CMP_UT", "details": "DET_UT", "payees": "PYS_UT", "payer": "PYR_UT"};

    // addNewPayment
    let TEST_ID = null;
    paymentFunctions.addNewPayment(TESTER_PAYMENT);
    db.ref().child('suites').child('test123').child('payments').on('value', (snapshot)=>{
        let data = snapshot.val();
        let keys = Object.keys(data);
        keys.forEach((key) => { 
            if (data[key].amount == "AM_UT" && data[key].completed == "CMP_UT" && data[key].details == "DET_UT" && data[key].payees == "PYS_UT" && data[key].payer == "PYR_UT") {
                console.log("PAYMENTS/addNewPayment: PASSED");
                TEST_ID = data[key].firebaseID;
            } else {
                console.log("PAYMENTS/addNewPayment: FAILED");
            }
        });
    });

    // loadChoreData
    let test_loadPaymentData = paymentFunctions.loadPaymentData(TEST_ID);
    if (test_loadPaymentData.amount == "AM_UT" && test_loadPaymentData.completed == "CMP_UT" && test_loadPaymentData.details == "DET_UT" && test_loadPaymentData.payees == "PYS_UT" && test_loadPaymentData.payer == "PYR_UT") {
        console.log("PAYMENTS/loadPaymentData: PASSED");
    } else {
        console.log("PAYMENTS/loadPaymentData: FAILED");
    }

    // updateChore
    let U_TESTER_CHORE = {"name": "U_N_UT", "frequency": "U_FR_UT", "assignees": "U_ASS_UT", "details": "U_DET_UT", "completed": "U_CMP_UT"};
    choreFunctions.addNewChores(TESTER_CHORE);
    choreFunctions.updateChore(U_TESTER_CHORE, TEST_ID);
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
    choreFunctions.deleteChore(TEST_ID);
    db.ref(`/suites/test123/chores/${TEST_ID}`).once('value', snapshot => {
        let data = snapshot.val()
        if(data == "None") {
            console.log("CHORES/deleteChore: PASSED");
        } else { 
            console.log("CHORES/deleteChore: FAILED");
        }
    });
}

PaymentChores();
TestChores();