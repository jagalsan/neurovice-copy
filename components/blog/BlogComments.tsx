"use client";

import { useState } from "react";
import type { Locale } from "@/i18n/config";
import type { BlogComment } from "@/lib/api/types";
import { useCurrentUser } from "@/lib/hooks/api";
import { useCreateBlogComment } from "@/lib/hooks/api";
import { useT } from "@/providers/I18nProvider";

interface BlogCommentsProps {
  locale: Locale;
  slug: string;
  initialComments: BlogComment[];
}

export function BlogComments({ slug, initialComments }: BlogCommentsProps) {
  const t = useT();
  const { data: user } = useCurrentUser();
  const [comments, setComments] = useState<BlogComment[]>(initialComments);
  const [content, setContent] = useState("");

  const createComment = useCreateBlogComment(slug);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    createComment.mutate(
      { content },
      {
        onSuccess: (newComment) => {
          setComments((prev) => [...prev, newComment]);
          setContent("");
        },
      }
    );
  };

  const handleLoginClick = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("open-auth-modal"));
    }
  };

  return (
    <section className="mt-12 space-y-6">
      <h2 className="font-heading text-[18px] uppercase text-[#17FBF8]">
        {t("labels.comments")}
      </h2>

      {comments.length === 0 ? (
        <p className="text-[13px] text-[#B9FDFB]">
          {t("labels.no_comments_yet")}
        </p>
      ) : (
        <ul className="space-y-4">
          {comments.map((comment) => (
            <li
              key={comment.id}
              className="border border-[rgba(255,255,255,0.08)] rounded-[12px] p-4 bg-[#050608]"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-heading text-[12px] uppercase text-[#17FBF8]">
                  {comment.user?.name ?? t("labels.anonymous")}
                </span>
                <span className="text-[11px] text-white/60">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-[13px] text-[#E5F7F6] uppercase">
                {comment.content}
              </p>
            </li>
          ))}
        </ul>
      )}

      {user ? (
        <form onSubmit={handleSubmit} className="space-y-3 mt-4">
          <textarea
            className="w-full min-h-[80px] rounded-[12px] bg-[#050608] border border-[rgba(255,255,255,0.12)] px-3 py-2 text-[13px] text-white outline-none focus:border-[#17FBF8]"
            placeholder={t("labels.write_comment")}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            type="submit"
            disabled={createComment.isPending}
            className="px-4 py-2 rounded-[999px] bg-[#17FBF8] text-black text-[12px] font-heading uppercase tracking-[0.18em] disabled:opacity-60"
          >
            {t("actions.submit")}
          </button>
        </form>
      ) : (
        <p
          onClick={handleLoginClick}
          className="text-[12px] text-[#B9FDFB] mt-4 cursor-pointer underline"
        >
          {t("messages.login_to_comment")}
        </p>
      )}
    </section>
  );
}
