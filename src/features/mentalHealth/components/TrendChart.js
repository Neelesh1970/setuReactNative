import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');

const TrendChart = ({ data, x, y, color = '#6200ee', title }) => {
  if (!data || data.length === 0) {
    return <View style={styles.container} />;
  }

  // Transform data for react-native-chart-kit
  const chartData = {
    labels: data.map(item => {
      const date = new Date(item[x]);
      return `${date.getDate()}/${date.getMonth() + 1}`;
    }),
    datasets: [{
      data: data.map(item => item[y]),
      color: (opacity = 1) => color,
      strokeWidth: 2,
    }],
  };

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: color,
    },
    propsForBackgroundLines: {
      strokeWidth: 1,
      stroke: 'rgba(0, 0, 0, 0.1)',
    },
  };

  return (
    <View style={styles.container}>
      <LineChart
        data={chartData}
        width={width - 60} // Slightly reduced width for better fit
        height={200}       // Slightly reduced height
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
        withDots={true}
        withInnerLines={true}
        withOuterLines={true}
        segments={5}
        fromZero={true}
        withVerticalLines={true}
        withHorizontalLines={true}
        withShadow={false}
        decorator={() => null}
        onDataPointClick={() => {}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    alignSelf: 'stretch',
  },
  chart: {
    borderRadius: 8,
    margin: 0,
    padding: 0,
  },
});

export default TrendChart;
