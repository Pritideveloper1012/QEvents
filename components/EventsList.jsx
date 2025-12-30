"use client";

import EventCard from "./EventCard";
import { useSearchParams } from "next/navigation";

const EventsList = ({ events }) => {
  const searchParams = useSearchParams();
  const artist = searchParams.get("artist");
  const tag = searchParams.get("tag");

  const filteredEvents = events.filter((event) => {
    if (artist) return event.artist?.name === artist;
    if (tag) return event.tags.some((t) => t.name === tag);
    return true;
  });

  if (filteredEvents.length === 0) {
    return <p className="text-center mt-10">No events found</p>;
  }

  return (
    <div className="flex flex-wrap justify-center">
      {filteredEvents.map((event) => (
        <EventCard key={event.id} eventData={event} />
      ))}
    </div>
  );
};

export default EventsList;
