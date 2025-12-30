"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const CreateEventPage = () => {
  const [form, setForm] = useState({
    name: "",
    artist: "",
    date: "",
    tags: "",
    description: "",
    image: "",
  });
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form, tags: form.tags.split(",") };
      const res = await fetch("https://qevent-backend.labs.crio.do/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.status === 201) router.push("/events");
      else alert("Event creation failed");
    } catch (err) {
      console.error(err);
      alert("Event creation failed");
    }
  };

  return (
    <form className="p-4 flex flex-col gap-3" onSubmit={handleSubmit}>
      <input placeholder="Event Name" name="name" onChange={handleChange} />
      <input placeholder="Artist" name="artist" onChange={handleChange} />
      <input type="date" name="date" onChange={handleChange} />
      <input placeholder="Tags (comma separated)" name="tags" onChange={handleChange} />
      <input placeholder="Image URL" name="image" onChange={handleChange} />
      <textarea placeholder="Description" name="description" onChange={handleChange} />
      <button type="submit" className="bg-orange-400 text-white px-4 py-2">Create Event</button>
    </form>
  );
};

export default CreateEventPage;
