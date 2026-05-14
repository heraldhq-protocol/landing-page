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

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const params = new URLSearchParams();
    for (const [key, entryId] of Object.entries(entryIds)) {
      const value = body[key];
      if (value) params.append(entryId, value);
    }

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
