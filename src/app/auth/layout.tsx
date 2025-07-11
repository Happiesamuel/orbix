import SideImage from "@/components/auth/SideImage";
import React from "react";

export default function layout({ children }: { children: React.ReactElement }) {
  return (
    <html>
      <body>
        <div className="flex items-center min-h-screen max-w-[144rem] mx-auto my-0">
          <SideImage />
          <main className="w-full">{children}</main>
        </div>
      </body>
    </html>
  );
}
