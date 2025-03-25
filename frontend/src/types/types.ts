export interface itemsType {
        label: String,
}

export interface TabMenuTemplateOptions {
    index: number;
    selected: boolean;
    onClick: (event: React.MouseEvent<HTMLElement>) => void;
    disabled?: boolean;
    className?: string;
  }
