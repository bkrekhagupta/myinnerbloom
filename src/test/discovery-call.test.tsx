import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AboutSection } from "@/components/bloom-sections";
import { DiscoveryCallLink } from "@/components/discovery-call-link";

describe("Discovery call booking", () => {
  it("opens the on-site booking flow without navigating away", () => {
    const openBooking = vi.fn();
    window.addEventListener("inner-bloom:book", openBooking);
    render(<DiscoveryCallLink>Book a Free Discovery Call</DiscoveryCallLink>);

    const button = screen.getByRole("button", { name: /Book a Free Discovery Call/ });
    fireEvent.click(button);

    expect(openBooking).toHaveBeenCalledOnce();
    expect(button.closest("a")).toBeNull();
    window.removeEventListener("inner-bloom:book", openBooking);
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
