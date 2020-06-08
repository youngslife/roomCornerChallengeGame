const functions = require("firebase-functions");
const express = require("express");
const admin = require("firebase-admin");
const cors = require('cors');
const app = express();
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
const parentPhases = ['START','END'];
const day_phases = ["DAY_START", "DAY_VOTE1", "DAY_VOTE2", "DAY_VOTE3", "DAY_END"]
const night_phases = ["NIGHT_START","NIGHT_END"];
const night_mafia_phases = ["NIGHT_START","NIGHT_VOTE1","NIGHT_VOTE2","NIGHT_END"];
const night_police_phases = ["NIGHT_START","NIGHT_POLICE","NIGHT_END"];
const night_doctor_phases = ["NIGHT_START","NIGHT_DOCTOR","NIGHT_END"];
                //0 1 2 3 4
                //5 6 7 8 9 10

exports.app = functions.https.onRequest(app);
app.use(cors({ origin: true }));
// const DOMAIN = "Mafia";
// Get the `FieldValue` object
let FieldValue = require('firebase-admin').firestore.FieldValue;


//방 만들기
app.post("/createRoom", async (request, response) => {
    //룸 아이디는 새로 생성인가, 룸 인원
    const create_time = request.body.room_no;
    const room_person = request.body.room_person;
    const user_no = request.body.user_no;
    const room_name = request.body.room_name;
    let roominfo = {
        "room_no" : create_time,
        "room_person" : room_person,
        "room_manager" : user_no,
        "room_name": room_name
    };
    let userinfo = {
        "user_no" : user_no,
        "user_nickname" : "",//request.body.user_nickname,
        "user_job": "",
        "user_phase": day_phases[0],
        "user_alive": "alive"
    }
    
    let gamesSnapshot = db.collection("Mafia").doc((String)(create_time));//(String)(user_no));//(create_time));
    gamesSnapshot.set(roominfo);
    const path = 'Mafia/'+((String)(create_time))+'/user_list';

    let room_create = admin.firestore().collection(path).doc(String(user_no)).set(userinfo).then(res => {
        res['room_no'] = roominfo['room_no'];
        res['room_person'] = roominfo['room_person'];
        res['room_manager'] = roominfo['room_manager'];
        res['room_name'] = roominfo['room_name'];
        res['user_list'] = {userinfo};
        return response.json(res);
    }).catch(err => {
        console.log('Error getting documents', err);
        return response.json(err);
    });
})

//방 번호로 방찾기 - 문제있는 상태
app.get("/findRoom/:room_no", async (request, response) => {
    let result = {}
    try {
        const id = request.params.room_no;
        const info = (await db.collection("Mafia").doc(id).get()).data();
    
        result = {
            room_no: info.room_no,
            room_person: info.room_person,
            room_manager: info.room_manager,
            room_name : info.room_name,
            user_list: {}
        }
        
        let res=[]
        res= await(db.collection("Mafia").doc(id).collection('user_list')
                    .get()
                    .then(querySnapshot=> {
                        querySnapshot.forEach(doc=> {
                            res.push(doc.data());
                        });
                        result['user_list'] = res;
                        // return result;
                        return response.json(result);
                    })
                    .catch(error=> {
                        console.log("Error getting documents: ", error);
                        return error;//response.json(error);
                    }));
        return response;
    } catch (error) {
        console.log("search error");
        return response.status(500).send("search error"+error);
    }
});

// 방 참가하기
app.post("/joinRoom", async (request, response) => {
    //룸 아이디는 새로 생성인가, 룸 인원
    const room_no = request.body.room_no; //방은 만들어져서 이거는 앞에서 표기해야함
    const user_no =  request.body.user_no;
    let roominfo = {
        "room_no" : room_no
        // "id": request.body.user_no//id //현재시간
    };
    let userinfo = {
        "user_no" : user_no,
        "user_nickname" : "",//request.body.user_nickname,
        "user_job": "",//request.body.user_job,
        "user_phase": day_phases[0],
        "user_alive": "alive"
    }
    const path = 'Mafia/'+String(room_no)+'/user_list';
    //아 여기 인원수 체크 해줘야돼... front에서 하기로 했고.
    let room_create = admin.firestore().collection(path).doc(String(user_no)).set(userinfo).then(res => {
        res['room_no'] = roominfo['room_no'];
        res['user_list'] = {userinfo};
        return response.json(res);
    }).catch(err => {
        console.log('Error getting documents', err);
        return response.json(err);
    });
})

