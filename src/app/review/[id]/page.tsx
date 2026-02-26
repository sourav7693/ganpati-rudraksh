import ReviewEdit from "@/components/account/ReviewEdit";
import MainTemplate from "@/templates/MainTemplate";
import axios from "axios";

export default async function ReviewUpdate({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let review: {
    _id: string;
    rating: number;
    title: string;
    description: string;
    supporting_files: { url: string; public_id: string }[];
  } | null = null;

  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/review/${id}`,
    );

    review = data.review;
  } catch (error) {
    console.log(error);
  }

  if (!review)
    return (
      <MainTemplate>
        <div>Review not found</div>
      </MainTemplate>
    );

  return (
    <MainTemplate>
      <ReviewEdit review={review} />
    </MainTemplate>
  );
}
