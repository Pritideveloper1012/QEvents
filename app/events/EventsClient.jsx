"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import EventCard from "@/components/EventCard";

export default function EventsClient() {
  const searchParams = useSearchParams();
  const tag = searchParams.get("tag");
  const artist = searchParams.get("artist");

  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("https://qevent-backend.labs.crio.do/events")
      .then(res => res.json())
      .then(data => {
        let filtered = data;

        if (tag) {
          filtered = filtered.filter(e =>
            e.tags?.includes(tag)
          );
        }

        if (artist) {
          filtered = filtered.filter(e =>
            e.artist === artist
          );
        }

        setEvents(filtered);
      });
  }, [tag, artist]);

  if (events.length === 0) {
    return <h2>No events found</h2>;
  }

  return (
    <div className="flex flex-wrap">
      {events.map(event => (
        <EventCard key={event.id} eventData={event} />
      ))}
    </div>
  );
}