//닉네임 설정하기
app.post("/setNickname", async (request, response) => {
    const room_no = request.body.room_no;
    const user_no =  request.body.user_no;
    const user_nickname = request.body.user_nickname;
    const path = 'Mafia/'+String(room_no)+'/user_list';
    let updatedName = await admin.firestore().collection(path).doc(String(user_no));
    // console.log(updatedName);
    updatedName.update({user_nickname:user_nickname});
    return response.json({"updated":updatedName, "newNickName":user_nickname});

})
//배열 섞는 함수
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}
//해당 방 역할 배정하기
app.get("/assignRole/:room_no", async (request, response) => {

    try {
        const id = request.params.room_no;
        const info = (await db.collection("Mafia").doc(id).get()).data();
        const person_num = parseInt(info.room_person)
        let role = []
        //1 : mafia, 2 : police, 3 : doctor, 4 : citizen
        if(person_num === 8){
            role = ["mafia","mafia","police","doctor","citizen","citizen","citizen","citizen"];
        }else if (person_num === 7){
            role = ["mafia","mafia","police","doctor","citizen","citizen","citizen"];
        }else if(person_num === 6){
            role = ["mafia","mafia","police","doctor","citizen","citizen"];
        }else{
            role = ["mafia","police","doctor","citizen","citizen"]; // 임시
            console.log("temp ready");
        }
        // console.log(role);
        shuffle(role);
        // console.log('shuffled',role);

        const ref = await (db.collection("Mafia").doc(id).collection('user_list'));
        let index = 0;
        let result = [];
        await ref.get()
        .then(querySnapshot=> {
            querySnapshot.forEach((doc)=> {
                
                index = (index + 1) % person_num;
                let updated = db.collection("Mafia").doc(id).collection('user_list').doc(doc.id)
                updated.update({
                    user_job : role[index]
                })
                result.push(updated);
            });
            return result;
        })
        .catch(error=> {
            console.log("Error getting documents: ", error);
            return response.json(error);
        });
        return response.json({"info":info,"updated":result}); 
    } catch (error) {
        console.log("search error");
        return response.status(500).send("search error"+error);
    }
})

//------------------------------------------------------------------ 완

