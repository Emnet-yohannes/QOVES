export interface FAQItemType {
  question: string;
  answer: string;
}

export interface FAQCategoryType {
  title: string;
  items?: FAQItemType[];
}