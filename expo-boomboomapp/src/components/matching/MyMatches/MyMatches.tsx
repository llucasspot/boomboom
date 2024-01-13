import { Screen } from "../../navigation/Screen";

type MyMatchesProps = {
  onBack: () => void;
};

export function MyMatches({ onBack }: MyMatchesProps) {
  return (
    <Screen title="Matches" onGoBack={onBack}>
      {/* TODO: Implement this view */}
    </Screen>
  );
}
