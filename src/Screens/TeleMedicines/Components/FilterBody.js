import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { Checkbox } from "react-native-paper";
import { ms, s, vs } from "react-native-size-matters";
const { width, height } = Dimensions.get("window");

const FilterBody = ({
  onClose,
  filter,
  selectedFilters,
  onFilterChange,
  totalRecords,
}) => {
  const [selectedFilter, setSelectedFilter] = useState("specialityIds");
  const [selectedValues, setSelectedValues] = useState(selectedFilters);

  const toggleSelection = (category, value) => {
    setSelectedValues((prev) => {
      const categorySelections = prev[category] || [];
      if (categorySelections.includes(value.id)) {
        return {
          ...prev,
          [category]: categorySelections.filter((id) => id !== value.id),
        };
      } else {
        return {
          ...prev,
          [category]: [...categorySelections, value.id],
        };
      }
    });
  };

  const applyFilters = () => {
    onFilterChange(selectedValues);
    onClose();
  };

  return (
    <>
      <View style={styles.drawerHeader}>
        <Text style={styles.headerText}>Filters</Text>
        <TouchableOpacity
          onPress={() => {
            setSelectedFilter("specialityIds");
            setSelectedValues({
              specialityIds: [],
              genderIds: [],
              langIds: [],
              symptomsId: [],
              staffId: [],
            });
          }}
        >
          <Text style={styles.clearAllText}>Clear All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollViewBody}>
        <View style={styles.filterBody}>
          <View style={styles.filterList}>
            {filter.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.filterItem,
                  selectedFilter === item.field && styles.selectedFilterItem,
                ]}
                onPress={() => setSelectedFilter(item.field)}
              >
                <Text
                  style={[
                    styles.filterText,
                    selectedFilter === item.field && styles.selectedFilterText,
                  ]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.filterValues}>
            {selectedFilter ? (
              filter
                .find((f) => f.field === selectedFilter)
                ?.data.map((value, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.checkboxContainer}
                    onPress={() => toggleSelection(selectedFilter, value)}
                  >
                    <View
                      style={width <= 400 && { transform: [{ scale: 0.75 }] }}
                    >
                      <Checkbox
                        status={
                          selectedValues[selectedFilter]?.includes(value.id)
                            ? "checked"
                            : "unchecked"
                        }
                        color="#1C57A5"
                      />
                    </View>
                    <Text
                      style={styles.filterValueText}
                      numberOfLines={2}
                      ellipsizeMode="tail"
                    >
                      {value.name}
                    </Text>
                  </TouchableOpacity>
                ))
            ) : (
              <Text style={styles.noSelectionText}>Select a filter</Text>
            )}
          </View>
        </View>
      </ScrollView>
      <View style={styles.drawerFooter}>
        <View>
          <Text style={styles.doctorCount}>{totalRecords}</Text>
          <Text style={styles.doctorFound}>Doctors Found</Text>
        </View>

        <TouchableOpacity
          style={[
            styles.applyButton,
            // ,Object.values(selectedValues).flat().length === 0 &&
            //   styles.disabledButton,
          ]}
          onPress={applyFilters}
          // disabled={Object.values(selectedValues).flat().length === 0}
        >
          <Text style={styles.applyText}>Apply Filters</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default FilterBody;

const styles = StyleSheet.create({
  drawerHeader: {
    paddingVertical: vs(10),
    paddingHorizontal: s(20),
    borderBottomWidth: 1,
    borderColor: "#ccc",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: s(14),
  },
  clearAllText: {
    fontWeight: "bold",
    color: "#1C57A5",
    fontSize: s(14),
  },
  filterBody: {
    padding: ms(20),
    flexDirection: "row",
  },
  filterList: {
    width: "40%",
    paddingRight: s(10),
    borderRightWidth: 1,
    borderColor: "#ccc",
  },
  filterItem: {
    paddingVertical: vs(9),
    paddingHorizontal: s(13),
    borderRadius: 8,
    marginBottom: vs(4),
    backgroundColor: "#f0f0f0",
  },
  selectedFilterItem: {
    backgroundColor: "#1C57A5",
  },
  filterText: {
    fontSize: s(10.5),
    color: "#333",
  },
  selectedFilterText: {
    color: "#fff",
    fontWeight: "bold",
  },
  filterValues: {
    height: "70%",
    width: "60%",
    paddingLeft: s(7),
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: width <= 400 ? vs(3) : vs(4),
  },

  filterValueText: {
    fontSize: s(10),
    marginLeft: width <= 400 ? vs(3) : vs(4),
    maxWidth: 150,
  },
  noSelectionText: {
    fontSize: s(12),
    color: "#999",
  },
  drawerFooter: {
    paddingHorizontal: s(20),
    borderTopWidth: 1,
    borderColor: "#ccc",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: vs(15),
  },
  doctorCount: {
    fontSize: s(14),
    fontWeight: "bold",
  },
  doctorFound: {
    color: "#555",
    fontWeight: "700",
    fontSize: s(12),
  },
  applyButton: {
    backgroundColor: "#1C57A5",
    paddingHorizontal: s(18),
    paddingVertical: vs(9),
    borderRadius: 8,
  },
  applyText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: s(13),
  },
  disabledButton: {
    backgroundColor: "#999",
  },
  scrollViewBody: {
    height: "30%",
  },
});
