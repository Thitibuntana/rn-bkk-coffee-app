import { supabase } from "@/services/supabase";
import { CoffeeShop } from "@/type";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Home() {
  const [shops, setShops] = useState<CoffeeShop[]>([]);

  useEffect(() => {
    const fetchCoffeeShops = async () => {
      const { data, error } = await supabase
        .from("coffee_shops")
        .select("*")
        .order("name", { ascending: true });
      if (error) {
        alert("Error fetching coffee shops: " + error.message);
      } else {
        setShops(data || []);
      }
    };
    fetchCoffeeShops();
  }, []);

  const renderShopItem = ({ item }: { item: CoffeeShop }) => (
    <TouchableOpacity
      style={styles.shopItem}
      onPress={() =>
        router.push({
          pathname: "/detail",
          params: {
            id: item.id,
            name: item.name,
            district: item.district,
            description: item.description,
            phone: item.phone,
            image_url: item.image_url,
            latitude: item.latitude,
            longitude: item.longitude,
          },
        })
      }
    >
      <Image source={{ uri: item.image_url }} style={styles.shopImage} />
      <Text style={styles.shopName}>{item.name}</Text>
      <Text style={styles.shopDistrict}>{item.district}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        data={shops}
        keyExtractor={(item) => item.id}
        renderItem={renderShopItem}
        contentContainerStyle={styles.container}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  shopItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    width: "100%",
  },
  shopImage: {
    width: 75,
    height: 75,
    marginRight: 10,
  },
  shopName: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Kanit_400Regular",
    color: "#333",
  },
  shopDistrict: {
    color: "#555",
    fontFamily: "Kanit_400Regular",
  },
});
