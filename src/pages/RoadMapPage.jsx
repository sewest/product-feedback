import Toolbar from "../components/toolbar/Toolbar";
import Tabs from "../components/tabs/Tabs";
import RoadmapGrid from "../components/roadmapGrid/RoadmapGrid";
/**
 * Renders the RoadmapPage component, which displays the main roadmap page.
 *
 * @return {JSX.Element} The JSX element representing the RoadmapPage component.
 */
export default function RoadmapPage() {
  return (
    <>
      <Toolbar />
      <Tabs />
      <RoadmapGrid />
    </>
  );
}
