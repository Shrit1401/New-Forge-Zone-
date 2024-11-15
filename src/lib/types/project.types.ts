export interface StepItem {
  text: string;
  completed: boolean;
  slug: string;
}

export interface StepSection {
  title: string;
  items: StepItem[];
}
