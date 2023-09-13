import { useLoaderData } from "react-router";
import CommentsMain from "../components/comments/CommentsMain";
import data from "../assets/data/data.json";
/**
 * Renders the RoadmapPage component, which displays the main roadmap page.
 *
 * @return {JSX.Element} The JSX element representing the RoadmapPage component.
 */
export default function FeedbackPage() {
  const loaderData = useLoaderData();
  return <CommentsMain data={loaderData} />;
}

export const loader = ({ params }) => {
  const { feedbackId } = params;

  const req = data.productRequests.find((req) => req.id === +feedbackId);
  const comments = req.comments || [];

  return { req, comments };
};
