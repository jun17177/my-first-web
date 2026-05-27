export function getErrorMessage(error: unknown): string {
  let message = "";
  let code = "";

  if (typeof error === "object" && error !== null) {
    if ("message" in error) message = String((error as { message: unknown }).message);
    if ("code" in error) code = String((error as { code: unknown }).code);
  }

  const text = `${code} ${message}`.toLowerCase();

  if (text.includes("42501") || text.includes("row-level security")) {
    return "이 작업을 수행할 권한이 없습니다.";
  }
  if (text.includes("failed to fetch")) {
    return "인터넷 연결을 확인해주세요.";
  }
  if (text.includes("not found")) {
    return "요청한 게시글을 찾을 수 없습니다.";
  }
  return "일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
}
