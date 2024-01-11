import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useCoreStyles } from "../../../services/StyleService/styles";

const CONTENT_PADDING = 30;

type MyMatchesProps = {
  onBack: () => void;
};

// TODO add styles pattern and I18n

export function MyMatches({ onBack }: MyMatchesProps) {
  const coreStyles = useCoreStyles();

  return (
    <SafeAreaView style={{}}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: CONTENT_PADDING,
        }}
      >
        <Text style={coreStyles.H3}>Matches</Text>
        <TouchableOpacity onPress={onBack}>
          <Text>Back</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 20 }} />
    </SafeAreaView>
  );
}
