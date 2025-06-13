import "@/styles/globals.css";
import type { AppProps } from "next/app";
import useAuthGuard from "@/utils/authGuard";

export default function App({ Component, pageProps }: AppProps) {
    // useAuthGuard();
    return <Component {...pageProps} />;
}


