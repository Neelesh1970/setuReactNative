import React from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { s, ms, vs } from "react-native-size-matters";

const ConfirmationModal = ({
  visible,
  onClose,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
}) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalMessage}>{message}</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.cancelText}>{cancelText}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={() => {
                onConfirm();
                onClose();
              }}
            >
              <Text style={styles.confirmText}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const PRIMARY_COLOR = "#2372B5";

const styles = StyleSheet.create({
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
    marginBottom: vs(10),
    color: "#333",
    textAlign: "left",
  },
  modalMessage: {
    fontSize: ms(16),
    marginBottom: vs(20),
    color: "#666",
    textAlign: "left",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: s(10),
  },
  button: {
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
});

export default ConfirmationModal;
