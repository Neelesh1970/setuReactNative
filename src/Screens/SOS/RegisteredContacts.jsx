import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { ms, s, vs } from "react-native-size-matters";
import { ConfirmationModal, CustomInputBox, SosNavbar } from "./Components";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteContactById,
  updateContactById,
} from "../../features/sos/sosSlice";
import ToastService from "../../Utils/ToastService";
import { makePhoneCall, showCallInitiatedToast } from "../../Utils/phoneUtils";
import { createEmergencyTransaction } from "./Services/createEmergencyTransaction";
import { fetchUserHealthProfile } from "../../features/sos/userHealthProfileSlice";

const RegisteredContacts = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { userHealthProfileData } = useSelector(
    (state) => state.userHealthProfile
  );
  const { emergencyContactData } = useSelector((state) => state.sos);
  const userHealthProfileId = userHealthProfileData[0]?.id;
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    contactNumber: "",
    relation: "",
    userid: 0,
  });
  const [errors, setErrors] = useState({});
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);

  // Handle edit button press
  const handleEditPress = (contact) => {
    setEditingContact(contact);
    setEditForm({
      name: contact.name,
      contactNumber: contact.contactNumber,
      relation: contact.relation,
      userid: contact.userid,
    });
    setIsEditModalVisible(true);
  };

  // Validate edit form
  const validate = () => {
    let tempErrors = {};
    if (!editForm.name.trim()) tempErrors.name = "Name is required";
    if (!editForm.contactNumber.match(/^\d{10}$/))
      tempErrors.contactNumber = "Enter valid 10-digit number";
    if (!editForm.relation.trim()) tempErrors.relation = "Relation is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // Handle edit submission
  const handleEditSubmit = async () => {
    if (!validate()) return;

    try {
      await dispatch(updateContactById(editingContact.id, editForm));

      setIsEditModalVisible(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  // Handle delete confirmation
  const handleDeleteConfirmation = (contactId) => {
    setContactToDelete(contactId);
    setIsDeleteModalVisible(true);
  };

  // Handle delete contact
  const handleDeleteContact = async () => {
    try {
      await dispatch(deleteContactById(contactToDelete));
      ToastService.showSuccess("Success!", "Contact deleted successfully!");
    } catch (error) {
      ToastService.showError("Error!", "Failed to delete contact");
    } finally {
      setContactToDelete(null);
    }
  };

  const createEmergencyCallTransaction = async (
    triggerType,
    sendToContacts = []
  ) => {
    try {
      const transactionData = {
        userHealthProfileId,
        txnType: "debit",
        triggerType,
        amt: "1.00",
        sendToEmergencyContacts: sendToContacts,
      };

      await createEmergencyTransaction(transactionData);
      dispatch(fetchUserHealthProfile());
      console.log(`${triggerType} transaction created successfully`);
    } catch (error) {
      console.error(`Error creating ${triggerType} transaction:`, error);
      ToastService.showError("Error", "Failed to record emergency transaction");
    }
  };

  const handleEmergencyContactCall = (contact) => {
    if (userHealthProfileData[0]?.wallet === 0) {
      Alert.alert(
        "Insufficient Balance",
        "Please add balance in your wallet before using this feature",
        [
          {
            text: "Add Balance",
            onPress: () => navigation.navigate("SosPlan"),
          },
          { text: "Cancel", style: "cancel" },
        ]
      );
      return;
    }
    makePhoneCall(contact.contactNumber);
    showCallInitiatedToast(contact.name);

    createEmergencyCallTransaction("Emergency Alert", [contact.id]);
  };

  return (
    <View style={styles.container}>
      <SosNavbar
        navText="Registered Contacts"
        backPress={() => {
          navigation.goBack();
        }}
        iconButtons={[
          {
            icon: "add-outline",
            label: "",
            onPress: () => navigation.navigate("SosAddContact"),
          },
        ]}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {emergencyContactData?.length === 0 && (
          <View style={styles.noContact}>
            <Text style={styles.noContactText}>No Contacts Added</Text>
          </View>
        )}
        <View style={styles.contactsGrid}>
          {emergencyContactData.map((item, index) => (
            <View key={index} style={styles.contactCard}>
              {/* card header */}
              <View style={styles.cardHeader}>
                <View style={styles.profileCircle}>
                  <Ionicons name="person" size={s(30)} color="#707070" />
                </View>
                <View style={styles.iconCol}>
                  <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={() => handleDeleteConfirmation(item.id)}
                  >
                    <MaterialIcons
                      name="delete-outline"
                      size={s(22)}
                      color="#D03C3C"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={() => handleEditPress(item)}
                  >
                    <FontAwesome name="edit" size={s(20)} color="#1C57A5" />
                  </TouchableOpacity>
                </View>
              </View>
              {/* contact detials */}
              <View style={styles.contactBody}>
                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={styles.titleText}
                >
                  {item.name}
                </Text>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.detailText}
                >
                  {item.relation}
                </Text>
                <Text style={styles.detailText}>{item.contactNumber}</Text>
              </View>
              {/* call button */}
              <TouchableOpacity
                style={styles.callButton}
                onPress={() => handleEmergencyContactCall(item)}
              >
                <Ionicons name="call" size={s(20)} color="#fefefe" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      <EditContactModal
        isEditModalVisible={isEditModalVisible}
        setIsEditModalVisible={setIsEditModalVisible}
        editForm={editForm}
        errors={errors}
        setEditForm={setEditForm}
        handleEditSubmit={handleEditSubmit}
      />

      <ConfirmationModal
        visible={isDeleteModalVisible}
        onClose={() => setIsDeleteModalVisible(false)}
        title="Delete Contact"
        message="Are you sure you want to delete this emergency contact?"
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDeleteContact}
      />
    </View>
  );
};

export default RegisteredContacts;

const PRIMARY_COLOR = "#2372B5";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
  },
  scrollContainer: {
    paddingBottom: vs(100),
  },
  contactsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: s(10),
    paddingVertical: vs(16),
    paddingHorizontal: vs(12),
  },
  contactCard: {
    width: "47.5%",
    backgroundColor: "#FFFFFF",
    borderColor: "#D9D9D9",
    borderWidth: 1,
    borderRadius: s(12),
    paddingHorizontal: s(12),
    paddingVertical: vs(16),
    marginBottom: vs(6),
  },
  profileCircle: {
    backgroundColor: "#E5E5E5",
    padding: ms(10),
    borderRadius: "50%",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconCol: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  contactBody: {
    paddingVertical: vs(10),
    gap: vs(5),
  },
  titleText: {
    fontSize: s(13),
    fontWeight: 600,
    color: "#1C1C1C",
  },
  detailText: { fontSize: s(12), fontWeight: 400, color: "#1C1C1C" },
  callButton: {
    width: "100%",
    backgroundColor: "#1B970F",
    alignItems: "center",
    paddingVertical: vs(5),
    borderRadius: s(5),
    marginTop: vs(5),
  },
  noContact: {
    padding: s(20),
    alignItems: "center",
  },
  noContactText: {
    fontSize: s(14),
    fontWeight: 600,
    color: "#333",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: ms(10),
    padding: ms(20),
  },
  modalTitle: {
    fontSize: ms(18),
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginVertical: vs(10),
  },

  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: s(10),
    marginTop: vs(15),
  },
  modalButton: {
    paddingVertical: vs(10),
    paddingHorizontal: s(20),
    borderRadius: ms(5),
    minWidth: s(100),
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#FFFFFF",
    borderColor: PRIMARY_COLOR,
  },
  confirmButton: {
    backgroundColor: PRIMARY_COLOR,
    borderColor: PRIMARY_COLOR,
  },
  cancelText: {
    color: PRIMARY_COLOR,
    fontWeight: 600,
    fontSize: ms(14),
  },
  confirmText: {
    color: "#FFFFFF",
    fontWeight: 600,
    fontSize: ms(14),
  },
  closeButton: {
    position: "absolute",
    top: s(10),
    right: s(10),
  },
});

const EditContactModal = ({
  isEditModalVisible,
  setIsEditModalVisible,
  editForm,
  errors,
  setEditForm,
  handleEditSubmit,
}) => {
  return (
    <>
      <Modal
        transparent
        visible={isEditModalVisible}
        animationType="fade"
        onRequestClose={() => setIsEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsEditModalVisible(false)}
            >
              <Ionicons name="close" size={s(26)} color="#333" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Edit Contact</Text>

            <CustomInputBox
              label="Name"
              placeholder="Enter name"
              value={editForm.name}
              onChangeText={(text) => setEditForm({ ...editForm, name: text })}
              error={errors.name}
            />
            <CustomInputBox
              label="Phone Number"
              placeholder="Enter Phone Number"
              value={editForm.contactNumber}
              onChangeText={(text) =>
                setEditForm({ ...editForm, contactNumber: text })
              }
              error={errors.contactNumber}
            />
            <CustomInputBox
              label="Relation"
              placeholder="Enter Relation"
              value={editForm.relation}
              onChangeText={(text) =>
                setEditForm({ ...editForm, relation: text })
              }
              error={errors.relation}
            />

            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setIsEditModalVisible(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleEditSubmit}
              >
                <Text style={styles.confirmText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};
