const styles = {
    mapPageWrapper: {
        display: 'flex',

    },
    mapWrapper: {
        height: '100vh',
        width: '60vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    mapHeader: {
        position: 'fixed',
        top: '0vh'
    },

    searchButton: {
        display: 'flex',
        alignItems: 'center',
        height: '100vh',
        position: 'fixed',
        right: '0',

    },

    searchWrapper: {
        display: 'flex',
        width: '27vw',
        height: '70vh',
        textAlign: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        justifyItems: 'center',
        color: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '30px'
    }
}

export default styles;