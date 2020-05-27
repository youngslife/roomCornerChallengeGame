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
  loginWithGitHub() {
    var provider = new firebase.auth.GithubAuthProvider();
    return firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        return result;
      })
      .catch(function(error) {
        console.error("[GitHub Login Error]", error);
      });
  },
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
  }
};