app.get("/checkPhases/:room_no", async (request, response) => {
    let result = {}
    try {
        const room_no = request.params.room_no;
        const room = await admin.firestore().collection("Mafia").doc(String(room_no)).get();//(db.collection("Mafia").doc(room_no));
        const manager_id = room.data().room_manager;
        // 매니저의 상태를 보고 다른 애들과 동일한지 본다. - 매니저는 방 아이디랑 동일한 아이디 가짐
        // const info = (await db.collection("Mafia").doc(id).get()).data();
        // const person_num = parseInt(info.room_person)
 
        const ref = await (db.collection("Mafia").doc(room_no).collection('user_list'));
        const manager_data = (await ref.doc(manager_id).get()).data();

        result = {
            isEqual: true,
            manager_phases : manager_data.user_phase,
            msg:[] //방장은 0번째것
        }
        let msgs = []
        let user_phases = []
        
        await ref.get()
            .then(querySnapshot=> {
                querySnapshot.forEach((doc)=> {
                    user_phases.push(doc.data().user_phase);
                });
                return '유저 상태 가져오기';
            })
            .catch(error=> {
                console.log("Error getting documents: ", error);
                return error;
            });
        
        for(let i = 0; i < user_phases.length; ++i){
            const message = user_phases[i];
            if(manager_data.user_phase!==user_phases[i]){
                result.isEqual = false;
            }
            msgs.push(message);
        }
        result.msg = msgs;
        return response.json(result); 
    } catch (error) {
        console.log("server error");
        return response.status(500).send("server error"+error);
    }
})
//일단은 낮이랑 밤이랑 찢고.
app.get("/updateDayPhase/:room_no", async (request, response) => {
    //낮 페이즈는 
    //유저 정보를 가져와서 하나씩 바꾸는 것
    try {
        const id = request.params.room_no;
        const ref = await (db.collection("Mafia").doc(id).collection('user_list'));
        
        let result = [];
        let next = "";
        let is_last = false;
        await ref
        .get()
        .then(querySnapshot=>{
            querySnapshot.forEach((doc)=>{
                let updated = ref.doc(doc.id);
                let updatedData = doc.data();
                let index = 0;
                for(let i = 0 ; i < day_phases.length-1; ++i){
                    if(updatedData['user_phase'] === day_phases[i]){
                        index = i;
                        break;
                    }
                }
                let next_phase = day_phases[index+1];
                if(updatedData['user_phase'] === 'DAY_END'){ //끝난상태면
                    next_phase = night_phases[0];
                    is_last = true;
                }
                result.push(updatedData);
                next = next_phase;
                updated.update({
                    user_phase : next_phase
                })
            });
            //어떤 상태로 바뀌었는지. 제대로 바뀌었는지.
            return response.json({"id":id,"next_phase":next,"is_last":is_last,"result":result}); 
        }).catch(error=>{
            console.log("Error getting documents: ", error);
            return response.json(error);
        })
    } catch(error){
        console.log("search error");
        return response.status(500).send("search error"+error);
    }
});
//------------------------------------------------------------------- 완
// //일단 1. updateDeadMan() 
app.get("/updateDeadMan/:room_no/:user_no", async (request, response) => {
    //음 다른애들 다큐먼트 번호를 넣을때 갖고 있으니까?
    try {
        const room_id = request.params.room_no;
        const user_id = request.params.user_no;
        const ref = await (db.collection("Mafia").doc(room_id).collection('user_list'));
        //해당 번호랑 똑같은애 찾아서 
        let updated = ref.doc(user_id);
        let deadman = (await updated.get()).data();
        if(deadman.user_no === user_id){
            updated.update({
                user_alive : 'dead'
            })
            deadman.user_alive ='dead';
        }
        return response.json({"id":room_id,"deadman":deadman}); 
    } catch(error){
        console.log("search error");
        return response.status(500).send("search error"+error);
    }
});
//----------------------------------------------------------------------------------- 3:44 완
//2. isGameEnd()
//마피아가 다 죽으면, 시민이랑 마피아의 수가 같아지면 
//나이트일때는 직업확인해서
app.get("/isGameEnd/:room_no", async (request, response) => {
    let result = {}
    try {
        const id = request.params.room_no;
        const ref = await (db.collection("Mafia").doc(id).collection('user_list'));
        let user_info = [];
        let mafiaCnt = 0, citizenCnt = 0;
        let mafia_info = [], citizen_info = [];
        let message = "";

        result = {
            isEnd: false,
            winner:[],
            msg:"" //방장은 0번째것
        }

        await ref.get()
        .then(querySnapshot=> {
            querySnapshot.forEach((doc)=> {
                user_info.push(doc.data());
            });
            return '유저 상태 가져오기';
        })
        .catch(error=> {
            console.log("Error getting documents: ", error);
            return error;
        });
  
        for(let i = 0; i < user_info.length; ++i){
            //마피아 수, 시민수 세기
            if(user_info[i].user_alive==='alive'){
                if(user_info[i].user_job==='mafia'){
                    mafiaCnt++;
                    mafia_info.push(user_info[i]);
                }else{
                    citizenCnt++;
                    citizen_info.push(user_info[i]);
                }
            }
        }
        
        if(mafiaCnt>=citizenCnt){
            result.isEnd = true;
            result.winner = mafia_info;
            message = "마피아가 승리했습니다.";
        }else if(mafiaCnt===0){
            result.isEnd = true;
            result.winner = citizen_info;
            message = "모든 마피아를 제거하여 시민이 승리했습니다.";
        }else{
            result.isEnd = false;
            message = "계속해서 게임을 진행하십시오.";
        }
        result.msg = message;
        return response.json(result); 
    } catch (error) {
        console.log("server error");
        return response.status(500).send("server error"+error);
    }
})
//----------------------------------------------------------------------------------- 3:45 완

//3. 마피아가 누구를 죽일지 투표를 마친상태로,
// updateKillMan() 죽음 보류상태로 만든다. 회광반조의 뜻이라고 함 Surge 단어는 큰 파도 정도인듯.
app.get("/updateKillMan/:room_no/:user_no", async (request, response) => {
    try {
        const room_id = request.params.room_no;
        const user_id = request.params.user_no; //지목당한 녀석
        const ref = await (db.collection("Mafia").doc(room_id).collection('user_list'));
        //해당 번호랑 똑같은애 찾아서 
        let updated = ref.doc(user_id);
        let maybe_deadman = (await updated.get()).data();
        if(maybe_deadman.user_no === user_id){
            updated.update({
                user_alive : 'surge'
            })
            maybe_deadman.user_alive ='surge';
        }
        return response.json({"id":room_id,"maybe_deadman":maybe_deadman}); 
    } catch(error){
        console.log("search error");
        return response.status(500).send("search error"+error);
    }
});

