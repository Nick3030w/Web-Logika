const path=require("path"),fs=require("fs");
const env=fs.readFileSync(".env.local","utf8");
env.split(/\r?\n/).forEach(l=>{const i=l.indexOf("=");if(i>0&&!l.trim().startsWith("#")){let k=l.slice(0,i).trim(),v=l.slice(i+1).trim();if((v.startsWith('"')&&v.endsWith('"'))||(v.startsWith("'")&&v.endsWith("'")))v=v.slice(1,-1);if(!(k in process.env))process.env[k]=v;}});
const {initializeApp,cert}=require("firebase-admin/app");const {getFirestore}=require("firebase-admin/firestore");
initializeApp({credential:cert({projectId:process.env.FIREBASE_PROJECT_ID,clientEmail:process.env.FIREBASE_CLIENT_EMAIL,privateKey:process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g,"\n")})});
getFirestore().collection("products").doc("sofacama-convertible-duo").get().then(d=>{const x=d.data();console.log("images:",JSON.stringify(x.images,null,1));console.log("featured:",x.featured,"category:",x.category);process.exit(0)});
