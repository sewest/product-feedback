import { useState } from "react";
import { useAppState } from "../../context/AppContext";
import RoadmapCard from "../cards/roadmapCard/RoadmapCard";
import Title from "../title/Title";
import Text from "../text/Text";
import styles from "./tabs.module.css";

export default function Tabs() {
  const state = useAppState();
  const [activeTab, setActiveTab] = useState("planned");
  const tabs = [
    { id: "planned", label: "Planned" },
    { id: "in-progress", label: "In-Progress" },
    { id: "live", label: "Live" },
  ];

  const handleClick = (tabId) => {
    setActiveTab(tabId);
  };

  const filteredData = getDataByStatus(state, activeTab);

  return (
    <>
      <nav role="tablist">
        {tabs.map((tab) => (
          <a key={tab.id} href={`#${tab.id}`} aria-controls="tabContent" id={`${tab.id}Tab`} role="tab" onClick={() => handleClick(tab.id)} className={`${activeTab === tab.id ? styles.activeTab : styles.inactiveTab} ${styles[activeTab]}`}>
            {tab.label} ({getDataByStatus(state, tab.id).length})
          </a>
        ))}
      </nav>
      <div id="content" aria-live="polite" role="region">
        <section id="tabContent" role="tabpanel">
          <Title order={3} color="dark" size="lg">
            {`${capitalizeStatus(activeTab)} (${filteredData.length})`}
          </Title>
          {activeTab === "in-progress" && <Text size="sm">Features currently being developed</Text>}
          {activeTab === "live" && <Text size="sm">Released features</Text>}
          {activeTab === "planned" && <Text size="sm">Ideas prioritized for research</Text>}
          {filteredData.map((item) => (
            <RoadmapCard key={item.id} data={item} />
          ))}
        </section>
      </div>
    </>
  );
}

//TODO: This is duplicated. Move these to context file
const getDataByStatus = (state, status) => {
  return state.productRequests.filter((item) => item.status === status);
};

function capitalizeStatus(status) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}
