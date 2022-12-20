import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut , onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, get, set, remove } from "firebase/database";
import {v4 as uuid} from 'uuid'

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


//login,logout,adminrole read
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

//product write and read
export async function addNewProduct(product, image){
    const id = uuid()
  return set(ref(database, `products/${id}`),{
        ...product,
        id,
        price:parseInt(product.price),
        image:image,
        options: product.options.split(','),
    })
}

export async function getProducts(){
    return get(ref(database, 'products')).then((snapshot)=>{
        if(snapshot.exists()){
            return Object.values(snapshot.val()) //value들만 가지고올수있도록 => array로출력
        }
        return []
    })
}

//cart read, write and delete
export async function getCart(userId){
    return get(ref(database, `carts/${userId}`))
    .then((snapshot)=>{
        const items = snapshot.val() || {};
        
        return Object.values(items)
    })
}

export async function addOrUpdateToCart(userId,product){
    return set(ref(database, `carts/${userId}/${product.id}`), product)
}

export async function removeFromCart(userId,productId){
    return remove(ref(database, `carts/${userId}/${productId}`))
}