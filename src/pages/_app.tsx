import "../styles/globals.css";
import dynamic from "next/dynamic";
import type { AppProps } from "next/app";

import Layout from "../sections/Layout/Layout";

import { ProjectContext, ProjectContextInterface } from "../contexts/ProjectContext";
const PouchDBContext = dynamic(() => import("../components/PouchDB/PouchDB"), { ssr: false });

import useProject from "./../hooks/use-project";

// Safe Hydrate removes SSR
const SafeHydrate: React.FC = ({ children }) => {
  return <div suppressHydrationWarning>{typeof window === "undefined" ? null : children}</div>;
};

function MyApp({ Component, pageProps }: AppProps) {
  const {
    currentProject,
    setCurrentProject,
    currentPanels,
    setCurrentPanels,
    currentTasks,
    setCurrentTasks,
  } = useProject();

  const projectContext: ProjectContextInterface = {
    currentProject,
    setCurrentProject,
    currentPanels,
    setCurrentPanels,
    currentTasks,
    setCurrentTasks,
  };

  return (
    <PouchDBContext>
      <ProjectContext.Provider value={projectContext}>
        <SafeHydrate>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SafeHydrate>
      </ProjectContext.Provider>
    </PouchDBContext>
  );
}

export default MyApp;
