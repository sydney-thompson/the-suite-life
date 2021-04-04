import { auth, db } from "./firebase";

export async function get_suiteID (){
  var uid = auth.currentUser.uid;
  var data = null 

  await db.ref(`users/${uid}/suiteID/`).once('value').then(function(snapshot) {
    data = snapshot.val(); 
  });
  return data 
}

// gets one chore's data from firebase 
export async function loadChoreData (firebaseID){
    var suiteID = await get_suiteID()
    var returnData = []
    await db.ref(`/suites/${suiteID}/chores/${firebaseID}`).once('value', snapshot => {
        let data = snapshot.val()
        returnData = {'name': data.name, 'frequency': data.frequency, 'assignees': data.assignees, 'details': data.details, 'completed': data.completed}
    });
    return returnData
  }

// function to push new chore to firebase
export async function addNewChore (info){
    var suiteID = await get_suiteID()
    await db.ref('/suites/' + suiteID + '/chores/').push({
          name: info.name, 
          frequency: info.frequency,
          assignees: info.assignees,
          details: info.details,
          completed: info.completed
        });
      }

  // function to push new chore to firebase
export async function addNewChore1 (info){
  var suiteID = await get_suiteID()
  await db.ref(`/suites/${suiteID}/chores`).once('value', snapshot => {
    let data = snapshot.val()
    if(data == "None"){
      db.ref('/suites/'+suiteID+'/chores/').set({
        name: info.name, 
        frequency: info.frequency,
        assignees: info.assignees,
        details: info.details,
        completed: info.completed
      });
      choreFunctions.updateChore (info)
    }
    else{
      db.ref('/suites/${suiteID}/chores/').push({
        name: info.name, 
        frequency: info.frequency,
        assignees: info.assignees,
        details: info.details,
        completed: info.completed
      });
    }
  });
}

// function to update data in firebase
export async function updateChore (info, firebaseID){
    var suiteID = await get_suiteID()
    await db.ref(`/suites/${suiteID}/chores/${firebaseID}`).set({
      name: info.name, 
      frequency: info.frequency,
      assignees: info.assignees,
      details: info.details,
      completed: info.completed
    });
  }

// deletes chore from firebase 
export async function deleteChore (toDeleteID){
    var suiteID = await get_suiteID()
    let toDelete = await db.ref(`/suites/${suiteID}/chores/${toDeleteID}`)
    toDelete.remove()
  }

// currently does not work 
export async function renderChoress(){
    var suiteID = await get_suiteID()
    const choreJSON1 = []
    const render_promise = new Promise((resolve, reject) => {
        // grab chore data from firebase 
        db.ref().child('suites').child({suiteID}).child('chores').on('value', (snapshot)=>{
            let data = snapshot.val();
            let keys = Object.keys(data);
            // loop through firebase data and add data to choreJSON for use in rendering elements
            keys.forEach((key) => { 
                choreJSON1.push({name: data[key].name, firebaseID: key, frequency: data[key].frequency})
            });
        });
        //console.log(choreJSON1)
    })
    render_promise.then(
        //console.log("renderChoress 5")
    )
    return choreJSON1
    }
