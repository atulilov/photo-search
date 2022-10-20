import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import PhotoCard from "./index";
import { props } from "./PhotoCard.mock";

describe("Photo Card", () => {
  afterEach(cleanup);

  beforeEach(() => {
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: jest.fn().mockReturnValue(null),
      unobserve: jest.fn().mockReturnValue(null),
      disconnect: jest.fn().mockReturnValue(null)
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  it("user label", async () => {
    render(<PhotoCard {...props} />);

    expect(screen.getByText("By Herney")).toBeTruthy();
  });
});
