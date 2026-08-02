import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface Props {
  suggestions: string[];
}

export default function AISuggestions({
  suggestions,
}: Props) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle>AI Suggestions</CardTitle>
      </CardHeader>

      <CardContent>
        {suggestions.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No suggestions available.
          </p>
        ) : (
          <ul className="space-y-3 list-disc pl-5">
            {suggestions.map((item, index) => (
              <li
                key={index}
                className="text-sm"
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}