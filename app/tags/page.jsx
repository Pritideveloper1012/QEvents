"use client";

import { useEffect, useState } from "react";
import Tag from "@/components/Tag";

export default function TagsPage() {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    fetch("https://qevent-backend.labs.crio.do/tags")
      .then((res) => res.json())
      .then((data) => setTags(data));
  }, []);

  return (
    <div className="flex gap-4 flex-wrap p-6">
      {tags.map((tag) => (
        // ✅ tag is object → pass tag.name
        <Tag key={tag.id} text={tag.name} />
      ))}
    </div>
  );
}
