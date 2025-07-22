import { StyleSheet } from 'react-native';
import { ms } from "react-native-size-matters";


const styles = StyleSheet.create({
    scrollContent: {
        paddingBottom: ms(50),
    },
    container: {
        padding: ms(10),
        borderRadius: 8,
        margin: ms(10),
        borderColor: '#ddd',
    },
    title: {
        fontSize: ms(18),
        fontWeight: 'bold',
        marginBottom: ms(5),
    },
    description: {
        fontSize: ms(13),
        color: '#8C8C8C',
        lineHeight: ms(20),
    },

    horizontalLine: {
        borderBottomWidth: 1,
        borderBottomColor: '#8C8C8C',
        borderStyle: 'dotted',
        width: '90%',
        alignSelf: 'center',
    },

    card: {
        backgroundColor: '#fff',
        borderRadius: ms(10),
        padding: ms(10),
        margin: ms(10),
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: ms(80),
        height: ms(80),
        borderRadius: ms(8),
        marginRight: ms(10),
    },
    details: {
        flex: 1,
    },
    detailsdescription: {
        fontSize: ms(12),
        color: '#8C8C8C',
    },
    knowMore: {
        color: '#007BFF',
        fontWeight: 'bold',
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: ms(5),
    },
    price: {
        fontSize: ms(18),
        fontWeight: 'bold',
    },
    oldPrice: {
        fontSize: ms(14),
        color: '#888',
        textDecorationLine: 'line-through',
        marginLeft: ms(5),
    },
    button: {
        backgroundColor: '#1E57F1',
        borderRadius: 5,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: ms(10),
    },
    buttonText: {
        color: '#fff',
        fontSize: ms(16),
        fontWeight: 'bold',
    },

    // card

    cardContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: ms(10),
        padding: ms(15),
        margin: ms(10),
        elevation: 3,
    },
    productRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    productImage: {
        width: ms(90),
        height: ms(90),
        borderRadius: ms(10),
    },
    productTitle: {
        fontSize: ms(14),
        fontWeight: 'bold',
        color: '#000',
    },
    productDescription: {
        fontSize: ms(10),
        color: '#8C8C8C',
    },
    moreInfo: {
        color: '#007BFF',
        fontWeight: 'bold',
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    currentPrice: {
        margin: 5,
        fontSize: ms(16),
        fontWeight: 'bold',
        color: '#000',
    },
    originalPrice: {
        fontSize: ms(14),
        textDecorationLine: 'line-through',
        color: '#888',
        marginLeft: ms(8),
    },
    buyButton: {
        backgroundColor: '#1E5DA9',
        paddingVertical: ms(12),
        borderRadius: ms(5),
        alignItems: 'center',
        marginTop: ms(10),
    },
    buyButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: ms(16),
    },

    // Product details styles
    productDetailsContainer: {
        borderRadius: ms(10),
        paddingHorizontal: ms(15),
        margin: ms(10),
    },
    productRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    productDetailsImage: {
        width: ms(110),
        height: ms(130),
        borderRadius: ms(10),
    },
    productDetails: {
        flex: 1,
        marginLeft: ms(10),
    },
    productTitle: {
        fontSize: ms(16),
        fontWeight: 'bold',
        color: '#000',
    },
    nutrientHeading: {
        fontSize: ms(14),
        fontWeight: '600',
        color: '#555',
    },
    nutrientRow: {
        flexDirection: 'row',
    },
    nutrientBadge: {
        borderRadius: ms(8),
        padding: ms(5),
        marginRight: ms(10),
        alignItems: 'center',
        justifyContent: 'center',
    },
    nitrogenBadge: {
        backgroundColor: '#6189D9',
    },
    phosphorusBadge: {
        backgroundColor: '#F59753',
    },
    nutrientText: {
        fontSize: ms(14),
        fontWeight: 'bold',
        color: '#FFF',
    },
    nutrientSubText: {
        fontSize: ms(10),
        color: '#FFF',
    },
    pricedetailsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: ms(5),
    },
    buyButton: {
        backgroundColor: '#1E5DA9',
        paddingVertical: ms(10),
        paddingHorizontal: ms(20),
        borderRadius: ms(5),
    },
    buyButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: ms(14),
    },
    currentDetailsPrice: {
        fontSize: ms(16),
        fontWeight: 'bold',
        color: '#000',
    },
    originalDetailsPrice: {
        fontSize: ms(14),
        textDecorationLine: 'line-through',
        color: '#888',
        marginLeft: ms(8),
    },
    productDetailsDescription: {
        fontSize: ms(11),
        color: '#8C8C8C',
        marginTop: ms(5),
    },
    benefitContainer: {
        paddingHorizontal: ms(20),
        marginVertical: ms(20),
        marginBottom:ms(20)
    },
    benefitIconContainer: {
        height: ms(36),
        width: ms(36),
        borderRadius: '50%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
        elevation: 4,
    },
    benefittitle: {
        fontSize: ms(18),
        fontWeight: 'bold',
    },
    benefitsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: ms(10),
    },
    benefitCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: ms(10),
        padding: ms(10),
        width: '32%'
    },
    benefitIcon: {
        width: ms(30),
        height: ms(30),
        marginBottom: ms(8),
        borderRadius: ms(50),
        resizeMode: 'cover'
    },
    benefitText: {
        fontSize: ms(10),
        color: '#000000',
        fontWeight: 'bold',
        marginTop: ms(10),
        width: '70'
    },
    DAPcontainer: {
        borderRadius: ms(10),
        width: '100%'
    },
    DAPDetailsContainer: {
        position: 'absolute',
        top: ms(20),
        color: '#fff',
        width: '90%',
        alignSelf: 'center',
    },
    DAPtitleText: {
        fontSize: ms(18),
        fontWeight: 'bold',
        color: '#FFFFFF',
        alignSelf: 'center',
        marginBottom: ms(10)
    },
    DAPdescriptionText: {
        fontSize: ms(11),
        color: '#FFFFFF',
        alignSelf: 'center',
        marginVertical: ms(3),
        padding: ms(5),
        gap: ms(10)
    },

    knowledgesection: {
        marginHorizontal: ms(10),
      },
    knowledgeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: ms(5),
        padding: ms(10),
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        borderWidth: 2,
        borderColor: '#ececec',
        width: '100%'
    },
    Image1: {
        width: ms(90),
        height: ms(70),
        resizeMode: 'cover',
        alignSelf: 'center',
        borderRadius: 8,
    },
    knowledgeDesc: {
        width: ms(210),
    },
    label: {
        fontSize: ms(14),
        fontWeight: 'bold'
    },
    desc: {
        fontSize: ms(11),
        color: '#8C8C8C',
    },
})

export default styles;