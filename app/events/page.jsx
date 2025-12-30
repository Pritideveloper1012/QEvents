"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import EventCard from "@/components/EventCard";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const searchParams = useSearchParams();

  const artist = searchParams.get("artist");
  const tag = searchParams.get("tag");

  useEffect(() => {
    fetch("https://qevent-backend.labs.crio.do/events")
      .then(res => res.json())
      .then(data => setEvents(data));
  }, []);

  const filteredEvents = events.filter(event => {
    if (artist) return event.artist === artist;
    if (tag) return event.tags.includes(tag);
    return true;
  });

  return (
    <div className="flex flex-wrap justify-center">
      {filteredEvents.map(event => (
        <EventCard key={event.id} eventData={event} />
      ))}
    </div>
  );
}
