<View
  style={{
    flexDirection: "row",
    gap: 30,
  }}
>
  <View style={{ backgroundColor: "yellow" }}>
    <TouchableOpacity
      style={{
        borderTopWidth: 0,
        borderWidth: 0.5,
        borderColor: color.filter_border,
        paddingVertical: 15,
        paddingHorizontal: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "bold",
          fontSize: ms(14),
          color: color.filter_black,
        }}
      >
        Specialities
      </Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={{
        borderTopWidth: 0,
        borderWidth: 0.5,
        borderColor: color.filter_border,
        paddingVertical: 15,
        paddingHorizontal: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "bold",
          fontSize: ms(14),
          color: color.filter_black,
        }}
      >
        Mode of Consultation
      </Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={{
        borderTopWidth: 0,
        borderWidth: 0.5,
        borderColor: color.filter_border,
        paddingVertical: 15,
        paddingHorizontal: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "bold",
          fontSize: ms(14),
          color: color.filter_black,
        }}
      >
        Languages
      </Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={{
        borderTopWidth: 0,
        borderWidth: 0.5,
        borderColor: color.filter_border,
        paddingVertical: 15,
        paddingHorizontal: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "bold",
          fontSize: ms(14),
          color: color.filter_black,
        }}
      >
        Gender
      </Text>
    </TouchableOpacity>
  </View>

  <View
    style={{
      flex: 1,
    }}
  >
    <TouchableOpacity
      style={{ flexDirection: "row", gap: 10, marginBottom: 20 }}
    >
      <View style={[styles.checkboxContainer]}></View>
      <Text
        style={{
          fontFamily: "medium",
          fontSize: ms(14),
          color: color.colorPrimary,
        }}
      >
        General physician
      </Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={{ flexDirection: "row", gap: 10, marginBottom: 20 }}
    >
      <View style={[styles.checkboxContainer]}></View>
      <Text
        style={{
          fontFamily: "medium",
          fontSize: ms(14),
          color: color.colorPrimary,
        }}
      >
        Dentist
      </Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={{ flexDirection: "row", gap: 10, marginBottom: 20 }}
    >
      <View style={[styles.checkboxContainer]}></View>
      <Text
        style={{
          fontFamily: "medium",
          fontSize: ms(14),
          color: color.colorPrimary,
        }}
      >
        Dermatologist
      </Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={{ flexDirection: "row", gap: 10, marginBottom: 20 }}
    >
      <View style={[styles.checkboxContainer]}></View>
      <Text
        style={{
          fontFamily: "medium",
          fontSize: ms(14),
          color: color.colorPrimary,
        }}
      >
        Orthopaedic
      </Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={{ flexDirection: "row", gap: 10, marginBottom: 20 }}
    >
      <View style={[styles.checkboxContainer]}></View>
      <Text
        style={{
          fontFamily: "medium",
          fontSize: ms(14),
          color: color.colorPrimary,
        }}
      >
        Psychiatrist
      </Text>
    </TouchableOpacity>
  </View>
</View>;
