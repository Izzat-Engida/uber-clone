import { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { icons } from "@/constants";
import { GoogleInputProps } from "@/types/type";

const OpenStreetInput = ({
  icon,
  initialLocation,
  containerStyle,
  textInputBackgroundColor,
  handlePress,
}: GoogleInputProps) => {
  const [query, setQuery] = useState(initialLocation || "");
  const [results, setResults] = useState<any[]>([]);

  const searchLocation = async (text: string) => {
    setQuery(text);

    if (text.length < 3) {
      setResults([]);
      return;
    }

    try {
     const response = await fetch(
  `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
    text
  )}&format=json&addressdetails=1&limit=5&countrycodes=et&accept-language=en`,
  {
    headers: {
      "User-Agent": "uber-clone-app",
      "Accept": "application/json",

    },
  }
);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Location search error:", error);
    }
  };

  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 50,
          borderRadius: 25,
          marginBottom: 10,
        },
        containerStyle,
      ]}
    >
      
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: textInputBackgroundColor || "white",
          borderRadius: 20,
          marginHorizontal: 20,
          width: "100%",
          paddingHorizontal: 15,
          shadowColor: "#d4d4d4",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        <Image
          source={icon ? icon : icons.search}
          style={{ width: 15, height: 15 }}
          resizeMode="contain"
        />

        <TextInput
          placeholder="Search"
          placeholderTextColor="gray"
          value={query}
          onChangeText={searchLocation}
          style={{
            flex: 1,
            fontSize: 16,
            fontWeight: "600",
            marginLeft: 10,
            paddingVertical: 10,
          }}
        />
      </View>

      {/* Dropdown */}
      {results.length > 0 && (
        <FlatList
          data={results}
          keyExtractor={(item) => item.place_id.toString()}
          style={{
            position: "absolute",
            top: 60,
            width: "90%",
            backgroundColor: textInputBackgroundColor || "white",
            borderRadius: 10,
            shadowColor: "#d4d4d4",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 5,
            zIndex: 99,
          }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                padding: 12,
                borderBottomWidth: 0.5,
                borderBottomColor: "#eee",
              }}
              onPress={() => {
                handlePress({
                  latitude: parseFloat(item.lat),
                  longitude: parseFloat(item.lon),
                  address: item.display_name,
                });

                setQuery(item.display_name);
                setResults([]);
              }}
            >
              <Text style={{ fontSize: 14 }}>
                {item.display_name}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default OpenStreetInput;