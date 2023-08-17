import { initializeApp } from "firebase/app";
import { getFirestore, 
    collection, 
    doc,  
    getDocs, 
    getDoc, 
    query,
    where
} from "firebase/firestore/lite"
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyDP0928oOxQf3O_fLpERCYcZSb_XjmKxgM",
    authDomain: "codeconnet.firebaseapp.com",
    projectId: "codeconnet",
    storageBucket: "codeconnet.appspot.com",
    messagingSenderId: "1039991985935",
    appId: "1:1039991985935:web:1575b318c8ff7bc559507a"
  };

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const projectsCollectionRef = collection(db, "projects")

 
export async function getProjects() {
    const snapshot = await getDocs(projectsCollectionRef)
    
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    
    return vans
}

export async function getVan(id) {
    const docRef = doc(db, "projects", id)
    const snapshot = await getDoc(docRef)

    console.log(snapshot.data())
    if (!snapshot.exists) {
        return null
      }

      const van = {
            ...snapshot.data(),
            id: snapshot.id
      }
      return van
}

export async function getHostProjects() {
    const q = query(projectsCollectionRef, where("host", "==", 123))
    const snapshot = await getDocs(q)
    const projects = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    console.log("api" + projects)
    return projects
}

// export async function getHostProject(id) {
//     const url = id ? `/api/host/vans/${id}` : "/api/host/vans"
//     const res = await fetch(url)
//     if (!res.ok) {
//         throw {
//             message: "Failed to fetch vans",
//             statusText: res.statusText,
//             status: res.status
//         }
//     }
//     const data = await res.json()
//     return data.vans
// }

// export async function checkLogin(username, password) {
//     const q = query(loginCollectionRef, where("name", "==", username), where("pass", "==", password));
//     const snapshot = await getDocs(q);
    
//     if (snapshot.empty) {
        
//         throw new Error("Invalid email or password");
//     } else {
        
//         return true;
//     }
// }


export async function loginUser(creds) {
    try {
      // Hier kun je de Firebase Authentication gebruiken om de gebruiker in te loggen
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, creds.email, creds.password);
  
      // Als het inloggen slaagt, hoef je niet meer de checkLogin-functie te gebruiken
  
      // Als alles goed gaat, geef je een succesbericht terug
      return { message: "Login successful" };
    } catch (error) {
      throw {
        message: "Inloggen mislukt",
        error: error.message
      };
    }
  }