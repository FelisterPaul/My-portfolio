import { useState, useEffect } from 'react';

export default function useProjects(status = 'ongoing') {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        // Use full backend URL when frontend runs on a different port
        const endpoint = `http://localhost:5000/api/projects?status=${status}`;
        console.log("🔍 Fetching from:", endpoint);

        const res = await fetch(endpoint, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });

        // Detect invalid JSON response
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Received non-JSON response. Is the backend running?");
        }

        if (!res.ok) {
          throw new Error(`Fetch failed with status ${res.status} — ${res.statusText}`);
        }

        const data = await res.json();
        console.log("✅ Projects received:", data);

        setProjects(data);
      } catch (err) {
        console.error("❌ Error fetching projects:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, [status]);

  return { projects, loading, error };
}
