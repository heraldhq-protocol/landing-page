export function ogUrl(title: string, subtitle: string, description: string) {
  const params = new URLSearchParams({ title, subtitle, description });
  return `/api/og?${params.toString()}`;
}
