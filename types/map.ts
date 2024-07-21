export type MapType = "text" | "image" | "video" | "movie" | "caseIntroduce";

export interface PreferenceMap {
  id: string;
  title: string;
  description: string;
  color: string;
  type: MapType;
  profileImage?: string;
  name?: string;
  summary?: string;
  content: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface FixedLayout {
  [key: string]: Omit<PreferenceMap, "id" | "color" | "content">[];
}

export interface LayoutSelectorProps {
  onSelectLayout: (layoutKey: string) => void;
}
