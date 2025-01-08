import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import auth from "../../firebase/firebase.init";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import axios from "axios";

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUser = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  const loginViaGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const userLogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const userLogout = () => {
    setLoading(true);
    return signOut(auth);
  };

  const resetPass = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user?.uid) {
        const beboharkari = { uid: user.uid };
        const { data } = await axios.post(
          `https://theguidebb.vercel.app/jwt`,
          beboharkari,
          { withCredentials: true }
        );
        // .then(res => console.log(res.data))

        console.log(data);
      } else {
        const { data } = await axios.get(
          `https://theguidebb.vercel.app/logout`,
          { withCredentials: true }
        );
      }
      // eta thik jaygay rakha lagbe
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    currentUser,
    loading,
    setLoading,
    setCurrentUser,
    createUser,
    updateUser,
    loginViaGoogle,
    userLogin,
    userLogout,
    resetPass,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
