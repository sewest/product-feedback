import { useState } from "react";
import RoadmapCard from "../roadmapCard/RoadmapCard";
import Title from "../title/Title";
import data from "../../assets/data/data.json";
import styles from "./tabs.module.css";

export default function Tabs() {
  const [activeTab, setActiveTab] = useState("planned");
  const tabs = [
    { id: "planned", label: "Planned" },
    { id: "in-progress", label: "In-Progress" },
    { id: "live", label: "Live" },
  ];

  const handleClick = (tabId) => {
    setActiveTab(tabId);
  };

  const filteredData = getDataByStatus(activeTab);

  return (
    <>
      <nav role="tablist">
        {tabs.map((tab) => (
          <a key={tab.id} href={`#${tab.id}`} aria-controls="tabContent" id={`${tab.id}Tab`} role="tab" onClick={() => handleClick(tab.id)} className={`${activeTab === tab.id ? styles.activeTab : styles.inactiveTab} ${styles[activeTab]}`}>
            {tab.label} ({getDataByStatus(tab.id).length})
          </a>
        ))}
      </nav>
      <div id="content" aria-live="polite" role="region">
        <section id="tabContent" role="tabpanel">
          <Title order={3} color="dark" size="lg">
            {`${capitalizeStatus(activeTab)} (${filteredData.length})`}
          </Title>
          {activeTab === "in-progress" && <p>Features currently being developed</p>}
          {activeTab === "live" && <p>Released features</p>}
          {activeTab === "planned" && <p>Ideas prioritized for research</p>}
          {filteredData.map((item) => (
            <RoadmapCard key={item.id} data={item} />
          ))}
        </section>
      </div>
    </>
  );
}

const getDataByStatus = (status) => {
  return data.productRequests.filter((item) => item.status === status);
};

function capitalizeStatus(status) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}
