import { Geist } from "next/font/google";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


// Root layout — csak html+body wrapper, locale nélkül.
// A tényleges tartalom a [locale]/layout.tsx-ben van.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
