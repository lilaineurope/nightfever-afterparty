// Messages are delivered to Lisa's inbox by Web3Forms. The access key is public by design and only
// identifies the form: the inbox address never appears on the site or in this code.
export const WEB3FORMS_KEY = "3d0712b7-d07c-41fa-a7dc-f0fef1d6994c";

/** Send a message to Lisa's inbox from the visitor's browser (Web3Forms' free plan only accepts browser requests). */
export async function sendToInbox(fields: Record<string, string>): Promise<boolean> {
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ access_key: WEB3FORMS_KEY, from_name: "Night Fever fan page", ...fields }),
    });
    const json = (await res.json().catch(() => ({}))) as { success?: boolean };
    return res.ok && !!json.success;
  } catch {
    return false;
  }
}