//4. 경찰이 누구를 확인할지 지목을 마친상태로, 경찰에게 지목대상이 마피아인지 아닌지만 알려준다.
app.get("/checkMafia/:room_no/:user_no", async (request, response) => {
    try {
        const room_id = request.params.room_no;
        const user_id = request.params.user_no; //지목당한 녀석
        const ref = await (db.collection("Mafia").doc(room_id).collection('user_list'));
        //해당 번호랑 똑같은애 찾아서 
        let check_man = {};
        let check_res = false;
        check_man = (await ref.doc(user_id).get()).data();
        if(check_man.user_job ==='mafia'){
            check_res = true;
        }
        return response.json({"id":room_id,"check_res":check_res,"check_man":check_man}); 
    } catch(error){
        console.log("search error");
        return response.status(500).send("search error"+error);
    }
});
//5. 의사가 누구를 살릴지 지목을 마친상태로, 살리기로 한 대상과 마피아가 죽이기로한 대상이 일치한다면 무효처리와 메세지가 돌아온다.abs
//   그렇지 않다면 죽음 보류상태의 사람은 죽음 표시로 처리된다.
app.get("/savePeople/:room_no/:user_no", async (request, response) => {
    try {
        const room_id = request.params.room_no;
        const user_id = request.params.user_no; //지목당한 녀석
        const ref = await (db.collection("Mafia").doc(room_id).collection('user_list'));
        let updated = ref.doc(user_id);
        let saved_res = false;
        let saved_man = (await ref.doc(user_id).get()).data();
        if(saved_man.user_alive ==='surge'){
            updated.update({
                user_alive : 'alive'
            })
            saved_res=true;
            saved_man.user_alive='alive';
        }
        return response.json({"id":room_id,"saved_res":saved_res,"saved_man":saved_man}); 
    } catch(error){
        console.log("search error");
        return response.status(500).send("search error"+error);
    }
});
//시민 페이즈 바꾸기
//경찰페이즈 바꾸기
//
//그리고 모두 night-end상태가 되면 게임체크를 다시 호출하도록 하고, Day_start || end로 간다.
app.get("/updateMafiaPhase/:room_no", async (request, response) => {
    try {
        const id = request.params.room_no;
        const ref = await (db.collection("Mafia").doc(id).collection('user_list'));
        
        let result = [];
        let next = "";
        let is_last = false;
        await ref
        .get()
        .then(querySnapshot=>{
            querySnapshot.forEach((doc)=>{
                let updated = ref.doc(doc.id);
                let updatedData = doc.data();
                if(updatedData.user_job === 'mafia'){
                    let index = 0;
                    for(let i = 0 ; i < night_mafia_phases.length-1; ++i){
                        if(updatedData['user_phase'] === night_mafia_phases[i]){
                            index = i;
                            break;
                        }
                    }
                    let next_phase;
                    if(updatedData['user_phase'] === night_mafia_phases[-1]){ //끝난상태면
                        next_phase = day_phases[0];
                        is_last = true;
                    }else next_phase = night_mafia_phases[index+1];
                    result.push(updatedData);
                    next = next_phase;
                    updated.update({
                        user_phase : next_phase
                    })
                }
            });
            //어떤 상태로 바뀌었는지. 제대로 바뀌었는지.
            return response.json({"id":id,"next_phase":next,"is_last":is_last,"result":result}); 
        }).catch(error=>{
            console.log("Error getting documents: ", error);
            return response.json(error);
        })
    } catch(error){
        console.log("search error");
        return response.status(500).send("search error"+error);
    }
});
app.get("/updatePolicePhase/:room_no", async (request, response) => {
    try {
        const id = request.params.room_no;
        const ref = await (db.collection("Mafia").doc(id).collection('user_list'));
        
        let result = [];
        let next = "";
        let is_last = false;
        await ref
        .get()
        .then(querySnapshot=>{
            querySnapshot.forEach((doc)=>{
                let updated = ref.doc(doc.id);
                let updatedData = doc.data();
                if(updatedData.user_job === 'police'){
                    let index = 0;
                    for(let i = 0 ; i < night_police_phases.length-1; ++i){
                        if(updatedData['user_phase'] === night_police_phases[i]){
                            index = i;
                            break;
                        }
                    }
                    let next_phase;
                    if(updatedData['user_phase'] === night_police_phases[-1]){ //끝난상태면
                        next_phase = day_phases[0];
                        is_last = true;
                    }else next_phase = night_police_phases[index+1];
                    result.push(updatedData);
                    next = next_phase;
                    updated.update({
                        user_phase : next_phase
                    })
                }
            });
            //어떤 상태로 바뀌었는지. 제대로 바뀌었는지.
            return response.json({"id":id,"next_phase":next,"is_last":is_last,"result":result}); 
        }).catch(error=>{
            console.log("Error getting documents: ", error);
            return response.json(error);
        })
    } catch(error){
        console.log("search error");
        return response.status(500).send("search error"+error);
    }
});
//3. 방 파괴하기 - 취소
// app.get("/destroyRoom", async (request, response) => {
//     try {j
//         const id = request.params.room_no;
//         let delDoc = db.collection("Mafia").doc(id).delete();//.collection('userlist').doc('2').delete();

