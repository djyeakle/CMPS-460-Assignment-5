import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen({ navigation }: any) {
  interface Teas {
    id: string;
    title: string;
    price: string;
  }

  const [teas, setTeas] = useState<Teas[]>([]);
  const [teaName, setTeaName] = useState("");
  const [teaPrice, setTeaPrice] = useState("");

  const addTea = (teaName: string, teaPrice: string) => {
    if (!teaName.trim() || !teaPrice.trim()) {
      Alert.alert(
        "Validation Error",
        "Please enter both a tea name and a tea price."
      );
      return;
    }

    const newTea = {
      id: Date.now().toString(),
      title: teaName,
      price: teaPrice,
    };

    setTeas([...teas, newTea]);
    setTeaName("");
    setTeaPrice("");
  };

  const deleteTea = (id: string) => {
    setTeas(teas.filter((tea) => tea.id !== id));
  };

  const saveTeas = async (tasks: Teas[]) => {
    try {
      await AsyncStorage.setItem("teas", JSON.stringify(tasks));
    } catch (error) {
      console.log("Error saving teas:", error);
    }
  };

  const loadTeas = async () => {
    try {
      const savedTeas = await AsyncStorage.getItem("teas");

      if (savedTeas !== null) {
        setTeas(JSON.parse(savedTeas));
      }
    } catch (error) {
      console.log("Error loading tasks:", error);
    }
  };

  useEffect(() => {
    loadTeas();
  }, []);

  useEffect(() => {
    saveTeas(teas);
  }, [teas]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.title}>My Favorite Teas</Text>
        <FlatList
          data={teas}
          ListEmptyComponent={
            <Text style={styles.emptyComponent}>No teas have been added.</Text>
          }
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.taskContainer}>
              <Text style={styles.taskTitle}>{item.title}</Text>
              <Text style={styles.taskTitle}>${item.price}</Text>
              <Button
                title="Delete"
                onPress={() => deleteTea(item.id)}
                color="red"
              ></Button>
              <Button
                title="Details"
                onPress={() =>
                  navigation.navigate("Details", {
                    teaName: item.title,
                    teaPrice: item.price,
                  })
                }
                color="#462b5c"
              ></Button>
            </View>
          )}
        />
      </View>
      <View>
        <Text style={styles.formTitle}>Add a tea here:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={teaName}
            onChangeText={(text) => setTeaName(text)}
            placeholder="Enter tea name"
            style={styles.input}
          ></TextInput>
          <TextInput
            value={teaPrice}
            onChangeText={(text) => setTeaPrice(text)}
            placeholder="Enter tea price"
            style={styles.input}
          ></TextInput>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => addTea(teaName, teaPrice)}
            title="Add Tea"
            color="#462b5c"
          ></Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    padding: 30,
  },
  topSection: {
    marginBottom: 150,
  },
  title: {
    fontSize: 36,
    textAlign: "center",
    marginBottom: 50,
    fontWeight: "bold",
  },
  taskContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  taskTitle: {
    fontSize: 20,
  },
  emptyComponent: {
    fontSize: 20,
  },
  formTitle: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  inputContainer: {
    padding: 20,
  },
  input: {
    fontSize: 18,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  buttonContainer: {
    padding: 50,
  },
});
