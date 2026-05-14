import React, { use, useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import Typo from './Typo';
import { colors } from '@/constants/theme';
import { useAuth } from '@/contexts/authContext';
import { ScrollView } from 'react-native';
import CompoQaTable from './CompoQaTable';
import VisualCheck from './VisualCheck';
import BaseAlign from './BaseAlign';
import CavityCore from './CavityCore';
import CoolSystem from './CoolSystem';
import EjectionSystem from './EjectionSystem';
import MechanismCheck from './MechanismCheck';
import HydraulicCore from './HydraulicCore';
import CollapsibleCore from './CollapsibleCore';
import PreventiveMaint from './PreventiveMaint';
import Button from "@/components/Button";


const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
];

interface MouldItem {
    nombre: string;
    valor: string;
}

const DropdownComponent = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuth();
    const [value, setValue] = useState<string | null>(null);
    const [isFocus, setIsFocus] = useState(false);

    const [mouldData, setMouldData] = useState<MouldItem[]>([]);

    useEffect(() => {
        getAllMouldData();
    }, []);

    const getAllMouldData = async () => {
        const result = await axios.get('https://dolarapi.com/v1/dolares');
        setMouldData(result.data);
        console.log('mould data', result.data);
        console.log('mould data', mouldData);
    }
    const handleLogin = async () => {

        setIsLoading(true);
        setIsLoading(false);
    };
    return (
        <FlatList
            data={[{ id: 'main' }]}
            renderItem={() => null}

            ListHeaderComponent={
                <><View style={styles.container}>
                    <Typo color={colors.black} size={18} fontWeight={"600"} style={{ marginBottom: 8 }}>
                        Vendor Name - {user?.name || 'User'}
                    </Typo>
                    <View>
                        <Dropdown
                            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={mouldData.map((item) => ({ label: item.nombre, value: item.valor }))} // Assuming 'nombre' is the label and 'valor' is the value
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus ? 'Select item' : '...'}
                            searchPlaceholder="Search..."
                            value={value}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                setValue(item.value);
                                setIsFocus(false);
                            }} />
                    </View>
                    <Typo color={colors.black} size={18} fontWeight={"600"} style={{ marginTop: 8 }}>
                        Mould Name - Example
                    </Typo>
                    <Typo color={colors.black} size={18} fontWeight={"600"} style={{ marginTop: 8 }}>
                        Asset Code - Example
                    </Typo>
                    <Typo color={colors.black} size={18} fontWeight={"600"} style={{ marginTop: 8 }}>
                        Mould Type - Example
                    </Typo>
                    <Typo color={colors.black} size={18} fontWeight={"600"} style={{ marginTop: 8 }}>
                        Runner System - Example
                    </Typo>
                    <Typo color={colors.black} size={18} fontWeight={"600"} style={{ marginTop: 8 }}>
                        Part Name - Example
                    </Typo>
                    <Typo color={colors.black} size={18} fontWeight={"600"} style={{ marginTop: 8 }}>
                        Mould Size - Example
                    </Typo>
                    <Typo color={colors.black} size={18} fontWeight={"600"} style={{ marginTop: 8 }}>
                        Mould Weight - Example
                    </Typo>
                    <Typo color={colors.black} size={18} fontWeight={"600"} style={{ marginTop: 8 }}>
                        Number of Cavities - Example
                    </Typo>
                    <Typo color={colors.black} size={18} fontWeight={"600"} style={{ marginTop: 8 }}>
                        Date of Inspection - Example
                    </Typo>
                    <Typo color={colors.black} size={18} fontWeight={"600"} style={{ marginTop: 8 }}>
                        Inspected By - {user?.name || 'User'}
                    </Typo>
                </View>
                    <View style={styles.header}>
                        <Typo color={colors.black} size={18} fontWeight={"600"} style={{ marginBottom: 8, justifyContent: 'center', alignItems: 'center' }}>
                            Component Quality Details
                        </Typo>
                    </View>
                    <View style={styles.container}>
                        <View>
                            <CompoQaTable />
                        </View>
                    </View>
                    <View style={styles.header}>
                        <Typo color={colors.black} size={18} fontWeight={"600"} style={{ marginBottom: 8, justifyContent: 'center', alignItems: 'center' }}>
                            Visual & Basic Condition Check In Mould
                        </Typo>
                    </View><View style={styles.container}>
                        <View>
                            <VisualCheck />
                        </View>
                    </View><View style={styles.header}>
                        <Typo color={colors.black} size={18} fontWeight={"600"} style={{ marginBottom: 8, justifyContent: 'center', alignItems: 'center' }}>
                            Mould Base & Alignment Check
                        </Typo>
                    </View><View style={styles.container}>
                        <View>
                            <BaseAlign />
                        </View>
                    </View><View style={styles.header}>
                        <Typo color={colors.black} size={18} fontWeight={"600"} style={{ marginBottom: 8, justifyContent: 'center', alignItems: 'center' }}>
                            Cavity & Core Condition Check Points
                        </Typo>
                    </View><View style={styles.container}>
                        <View>
                            <CavityCore />
                        </View>
                    </View><View style={styles.header}>
                        <Typo color={colors.black} size={18} fontWeight={"600"} style={{ marginBottom: 8, justifyContent: 'center', alignItems: 'center' }}>
                            Cooling System Check Points
                        </Typo>
                    </View><View style={styles.container}>
                        <View>
                            <CoolSystem />
                        </View>
                    </View><View style={styles.header}>
                        <Typo color={colors.black} size={18} fontWeight={"600"} style={{ marginBottom: 8, justifyContent: 'center', alignItems: 'center' }}>
                            Ejection System Check Points
                        </Typo>
                    </View><View style={styles.container}>
                        <View>
                            <EjectionSystem />
                        </View>
                    </View>
                    <View style={styles.header}>
                        <Typo color={colors.black} size={15} fontWeight={"600"} style={{ marginBottom: 8, justifyContent: 'center', alignItems: 'center' }}>
                            Mechanism Check Points (as per mould type)
                        </Typo>
                        <Typo color={colors.black} size={15} fontWeight={"600"} style={{ marginBottom: 8, justifyContent: 'center', alignItems: 'center' }}>
                            For 3 Plate / Hot Runner
                        </Typo>
                    </View>
                    <View style={styles.container}>
                        <View>
                            <MechanismCheck />
                        </View>
                    </View>
                    <View style={styles.header}>
                        <Typo color={colors.black} size={15} fontWeight={"600"} style={{ marginBottom: 8, justifyContent: 'center', alignItems: 'center' }}>
                            For Hydraulic Core Pull / Slides in Type Mould
                        </Typo>
                    </View>
                    <View style={styles.container}>
                        <View>
                            <HydraulicCore />
                        </View>
                    </View>
                    <View style={styles.header}>
                        <Typo color={colors.black} size={15} fontWeight={"600"} style={{ marginBottom: 8, justifyContent: 'center', alignItems: 'center' }}>
                            For Collapsible Core Type Mould
                        </Typo>
                    </View>
                    <View style={styles.container}>
                        <View>
                            <CollapsibleCore />
                        </View>
                    </View>
                    <View style={styles.header}>
                        <Typo color={colors.black} size={15} fontWeight={"600"} style={{ marginBottom: 8, justifyContent: 'center', alignItems: 'center' }}>
                            Preventive Maintenance Required or NOT
                        </Typo>
                    </View>
                    <View style={styles.container}>
                        <View>
                            <PreventiveMaint />
                        </View>
                    </View>
                    <View style={styles.header}>
                        <Typo color={colors.black} size={15} fontWeight={"600"} style={{ marginBottom: 8, justifyContent: 'center', alignItems: 'center' }}>
                            Inspected By - {user?.name || 'User'}
                        </Typo>
                        <Typo color={colors.black} size={15} fontWeight={"600"} style={{ marginBottom: 8, justifyContent: 'center', alignItems: 'center' }}>
                            <Date>{new Date().toLocaleDateString()}</Date>
                        </Typo>
                    </View>
                    <View>
                        <Button loading={isLoading} onPress={handleLogin}>
                            <Typo size={20} color={colors.black} fontWeight={"600"} style={{ width: 100, textAlign: 'center' }}>
                                Submit
                            </Typo>
                        </Button>
                    </View>
                </>
            }
        />
    );
};

export default DropdownComponent;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 16,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        fontWeight: '600',
        backgroundColor: colors.neutral100,
        padding: 5,
        borderRadius: 8,
    }
});