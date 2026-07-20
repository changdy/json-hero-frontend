import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./routes/RootLayout";
import HomePage from "./routes/HomePage";
import NewPage from "./routes/NewPage";
import JsonDocPage from "./routes/JsonDocPage";
import JsonDocColumnView from "./routes/JsonDocColumnView";
import JsonDocEditor from "./routes/JsonDocEditor";
import JsonDocTree from "./routes/JsonDocTree";
import NotFoundPage from "./routes/NotFoundPage";
import PrivacyPage from "./routes/PrivacyPage";
import TerminalView from "./routes/TerminalView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="new" element={<NewPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="j/:id" element={<JsonDocPage />} errorElement={<NotFoundPage />}>
            <Route index element={<JsonDocColumnView />} />
            <Route path="editor" element={<JsonDocEditor />} />
            <Route path="terminal" element={<TerminalView />} />
            <Route path="tree" element={<JsonDocTree />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
