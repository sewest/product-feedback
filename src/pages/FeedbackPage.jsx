import { useLoaderData, useParams } from "react-router";
import { useAppState } from "../context/AppContext";
import CommentsMain from "../components/comments/CommentsMain";
/**
 * Renders the RoadmapPage component, which displays the main roadmap page.
 *
 * @return {JSX.Element} The JSX element representing the RoadmapPage component.
 */
export default function FeedbackPage() {
  const { feedbackId } = useParams();
  const state = useAppState();
  const req = state.productRequests.find((req) => req.id === +feedbackId);
  const comments = req.comments || [];

  const data = {
    req,
    comments,
  };
  return <CommentsMain data={data} />;
}
