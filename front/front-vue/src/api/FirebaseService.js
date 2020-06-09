import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDfIVts9BnH_4FnLWomc-I9no9YAzt63yU",
  authDomain: "lastproj-c9acb.firebaseapp.com",
  databaseURL: "https://lastproj-c9acb.firebaseio.com",
  projectId: "lastproj-c9acb",
  storageBucket: "lastproj-c9acb.appspot.com"
};
firebase.initializeApp(firebaseConfig);

export default {
  //firebase email을 활용한 회원가입
  async signUpWithDefault(email, password) {
    return await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function() {
        return true;
      })
      .catch(function(error) {
        console.error("[Normal SignUp Error]", error);
        return false;
      });
  },
  //firebase email을 활용한 로그인
  async loginWithDefault(email, password) {
    return await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(function() {
        return true;
      })
      .catch(function(error) {
        console.error("[Normal Login Error]", error);
        return false;
      });
  },
  //구글 아이디를 활용한 로그인
  loginWithGoogle() {
    let provider = new firebase.auth.GoogleAuthProvider();
    return firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        return result;
      })
      .catch(function(error) {
        console.error("[Google Login Error]", error);
      });
  },
  // //깃허브 아이디를 활용한 로그인
  // loginWithGitHub() {
  //   var provider = new firebase.auth.GithubAuthProvider();
  //   return firebase
  //     .auth()
  //     .signInWithPopup(provider)
  //     .then(function(result) {
  //       return result;
  //     })
  //     .catch(function(error) {
  //       console.error("[GitHub Login Error]", error);
  //     });
  // },
  // 비밀번호 초기화
  resetPw(email) {
    if (email.includes("@google.com")) {
      alert("구글에서 비밀번호를 찾아주세요.");
      return;
    } else if (email.includes("@github.com")) {
      alert("깃허브에서 비밀번호를 찾아주세요.");
      return;
    }
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(function() {
        alert("가입한 이메일로 비밀번호 재설정 메일을 발송 하였습니다.");
      })
      .catch(function(error) {
        alert("등록되지 않은 회원입니다." + error);
      });
  },
  getMaifaUserCurrent(roomNo) {
    return firebase
      .firestore()
      .collection("Mafia")
      .doc(roomNo)
      .collection("user_list");
  },
  getMaifaRoomCurrent() {
    return firebase.firestore().collection("Mafia");
  },
  getMaifaRoomInfo(roomNo) {
    return firebase
      .firestore()
      .collection("Mafia")
      .doc(String(roomNo));
  },
  getMaifaRoomIncount(roomNo) {
    this.getMaifaUserCurrent(roomNo)
      .get()
      .then(snapshot => {
        let total_count = 0;
        snapshot.forEach(() => {
          // console.log(doc.data());
          total_count += 1;
        });
        // console.log("A" + total_count);
        return total_count;
      });
  }
};
