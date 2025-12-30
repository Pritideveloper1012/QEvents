"use client";

import { useEffect, useState } from "react";
import ArtistCard from "@/components/ArtistCard";

export default function ArtistsPage() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    fetch("https://qevent-backend.labs.crio.do/artists")
      .then(res => res.json())
      .then(data => setArtists(data));
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      {artists.map(artist => (
        <ArtistCard key={artist.id} artist={artist} />
      ))}
    </div>
  );
}
