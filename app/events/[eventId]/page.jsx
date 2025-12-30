
import Link from "next/link";

const EventDetailsPage = async ({ params }) => {
  const { eventId } = params;

  let event = null;
  let error = "";

  try {
    const res = await fetch("https://qevent-backend.labs.crio.do/events", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch events");

    const events = await res.json();

    // Find the event by id (note: some ids are strings)
    event = events.find((e) => String(e.id) === String(eventId));

    if (!event) throw new Error("Event not found");
  } catch (err) {
    error = err.message;
  }

  if (error) {
    return (
      <div className="text-center mt-20">
        <h1 className="text-3xl font-bold mb-4">404 - Event Not Found</h1>
        <p className="mb-6">{error}</p>
        <Link href="/events" className="px-4 py-2 bg-blue-500 text-white rounded">
          Back to Events
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img
        src={event.image || "/placeholder.png"}
        alt={event.name}
        className="w-full h-[400px] object-cover rounded-lg"
      />
      <div className="mt-6">
        <h1 className="text-4xl font-bold">{event.name}</h1>
        <p className="text-gray-500 mt-2">
          {new Date(event.date).toDateString()} | {event.time}
        </p>
        <p className="mt-4">{event.description || "No description available."}</p>
        <div className="mt-6 flex justify-between">
          <h3 className="text-xl font-semibold">{event.artist || "Unknown Artist"}</h3>
          <h3 className="text-xl font-semibold">
            {event.price > 0 ? `$${event.price}` : "FREE"}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;
