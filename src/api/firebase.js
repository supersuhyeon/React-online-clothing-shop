import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut , onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASEURL,
  projectId: process.env.REACT_APP_PROJECT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getDatabase(app)

export function login(){
   signInWithPopup(auth, provider).then((result)=>{return console.log(result)})
}

export function logout(){
     signOut(auth)
  }


export function onUserStateChange(callback){
    onAuthStateChanged(auth, (user) => {
        //1. 사용자가 로그인한경우
        user ? adminUser(user).then((user)=>{return callback(user)}) : callback(null)
      });
}

async function adminUser(user){
        //2. 사용자가 어드민 권한을 가지고 있는지 확인
        //3. 사용자에게 알려주기 {...user, isAdmin : true/false}
    return get(ref(database, 'admins')).then((snapshot)=>{
        if(snapshot.exists()){
            const admins = snapshot.val()
            const isAdmin = admins.includes(user.uid) //불리언
            return {...user, isAdmin}
        }
        return user;
    }).catch((error)=>{console.log(error)})
}