import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button,Alert,Image  } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    Alert.alert(
      `ShopyCash Payment`,
      `Confirmar o pagamento de:\n${data}?`,
      [
        {
          text: `Cancelar`,
          onPress: () => Alert.alert("ShopyCash Payment","Pagamento Cancelado\n"),
          style: "cancel"
        },
        { text: "OK", onPress: () => Alert.alert("ShopyCash Payment","Pagamento Confirmado\nR$0,30 de cashback recebidos") }
      ],
      { cancelable: false }
    );

  };

  if (hasPermission === null) {
    return <Text>Solicitando permissão de câmera</Text>;
  }
  if (hasPermission === false) {
    return <Text>Sem acesso à câmera</Text>;
  }

  return (
    <View style={styles.container}>
      
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <Text style={{textAlign: 'center', fontSize: 15, color: "#ffffff", fontWeight: "bold"}}>Posicione o QR-CODE dentro da caixa!</Text>
        <Image style={{resizeMode:'contain', width:"90%"}} source={require("../assets/focus.png")}/>
      {scanned && <Button title={'Aperte para Scanear Novamente'} onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
});
