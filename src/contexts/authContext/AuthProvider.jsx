import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import auth from "../../firebase/firebase.init";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider;

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const updateUser = (updatedData) => {
        return updateProfile(auth.currentUser, updatedData);
    }

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
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
        setLoading(false);
    })

    return () => {
        unsubscribe();
    }
  }, [])

  const authInfo = {currentUser, loading, setLoading, setCurrentUser, createUser, updateUser, loginViaGoogle, userLogin, userLogout, resetPass};

  return <AuthContext.Provider value={authInfo}>
    {children}
  </AuthContext.Provider>;
};

export default AuthProvider;
