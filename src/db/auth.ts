import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  User as FirebaseUser,
} from "firebase/auth";
import toast from "react-hot-toast";
import { auth, db, githubProvider, googleProvider } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { howLong, LookingFor, User } from "@/lib/types/user.types";

const defaultImage = [
  "https://i.pinimg.com/474x/8b/ea/fb/8beafb3576cbb4391b3ce89d5589ea38.jpg",
  "https://i.pinimg.com/736x/c4/ea/8b/c4ea8bf28dd46e81339c825ff8248533.jpg",
  "https://i.pinimg.com/736x/94/19/a6/9419a67864de894fc63efdd880622480.jpg",
  "https://i.pinimg.com/736x/39/32/4c/39324ca426146edd87cc67c941072e96.jpg",
  "https://i.pinimg.com/736x/8b/b0/0f/8bb00f0bccc87c298057e8206ed71700.jpg",
  "https://i.pinimg.com/736x/8d/e7/26/8de72634bcf6ec3a62d398e1e06b98f2.jpg",
  "https://i.pinimg.com/736x/5f/4e/f7/5f4ef7eb3e70f92dc45864ce6ed3e116.jpg",
];

export const signUpWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      const user = userCredential.user;
      const randomIndex = Math.floor(Math.random() * defaultImage.length);
      const photoURL = defaultImage[randomIndex];
      if (user) {
        updateProfile(user, {
          photoURL: photoURL,
        });
      }

      const email = userCredential.user.email;
      if (email) {
        const userRef = doc(db, "users", email);
        const userOBJ: User = {
          name: "",
          email: email,
          avatar: photoURL,
          location: "",
          oneLiner: "",
          workingOn: "",
          howLong: howLong.OneMonth,
          lookingFor: LookingFor.Internship,
          projectsBuilt: 0,
          socials: {
            twitter: "",
            github: "",
            linkedin: "",
          },
        };
        await setDoc(userRef, {
          ...userOBJ,
          createdAt: new Date(),
        });
        toast.success("Account created successfully");
      } else {
        toast.error("Failed to create account: Email is null");
      }
      window.location.href = "/auth-success";
    })
    .catch((error) => {
      const errorMessage = error.message;
      toast.error(errorMessage);
      return;
    });
};

export const signinWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  signInWithEmailAndPassword(auth, email, password).then(
    (userCredential) => {
      const user = userCredential.user;
      if (user) {
        window.location.href = "/projects";
      }
    },
    (error) => {
      const errorMessage = error.message;
      toast.error(errorMessage);
    }
  );
};

export const signinwithOath = async (provider: "google" | "github") => {
  const prov = provider === "google" ? googleProvider : githubProvider;
  signInWithPopup(auth, prov)
    .then((result) => {
      const user = result.user;
      if (user) {
        const email = user.email;
        const name = user.displayName;
        const avatar = user.photoURL;
        if (email && name && avatar) {
          const userRef = doc(db, "users", email);
          const userOBJ: User = {
            name: name,
            email: email,
            avatar: avatar,
            location: "",
            oneLiner: "",
            workingOn: "",
            howLong: howLong.OneMonth,
            lookingFor: LookingFor.Internship,
            projectsBuilt: 0,
            socials: {
              twitter: "",
              github: "",
              linkedin: "",
            },
          };
          setDoc(userRef, {
            ...userOBJ,
            createdAt: new Date(),
          });
          window.location.href = "/auth-success";
        } else {
          toast.error("Failed to create account: Email is null");
        }
      } else {
        toast.error("Failed to create account: Email is null");
      }
    })
    .catch((error) => {
      const errorMessage = error.message;

      toast.error(errorMessage);
    });
};

export const signOut = async () => {
  auth
    .signOut()
    .then(() => {
      window.location.href = "/";
    })
    .catch((error) => {
      toast.error(error.message);
    });
};

export const getUserData = async (user: FirebaseUser) => {
  if (user && user.email) {
    const userRef = doc(db, "users", user.email);
    const docSnap = await getDoc(userRef);
    return docSnap.data() as User;
  }
};
