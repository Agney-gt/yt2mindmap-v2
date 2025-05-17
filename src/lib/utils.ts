import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function removeHeaders(text: string) {
  // List of headers to be removed (including a space after the colon)
  const headers = [
      "Quote: ", "Rhetoric: ", "Counterpoint: ", "Rhetoric: ","Real-world Example: ","Sociopolitical Factors: ",
      "Cultural Reference: ", "Sociopolitical Context: ", "Challenge: ", "Technology: ", "Limitation: ",
      "Misconception: ", "Framework: ", "Pitfall: ", "Analogy: ", 
      "Thought Leader: ", "Method: ", "Case Study: ","Anecdote: ",
      "Trend: ", "Nuanced Insight: ","Pattern: ", "Academic Theory: ",
      "Appeal to Logic: ","Complexity: ", "Paradox: ", "Event: ", "Contradiction: ",
      "Data Point: ", "Metaphor", "Technological Innovation: ", "Historical Context: ","Cultural Context: ",
      "Economic Insight: ", "Psychological Insight: ", "Philosophical Insight: ", "Evidence: ", "Statistical Insight: ",
  ];
   // Create a regex pattern by joining all headers with '|'
   const pattern = new RegExp(headers.join("|"), "g");
  
   // Replace all headers with an empty string
   return text.replace(pattern, "");
 
 }