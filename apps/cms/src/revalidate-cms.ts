import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from "payload";

async function requestWebsiteRevalidation() {
  const secret = process.env.PAYLOAD_REVALIDATE_SECRET;
  if (!secret) return;

  const url = process.env.PAYLOAD_REVALIDATE_URL || "http://localhost:3000/api/revalidate";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secret}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ source: "payload" }),
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      console.error(`Website cache revalidation returned HTTP ${response.status}.`);
    }
  } catch (error) {
    console.error("Website cache revalidation failed.", error);
  }
}

export const revalidateCollectionAfterChange: CollectionAfterChangeHook = async ({ doc }) => {
  await requestWebsiteRevalidation();
  return doc;
};

export const revalidateCollectionAfterDelete: CollectionAfterDeleteHook = async ({ doc }) => {
  await requestWebsiteRevalidation();
  return doc;
};

export const revalidateGlobalAfterChange: GlobalAfterChangeHook = async ({ doc }) => {
  await requestWebsiteRevalidation();
  return doc;
};
