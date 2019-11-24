import ShallowRenderer from "react-test-renderer/shallow"; // ES6
import React from "react";
import Home from "./Home.js";
import Comments from "./Comments.js";
import Alert from "./Alert.js";
import Article from "./Article.js";
import Footer from "./Footer.js";
import LiveFeed from "./LiveFeed.js";
import Navbar from "./Navbar.js";
import News from "./News.js";
import Register from "./Register.js";
import RegisterForm from "./RegisterForm.js";

const renderer = new ShallowRenderer();

describe("Comment component", () => {
  it("renders without crashing", () => {
    renderer.render(<Comments />);
    const result = renderer.getRenderOutput();
    expect(result.type).toBe("div");
  });
});

describe("Alert component", () => {
  it("renders without crashing", () => {
    renderer.render(<Alert errorName="testError" description="testdesc" />);
    const result = renderer.getRenderOutput();
    expect(result.type).toBe("div");
  });
});

describe("Article component", () => {
  it("renders without crashing", () => {
    renderer.render(<Article />);
    const result = renderer.getRenderOutput();
    expect(result.type).toBe("div");
  });
});

describe("Footer component", () => {
  it("renders without crashing", () => {
    renderer.render(<Footer />);
    const result = renderer.getRenderOutput();
    expect(result.type).toBe("footer");
  });
});

describe("Home component", () => {
  it("renders without crashing", () => {
    renderer.render(<Home />);
    const result = renderer.getRenderOutput();
    expect(result.type).toBe("div");
  });
});

describe("Livefeed component", () => {
  it("renders without crashing", () => {
    renderer.render(<LiveFeed />);
    const result = renderer.getRenderOutput();
    expect(result.type).toBe("div");
  });
});

describe("Navbar component", () => {
  it("renders without crashing", () => {
    renderer.render(<Navbar />);
    const result = renderer.getRenderOutput();
    expect(result.type).toBe("nav");
  });
});

describe("News component", () => {
  it("renders without crashing", () => {
    renderer.render(<News />);
    const result = renderer.getRenderOutput();
    expect(result.type).toBe("div");
  });
});

describe("Register component", () => {
  it("renders without crashing", () => {
    renderer.render(<Register />);
    const result = renderer.getRenderOutput();
    expect(result.type).toBe("div");
  });
});

describe("RegisterForm component", () => {
  it("renders without crashing", () => {
    var emptyArticle = {
      sak_id: 0,
      overskrift: "",
      brukernavn: "",
      innhold: "",
      bilde: "",
      kategori_id: 0,
      viktighet: 1
    };
    renderer.render(<RegisterForm sak={emptyArticle} kategorier={[]} />);
    const result = renderer.getRenderOutput();
    expect(result.type).toBe("form");
  });
});
