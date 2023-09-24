import { useState } from "react";
import { useAppState } from "../../context/AppContext";
import useCapitalizeFirstLetter from "../../hooks/useCapitalizeFirstLetter";
import RoadmapCard from "../cards/roadmapCard/RoadmapCard";
import Title from "../title/Title";
import Text from "../text/Text";
import styles from "./tabs.module.css";

export default function Tabs() {
  // Access the 'getDataByStatus' function from the 'useAppState' hook
  const { getDataByStatus } = useAppState();

  // Set the initial state of 'activeTab' to "planned"
  const [activeTab, setActiveTab] = useState("planned");

  // Access the 'capitalizeFirstLetter' function from the 'useCapitalizeFirstLetter' hook
  const capitalizeFirstLetter = useCapitalizeFirstLetter();

  // Define an array of tabs with their corresponding 'id' and 'label'
  const tabs = [
    { id: "planned", label: "Planned" },
    { id: "in-progress", label: "In-Progress" },
    { id: "live", label: "Live" },
  ];

  // Define a function to handle tab click events
  const handleClick = (tabId) => {
    setActiveTab(tabId);
  };

  // Get filtered data based on the 'activeTab'
  const filteredData = getDataByStatus(activeTab);

  return (
    <>
      {/* Render navigation for tabs */}
      <nav role="tablist">
        {tabs.map((tab) => (
          <a key={tab.id} href={`#${tab.id}`} aria-controls="tabContent" id={`${tab.id}Tab`} role="tab" onClick={() => handleClick(tab.id)} className={`${activeTab === tab.id ? styles.activeTab : styles.inactiveTab} ${styles[activeTab]}`}>
            {/* Render tab label and the count of data items */}
            {tab.label} ({getDataByStatus(tab.id).length})
          </a>
        ))}
      </nav>
      {/* Render tab content */}
      <div id="content" aria-live="polite" role="region">
        <section id="tabContent" role="tabpanel">
          {/* Render the title of the active tab */}
          <Title order={3} color="dark" size="lg">
            {`${capitalizeFirstLetter(activeTab)} (${filteredData.length})`}
          </Title>
          {/* Render additional text for specific tabs */}
          {activeTab === "in-progress" && <Text size="sm">Features currently being developed</Text>}
          {activeTab === "live" && <Text size="sm">Released features</Text>}
          {activeTab === "planned" && <Text size="sm">Ideas prioritized for research</Text>}
          {/* Render RoadmapCard components for each item in the filtered data */}
          {filteredData.map((item) => (
            <RoadmapCard key={item.id} data={item} />
          ))}
        </section>
      </div>
    </>
  );
}
