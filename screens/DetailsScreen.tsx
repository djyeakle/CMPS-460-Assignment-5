import { StyleSheet, View, Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DetailsScreen({ navigation, route }: any) {
  const { teaName, teaPrice } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Tea Details</Text>
      <Text style={styles.details}>Tea Name: {teaName}</Text>
      <Text style={styles.details}>Tea Price: {teaPrice}</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Back"
          onPress={() => navigation.navigate("Home")}
          color="#462b5c"
        ></Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    padding: 30,
  },
  title: {
    fontSize: 36,
    textAlign: "center",
    marginBottom: 50,
    fontWeight: "bold",
  },
  details: {
    fontSize: 20,
    textAlign: "left",
    marginBottom: 10,
  },
  buttonContainer: {
    padding: 50,
  },
});
