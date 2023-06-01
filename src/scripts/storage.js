import { ref } from "firebase/storage";
import { storage } from "./firebase";

// Points to the root reference
export const storageRef = ref(storage);

// Points to 'images'
export const imagesRef = ref(storageRef, "images");
