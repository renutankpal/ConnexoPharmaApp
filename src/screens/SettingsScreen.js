import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  processColor
} from 'react-native';

import { BarChart, PieChart } from 'react-native-gifted-charts';

const SettingsScreen = () => {
  const [selectedEntry, setSelectedEntry] = useState(null);
  const pieData = [
    { value: 15, color: '#0dcaf0', shiftY: -1 ,text: '15%'},
    { value: 40, color: '#20c997',shiftX: 1, text: '40%' },
    // { value: 25, color: '#022e45' },
    { value: 30, color: '#f7b103',shiftX: -2, text: '30%' },
  ];
  const stackData = [
    {
      stacks: [
        { value: 10, color: '#ba6715' },
        { value: 20, color: '#f7b103', },
        { value: 60, color: '#022e45', },
      ],
      label: 'Jan',
    },
    {
      stacks: [
        { value: 25, color: '#ba6715', },
        { value: 10, color: '#f7b103' },
        { value: 28, color: '#022e45', },
      ],
      label: 'Feb',
    },
    {
      stacks: [
        { value: 14, color: '#ba6715' },
        { value: 38, color: '#f7b103', },
        { value: 15, color: '#022e45', },

      ],
      label: 'Mar',
    },
    {
      stacks: [
        { value: 15, color: '#ba6715', },
        { value: 27, color: '#f7b103' },
        { value: 45, color: '#022e45', },
      ],
      label: 'Apr',
    },
    {
      stacks: [
        { value: 15, color: '#ba6715', },
        { value: 20, color: '#f7b103' },
        { value: 35, color: '#022e45', },
      ],
      label: 'May',
    },
  ];
  const legend = {
    enabled: true,
    textSize: 14,
    form: "SQUARE",
    formSize: 14,
    xEntrySpace: 10,
    yEntrySpace: 5,
    wordWrapEnabled: true
  };

 

  return (
    <View style={{ flex: 1 }}>
     <Text>My Charts</Text>
      <View style={{ flex: 1,alignItems:'center',justifyContent:'center' }}>
        <BarChart
          isAnimated
          width={300}
          height={300}
         // rotateLabel
          spacing={30}
          //overflowTop={20}
          noOfSections={4}
          legend={legend}
        //  stackBorderRadius={20}
          
          // stackBorderTopLeftRadius={20}
          stackData={stackData}
          showValuesAsTopLabel
          pointerConfig={{
            initialPointerIndex: 0,
            stripBehindBars: true,
            pointerStripHeight: 210,
            // pointerLabelComponent: items => {
            //   return (
            //     <View
            //       style={{
            //         width: 30,
            //         padding: 6,
            //         borderWidth: 1,
            //         borderRadius: 8,
            //         backgroundColor: '#eee',
            //       }}>
            //       <Text>{items[0].stacks[0].value}</Text>
            //     </View>
            //   );
            // },
          }}
          barInnerComponent={(item, index) => {
            // Calculate the total value for proportional heights
            const totalValue = item.stacks.reduce((sum, stack) => sum + stack.value, 0);
        
            return (
              <View
                style={{
                  height: '100%',
                  justifyContent: 'flex-end',
                }}>
                {/* Render stack values with proportional heights */}
                {item.stacks.map((stack, stackIndex) => {
                  const heightPercentage = (stack.value / totalValue) * 105;
        
                  return (
                    <View
                      key={stackIndex}
                      style={{
                        height: `${heightPercentage}%`,
                        backgroundColor: stack.color,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderTopLeftRadius: stackIndex === 0 ? 20 : 0, // First stack top left
                        borderTopRightRadius: stackIndex === 0 ? 20 : 0, // First stack top right
                        // Apply border radius for the last stack (Bottom Left and Bottom Right)
                        borderBottomLeftRadius: stackIndex === item.stacks.length - 1 ? 20 : 0, // Last stack bottom left
                        borderBottomRightRadius: stackIndex === item.stacks.length - 1 ? 20 : 0, // Last stack bottom right
                
                      }}>
                      {/* Position the value at the center of the stack */}
                      <Text
                        style={{
                          color: '#FFF',
                          fontSize: 10,
                          fontWeight: 'bold',
                        }}>
                        {stack.value}
                      </Text>
                    </View>
                  );
                })}
              </View>
            );
          }}
        />
        <View style={{alignItems:'center',margin:20}}>
          <PieChart
            donut
            innerRadius={0}
            data={pieData}
           // isThreeD
           // shadow
            showText
            focusOnPress
           // showTextBackground
            showValuesAsLabels
            textColor="black"
            radius={120}
            textSize={15}
               
          />
        </View>

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  chart: {
    flex: 1
  }
});

export default SettingsScreen;