//     // .then(function() {
//     //     console.log("Document successfully deleted!");
//     // }).catch(function(error) {
//     //     console.error("Error removing document: ", error);
//     // });
//     console.log("ㅅㅇㅅㅇ" + delDoc);
//     return response.json("지웠당 캬캬");
//     }
//     catch (error) {
//         console.log("server error");
//         return response.status(500).send("server error"+error);
//     }
// });
// app.get("/updateNightPhase", async (request, response)=>{
//     try {
//         //다 도는데, 시민이면 END로 넘기고
//         //마피아는 VOTE1,VOTE2, END로
//         //경찰은 POLICE, END
//         //의사는 DOCTOR로, END로 다 따로 만들던지 배열만 나누던지
//         //하고 END에서 다른거 다 체크해야겠네
//     } catch(error){

//     }
// });

// app.get("/test", async (request, response) => {
//     let citiesRef = await db.collection("Mafia");//.get();

//     let allCities = citiesRef.get().then(snapshot => {
//         snapshot.forEach(doc => {
//             console.log(doc.id, '=>', doc.data()); 
//             console.log("키키");
//         });
//         return response.json("캬캬캬캬");
//     })
//     .catch(err => {
//         console.log('Error getting documents', err);
//         return response.json(err);
//     })
//     // console.log(allCities);
//     // return response.json(allCities);
// });

// joinRoom - 방 db에 삽입 

// gameStart - ?
//  assignRole - n명에 대해서 보내면 랜덤 인덱스 반환
//  updatePhase() - DAY1으로 바꾸기
//   - 애들 다음페이즈로 넘기기(마피아,경찰,의사는 따로인가) 
// checkPhase() - 페이즈 다른애들이랑 똑같은지 확인

// gameCheck - 게임 끝났는지 체크

// updateDeadMan - 죽었다고 업데이트 할것

// nightvote{
//  updateKillMan - 죽일사람 체크
//  checkMafia - 방번호, 유저닉네임이나 번호가지고 직업 확인하기(마피아인지 아닌지만 알려줌) 누군지는 알아야지
//  savePeople - 살릴사람 체크 // update kill man이랑 savepeople, 경찰관련 메소드 확인해서 처리
// }
// gameEnd - ?
//  페이즈 바꾸고
//  destroyRoom - 방삭제 


// const values = require("./values");
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
// app.get("/add", async (request, response) => {
//     // try {
//     // let data = {
//     //     room_person: '8'
//     // }
//     let user = {
//         user_no: 3,
//         user_nickname: "faker",
//         user_job: "mafia",
//         user_phase: "DAY_VOTE1",
//         user_alive: 'ALIVE'
//     }
//     admin.firestore().collection('Mafia/4/user_list').add(user).then(ref => {
//         console.log('Added document with ID:',ref.id)
//         return response.json("한번에 추가하기 테스트");
//     }).catch(err => {
//         console.log('Error getting documents', err);
//         return response.json(err);
//     });
//     // let setDoc = db.collection('Mafia').doc('1').set(data);
//     // setDoc = db.collection('Mafia').doc('1').collection('userlist').doc('2').set(user);
//     // }
//     //이거 데이터 json 만들어서 setDoc 바꾸기
//     return response.json("테스팅");

// });
// cni
// app.get("/delete", async (request, response) => {

//     let delDoc = db.collection("Mafia").doc("1").collection('userlist').doc('2').delete();
//     // .then(function() {
//     //     console.log("Document successfully deleted!");
//     // }).catch(function(error) {
//     //     console.error("Error removing document: ", error);
//     // });
//     console.log("ㅅㅇㅅㅇ" + delDoc);
//     return response.json("지웠당 캬캬");
// });