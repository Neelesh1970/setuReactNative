import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { ms } from "react-native-size-matters";

export const BlogCardPage = () => {
  return (
    <View style={styles.card}>
      {/* Image Section with Overlay Text */}
      <View style={styles.imageContainer}>
        <Image
          source={require("../../../../assets/images/BookTest/Rectangle.png")}
          style={styles.cardImage}
        />
         <Image
          source={require("../../../../assets/images/BookTest/HealthTips.png")}
          style={styles.overlayImage}
        />
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>WORLD DIABETES DAY</Text>
        </View>
      </View>

      {/* Content Section */}
      <View style={styles.content}>
        <Text style={styles.cardTitle}>
          Let’s Dia-Deat it; Ways to Prevent Diabetes
        </Text>
        <Text style={styles.cardDescription}>
          As a kid, I could never understand why grandpa had so many medicines
          on his nightstand or why mom strictly prohibited sugar in his chai...
        </Text>
      </View>

      {/* Footer Section */}
      <View style={styles.footer}>
        <Text style={[styles.footerText, { paddingRight: ms(5) }]}>3 Years Ago</Text>
        <Text style={styles.footerText}>|   Bhawana More</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: ms(12),
    margin: ms(15),
    borderColor: "#B5B5B5",
    borderWidth: 1,
  },

  imageContainer: {
    position: "relative",
  },
  cardImage: {
    backgroundColor: "#EDEFF5",
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
  },
  overlayImage: {
    position: "absolute", 
    top: 5,
    left: 30, 
  },
  overlay: {
    position: "absolute",
    top: 10,
    left: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    height: 20,
    width: 250,
  },
  overlayText: {
    color: "#04557D", 
    fontSize: 23,
    fontWeight: "bold",
    //     color: "#fff",
  },
  content: {
    padding: 16,
    marginTop: 10,
  },
  cardTitle: {
    fontSize: ms(20),
    // fontWeight: ms(600),
    fontWeight: 'bold',
    color: "#000000",
    fontFamily: 'Roboto'
  },
  cardDescription: {
    fontSize: ms(14),
    marginTop: 10,
    fontFamily: 'Roboto',
    color: '#000000'
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    margin: 12,
    borderColor: "#ddd",
    // padding: 6,
  },
  footerText: {
    fontSize: 12,
    color: "#777",
    marginRight: 5,
  },
});



// import React from "react";
// import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

// const BlogCardPage = () => {
//   return (
//     <View style={styles.card}>
//       {/* Header Section */}
//       <View style={styles.header}>
//         <Text style={styles.headerText}>WORLD DIABETES DAY</Text>
//         {/* <TouchableOpacity style={styles.dateButton}>
//           <Text style={styles.dateText}>14 NOVEMBER</Text>
//         </TouchableOpacity> */}
//       </View>

//       {/* Image Section */}
//       <Image
//         source={require("../../assets/images/Keyimages/HR_1.png")} // Change this to your image path
//         style={styles.cardImage}
//       />

//       {/* Content Section */}
//       <View style={styles.content}>
//         <Text style={styles.cardTitle}>
//           Let’s Dia-Deat it; Ways to Prevent Diabetes
//         </Text>
//         <Text style={styles.cardDescription}>
//           As a kid, I could never understand why grandpa had so many medicines
//           on his nightstand or why mom strictly prohibited sugar in his chai...
//         </Text>
//       </View>

//       {/* Footer Section */}
//       <View style={styles.footer}>
//         <Text style={styles.footerText}>3 Years Ago</Text>
//         <Text style={styles.footerText}>| Bhawana More</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     padding: 16,
//     margin: 10,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   header: {
//     flexDirection: "column",
//     alignItems: "flex-start",
//   },
//   headerText: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#0066CC",
//   },
//   dateButton: {
//     backgroundColor: "#F2F2F2",
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     borderRadius: 6,
//     marginTop: 5,
//   },
//   dateText: {
//     fontSize: 12,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   cardImage: {
//     width: "100%",
//     height: 150,
//     resizeMode: "contain",
//     marginTop: 10,
//   },
//   content: {
//     marginTop: 10,
//   },
//   cardTitle: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   cardDescription: {
//     fontSize: 14,
//     color: "#666",
//     marginTop: 5,
//   },
//   footer: {
//     flexDirection: "row",
//     justifyContent: "flex-start",
//     alignItems: "center",
//     marginTop: 12,
//     borderTopWidth: 1,
//     borderColor: "#ddd",
//     paddingTop: 8,
//   },
//   footerText: {
//     fontSize: 12,
//     color: "#777",
//     marginRight: 5,
//   },
// });

// export default BlogCardPage;
