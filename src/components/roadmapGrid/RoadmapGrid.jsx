import { useAppState } from "../../context/AppContext";
import RoadmapCard from "../cards/roadmapCard/RoadmapCard";
import useWindowWidth from "../../hooks/useWindowWidth";
import Title from "../title/Title";
import Text from "../text/Text";
import styles from "./roadmapGrid.module.css";

export default function RoadmapGrid() {
  const { getDataByStatus } = useAppState();
  const windowWidth = useWindowWidth();
  const categories = [
    { id: "planned", label: "Planned" },
    { id: "in-progress", label: "In-Progress" },
    { id: "live", label: "Live" },
  ];

  //   const filteredData = getDataByStatus(activeTab);

  return (
    <div className={styles.roadmapGrid}>
      {categories.map((category) => (
        <section key={category.id} className={`${styles[category.id]} ${styles.roadmapSection}`}>
          <Title order={3} color="dark" size={windowWidth < 1300 ? "sm" : "lg"} classes={styles.columnTitle}>
            {`${capitalizeStatus(category.id)} (${getDataByStatus(category.id).length})`}
          </Title>
          {category.id === "in-progress" && (
            <Text size="sm" classes={styles.explainerText}>
              Features currently being developed
            </Text>
          )}
          {category.id === "live" && (
            <Text size="sm" classes={styles.explainerText}>
              Released features
            </Text>
          )}
          {category.id === "planned" && (
            <Text size="sm" classes={styles.explainerText}>
              Ideas prioritized for research
            </Text>
          )}
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
