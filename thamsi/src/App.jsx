import { BrowserRouter, Routes, Route } from "react-router-dom";
import Page1 from "./page1";
import Page2 from "./page2";
import Page3 from "./page3";
import Page4 from "./page4";
import Page5 from "./page5";
import Page6 from "./page6";
import Container from "./container";

// ✅ Wraps pages that need the sidebar
function WithSidebar({ children }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Container />
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ✅ Login — fullscreen, no sidebar */}
        <Route path="/" element={<Page1 />} />

        {/* ✅ All other pages — with sidebar */}
        <Route path="/page2" element={<WithSidebar><Page2 /></WithSidebar>} />
        <Route path="/page3" element={<WithSidebar><Page3 /></WithSidebar>} />
        <Route path="/page4" element={<WithSidebar><Page4 /></WithSidebar>} />
        <Route path="/page5" element={<WithSidebar><Page5 /></WithSidebar>} />
        <Route path="/page6" element={<WithSidebar><Page6 /></WithSidebar>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;