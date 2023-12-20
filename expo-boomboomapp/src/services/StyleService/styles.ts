import useEStyles from "../../hooks/useEStyles";

const STYLES = {
    H1: {
        fontSize: '$h1FontSize',
        color: '$secondaryColor',
        fontWeight: 'bold',
    },
    H2: {
        fontSize: '$h2FontSize',
        color: '$secondaryColor',
    },
    H3: {
        fontSize: '$h3FontSize',
        color: '$secondaryColor',
        fontWeight: 'bold',
    },
    P: {
        fontSize: '$pFontSize',
        color: '#000',
        opacity: .5
    },
    F13: {
        fontSize: 13,
        color: '$secondaryColor',
    },
    F15: {
        fontSize: 15,
        color: '$secondaryColor',
    },
    F16: {
        fontSize: 16,
        color: '#000',
    },
    FONT_INPUT: {
        fontSize: 13,
        color: '$secondaryColor',
    },
    FONT_SONGTITLE: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    INPUT_TEXT: {
        borderBottomWidth: 1,
        paddingVertical: '0.8rem',
        borderColor: '$borderColor',
        fontSize: 12,
        color: '$secondaryColor',
    },
    SONG_CARD: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '$borderColor',
        borderRadius: 16,
        padding: 10,
        shadowColor: '#696969',
        shadowRadius: 20,
        shadowOpacity: 0.1,
        shadowOffset: {height: 0, width: 0},
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 10,
    },
    SONG_CARD_IMAGE: {
        width: 60,
        height: 60,
        borderRadius: 10,
    },
    MATCHING_CARD: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 24,
        alignItems: 'center',
        gap: 20,
        paddingTop: 20,
        shadowColor: '#b9b9b9',
        shadowRadius: 20,
        shadowOpacity: .4,
        shadowOffset: {height: 20, width: 0},
        elevation: 10,
    },
}

export const useCoreStyles = () => {
    return useEStyles(STYLES)
}

