import { createClient } from "@supabase/supabase-js";

export * from "api/customer.api";
export * from "api/expo.api";
export * from "api/user.api";
export * from "api/expoActivity.api";
export * from "api/booking.api";

export const supabase = createClient(
  "https://edmyrapaqwyonmwrazea.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkbXlyYXBhcXd5b25td3JhemVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU0NTE5OTcsImV4cCI6MjAyMTAyNzk5N30.Z6UG91gwxr_6qIG8AZmRcQB758UtJ_MB0to4vw-xCok"
);
