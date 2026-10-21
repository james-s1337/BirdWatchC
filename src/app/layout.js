import "./globals.css";

export const metadata = {
  title: "Bird Watch | Bird Photography",
  description:
    "Explore bird photography, featured local bird sightings, and photo shoots with Jamie Sint.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth scroll-pt-20 motion-reduce:scroll-auto">
      <body className="m-0 overflow-x-clip bg-paper font-body leading-[1.6] text-ink">
        {children}
      </body>
    </html>
  );
}
