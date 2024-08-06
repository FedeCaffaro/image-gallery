"use client";

import { useState, useEffect } from "react";
import { saveAs } from "file-saver";

const initialImageLinks = [
  "https://s.mj.run/HHtKj9NPaIA",
  "https://s.mj.run/rPJj7QtAvvw",
  "https://s.mj.run/WEqIQy7YnMQ",
  "https://s.mj.run/quoZDl5vhAg",
  "https://s.mj.run/zSDc-opSIOc",
];

interface ImageLink {
  url: string;
  width?: number;
  height?: number;
}

const ImageGallery = () => {
  const [imageLinks, setImageLinks] = useState<ImageLink[]>(() => {
    if (typeof window !== "undefined") {
      const savedLinks = localStorage.getItem("imageLinks");
      return savedLinks ? JSON.parse(savedLinks) : initialImageLinks.map((url) => ({ url }));
    }
    return initialImageLinks.map((url) => ({ url }));
  });
  const [newImageUrls, setNewImageUrls] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedLinks = localStorage.getItem("imageLinks");
    if (savedLinks) {
      setImageLinks(JSON.parse(savedLinks));
    } else {
      setImageLinks(initialImageLinks.map((url) => ({ url })));
    }
    setLoading(false);
  }, []);

  const fetchDimensions = async (links: ImageLink[]) => {
    const updatedLinks = await Promise.all(
      links.map(
        (link) =>
          new Promise<ImageLink>((resolve) => {
            if (link.width && link.height) {
              resolve(link);
            } else {
              const img = new Image();
              img.src = link.url;
              img.onload = () => resolve({ ...link, width: img.width, height: img.height });
              img.onerror = () => resolve({ ...link });
            }
          })
      )
    );
    return updatedLinks;
  };

  useEffect(() => {
    if (!loading) {
      fetchDimensions(imageLinks).then((updatedLinks) => setImageLinks(updatedLinks));
    }
  }, [loading]);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem("imageLinks", JSON.stringify(imageLinks));
    }
  }, [imageLinks, loading]);

  const addImages = async () => {
    const urls = newImageUrls.split(",").map(url => url.trim()).filter(url => url);
    const newImageLinks: ImageLink[] = urls.map(url => ({ url }));
    const updatedLinks = await fetchDimensions(newImageLinks);
    setImageLinks([...imageLinks, ...updatedLinks]);
    setNewImageUrls("");
  };

  const removeImage = (index: number) => {
    const newImageLinks = [...imageLinks];
    newImageLinks.splice(index, 1);
    fetchDimensions(newImageLinks).then((updatedLinks) => setImageLinks(updatedLinks));
  };

  const downloadTXT = () => {
    const textContent = imageLinks.map(link => link.url).join('\n');
    const blob = new Blob([textContent], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "image-links.txt");
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="gallery">
            {imageLinks.map((link, index) => (
              <div key={index} className="image-container">
                <img src={link.url} alt={`Image ${index + 1}`} />
                <p>{link.width && link.height ? `${link.width} x ${link.height}` : "Loading..."}</p>
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="image-url">
                  {link.url}
                </a>
                <button className="delete-btn" onClick={() => removeImage(index)}>
                  X
                </button>
              </div>
            ))}
          </div>
          <div className="add-image">
            <input
              type="text"
              value={newImageUrls}
              onChange={(e) => setNewImageUrls(e.target.value)}
              placeholder="Enter image URLs, separated by commas"
            />
            <button onClick={addImages}>Add Images</button>
          </div>
          <div className="txt-actions">
            <button onClick={downloadTXT}>Download Links as TXT</button>
          </div>
        </>
      )}
    </div>
  );
};

export default ImageGallery;