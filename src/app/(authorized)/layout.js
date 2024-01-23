import SideBar from "../components/SideBar";

export default async function Layout({ children }) {
  return (
    <>
      <SideBar />
      {children}
    </>
  );
}
