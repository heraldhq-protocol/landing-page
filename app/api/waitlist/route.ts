const FORM_VIEW_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfc9x2Dmbl4mXXS_7mArOqbEw0rVa1xgKovpF9AK80k5qMTeg/viewform";

const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfc9x2Dmbl4mXXS_7mArOqbEw0rVa1xgKovpF9AK80k5qMTeg/formResponse";

const entryIds: Record<string, string> = {
  fullName: "entry.665426303",
  workEmail: "entry.242279822",
  role: "entry.2000223748",
  website: "entry.1070070356",
  protocolName: "entry.1171760324",
  wallets: "entry.1951953669",
  useCase: "entry.21602620",
  channel: "entry.107119755",
};

const sentinelFields = [
  "entry.1951953669_sentinel",
  "entry.21602620_sentinel",
  "entry.107119755_sentinel",
];

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Fetch the form page to extract dynamic tokens
    const formPage = await fetch(FORM_VIEW_URL);
    const html = await formPage.text();

    const fbzx = html.match(/name="fbzx" value="([^"]+)"/)?.[1];
    const tag = html.match(/name="tag" value="([^"]+)"/)?.[1];

    if (!fbzx || !tag) {
      return Response.json(
        { success: false, error: "Could not extract form tokens" },
        { status: 500 }
      );
    }

    // 2. Build submission params
    const params = new URLSearchParams();

    // Entry fields
    for (const [key, entryId] of Object.entries(entryIds)) {
      const value = body[key];
      if (value) params.append(entryId, value);
    }

    // Sentinel fields (empty)
    for (const sentinel of sentinelFields) {
      params.append(sentinel, "");
    }

    // Required hidden fields
    params.append("fvv", "1");
    params.append("pageHistory", "0");
    params.append("fbzx", fbzx);
    params.append("tag", tag);
    params.append("partialResponse", `[null,null,"${fbzx}"]`);
    params.append("submissionTimestamp", "-1");

    // 3. Submit to Google Forms
    const response = await fetch(FORM_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    });

    if (!response.ok) {
      return Response.json(
        { success: false, error: "Google Forms rejected the submission" },
        { status: 502 }
      );
    }

    return Response.json({ success: true });
  } catch {
    return Response.json(
      { success: false, error: "Failed to forward submission" },
      { status: 500 }
    );
  }
}
