import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import bbox from "@turf/bbox";
import center from "@turf/center";

interface GeoJSONViewProps {
  name: string;
  url: string;
}

const MapViewer = dynamic(
  () => import("@portaljs/components").then((mod) => mod.Map),
  { ssr: false }
);

const GeoJSONView = ({ name, url }: GeoJSONViewProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);
  const [centerCoords, setCenterCoords] = useState<{
    latitude: number;
    longitude: number;
  }>({
    latitude: 0,
    longitude: 0,
  });
  const [zoom, setZoom] = useState<number>(2);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch GeoJSON: ${response.statusText}`);
        }
        const geoJsonData = await response.json();
        setData(geoJsonData);

        const box = bbox(geoJsonData);
        const c = center(geoJsonData);

        setCenterCoords({
          longitude: c.geometry.coordinates[0],
          latitude: c.geometry.coordinates[1],
        });

        const lonDiff = box[2] - box[0];
        const latDiff = box[3] - box[1];
        const maxDiff = Math.max(lonDiff, latDiff);

        let z = 4;
        if (maxDiff < 0.5) z = 12;
        else if (maxDiff < 1) z = 10;
        else if (maxDiff < 5) z = 8;
        else if (maxDiff < 20) z = 6;
        else z = 4;

        setZoom(z);
      } catch (error) {
        console.error("Error fetching GeoJSON data:", error);
        setError(
          error instanceof Error ? error.message : "Failed to load map data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return loading ? (
    <div className="text-sm">Loading map...</div>
  ) : error ? (
    <div className="text-sm">Error: {error}</div>
  ) : (
    <MapViewer
      center={centerCoords}
      zoom={zoom}
      layers={[
        {
          data: data,
          name: "Geojson",
          colorScale: {
            starting: "#4F53FA",
            ending: "#4F53FA",
          },
          tooltip: true,
        },
      ]}
      title={name}
    />
  );
};

export default GeoJSONView;
