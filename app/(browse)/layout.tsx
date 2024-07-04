import React, { Suspense } from "react";
import { Navbar } from "./_components/navbar";
import Sidebar, { SidebarSkeleton } from "./_components/sidebar";
import { Container } from "./_components/Container";

const BrowseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="flex h-full ">
        <Suspense fallback={<SidebarSkeleton/>} >
          <Sidebar />
          <Container>{children}</Container>
        </Suspense>
      </div>
    </>
  );
};

export default BrowseLayout;
