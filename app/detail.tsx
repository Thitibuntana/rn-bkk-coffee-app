import { useLocalSearchParams } from "expo-router";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import MapView, { Marker } from "react-native-maps";

export default function Detail() {
  const params = useLocalSearchParams();

  const handleMarkerPress = () => {
    const latitude = Number(params.latitude);
    const longitude = Number(params.longitude);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    const appleMapsUrl = `http://maps.apple.com/?ll=${latitude},${longitude}`;
    if (Platform.OS === "ios") {
      window.open(appleMapsUrl, "_self");
    } else {
      window.open(googleMapsUrl, "_self");
    }
  };

  return (
    <View>
      <ScrollView style={styles.container}>
        <Image
          source={{ uri: params.image_url as string }}
          style={styles.image}
        />
        <View style={{ padding: 18, gap: 10 }}>
          <Text style={styles.header}>Name: {params.name}</Text>
          <Text style={styles.subheader}>District: {params.district}</Text>
          <Text style={styles.text}>Description: {params.description}</Text>
          <Text style={styles.text}>Latitude: {params.latitude}</Text>
          <Text style={styles.text}>Longitude: {params.longitude}</Text>
          <TouchableOpacity
            style={{
              marginTop: 10,
              paddingVertical: 10,
              paddingHorizontal: 20,
              backgroundColor: "#00a510",
            }}
            onPress={() => {
              const phoneNumber = params.phone as string;
              const telUrl = `tel:${phoneNumber}`;
              window.open(telUrl, "_self");
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                fontFamily: "Kanit_400Regular",
                textAlign: "center",
              }}
            >
              📞 Call: {params.phone}
            </Text>
          </TouchableOpacity>
          <Text style={styles.header}>Map</Text>
          <View style={{ height: 300, borderRadius: 10, overflow: "hidden" }}>
            <MapView
              style={{ flex: 1 }}
              initialRegion={{
                latitude: Number(params.latitude),
                longitude: Number(params.longitude),
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <Marker
                coordinate={{
                  latitude: Number(params.latitude),
                  longitude: Number(params.longitude),
                }}
                title={params.name as string}
                description={params.description as string}
                onPress={handleMarkerPress}
              />
            </MapView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,

    backgroundColor: "#fff",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 16,
    marginRight: 16,
    marginTop: 6,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Kanit_400Regular",
    color: "#4A3B32",
  },
  subheader: {
    fontSize: 20,
    fontWeight: "600",
    fontFamily: "Kanit_400Regular",
    color: "#6F4E37",
  },
  text: {
    fontSize: 16,
    fontFamily: "Kanit_400Regular",
    color: "#333",
  },
});
