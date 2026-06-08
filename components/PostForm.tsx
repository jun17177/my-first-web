"use client";

import { useState } from "react";
import { uploadPostImage } from "@/lib/supabase/posts";
import { useAuth } from "@/contexts/AuthContext";

type Props = {
  initialTitle?: string;
  initialContent?: string;
  initialImageUrl?: string | null;
  onSubmit: (title: string, content: string, imageUrl?: string | null) => Promise<void>;
  loading: boolean;
  error: string;
  submitLabel: string;
  onCancel?: () => void;
};


export default function PostForm({
  initialTitle = "",
  initialContent = "",
  initialImageUrl = null,
  onSubmit,
  loading,
  error,
  submitLabel,
  onCancel,
}: Props) {
  const { user } = useAuth();
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(initialImageUrl ?? null);
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  function handleRemoveImage() {
    setImageFile(null);
    setImagePreview(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    let valid = true;
    if (title.trim().length < 2) {
      setTitleError("제목을 2자 이상 입력해주세요.");
      valid = false;
    } else {
      setTitleError("");
    }
    if (content.trim().length < 10) {
      setContentError("내용을 10자 이상 입력해주세요.");
      valid = false;
    } else {
      setContentError("");
    }
    if (!valid) return;

    let imageUrl: string | null = imagePreview && !imageFile ? imagePreview : null;

    if (imageFile && user) {
      setUploading(true);
      setUploadError("");
      const uploaded = await uploadPostImage(imageFile, user.id);
      setUploading(false);
      if (!uploaded) {
        setUploadError("이미지 업로드에 실패했습니다. 다시 시도해주세요.");
        return;
      }
      imageUrl = uploaded;
    }

    await onSubmit(title, content, imageUrl);
  }

  const busy = loading || uploading;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="space-y-2">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          제목
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => { setTitle(e.target.value); setTitleError(""); }}
          placeholder="제목을 입력하세요"
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-gray-900"
        />
        {titleError && <p className="text-sm text-red-600">{titleError}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          내용
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => { setContent(e.target.value); setContentError(""); }}
          placeholder="내용을 입력하세요"
          rows={8}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-gray-900"
        />
        {contentError && <p className="text-sm text-red-600">{contentError}</p>}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">이미지 (선택)</label>
        {imagePreview ? (
          <div className="relative w-full overflow-hidden rounded-xl border border-gray-200">
            <img src={imagePreview} alt="미리보기" className="max-h-60 w-full object-cover" />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute right-2 top-2 rounded-full bg-black/50 px-2 py-1 text-xs text-white hover:bg-black/70"
            >
              제거
            </button>
          </div>
        ) : (
          <label className="flex cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-gray-300 px-4 py-8 transition hover:border-gray-500">
            <span className="text-sm text-gray-400">클릭하여 이미지 선택</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        )}
        {uploadError && <p className="text-sm text-red-600">{uploadError}</p>}
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">{error}</p>
      )}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={busy}
          className="inline-flex items-center rounded-full bg-gray-900 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700 disabled:opacity-50"
        >
          {uploading ? "업로드 중..." : loading ? "저장 중..." : submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
          >
            취소
          </button>
        )}
      </div>
    </form>
  );
}
