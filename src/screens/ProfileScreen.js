// src/screens/ProfileScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async () => {
    const userDoc = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(userDoc);

    if (docSnap.exists()) {
      setName(docSnap.data().name);
    } else {
      await setDoc(userDoc, { name: "" });
    }
    setLoading(false);
  };

  const handleUpdate = async () => {
    const userDoc = doc(db, "users", auth.currentUser.uid);
    await updateDoc(userDoc, { name });
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (loading) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />
      <Button title="Save" onPress={handleUpdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
  input: { height: 40, borderColor: "#ccc", borderWidth: 1, marginBottom: 15, paddingHorizontal: 10 },
});

export default ProfileScreen;
