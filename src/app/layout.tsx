// import type { Metadata } from "next";
// import Themeprovider from "@/provider/theme_provider";
// import "./globals.css";
// import { ClerkProvider } from "@clerk/nextjs";
// import LayoutProvider from "@/provider/layout_provider";
// import { ConfigProvider } from 'antd'; 

// export const metadata: Metadata = {
//   title: "Crowdfunding",
//   description: "Generated by create next app",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode; 
// }>) {
//   return (
//     <ClerkProvider>
//     <html lang="en">
//       <body>
//         <ConfigProvider>
//      <Themeprovider>
//       <LayoutProvider>
//         {children}
//         </LayoutProvider>
//      </Themeprovider>
//      </ConfigProvider>
//       </body>
//     </html>
//     </ClerkProvider>
//   );
// }

import { ConfigProvider } from 'antd';  // Import ConfigProvider
import ThemeProvider from "@/provider/theme_provider";
import LayoutProvider from "@/provider/layout_provider";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Metadata } from "next";
import 'remixicon/fonts/remixicon.css';

export const metadata: Metadata = {
  title: "Crowdfunding",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <ConfigProvider>  {/* Wrap your app with ConfigProvider */}
            <ThemeProvider>
              <LayoutProvider>
                {children}
              </LayoutProvider>
            </ThemeProvider>
          </ConfigProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
