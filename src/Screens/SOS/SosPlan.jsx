import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { CustomButton, SosNavbar } from "./Components";
import { useNavigation } from "@react-navigation/native";
import { ms, s, vs } from "react-native-size-matters";
import axios from "axios";
import { API_URI_SOS } from "@env";
import { SosPlanSkeleton } from "./Skeletons";
import Error from "../Error/Error";
import { RAZORPAY_KEY_ID } from "@env";
import RazorpayCheckout from "react-native-razorpay";
import ToastService from "../../Utils/ToastService";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserHealthProfile } from "../../features/sos/userHealthProfileSlice";

const PLAN_COLORS = [
  { color: "#9D9898", borderColor: "#726969" }, // Basic (index 0)
  { color: "#56A5FF", borderColor: "#1E86FE" }, // Intermediate (index 1)
  { color: "#FFC14E", borderColor: "#E99E13" }, // Premium (index 2)
];

const SosPlan = () => {
  const dispatch = useDispatch();
  const { userHealthProfileData } = useSelector(
    (state) => state.userHealthProfile
  );
  const navigation = useNavigation();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [planData, setPlanData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URI_SOS}/credit-plans`);
      const plans = response?.data?.data || [];
      setPlanData(plans);

      if (plans.length > 0) {
        setSelectedPlan(plans[0].id);
      }
      setError(false);
    } catch (error) {
      console.error("Error fetching plans:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatPlanData = (plan, index) => {
    const colors = PLAN_COLORS[index] || PLAN_COLORS[0];

    const featuresList = [];
    if (plan.features) {
      for (const [key, value] of Object.entries(plan.features)) {
        if (value) featuresList.push(value);
      }
    }

    return {
      id: plan.id,
      title: plan.name,
      price: `@${plan.price}`,
      period: `${plan.period} months`,
      features: featuresList,
      color: colors.color,
      borderColor: colors.borderColor,
    };
  };

  if (!planData.length && !loading) {
    return (
      <View style={styles.planBody}>
        <Text style={styles.planPrice}>No plans available at the moment.</Text>
      </View>
    );
  }

  const handleRazorPay = (plan) => {
    setPaymentLoading(true);

    // Convert price string to number
    let numericPrice;
    try {
      // Remove any currency symbols or non-numeric characters (except decimal point)
      const priceString = plan.price.replace(/[^0-9.]/g, "");
      numericPrice = parseFloat(priceString);

      // Validate the converted number
      if (isNaN(numericPrice)) {
        throw new Error("Invalid price format");
      }
    } catch (error) {
      console.error("Error converting price:", error);
      ToastService.showError("Error!", "Invalid price format");
      setPaymentLoading(false);
      return;
    }

    const amount = Math.round(numericPrice * 100);

    var options = {
      description: `${plan.title} Payment`,
      currency: "INR",
      key: RAZORPAY_KEY_ID,
      amount: amount,
      name: "SETU",
      order_id: "",
      prefill: {
        email: "",
        contact: "",
        name: "",
      },
      theme: { color: "#3399cc" },
      method: {
        netbanking: true,
        card: true,
        upi: true,
        wallet: true,
      },
    };

    RazorpayCheckout.open(options)
      .then((data) => {
        // Payment successful
        console.log("Payment Success:", data);
        createTransaction(plan.title, numericPrice);

        setPaymentLoading(false);
      })
      .catch((error) => {
        ToastService.showError("Error!", "Payment failed. Please try again.");
        console.log("Error", `Payment failed: ${error}`);
        setPaymentLoading(false);
      });
  };

  const createTransaction = async (planName, amount) => {
    try {
      const response = await axios.post(`${API_URI_SOS}/transactions`, {
        txnType: "credit",
        triggerType: "Payment Credit",
        // name: planName,
        amt: amount,
        userHealthProfileId: userHealthProfileData[0]?.id,
        sendToEmergencyContacts: [],
      });
      navigation.goBack();
      dispatch(fetchUserHealthProfile());
      ToastService.showSuccess("Payment Successfull");
      console.log("API Response:", response.data);
    } catch (error) {
      console.error("API Error:", error);
      ToastService.showError("Transaction Failed");
    }
  };

  if (error) {
    return <Error />;
  }

  return (
    <View style={styles.container}>
      <SosNavbar
        navText="Select Your Plan"
        backPress={() => {
          navigation.goBack();
        }}
        sideText={`Balance: ${userHealthProfileData[0]?.wallet ?? 0}`}
      />

      {loading ? (
        <SosPlanSkeleton />
      ) : (
        <>
          <View style={styles.planBody}>
            {planData.map((plan, index) => {
              const formattedPlan = formatPlanData(plan, index);
              const isSelected = selectedPlan === formattedPlan.id;
              return (
                <PlanCard
                  key={formattedPlan.id}
                  plan={formattedPlan}
                  isSelected={isSelected}
                  setSelectedPlan={setSelectedPlan}
                />
              );
            })}
          </View>
          <View style={styles.btnBody}>
            <CustomButton
              title="Proceed"
              onPress={() => {
                if (paymentLoading) return;

                const selected = planData.find(
                  (plan) => plan.id === selectedPlan
                );
                if (selected) {
                  const formattedPlan = formatPlanData(
                    selected,
                    planData.findIndex((p) => p.id === selected.id)
                  );
                  handleRazorPay(formattedPlan);
                }
              }}
              disabled={paymentLoading}
            />
          </View>
        </>
      )}
    </View>
  );
};

const PlanCard = ({ plan, isSelected, setSelectedPlan }) => {
  return (
    <TouchableOpacity
      style={styles.cardBody}
      onPress={() => setSelectedPlan(plan.id)}
    >
      <View
        style={[
          styles.cardLeft,
          {
            backgroundColor: isSelected ? plan.color : "#fff",
            borderColor: plan.borderColor,
          },
        ]}
      >
        <Text style={[styles.planTitle, isSelected && { color: "#fff" }]}>
          {plan.title}
        </Text>
        <Text style={[styles.planPeriod, isSelected && { color: "#fff" }]}>
          {plan.period}
        </Text>

        {/* Render all features */}
        {plan.features.map((feature, index) => (
          <Text
            key={index}
            style={[styles.planFeature, isSelected && { color: "#fff" }]}
          >
            ✓ {feature}
          </Text>
        ))}
      </View>
      <View
        style={[
          styles.cardRight,
          {
            backgroundColor: isSelected ? plan.color : "#fff",
            borderColor: plan.borderColor,
          },
        ]}
      >
        <Text style={[styles.planPrice, isSelected && { color: "#fff" }]}>
          {plan.price}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
  },
  planBody: {
    padding: ms(16),
    flex: 1,
    gap: vs(10),
  },
  btnBody: {
    padding: ms(20),
  },
  cardBody: {
    flexDirection: "row",
  },
  cardLeft: {
    borderWidth: 1,
    borderTopLeftRadius: s(4),
    borderBottomLeftRadius: s(4),
    padding: ms(15),
    flex: 1,
    borderLeftWidth: s(8),
  },
  cardRight: {
    borderWidth: 1,
    paddingVertical: ms(15),
    paddingHorizontal: s(8),
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: s(4),
    borderBottomRightRadius: s(4),
    width: "27%",
  },
  planTitle: {
    fontWeight: "bold",
    fontSize: s(14),
    color: "#1C1C1C",
  },
  planDetail: {
    marginTop: ms(5),
    fontSize: ms(12),
    color: "#444",
  },
  planPrice: {
    fontWeight: "bold",
    fontSize: ms(14),
    color: "#1C1C1C",
  },
  planPeriod: {
    fontSize: ms(11),
    color: "#444",
    marginTop: ms(4),
    fontWeight: "600",
  },
  planFeature: {
    fontSize: ms(11),
    color: "#444",
    marginTop: ms(4),
  },
});

export default SosPlan;
