import ReviewForm from "@/components/ReviewForm";

export default function ReviewsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-[#111111]">Reviews</h1>
        <p className="mt-2 text-gray-500 text-sm">드라이버와 레이스에 대한 의견을 남겨보세요</p>
      </div>
      <ReviewForm />
    </div>
  );
}
