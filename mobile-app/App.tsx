import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { DarkTheme, Provider as PaperProvider } from 'react-native-paper';

export default function App() {
    return (
        <PaperProvider theme={DarkTheme}>
            <View style={styles.container}>
                
                <StatusBar style="auto" />
            </View>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
