import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ms, s, vs } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import { getItem } from "../../../Utils/utils";
import axios from "axios";
import { API_URI_PHR } from "@env";
import { BiomedicalImplantsModal, Navbar } from "../Components";
import Error from "../../Error/Error";
import { BiomedicalImplantsSkeleton } from "../Skeletons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ConfirmationModal } from "../../SOS/Components";
import ToastService from "../../../Utils/ToastService";

const BiomedicalImplants = () => {
  const navigation = useNavigation();
  const [biomedicalData, setBiomedicalData] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleAddPress = () => {
    setShowModal(true);
  };

  const handleEditPress = (item) => {
    setEditItem(item);
    setShowModal(true);
  };

  const handleDeletePress = (id) => {
    setDeleteId(id);
    setShowConfirmationModal(true);
  };

  const closeConfirmationModal = () => {
    setShowConfirmationModal(false);
    setDeleteId(null);
  };

  const fetchData = async () => {
    setloading(true);
    setError(false);
    try {
      const userId = await getItem("userID");
      if (!userId) throw new Error("User ID not found");

      const response = await axios.get(
        `${API_URI_PHR}/biomedical-implants/user/${userId}`
      );
      if (response.data.data.length === 0) {
        setShowModal(true);
      }
      setBiomedicalData(response.data.data);
      setError(false);
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`${API_URI_PHR}/biomedical-implants/${deleteId}`);
      fetchData();
      closeConfirmationModal();
      ToastService.showError("Success!", "Deleted Successfuly!");
    } catch (err) {
      console.log(err);
      ToastService.showError(
        "Error!",
        "Failed to delete data. Please try again."
      );
    }
  };

  if (error) {
    return <Error />;
  }

  return (
    <View style={styles.container}>
      <Navbar
        navText={"Biomedical Implants"}
        functionIconName={"add-circle-outline"}
        backPress={handleBackPress}
        functionPress={handleAddPress}
      />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {loading ? (
          <BiomedicalImplantsSkeleton />
        ) : biomedicalData.length === 0 ? (
          <Text style={styles.notFoundText}>No Data Added Yet</Text>
        ) : (
          <>
            {biomedicalData.map((item, index) => (
              <BiomedicalCard
                key={index}
                item={item}
                handleEditPress={() => handleEditPress(item)}
                handleDeletePress={() => handleDeletePress(item.id)}
              />
            ))}
          </>
        )}
      </ScrollView>
      <BiomedicalImplantsModal
        showModal={showModal}
        setShowModal={setShowModal}
        fetchData={fetchData}
        editItem={editItem}
      />
      <ConfirmationModal
        visible={showConfirmationModal}
        onClose={closeConfirmationModal}
        confirmText="Delete"
        title="Confirm Delete"
        message="Are you sure you want to delete this allergy?"
        onConfirm={handleDeleteConfirm}
      />
    </View>
  );
};

export default BiomedicalImplants;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContainer: {
    padding: ms(20),
    paddingBottom: vs(50),
  },
  cardBody: {
    borderWidth: s(1),
    borderColor: "#B1A6A6",
    borderRadius: s(8),
    backgroundColor: "#FFFFFF",
    justifyContent: "flex-start",
    width: "100%",
    overflow: "hidden",
    alignItems: "center",
    padding: ms(10),
    marginBottom: vs(10),
    flexDirection: "row",
    gap: s(10),
  },
  dataDetailsCol: {
    flex: 1,
    justifyContent: "space-between",
    gap: vs(2),
  },
  dataRow: {
    flexDirection: "row",
    gap: s(5),
    overflow: "hidden",
  },
  primaryText: {
    fontSize: s(12),
    fontWeight: 600,
    color: "#1C57A5",
  },
  valueText: {
    fontSize: s(12),
    fontWeight: 500,
    color: "#1C1C1C",
    flexShrink: 1,
  },
  notFoundText: {
    fontSize: s(16),
    fontWeight: 500,
    color: "#1C1C1C",
    textAlign: "center",
  },
  editCol: {
    height: "100%",
    gap: vs(10),
  },
});

const BiomedicalCard = ({ item, handleEditPress, handleDeletePress }) => {
  return (
    <View style={styles.cardBody}>
      <View style={styles.dataDetailsCol}>
        <BiomedicalCardRow label="Name:" value={item?.implantName} />
        <BiomedicalCardRow label="Reason:" value={item?.reasonForImplant} />
        <BiomedicalCardRow label="Date:" value={item?.dateOfImplant} />
      </View>
      <View style={styles.editCol}>
        <TouchableOpacity onPress={handleEditPress}>
          <Ionicons name="create-outline" size={s(24)} color="#1C57A5" />
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={handleDeletePress}>
          <Ionicons name="trash-bin-outline" size={s(24)} color="#D03C3C" />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const BiomedicalCardRow = ({ label, value }) => {
  return (
    <View style={styles.dataRow}>
      <Text style={styles.primaryText}>{label}</Text>
      <Text style={styles.valueText} numberOfLines={1} ellipsizeMode="tail">
        {value}
      </Text>
    </View>
  );
};
