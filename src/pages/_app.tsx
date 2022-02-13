import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../sections/Layout/Layout";
import ProjectContext, { ProjectContextInterface } from "../contexts/ProjectContext";
import useProject from "./../hooks/use-project";

const SafeHydrate: React.FC = ({ children }) => {
  return <div suppressHydrationWarning>{typeof window === "undefined" ? null : children}</div>;
};

function MyApp({ Component, pageProps }: AppProps) {
  const { currentProject, setCurrentProject } = useProject();
  const projectContext: ProjectContextInterface = {
    currentProject,
    setCurrentProject,
  };

  return (
    <ProjectContext.Provider value={projectContext}>
      <SafeHydrate>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SafeHydrate>
    </ProjectContext.Provider>
  );
}

export default MyApp;
