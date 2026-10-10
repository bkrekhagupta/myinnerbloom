import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AboutSection } from "@/components/bloom-sections";
import { DISCOVERY_CALL_URL, DiscoveryCallLink } from "@/components/discovery-call-link";

describe("Discovery call booking", () => {
  it("opens the Google Form Rekha supplied, in a new tab", () => {
    render(<DiscoveryCallLink>Book a Free Discovery Call</DiscoveryCallLink>);

    const link = screen.getByRole("link", { name: /Book a Free Discovery Call/ });

    expect(link).toHaveAttribute("href", DISCOVERY_CALL_URL);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("uses the exact form address from the brief", () => {
    expect(DISCOVERY_CALL_URL).toBe(
      "https://docs.google.com/forms/d/e/1FAIpQLScvRxyAlD35OqQ1qk41LWvUV5504WJ3RftWtOxm6lJfAitGVw/viewform?usp=header",
    );
  });
});

describe("Meet Your Guide portrait", () => {
  it("shows Rekha's own 4:5 portrait instead of the artwork placeholder", () => {
    render(<AboutSection />);

    const portrait = screen.getByRole("img", { name: "Rekha Devi Gupta, founder of Inner Bloom" });

    expect(portrait).toHaveAttribute("src", expect.stringContaining("rekha-portrait.jpg"));
    expect(portrait).toHaveAttribute("width", "841");
    expect(portrait).toHaveAttribute("height", "1051");
  });
});
