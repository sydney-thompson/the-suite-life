import { auth, db } from "./firebase";

// currently does not work 
export function renderChoress(){
    console.log("renderChoress 1")
    const choreJSON1 = []
    const render_promise = new Promise((resolve, reject) => {
        // grab chore data from firebase 
        db.ref().child('suites').child('test123').child('chores').on('value', (snapshot)=>{
            console.log("renderChoress 2")
            let data = snapshot.val();
            let keys = Object.keys(data);
            // loop through firebase data and add data to choreJSON for use in rendering elements
            keys.forEach((key) => { 
                choreJSON1.push({name: data[key].name, firebaseID: key, frequency: data[key].frequency})
            });
        });
        console.log("renderChoress 3")
        //console.log(choreJSON1)
    })
    console.log("renderChoress 4")
    render_promise.then(
        console.log("renderChoress 5")
    )
    return choreJSON1
    }