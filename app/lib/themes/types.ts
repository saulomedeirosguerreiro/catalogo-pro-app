export interface Theme {
  name: string;
  initials: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
  fontFamily: string;
}
