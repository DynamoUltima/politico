// Formats both legacy free-text dates (e.g. "Oct 28, 2023") and native
// <input type="date"> values (e.g. "2023-10-28") into a consistent display string.
export function formatDate(value) {
  if (!value) return '';

  const isoMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  // Parse ISO strings as local date components to avoid UTC day-shift.
  const date = isoMatch
    ? new Date(Number(isoMatch[1]), Number(isoMatch[2]) - 1, Number(isoMatch[3]))
    : new Date(value);

  if (isNaN(date.getTime())) return value;

  return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
}
