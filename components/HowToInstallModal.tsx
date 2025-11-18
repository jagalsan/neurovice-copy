"use client";

import { useState } from "react";
import Modal from "./Modal";
import { useT } from "@/providers/I18nProvider";
import {
  MetaIcon,
  WindowsIcon,
  ApkIcon,
} from "@/components/icons/PlatformIcons";

type TabKey = "windows" | "meta" | "pico";

interface InstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "h-[56px] px-5 rounded-[12px] border text-sm font-heading uppercase tracking-[0.18em] min-w-[280px]",
        "flex items-center gap-3 transition-colors justify-center",
        active
          ? "bg-[linear-gradient(90deg,#A6F9F8,#17C5C3)] text-[#050608] border-black/50 shadow-[0_0_40px_rgba(23,251,248,0.20)]"
          : "bg-white/5 text-[#A6FFFF] border-white/15 hover:bg-white/10",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function StepBlock({
  step,
  title,
  items,
}: {
  step: string;
  title: string;
  items: { subtitle: string; body: string }[];
}) {
  return (
    <div className="space-y-4">
      <span
        className="text-[#17FBF8] text-[11px] font-heading tracking-[0.24em] uppercase"
        style={{ textShadow: "0 0 15px rgba(166,255,255,0.6)" }}
      >
        {step}
      </span>
      <h3 className="font-heading text-2xl md:text-[28px] uppercase text-[#17FBF8]">
        {title}
      </h3>
      <div className="space-y-5">
        {items.map((it) => (
          <div key={it.subtitle} className="space-y-1">
            <p className="font-heading text-[18px] text-white">{it.subtitle}</p>
            <p className="text-[13px] leading-relaxed text-[#17FBF8] uppercase">
              {it.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HowToInstallModal({
  isOpen,
  onClose,
}: InstallModalProps) {
  const t = useT();
  const [tab, setTab] = useState<TabKey>("meta");

  const content: Record<TabKey, { step1: any; step2: any }> = {
    meta: {
      step1: {
        step: "STEP 1",
        title: "Purchase the content on the web",
        items: [
          {
            subtitle: "Log In or Sign Up",
            body: "Log in to your existing Neurovice account, or create a new one on the website, to start building your personal library of chapters cards and experiences.",
          },
          {
            subtitle: "Purchase chapters",
            body: "Purchase the chapters cards you want to access directly from the Neurovice website to unlock and enjoy them later in your VR headset.",
          },
        ],
      },
      step2: {
        step: "STEP 2",
        title: "Install Neurovice Viewer standalone app",
        items: [
          {
            subtitle: "Install Neurovice Viewer",
            body: "Visit the Neurovice Viewer page on the Meta Quest Store and click Install. Don’t worry if Neurovice Viewer looks a bit different — it’s still us!",
          },
          {
            subtitle: "Log In With Your Account",
            body: "You do not need to register or create a new account in Neurovice Viewer. Simply log in with the same credentials you used to purchase content on the web.",
          },
          {
            subtitle: "Enable Secret Content",
            body: "To access your adult content, enable the “Secret Content” switcher in the header of the Neurovice Viewer app.",
          },
        ],
      },
    },
    windows: {
      step1: {
        step: "STEP 1",
        title: "Purchase the content on the web",
        items: [
          {
            subtitle: "Log In or Sign Up",
            body: "Log in to your Neurovice account or create a new one to start your library of chapters and experiences.",
          },
          {
            subtitle: "Purchase chapters",
            body: "Buy the chapters on neurovice.com to unlock them for later playback in your PCVR headset.",
          },
        ],
      },
      step2: {
        step: "STEP 2",
        title: "Install Neurovice Viewer for PCVR",
        items: [
          {
            subtitle: "Download & Install",
            body: "Download the Windows PCVR installer from our website and complete the setup.",
          },
          {
            subtitle: "Log In With Your Account",
            body: "Open Neurovice Viewer on Windows and log in with the same credentials you used on the web.",
          },
          {
            subtitle: "Enable Secret Content",
            body: "Toggle the “Secret Content” switch in the app header to reveal adult content.",
          },
        ],
      },
    },
    pico: {
      step1: {
        step: "STEP 1",
        title: "Purchase the content on the web",
        items: [
          {
            subtitle: "Log In or Sign Up",
            body: "Use your Neurovice account on the website to manage and purchase your chapters.",
          },
          {
            subtitle: "Purchase chapters",
            body: "Buy the chapters you want to watch later on your Quest 3 / Pico 4 Ultra device.",
          },
        ],
      },
      step2: {
        step: "STEP 2",
        title: "Install Neurovice Viewer standalone app",
        items: [
          {
            subtitle: "Install the App",
            body: "Install the standalone viewer on your device (APK/Store depending on availability) and launch it.",
          },
          {
            subtitle: "Log In With Your Account",
            body: "Sign in with the same credentials you used to purchase the content on the web.",
          },
          {
            subtitle: "Enable Secret Content",
            body: "Enable the “Secret Content” switcher in the app header to access adult content.",
          },
        ],
      },
    },
  };

  const c = content[tab];

  return (
    <Modal t={t} isOpen={isOpen} onClose={onClose} size="lg">
      <div className="space-y-6">
        <div
          className="rounded-[16px] border border-[#17FBF833] p-5 md:p-6 relative"
          style={{ boxShadow: "0px 0px 15px 0px #17FBF833" }}
        >
          <h2 className="font-heading text-2xl md:text-[40px] text-[#A6FFFF] uppercase mb-4">
            How to play chapters in VR headset
          </h2>

          <div className="space-y-4 relative z-10">
            <p
              className="text-[11px] font-heading tracking-[0.24em] uppercase text-[#7FF7F5]"
              style={{ textShadow: "0 0 15px rgba(166,255,255,0.6)" }}
            >
              Choose platform
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <TabButton
                active={tab === "windows"}
                onClick={() => setTab("windows")}
              >
                <WindowsIcon className="w-5 h-5 opacity-80" />
                <span>Windows PCVR</span>
              </TabButton>

              <TabButton active={tab === "meta"} onClick={() => setTab("meta")}>
                <MetaIcon className="w-5 h-5 opacity-80" />
                <span>Meta Store</span>
              </TabButton>

              <TabButton active={tab === "pico"} onClick={() => setTab("pico")}>
                <ApkIcon className="w-5 h-5 opacity-80" />
                <span>Quest 3 / Pico 4 Ultra</span>
              </TabButton>
            </div>
          </div>
        </div>

        <div className="p-5 md:p-6 relative space-y-10">
          <div className="relative z-10 space-y-10">
            <StepBlock
              step={c.step1.step}
              title={c.step1.title}
              items={c.step1.items}
            />
            <StepBlock
              step={c.step2.step}
              title={c.step2.title}
              items={c.step2.items}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
}
