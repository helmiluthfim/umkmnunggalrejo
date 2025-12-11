import { db } from "../firebase";
import { getDocs, doc, collection } from "firebase/firestore";

export default async function getAllProducts() {
  const snap = await getDocs(collection(db, "product"));
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}
