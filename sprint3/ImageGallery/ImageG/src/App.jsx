import React, { useState } from "react";

const images = [
  { id: 1, src: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=600&auto=format&fit=crop&q=80", alt: "City Skyline" },
  { id: 2, src: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&auto=format&fit=crop&q=80", alt: "Coffee and Laptop" },
  { id: 3, src: "https://images.unsplash.com/photo-1508923567004-3a6b8004f3d3?w=600&auto=format&fit=crop&q=80", alt: "Delicious Burger" },
  { id: 4, src: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=600&auto=format&fit=crop&q=80", alt: "Modern Architecture" },
  { id: 5, src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80", alt: "Technology Chips" },
  { id: 6, src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80", alt: "Coding on Laptop" },
  { id: 7, src: "https://images.unsplash.com/photo-1485217988980-11786ced9454?w=600&auto=format&fit=crop&q=80", alt: "Books on Shelf" },
  { id: 8, src: "https://images.unsplash.com/photo-1473181488821-2d23949a045a?w=600&auto=format&fit=crop&q=80", alt: "Travel Map" },
  { id: 9, src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80", alt: "Smiling Dog" },
  { id: 10, src: "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=600&auto=format&fit=crop&q=80", alt: "Hot Air Balloons" },
  { id: 11, src: "https://images.unsplash.com/photo-1481277542470-605612bd2d61?w=600&auto=format&fit=crop&q=80", alt: "Musical Guitar" },
  { id: 12, src: "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?w=600&auto=format&fit=crop&q=80", alt: "Pizza on Table" },
  { id: 13, src: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=600&auto=format&fit=crop&q=80", alt: "Abstract Neon Lights" },
  { id: 14, src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80", alt: "Man Portrait" },
  { id: 15, src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=80", alt: "Workspace Desk" },
  { id: 16, src: "https://images.unsplash.com/photo-1475724017904-b712052c192a?w=600&auto=format&fit=crop&q=80", alt: "Car on Road" },
  { id: 17, src: "https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=600&auto=format&fit=crop&q=80", alt: "Colorful Building" },
  { id: 18, src: "https://images.unsplash.com/photo-1514516870926-20598993c8da?w=600&auto=format&fit=crop&q=80", alt: "Healthy Salad" },
  { id: 19, src: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=600&auto=format&fit=crop&q=80", alt: "Starry Night Sky" },
  { id: 20, src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=80", alt: "Team Collaboration" },
];

export default function Gallery() {
  const [selected, setSelected] = useState(null);

  const closeModal = (e) => {
    if (e.target.className === "modal" || e.target.className === "main-image") {
      setSelected(null);
    }
  };

  return (
    <div>
      <div className="grid">
        {images.map((img) => (
          <img
            key={img.id}
            src={img.src}
            alt={img.alt}
            onClick={() => setSelected(img)}
          />
        ))}
      </div>

      {selected && (
        <div className="modal" onClick={closeModal}>
          <img
            src={selected.src}
            alt={selected.alt}
            className="main-image"
          />
          <div className="thumbnails">
            {images.map((thumb) => (
              <img
                key={thumb.id}
                src={thumb.src}
                alt={thumb.alt}
                className={`thumb ${thumb.id === selected.id ? "active" : ""}`}
                onClick={() => setSelected(thumb)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
