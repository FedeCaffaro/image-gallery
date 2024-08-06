"use client";

import { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import Papa from "papaparse";

const initialImageLinks = [
  "https://s.mj.run/Z7C7TY_kyaQ",
  "https://s.mj.run/8s46o3x_xt8",
  "https://s.mj.run/8tAkSTE7CnY",
  "https://s.mj.run/k77bMb3iLGk",
  "https://s.mj.run/Tzrmcx-toeY",
  "https://s.mj.run/oO8g40P21uM",
  "https://s.mj.run/NYj7eErR6ps",
  "https://s.mj.run/saXICqCVwbQ",
  "https://s.mj.run/YqMmX6bogMo",
  "https://s.mj.run/frprGq-1-jE",
  "https://s.mj.run/-8Wujgj2w9Y",
  "https://s.mj.run/hFPLq92f_OM",
  "https://s.mj.run/UN9w_4XRUzs",
  "https://s.mj.run/FZhxYMdKNqw",
  "https://s.mj.run/hvJ678g_wcA",
  "https://s.mj.run/hppYRuJ98JM",
  "https://s.mj.run/3xQ7iJL8zso",
  "https://s.mj.run/ZrGhhFL2l6Q",
  "https://s.mj.run/ey1MUbHVsEs",
  "https://s.mj.run/NSL1sgT05VY",
  "https://s.mj.run/VPTrp6-c8sU",
  "https://s.mj.run/PvZDR14_Yo8",
  "https://s.mj.run/axPQ0OG0IlQ",
  "https://s.mj.run/pdq46zskCbs",
  "https://s.mj.run/KJdbhhol4jU",
  "https://s.mj.run/d882lt4F-Qw",
  "https://s.mj.run/9cw_5R4LWiI",
  "https://s.mj.run/EIN3eUFTpCA",
  "https://s.mj.run/P4Im40NuBDI",
  "https://s.mj.run/WTMbnbCp-4s",
  "https://s.mj.run/IXKc0WQIa9I",
  "https://s.mj.run/RgrXK1SVKD8",
  "https://s.mj.run/Wy0BnuRpi48",
  "https://s.mj.run/unKCxqZctU8",
  "https://s.mj.run/FCbi-RuQAgc",
  "https://s.mj.run/TQfavJMqfdY",
  "https://s.mj.run/Cx2s8Be_30E",
  "https://s.mj.run/urDYCGs5TFE",
  "https://s.mj.run/Rkb_2Qmi4LE",
  "https://s.mj.run/csEIOKK3NX8",
  "https://s.mj.run/eQ-60PUkPrQ",
  "https://s.mj.run/-7of5C2GsLY",
  "https://s.mj.run/asj2eZL1THs",
  "https://s.mj.run/fd4dV_OnWik",
  "https://s.mj.run/Cox3teiYyCQ",
  "https://s.mj.run/TZi6g3mUkhk",
  "https://s.mj.run/-jnC-lOOVLc",
  "https://s.mj.run/PTNYAFBLhYE",
  "https://s.mj.run/fAS_k6lF5X4",
  "https://s.mj.run/HAv1MAvH9K0",
  "https://s.mj.run/tt0iPcjK4zM",
  "https://s.mj.run/7caG8pYGsQI",
  "https://s.mj.run/pZKiQlHNHVw",
  "https://s.mj.run/rTo5RXEI-Lg",
  "https://s.mj.run/nmm2bdyzp70",
  "https://s.mj.run/gWoHgBHiVPA",
  "https://s.mj.run/aaYD0Jh2hYQ",
  "https://s.mj.run/sAaOEA-H-HE",
  "https://s.mj.run/FSBROZYZV9g",
  "https://s.mj.run/3aEDGlO2u74",
  "https://s.mj.run/nr-3K2oz8Fc",
  "https://s.mj.run/kMztXbLrHLk",
  "https://s.mj.run/-Ytc73f2nNY",
  "https://s.mj.run/OEtTboAXcDM",
  "https://s.mj.run/tl_haGBBVk4",
  "https://s.mj.run/bC-yPwohyyw",
  "https://s.mj.run/JdBWV82WZpM",
  "https://s.mj.run/o37U-hIfSFU",
  "https://s.mj.run/ZvEubiG1Xis",
  "https://s.mj.run/QRixds573ro",
  "https://s.mj.run/2bNtSeWFxek",
  "https://s.mj.run/t-ZAjyq3Di8",
  "https://s.mj.run/dXJc6CZudX4",
  "https://s.mj.run/-ibtFYRRmxY",
  "https://s.mj.run/tj7Ep4FoHwQ",
  "https://s.mj.run/siJDoe0XGlY",
  "https://s.mj.run/G-_ndyb9rbA",
  "https://s.mj.run/Jp-e1ia1L-g",
  "https://s.mj.run/dSFC1sxOLu4",
  "https://s.mj.run/Kx2uNRF4YHE",
  "https://s.mj.run/fJfLGwosF70",
  "https://s.mj.run/yTFP4R27n8k",
  "https://s.mj.run/P4k_xGbTYVk",
  "https://s.mj.run/Z74ao4aYSaA",
  "https://s.mj.run/tK7qweSH2Uk",
  "https://s.mj.run/bscomgZbwOg",
  "https://s.mj.run/IUcfaI9Nw6o",
  "https://s.mj.run/fJfLGwosF70",
  "https://s.mj.run/yTFP4R27n8k",
  "https://s.mj.run/P4k_xGbTYVk",
  "https://s.mj.run/Z74ao4aYSaA",
  "https://s.mj.run/tK7qweSH2Uk",
  "https://s.mj.run/bscomgZbwOg",
  "https://s.mj.run/IUcfaI9Nw6o",
  "https://s.mj.run/78obEa88Kmo",
  "https://s.mj.run/h_sjefirJlY",
  "https://s.mj.run/TuseECcoVR0",
  "https://s.mj.run/80OJebDThbw",
  "https://s.mj.run/KLNa4eou628",
  "https://s.mj.run/ISyNP7qiCjY",
  "https://s.mj.run/kEPGF61ncdw",
  "https://s.mj.run/EAUbOxWRNPw",
  "https://s.mj.run/iBXj3eI3dtM",
  "https://s.mj.run/9VtovvmVWhE",
  "https://s.mj.run/RjqDJ_AWhwk",
  "https://s.mj.run/KtyqAqiuHmk",
  "https://s.mj.run/x_7IQEe2ZOA",
  "https://s.mj.run/80OJebDThbw",
  "https://s.mj.run/KLNa4eou628",
  "https://s.mj.run/TV7xmHweM3M",
  "https://s.mj.run/wSSGXXMYfdY",
  "https://s.mj.run/UIYpmxKIBB4",
  "https://s.mj.run/b0rw2y4ZkoQ",
  "https://s.mj.run/XKK7mAUKHoY",
  "https://s.mj.run/Mqva2K9xMDM",
  "https://s.mj.run/gmSsv5iShwE",
  "https://s.mj.run/sRNGunOkol8",
  "https://s.mj.run/kDQfvHp5AZg",
  "https://s.mj.run/AI8pOJH_UB8",
  "https://s.mj.run/4zgSuWMKdhs",
  "https://s.mj.run/U0FkQXBaVIQ",
  "https://s.mj.run/ejotyGuQNoU",
  "https://s.mj.run/x1BE1ropxLo",
  "https://s.mj.run/e-3N_zR63Mo",
  "https://s.mj.run/lf5vtblvbzw",
  "https://s.mj.run/hZ_CU_m4r2w",
  "https://s.mj.run/CihFAvnrlng",
  "https://s.mj.run/RYiFh77s0Pc",
  "https://s.mj.run/EgOEiXgBQIo",
  "https://s.mj.run/YVLTspcXluo",
  "https://s.mj.run/CmLMIGJyhP0",
  "https://s.mj.run/foicGk2E4lQ",
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
      return savedLinks
        ? JSON.parse(savedLinks)
        : initialImageLinks.map((url) => ({ url }));
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
              img.onload = () =>
                resolve({ ...link, width: img.width, height: img.height });
              img.onerror = () => resolve({ ...link });
            }
          })
      )
    );
    return updatedLinks;
  };

  useEffect(() => {
    if (!loading) {
      fetchDimensions(imageLinks).then((updatedLinks) =>
        setImageLinks(updatedLinks)
      );
    }
  }, [loading]);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem("imageLinks", JSON.stringify(imageLinks));
    }
  }, [imageLinks, loading]);

  const addImages = async () => {
    const urls = newImageUrls
      .split(",")
      .map((url) => url.trim())
      .filter((url) => url);
    const newImageLinks: ImageLink[] = urls.map((url) => ({ url }));
    const updatedLinks = await fetchDimensions(newImageLinks);
    setImageLinks([...imageLinks, ...updatedLinks]);
    setNewImageUrls("");
  };

  const removeImage = (index: number) => {
    const newImageLinks = [...imageLinks];
    newImageLinks.splice(index, 1);
    fetchDimensions(newImageLinks).then((updatedLinks) =>
      setImageLinks(updatedLinks)
    );
  };

  const downloadCSV = () => {
    const csv = Papa.unparse(imageLinks.map((link) => ({ url: link.url })));
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "image-links.csv");
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
                <p>
                  {link.width && link.height
                    ? `${link.width} x ${link.height}`
                    : "Loading..."}
                </p>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="image-url"
                >
                  {link.url}
                </a>
                <button
                  className="delete-btn"
                  onClick={() => removeImage(index)}
                >
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
          <div className="csv-actions">
            <button onClick={downloadCSV}>Download Links as CSV</button>
          </div>
        </>
      )}
    </div>
  );
};

export default ImageGallery;
