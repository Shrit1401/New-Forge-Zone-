import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const getProject = async (slug: string) => {
  const projectRef = doc(db, "projects", slug);
  const projectSnap = await getDoc(projectRef);
  return projectSnap.data();
};
