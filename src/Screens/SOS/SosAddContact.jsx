import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { CustomButton, CustomInputBox, SosNavbar } from "./Components";
import { useNavigation } from "@react-navigation/native";
import { ms } from "react-native-size-matters";
import ToastService from "../../Utils/ToastService";
import { useDispatch } from "react-redux";
import { createContact } from "../../features/sos/sosSlice";

const SosAddContact = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [relation, setRelation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    if (!name.trim()) tempErrors.name = "Name is required";
    if (!phone.match(/^\d{10}$/))
      tempErrors.phone = "Enter valid 10-digit number";
    if (!relation.trim()) tempErrors.relation = "Relation is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      dispatch(
        createContact({
          name,
          phone,
          relation,
        })
      );

      navigation.goBack();
    } catch (error) {
      console.error("Error creating emergency contact:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTextChange = (setter, field) => (text) => {
    setter(text);
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <View style={styles.container}>
      <SosNavbar
        navText="Add New Contact"
        backPress={() => {
          navigation.goBack();
        }}
      />
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.formBody}>
          <CustomInputBox
            label="Name"
            placeholder="Eg: John Paul"
            value={name}
            onChangeText={handleTextChange(setName, "name")}
            error={errors.name}
          />
          <CustomInputBox
            label="Phone"
            placeholder="Eg: 9876543210"
            value={phone}
            onChangeText={handleTextChange(setPhone, "phone")}
            keyboardType="number-pad"
            error={errors.phone}
          />
          <CustomInputBox
            label="Relation"
            placeholder="Eg: Mother"
            value={relation}
            onChangeText={handleTextChange(setRelation, "relation")}
            error={errors.relation}
          />
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={styles.btnBody}>
        <CustomButton
          title={isSubmitting ? "Adding..." : "Add Contact"}
          onPress={handleSubmit}
          disabled={isSubmitting}
        />
      </View>
    </View>
  );
};

export default SosAddContact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
  },
  formBody: {
    padding: ms(20),
    flexGrow: 1,
  },
  btnBody: {
    padding: ms(20),
  },
});
