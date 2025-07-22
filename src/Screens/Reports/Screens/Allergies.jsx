import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AllergyFormModal, Navbar } from "../Components";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { API_URI_PHR } from "@env";
import Error from "../../Error/Error";
import { ms, s, vs } from "react-native-size-matters";
import { getItem } from "../../../Utils/utils";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AllergiesSkeleton } from "../Skeletons";
import { ConfirmationModal } from "../../SOS/Components";
import ToastService from "../../../Utils/ToastService";

const Allergies = () => {
  const navigation = useNavigation();
  const [allergyData, setAllergyData] = useState([]);
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
    setEditItem(null);
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

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`${API_URI_PHR}/allergies-reports/${deleteId}`);

      fetchData();
      closeConfirmationModal();
      ToastService.showError("Success!", "Deleted Successfuly!");
    } catch (err) {
      console.log(err);
      ToastService.showError(
        "Error!",
        "Failed to delete allergy. Please try again."
      );
    }
  };

  const fetchData = async () => {
    setloading(true);
    setError(false);
    try {
      const userId = await getItem("userID");
      if (!userId) throw new Error("User ID not found");

      const response = await axios.get(
        `${API_URI_PHR}/allergies-reports/user/${userId}`
      );
      if (response.data.data.length === 0) {
        setShowModal(true);
      }
      setAllergyData(response.data.data);
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

  if (error) {
    return <Error />;
  }

  return (
    <View style={styles.container}>
      <Navbar
        navText={"Allergies"}
        functionIconName={"add-circle-outline"}
        backPress={handleBackPress}
        functionPress={handleAddPress}
      />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {loading ? (
          <AllergiesSkeleton />
        ) : allergyData.length === 0 ? (
          <Text style={styles.notFoundText}>No Allergy Added Yet</Text>
        ) : (
          <>
            {allergyData.map((item, index) => (
              <AllergyCard
                key={index}
                item={item}
                handleEditPress={() => handleEditPress(item)}
                handleDeletePress={() => handleDeletePress(item.id)}
              />
            ))}
          </>
        )}
      </ScrollView>

      <AllergyFormModal
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

export default Allergies;

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
  imagePlaceholder: {
    backgroundColor: "#D5D5D5",
    width: s(60),
    height: vs(67),
    borderRadius: s(4),
  },
  image: {
    width: s(60),
    height: vs(67),
    borderRadius: s(4),
  },
  allergyDetails: {
    flex: 1,
    justifyContent: "space-between",
    gap: vs(2),
  },
  allergyRow: {
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

const AllergyCard = ({ item, handleEditPress, handleDeletePress }) => {
  return (
    <View style={styles.cardBody}>
      {item?.iconURL &&
      item?.iconURL !== "https://example.com/icons/allergies.png" ? (
        <Image src={item?.iconURL} style={styles.image} resizeMode="cover" />
      ) : (
        <View style={styles.imagePlaceholder} />
      )}
      <View style={styles.allergyDetails}>
        <AllergyCardRow label="Name:" value={item?.name} />
        <AllergyCardRow label="Allergen:" value={item?.allergen} />
        <AllergyCardRow label="Severity:" value={item?.severity} />
        <AllergyCardRow label="Reaction:" value={item?.reaction} />
      </View>
      <View style={styles.editCol}>
        <TouchableOpacity onPress={handleEditPress}>
          <Ionicons name="create-outline" size={s(24)} color="#1C57A5" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDeletePress}>
          <Ionicons name="trash-bin-outline" size={s(24)} color="#D03C3C" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const AllergyCardRow = ({ label, value }) => {
  return (
    <View style={styles.allergyRow}>
      <Text style={styles.primaryText}>{label}</Text>
      <Text style={styles.valueText} numberOfLines={1} ellipsizeMode="tail">
        {value}
      </Text>
    </View>
  );
};
