import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';
import Input from './input';
import { colors } from '@/constants/theme';
import { verticalScale } from '@/utils/styling';
import * as Icons from "phosphor-react-native";

const dropdownData = [
  { label: 'Yes', value: 'Yes' },
  { label: 'No', value: 'No' },
];

export default function ExpandableDropdownTable() {
  const emailRef = useRef("");
  const [data, setData] = useState([
    {
      id: '1',
      task: 'Arsthetical looks',
      remarks: 'text',
      decision: 'Yes',
      expanded: false,
    },
    {
      id: '2',
      task: 'Short Shot',
      remarks: 'text',
      decision: 'No',
      expanded: false,
    },
    {
      id: '3',
      task: 'Flashes',
      remarks: 'text',
      decision: 'No',
      expanded: false,
    },
    {
      id: '4',
      task: 'Burn Marks',
      remarks: 'text',
      decision: 'No',
      expanded: false,
    },
    {
      id: '5',
      task: 'Sink Marks',
      remarks: 'text',
      decision: 'No',
      expanded: false,
    },
    {
      id: '6',
      task: 'Weld Line',
      remarks: 'text',
      decision: 'No',
      expanded: false,
    },
    {
      id: '7',
      task: 'Deformaruin/Warpage',
      remarks: 'text',
      decision: 'No',
      expanded: false,
    },
    {
      id: '8',
      task: 'Surface Finish',
      remarks: 'text',
      decision: 'No',
      expanded: false,
    },
    {
      id: '9',
      task: 'Gate Marks',
      remarks: 'text',
      decision: 'No',
      expanded: false,
    },
    {
      id: '10',
      task: 'Component Ejection Issue',
      remarks: 'text',
      decision: 'No',
      expanded: false,
    },
        {
      id: '11',
      task: 'Wall Thickness Variation',
      remarks: 'text',
      decision: 'No',
      expanded: false,
    },
        {
      id: '12',
      task: 'Runner Sticking Issues',
      remarks: 'text',
      decision: 'No',
      expanded: false,
    },
        {
      id: '13',
      task: 'Dents/ Damages/ Breakages',
      remarks: 'text',
      decision: 'No',
      expanded: false,
    },
        {
      id: '14',
      task: 'Thread Shearing',
      remarks: 'text',
      decision: 'No',
      expanded: false,
    },
        {
      id: '15',
      task: 'Dimensional Checks',
      remarks: 'text',
      decision: 'No',
      expanded: false,
    },
        {
      id: '16',
      task: 'Others Critical Issues',
      remarks: 'text',
      decision: 'No',
      expanded: false,
    },
  ]);

  // Expand Row
  const toggleExpand = (id: string) => {
    const updated = data.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          expanded: !item.expanded,
        };
      }
      return item;
    });

    setData(updated);
  };

  // Update Dropdown
  const updateDropdown = (id: string, value: string) => {
    const updated = data.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          decision: value,
        };
      }
      return item;
    });

    setData(updated);
  };

  const renderItem = ({ item }: { item: { id: string; task: string; remarks: string; decision: string; expanded: boolean; }; }) => (

    <View style={styles.card}>

      {/* Main Row */}
      <TouchableOpacity
        style={styles.row}
        onPress={() => toggleExpand(item.id)}
      >
        <Ionicons
          name={
            item.expanded
              ? 'chevron-down'
              : 'chevron-forward'
          }
          size={22}
          color="#333"
        />

        <Text style={styles.cell}>{item.task}</Text>

      </TouchableOpacity>

      {/* Expanded Section */}
      {item.expanded && (
        <View style={styles.expandedContainer}>
          {/* Field 1 */}
          <View style={styles.detailRow}>
            <Text style={styles.label}>Remarks</Text>

            <Input
              placeholder="Enter Your Remarks"
              onChangeText={(value) => (emailRef.current = value)}
            />
          </View>

          {/* Field 2 Dropdown */}
          <View style={styles.detailRow}>
            <Text style={styles.label}>Component Quality Observations(Yes/No)</Text>

            <View style={styles.dropdownWrapper}>
              <Dropdown
                style={styles.dropdown}
                data={dropdownData}
                labelField="label"
                valueField="value"
                value={item.decision}
                placeholder="Select"

                onChange={(selectedItem) => {
                  updateDropdown(
                    item.id,
                    selectedItem.value
                  );
                }}
              />
            </View>
          </View>

        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
    paddingTop: 50,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
    overflow: 'hidden',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },

  cell: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },

  expandedContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#fafafa',
  },

  detailRow: {
    marginTop: 15,
  },

  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  value: {
    fontSize: 15,
    color: '#555',
  },

  dropdownWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
  },

  dropdown: {
    height: 45,
  },
});