"use client";

import { useState } from "react";
import Modal from "./Modal";
import { useT } from "@/providers/I18nProvider";
import { useContactSupport } from "@/lib/hooks/api/useSupport";
import Button from "./ui/Button";
import FormError from "./ui/FormError";
import { useToast } from "@/providers/ToastProvider";

interface ContactSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactSupportModal({
  isOpen,
  onClose,
}: ContactSupportModalProps) {
  const t = useT();
  const { showToast } = useToast();
  const { mutate: contactSupport, isPending, reset } = useContactSupport();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = t("forms.errors.enter_your_name");
    }
    if (!formData.email.trim()) {
      newErrors.email = t("forms.errors.enter_your_email");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("forms.errors.email_invalid");
    }
    if (!formData.subject.trim()) {
      newErrors.subject = t("notices.support_subject_required");
    }
    if (!formData.message.trim()) {
      newErrors.message = t("notices.support_message_required");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    contactSupport(formData, {
      onSuccess: () => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        showToast(t("messages.support_success"), "success");
        handleClose();
      },
    });
  };

  const handleClose = () => {
    reset();
    setErrors({});
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="lg" t={t}>
      <div className="p-6 md:p-8">
        <h2 className="font-heading text-2xl md:text-3xl uppercase text-[#17FBF8] mb-2">
          {t("views.contact_support")}
        </h2>
        <p className="text-sm text-white/70 mb-6">
          {t("messages.support_description")}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-white/70 mb-1">
                {t("forms.first_name")} *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-[#17FBF8]/50"
                placeholder={t("forms.support_name_placeholder")}
              />
            </div>

            <div>
              <label className="block text-sm text-white/70 mb-1">
                {t("forms.email")} *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-[#17FBF8]/50"
                placeholder={t("forms.email_placeholder")}
              />
            </div>

            <div>
              <label className="block text-sm text-white/70 mb-1">
                {t("labels.support_phone")}
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-[#17FBF8]/50"
                placeholder={t("forms.support_phone_placeholder")}
              />
            </div>

            <div>
              <label className="block text-sm text-white/70 mb-1">
                {t("labels.support_subject")} *
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-lg text-white focus:outline-none focus:border-[#17FBF8]/50"
              >
                <option value="" className="bg-[#171614]">
                  {t("forms.support_select_subject")}
                </option>
                <option value="billing" className="bg-[#171614]">
                  {t("labels.support_subject_billing")}
                </option>
                <option value="technical" className="bg-[#171614]">
                  {t("labels.support_subject_technical")}
                </option>
                <option value="account" className="bg-[#171614]">
                  {t("labels.support_subject_account")}
                </option>
                <option value="content" className="bg-[#171614]">
                  {t("labels.support_subject_content")}
                </option>
                <option value="other" className="bg-[#171614]">
                  {t("labels.support_subject_other")}
                </option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-white/70 mb-1">
                {t("labels.support_message")} *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-[#17FBF8]/50 resize-none"
                placeholder={t("forms.support_message_placeholder")}
              />
            </div>

            <FormError errors={Object.values(errors).filter(Boolean)} />

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                onClick={handleClose}
                variant="outline"
                size="md"
                fullWidth
              >
                {t("actions.cancel")}
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                variant="primary"
                size="md"
                fullWidth
              >
                {isPending ? t("labels.loading") : t("actions.submit")}
              </Button>
            </div>
          </form>
      </div>
    </Modal>
  );
}
