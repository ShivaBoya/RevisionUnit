import React from "react";
import Carousel from "./components/Carousel";

const images = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80",
    alt: "Nature Scene 1",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&auto=format&fit=crop&q=80",
    alt: "Nature Scene 2",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&auto=format&fit=crop&q=80",
    alt: "Nature Scene 3",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80",
    alt: "Nature Scene 4",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&auto=format&fit=crop&q=80",
    alt: "Nature Scene 5",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=600&auto=format&fit=crop&q=80",
    alt: "Nature Scene 6",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=600&auto=format&fit=crop&q=80",
    alt: "Nature Scene 7",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&auto=format&fit=crop&q=80",
    alt: "Nature Scene 8",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1441829266145-b7a0d9b2a4b9?w=600&auto=format&fit=crop&q=80",
    alt: "Nature Scene 9",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=600&auto=format&fit=crop&q=80",
    alt: "Nature Scene 10",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=600&auto=format&fit=crop&q=80",
    alt: "Nature Scene 11",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=600&auto=format&fit=crop&q=80",
    alt: "Nature Scene 12",
  },
  {
    id: 13,
    src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=600&auto=format&fit=crop&q=80",
    alt: "Nature Scene 13",
  },
  {
    id: 14,
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80",
    alt: "Nature Scene 14",
  },
  {
    id: 15,
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&auto=format&fit=crop&q=80",
    alt: "Nature Scene 15",
  },
  {
    id: 16,
    src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80",
    alt: "Nature Scene 16",
  },
  {
    id: 17,
    src: "https://images.unsplash.com/photo-1441829266145-b7a0d9b2a4b9?w=600&auto=format&fit=crop&q=80",
    alt: "Nature Scene 17",
  },
  {
    id: 18,
    src: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=600&auto=format&fit=crop&q=80",
    alt: "Nature Scene 18",
  },
  {
    id: 19,
    src: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=600&auto=format&fit=crop&q=80",
    alt: "Nature Scene 19",
  },
];

function App() {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}> React Image Carousel</h1>
      <Carousel images={images} />
    </div>
  );
}

export default App;