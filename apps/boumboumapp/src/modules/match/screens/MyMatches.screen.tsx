import { Screen } from "#modules/match/components/Screen/Screen";

type MyMatchesProps = {
  onBack: () => void;
};

export function MyMatchesScreen({ onBack }: MyMatchesProps) {
  return (
    <Screen title="Matches" onGoBack={onBack}>
      {/* TODO: Implement this view */}
    </Screen>
  );
}
