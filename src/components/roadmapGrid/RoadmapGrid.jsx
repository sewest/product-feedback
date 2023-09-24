import { useAppState } from "../../context/AppContext";
import RoadmapCard from "../cards/roadmapCard/RoadmapCard";
import useWindowWidth from "../../hooks/useWindowWidth";
import useCapitalizeFirstLetter from "../../hooks/useCapitalizeFirstLetter";
import Title from "../title/Title";
import Text from "../text/Text";
import styles from "./roadmapGrid.module.css";

export default function RoadmapGrid() {
  // Access the getDataByStatus function from the useAppState hook
  const { getDataByStatus } = useAppState();

  // Access the windowWidth value from the useWindowWidth hook
  const windowWidth = useWindowWidth();

  // Access the capitalizeFirstLetter function from the useCapitalizeFirstLetter hook
  const capitalizeFirstLetter = useCapitalizeFirstLetter();

  return (
    <div className={styles.roadmapGrid}>
      {categories.map((category) => (
        <section key={category.id} className={`${styles[category.id]} ${styles.roadmapSection}`}>
          <Title order={3} color="dark" size={windowWidth < 1300 ? "sm" : "lg"} classes={styles.columnTitle}>
            {/* Display the category label with the number of items */}
            {`${capitalizeFirstLetter(category.id)} (${getDataByStatus(category.id).length})`}
          </Title>

          {/* Display additional text for specific categories */}
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

          {/* Render RoadmapCard components for each item in the category */}
          {getDataByStatus(category.id).map((item) => (
            <RoadmapCard key={item.id} data={item} />
          ))}
        </section>
      ))}
    </div>
  );
}

// Define an array of category objects
const categories = [
  { id: "planned", label: "Planned" },
  { id: "in-progress", label: "In-Progress" },
  { id: "live", label: "Live" },
];
