import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DocumentPicker from 'react-native-document-picker';

const DocumentUploadScreen = ({ navigation }) => {
  const [documentName, setDocumentName] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'App needs access to your storage to select documents',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true; // For iOS, permissions are handled differently
  };

  const selectDocument = async () => {
    try {
      // Request permission first
      if (Platform.OS === 'android') {
        const hasPermission = await requestStoragePermission();
        if (!hasPermission) {
          Alert.alert('Permission required', 'Please grant storage permission to select documents');
          return;
        }
      }

      // Try to pick a document
      try {
        const res = await DocumentPicker.pick({
          type: [
            DocumentPicker.types.pdf,
            DocumentPicker.types.doc,
            DocumentPicker.types.docx,
            DocumentPicker.types.images,
          ],
          allowMultiSelection: false,
        });
        
        if (res && res[0]) {
          const file = res[0];
          console.log('Selected file:', file);
          
          // Check if file size is within limits (10MB)
          if (file.size > 10 * 1024 * 1024) {
            Alert.alert('File too large', 'Please select a file smaller than 10MB');
            return;
          }
          
          setSelectedFile(file);
          if (!documentName) {
            setDocumentName(file.name.replace(/\.[^/.]+$/, ''));
          }
        }
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          console.log('User cancelled document picker');
          return;
        }
        
        console.error('DocumentPicker Error:', err);
        
        // Show user-friendly error message
        let errorMessage = 'Failed to select document';
        if (err.code === 'DOCUMENT_PICKER_CANCELED') {
          return; // User cancelled, no need to show error
        } else if (err.code === 'DOCUMENT_PICKER_IN_PROGRESS') {
          errorMessage = 'Document picker is already open';
        } else if (err.code === 'DOCUMENT_PICKER_UNEXPECTED_ERROR') {
          errorMessage = 'An unexpected error occurred';
        }
        
        Alert.alert('Error', errorMessage);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
        console.log('User cancelled document picker');
      } else {
        console.error('DocumentPicker Error:', err);
        Alert.alert('Error', 'Failed to select document. Please try again.');
      }
    }
  };

  const handleUpload = async () => {
    if (!documentName.trim()) {
      Alert.alert('Error', 'Please enter a document name');
      return;
    }
    if (!selectedFile) {
      Alert.alert('Error', 'Please select a document');
      return;
    }
    
    setUploading(true);
    
    try {
      // Here you would handle the document upload
      console.log('Uploading document:', { 
        name: documentName, 
        number: documentNumber,
        file: selectedFile
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      Alert.alert('Success', 'Document uploaded successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Upload error:', error);
      Alert.alert('Error', 'Failed to upload document');
    } finally {
      setUploading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Upload Document</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content}>
        {/* Document Name Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Document Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter document name"
            value={documentName}
            onChangeText={setDocumentName}
            placeholderTextColor="#999"
          />
        </View>

        {/* Document Number */}
        <View style={[styles.inputContainer, { marginTop: 20 }]}>
          <Text style={styles.inputLabel}>Document Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter document number"
            value={documentNumber}
            onChangeText={setDocumentNumber}
            placeholderTextColor="#999"
            keyboardType="numeric"
          />
        </View>

        {/* Document Type */}
        <View style={[styles.inputContainer, { marginTop: 20 }]}>
          <Text style={styles.inputLabel}>Document Type</Text>
          <View style={styles.documentTypeContainer}>
            <TouchableOpacity style={styles.documentTypeButton}>
              <Text style={styles.documentTypeText}>Aadhar Card</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.documentTypeButton}>
              <Text style={styles.documentTypeText}>PAN Card</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.documentTypeButton}>
              <Text style={styles.documentTypeText}>Other</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Document Selection */}
        <View style={styles.section}>
          <Text style={styles.label}>Select Document</Text>
          <View style={styles.uploadContainer}>
            <TouchableOpacity 
              style={[styles.uploadButton, selectedFile && styles.uploadButtonSelected]}
              onPress={selectDocument}
            >
              <Icon 
                name={selectedFile ? 'checkmark-circle' : 'document-attach'} 
                size={24} 
                color={selectedFile ? '#4CAF50' : '#666'} 
                style={styles.uploadIcon}
              />
              <Text 
                style={styles.uploadButtonText}
                numberOfLines={1}
                ellipsizeMode="middle"
              >
                {selectedFile ? selectedFile.name : 'Tap to select a document'}
              </Text>
            </TouchableOpacity>
            {selectedFile && (
              <TouchableOpacity 
                style={styles.clearButton}
                onPress={() => setSelectedFile(null)}
              >
                <Icon name="close-circle" size={20} color="#ff4444" />
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.hintText}>
            Supported formats: PDF, DOC, DOCX, JPG, PNG
          </Text>
        </View>

        {/* Upload Button */}
        <TouchableOpacity 
          style={[styles.uploadButton, uploading && styles.uploadButtonDisabled]}
          onPress={handleUpload}
          disabled={uploading}
        >
          {uploading ? (
            <Text style={styles.uploadButtonText}>Uploading...</Text>
          ) : (
            <Text style={styles.uploadButtonText}>Upload Document</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#1C39BB',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  headerRight: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#000',
  },
  uploadContainer: {
    position: 'relative',
    marginBottom: 5,
  },
  uploadButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'dashed',
    padding: 15,
    paddingRight: 40, // Space for clear button
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    minHeight: 60,
  },
  clearButton: {
    position: 'absolute',
    right: 10,
    top: '50%',
    marginTop: -10,
    padding: 5,
  },
  filePickerText: {
    marginTop: 12,
    fontSize: 16,
    color: '#1C39BB',
  },
  filePickerSubtext: {
    marginTop: 4,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  documentTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  documentTypeButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  documentTypeText: {
    color: '#333',
    fontSize: 14,
  },
  uploadButton: {
    backgroundColor: '#1C39BB',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 32,
  },
  uploadButtonDisabled: {
    opacity: 0.6,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DocumentUploadScreen;
