import RoadmapCard from "../roadmapCard/RoadmapCard";
import data from "../../assets/data/data.json";
import Title from "../title/Title";
import styles from "./roadmapGrid.module.css";

export default function RoadmapGrid() {
  const categories = [
    { id: "planned", label: "Planned" },
    { id: "in-progress", label: "In-Progress" },
    { id: "live", label: "Live" },
  ];

  //   const filteredData = getDataByStatus(activeTab);

  return (
    <div className={styles.roadmapGrid}>
      {categories.map((category) => (
        <section className={`${styles[category.id]} ${styles.roadmapSection}`}>
          <Title order={3} color="dark" size="md" classes={styles.columnTitle}>
            {`${capitalizeStatus(category.id)} (${getDataByStatus(category.id).length})`}
          </Title>
          {category.id === "in-progress" && <p>Features currently being developed</p>}
          {category.id === "live" && <p>Released features</p>}
          {category.id === "planned" && <p>Ideas prioritized for research</p>}
          {getDataByStatus(category.id).map((item) => (
            <RoadmapCard key={item.id} data={item} />
          ))}
        </section>
      ))}
    </div>
  );
}

function capitalizeStatus(status) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

const getDataByStatus = (status) => {
  return data.productRequests.filter((item) => item.status === status);
};
