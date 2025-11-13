import { Merriweather, Montserrat, Source_Code_Pro } from "next/font/google";

export const fontMontserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontSourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const fontMerriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-serif",
});
