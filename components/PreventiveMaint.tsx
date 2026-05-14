import React, { useState } from 'react';
import {
    Alert,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    FlatList,
} from 'react-native';

import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

const yesNoData = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
];

const priorityData = [
    { label: 'High', value: 'High' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Low', value: 'Low' },
];


type Row = {
    id: string;
    Task: string;
    expanded: boolean;
    selection: string | null;
    priority: string | null;
    date: Date;
    showDatePicker: boolean;
    submitted: boolean;
};

export default function DynamicExpandableForm() {

    const [rows, setRows] = useState<Row[]>([]);

    const addRow = () => {
        const newRow = {
            id: Date.now().toString(),
            Task: '',
            expanded: false,
            selection: null,
            priority: null,
            date: new Date(),
            showDatePicker: false,
            submitted: false,
        };

        setRows([...rows, newRow]);
    };

    const updateRow = <K extends keyof Row>(id: string, key: K, value: Row[K]) => {
        const updatedRows = rows.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    [key]: value,
                };
            }
            return item;
        });

        setRows(updatedRows);
    };
    const editRow = (id: string) => {

        const updatedRows = rows.map((item) => {

            if (item.id === id) {
                return {
                    ...item,
                    submitted: false,
                    expanded: true,

                };
            }

            return item;
        });

        setRows(updatedRows);
    };

    const deleteRow = (id: string) => {

        const filteredRows = rows.filter(
            (item) => item.id !== id
        );

        setRows(filteredRows);
    };

    const renderRow = ({ item }: { item: Row }) => {

        return (
            <View style={styles.card}>

                {/* Top Row */}
                <View style={styles.topRow}>
                    <Ionicons
                        name="trash-outline"
                        size={20}
                        color="#d11a2a"
                        padding={10}
                        onPress={() => deleteRow(item.id)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Task Description"
                        value={item.Task}
                        onChangeText={(value) =>
                            updateRow(item.id, 'Task', value)
                        }
                    />

                    <TouchableOpacity
                        onPress={() => {
                            if (item.Task === '') {
                                Alert.alert(
                                    'Please enter a task description before expanding.'
                                );
                                return;
                            }
                            updateRow(
                                item.id,
                                'expanded',
                                !item.expanded
                            );
                        }}
                    >
                        <Ionicons
                            name={
                                item.expanded
                                    ? 'chevron-down'
                                    : 'chevron-forward'
                            }
                            size={24}
                            color="#333"
                        />
                    </TouchableOpacity>

                </View>

                {/* Expanded Area */}
                {item.expanded && !item.submitted && item.Task && (
                    <View style={styles.expandedContainer}>

                        {/* Yes No Dropdown */}
                        <Text style={styles.label}>
                            Select Yes / No
                        </Text>

                        <Dropdown
                            style={styles.dropdown}
                            data={yesNoData}
                            labelField="label"
                            valueField="value"
                            placeholder="Select Yes/No"
                            value={item.selection}
                            onChange={(selectedItem) => {
                                updateRow(
                                    item.id,
                                    'selection',
                                    selectedItem.value
                                );
                            }}
                        />

                        {/* YES -> Priority Dropdown */}
                        {item.selection === 'Yes' && (
                            <>
                                <Text style={styles.label}>
                                    Select Priority
                                </Text>

                                <Dropdown
                                    style={styles.dropdown}
                                    data={priorityData}
                                    labelField="label"
                                    valueField="value"
                                    placeholder="Select Priority"
                                    value={item.priority}
                                    onChange={(selectedItem) => {
                                        updateRow(
                                            item.id,
                                            'priority',
                                            selectedItem.value
                                        );
                                    }}
                                />
                            </>
                        )}

                        {/* NO -> Date Picker */}
                        {item.selection === 'No' && (
                            <>
                                <Text style={styles.label}>
                                    Select Date
                                </Text>

                                <TouchableOpacity
                                    style={styles.dateButton}
                                    onPress={() =>
                                        updateRow(
                                            item.id,
                                            'showDatePicker',
                                            true
                                        )
                                    }
                                >
                                    <Text>
                                        {item.date.toDateString()}
                                    </Text>
                                </TouchableOpacity>

                                {item.showDatePicker && (
                                    <DateTimePicker
                                        value={item.date}
                                        mode="date"
                                        display="default"
                                        onChange={(event, selectedDate) => {
                                            updateRow(
                                                item.id,
                                                'showDatePicker',
                                                false
                                            );

                                            if (selectedDate) {
                                                updateRow(
                                                    item.id,
                                                    'date',
                                                    selectedDate
                                                );
                                            }
                                        }}
                                    />
                                )}
                            </>
                        )}

                        {/* OK Button */}
                        <TouchableOpacity
                            style={styles.okButton}
                            onPress={() =>
                                updateRow(item.id, 'submitted', true)
                            }
                        >
                            <Text style={styles.okButtonText}>
                                OK
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}

                {item.submitted && (
                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            style={styles.editButton}

                            onPress={() =>
                                editRow(item.id)
                            }
                        >
                            <Text style={styles.buttonText}>
                                Edit
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.deleteButton}

                            onPress={() =>
                                deleteRow(item.id)
                            }
                        >
                            <Text style={styles.buttonText}>
                                Delete
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}

                {/* Final Submitted View */}
                {item.submitted && !item.expanded && (
                    <View style={styles.resultContainer}>

                        <Text style={styles.resultText}>
                            Task: {item.Task}
                        </Text>

                        <Text style={styles.resultText}>
                            Maintenance Required: {item.selection}
                        </Text>

                        {item.selection === 'Yes' && (
                            <Text style={styles.resultText}>
                                Priority: {item.priority}
                            </Text>
                        )}

                        {item.selection === 'No' && (
                            <Text style={styles.resultText}>
                                Target Date: {item.date.toDateString()}
                            </Text>
                        )}

                    </View>
                )}

            </View>
        );
    };

    return (
        <View style={styles.container}>

            {/* Add Row Button */}
            <TouchableOpacity
                style={styles.addButton}
                onPress={addRow}
            >
                <Text style={styles.addButtonText}>
                    + Add Maintenance Task
                </Text>
            </TouchableOpacity>

            {/* List */}
            <FlatList
                data={rows}
                keyExtractor={(item) => item.id}
                renderItem={renderRow}
                contentContainerStyle={{
                    paddingBottom: 100,
                }}
            />

        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 5,
        paddingTop: 5,
    },

    addButton: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
    },

    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },

    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        elevation: 3,
    },

    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 12,
        height: 45,
        marginRight: 10,
        backgroundColor: '#fff',
    },

    expandedContainer: {
        marginTop: 15,
    },

    label: {
        marginBottom: 8,
        fontWeight: '600',
    },

    dropdown: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
    },

    dateButton: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        justifyContent: 'center',
        paddingHorizontal: 12,
        marginBottom: 15,
        backgroundColor: '#fff',
    },

    okButton: {
        backgroundColor: 'green',
        padding: 14,
        borderRadius: 10,
        alignItems: 'center',
    },

    okButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },

    resultContainer: {
        marginTop: 15,
        backgroundColor: '#f9f9f9',
        padding: 12,
        borderRadius: 10,
    },

    resultText: {
        fontSize: 15,
        marginBottom: 6,
    },
    editButton: {
        flex: 1,
        backgroundColor: '#FF9500',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginRight: 5,
    },
    deleteButton: {
        flex: 1,
        backgroundColor: 'red',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
});