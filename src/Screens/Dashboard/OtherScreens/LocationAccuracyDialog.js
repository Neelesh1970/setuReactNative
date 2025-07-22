import React, { useState } from "react";
import { View } from "react-native";
import {
  Button,
  Dialog,
  Portal,
  Text,
  PaperProvider,
} from "react-native-paper";

const LocationAccuracyDialog = () => {
  const [visible, setVisible] = useState(true);

  return (
    <PaperProvider>
      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Content>
            <Text style={{ fontSize: 18 }}>
              To continue, your device will need to use Location Accuracy
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisible(false)} textColor="blue">
              No, thanks
            </Button>
            <Button onPress={() => setVisible(false)} textColor="blue">
              Turn on
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </PaperProvider>
  );
};

export default LocationAccuracyDialog;
