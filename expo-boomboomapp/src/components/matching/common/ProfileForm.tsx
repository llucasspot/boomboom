import { useState } from "react";
import { Text, TextInput, View } from "react-native";

import { useCoreStyles } from "../../../services/StyleService/styles";

// TODO add styles pattern and I18n

export function ProfileForm() {
  const coreStyles = useCoreStyles();

  const [fullName, setFullName] = useState("");
  const [description, setDescription] = useState("");

  return (
    <View style={{ gap: 20 }}>
      <View>
        <Text style={{ ...coreStyles.P }}>Full name</Text>
        <TextInput
          style={{ ...coreStyles.INPUT_TEXT }}
          onChangeText={setFullName}
          value={fullName}
        />
      </View>

      <View>
        <Text style={{ ...coreStyles.P }}>Date of birth</Text>
      </View>

      <View>
        <Text style={coreStyles.P}>Brief description</Text>
        <TextInput
          style={{ ...coreStyles.INPUT_TEXT }}
          onChangeText={setDescription}
          value={description}
        />
      </View>
    </View>
  );
}
