import React, { useEffect } from "react";
import { useApiDataStore } from "@/store";

const Activities = () => {
  const { fetchData, data, loading, error } = useApiDataStore();

  useEffect(() => {
    fetchData("/api/activities");
  }, [fetchData]);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;

  if (!data || data[0]?.length === 0 || !data[0][0]?.notification_id)
    return <div>No data available.</div>;

  return (
    <section>
      <h1 className="text-3xl font-bold text-base-content mb-4">
        Activities
      </h1>

      <div className="space-y-6">
        {data[0].map((activity) => (
          <div
            key={activity.notification_id}
            className="grid gap-2 pb-4 bg-base-100 p-4 rounded"
          >
            <h3 className="font-bold">{activity.event_type}</h3>
            <p className="text-sm">{activity.message}</p>
            <p className="text-sm">{activity.created_at.split("T")[0]}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-4">
        <button className="btn btn-primary">View All</button>
      </div>
    </section>
  );
};

export default Activities;
