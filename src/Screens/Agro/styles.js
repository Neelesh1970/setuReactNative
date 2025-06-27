import { StyleSheet } from "react-native";
import { normalize } from "../../Utils/normalize";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    body: {
        padding: normalize(20),
        backgroundColor: '#f3f3f3',

    },
    contentContainer: {
        borderWidth: 1,
        borderColor: '#c9c5c5',
        borderRadius: 8,
        padding: normalize(10),
        marginBottom: normalize(20),
        backgroundColor: '#fff',
    },
    textLabel: {
        fontSize: normalize(18),
        fontWeight: 'semibold',
        paddingVertical: normalize(5),
    },
    textDescription: {
        color: '#969393',
        paddingVertical: normalize(5),
    },
    productCardmainContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },

    knowledgeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: normalize(10),
    },
    Image1: {
        width: normalize(80),
        height: normalize(80),
        resizeMode: 'cover',
        alignSelf: 'center',
        borderRadius: 25,
    },
    knowledgeDesc: {
        width: normalize(170),
    },
    label: {
        fontSize: normalize(14),
        fontWeight: 'bold'
    },
    desc: {
        fontSize: normalize(13),
        color: '#969393',
    },
    expertDesc: {
        width: normalize(190)
    },
    expertContainer: {
        flexDirection: 'row',
    }
})