import { getFormStats } from "@/actions/FormStats";
import Analytics from "@/components/Analytics";
import React from "react";

const page = async () => {
  const data = await getFormStats();

  return (
    <div>
      <Analytics noOfSubmissions={data || 0} />
    </div>
  );
};

export default page;
