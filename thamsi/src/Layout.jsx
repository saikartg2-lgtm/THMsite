import Container from "./container";

export default function Layout({ children }) {
  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <Container />

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
