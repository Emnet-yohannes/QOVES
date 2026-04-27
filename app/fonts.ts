import localFont from "next/font/local";

export const zagmaMono = localFont({
  src: [
    {
      path: "../public/fonts/Zagma_Mono/F37ZagmaMonoTrial-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Zagma_Mono/F37ZagmaMonoTrial-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Zagma_Mono/F37ZagmaMonoTrial-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-zagma",
  display: "swap",
});

export const ppNeueMontreal = localFont({
  src: [
    {
      path: "../public/fonts/PP_Neue_Montreal/PPNeueMontreal-Thin.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/PP_Neue_Montreal/PPNeueMontreal-Book.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/PP_Neue_Montreal/PPNeueMontreal-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/PP_Neue_Montreal/PPNeueMontreal-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/PP_Neue_Montreal/PPNeueMontreal-Italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/PP_Neue_Montreal/PPNeueMontreal-SemiBolditalic.otf",
      weight: "600",
      style: "italic",
    },
  ],
  variable: "--font-pp",
  display: "swap",
});