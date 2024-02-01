import BottomBar from "../components/Mobile/BottomBar";
import TopBar from "../components/Mobile/TopBar";
import SideBar from "../components/SideBar";

export default async function Layout({ children }) {
  return (
    <>
      <SideBar />
      <TopBar />
      {children}
      <BottomBar />
    </>
  );
}
