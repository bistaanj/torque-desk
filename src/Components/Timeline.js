import React, { useMemo } from "react";

/**
 * Props:
 * - slotsMap: { [slotIndex:number]: "8:00 AM" }  // keys are 15-min slot indexes
 * - dayStart: "8:00 AM"                          // base time for slot index 0
 * - dayEnd: "5:00 PM"                            // end boundary for the timeline
 * - slotMinutes: 15                              // granularity
 */
export default function Timeline({
  slotsMap,
  dayStart = "8:00 AM",
  dayEnd = "5:00 PM",
  slotMinutes = 15,
}) {
  const { segments, tickLabels } = useMemo(() => {
    const parseTimeToMinutes = (timeStr) => {
      // "8:00 AM"
      const [time, meridiemRaw] = timeStr.trim().split(" ");
      const meridiem = meridiemRaw.toUpperCase();
      let [h, m] = time.split(":").map(Number);

      if (meridiem === "PM" && h !== 12) h += 12;
      if (meridiem === "AM" && h === 12) h = 0;

      return h * 60 + m;
    };

    const minutesToLabel = (mins) => {
      let h = Math.floor(mins / 60);
      const m = mins % 60;
      const meridiem = h >= 12 ? "PM" : "AM";
      h = h % 12;
      if (h === 0) h = 12;
      return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")} ${meridiem}`;
    };

    const startMin = parseTimeToMinutes(dayStart);
    const endMin = parseTimeToMinutes(dayEnd);

    // total slots between start and end
    const totalSlots = Math.max(1, Math.round((endMin - startMin) / slotMinutes));

    // busy set (keys that exist)
    const busySet = new Set(Object.keys(slotsMap || {}).map((k) => Number(k)));

    // Build boolean array for each slot: true=busy, false=idle
    const slotStatus = Array.from({ length: totalSlots }, (_, i) => busySet.has(i));

    // Compress into segments
    const segs = [];
    let segStart = 0;
    for (let i = 1; i <= slotStatus.length; i++) {
      const prev = slotStatus[i - 1];
      const curr = slotStatus[i];
      if (i === slotStatus.length || curr !== prev) {
        segs.push({
          busy: prev,
          startIdx: segStart,
          endIdx: i, // exclusive
          minutes: (i - segStart) * slotMinutes,
          labelStart: minutesToLabel(startMin + segStart * slotMinutes),
          labelEnd: minutesToLabel(startMin + i * slotMinutes),
        });
        segStart = i;
      }
    }

    // Tick labels at each segment boundary (including start + end)
    const ticks = [];
    segs.forEach((s, idx) => {
      if (idx === 0) ticks.push({ idx: s.startIdx, label: s.labelStart });
      ticks.push({ idx: s.endIdx, label: s.labelEnd });
    });

    return { segments: segs, tickLabels: ticks };
  }, [slotsMap, dayStart, dayEnd, slotMinutes]);

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-900">This is how your day looks</h3>

        <div className="flex items-center gap-3 text-xs text-gray-600">
          <span className="inline-flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-sm bg-gray-200 ring-1 ring-gray-300" />
            No work
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-sm bg-blue-500" />
            Appointment
          </span>
        </div>
      </div>

      {/* Timeline bar */}
      <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">
        <div className="flex h-12 w-full overflow-hidden rounded-xl bg-gray-50 ring-1 ring-gray-200">
          {segments.map((seg, i) => (
            <div
              key={`${seg.startIdx}-${seg.endIdx}-${seg.busy}`}
              className={[
                "group relative h-full",
                seg.busy ? "bg-blue-500" : "bg-gray-200",
                seg.busy ? "hover:bg-blue-600" : "hover:bg-gray-300",
              ].join(" ")}
              style={{
                width: `${(seg.minutes / (segments.reduce((a, s) => a + s.minutes, 0))) * 100}%`,
              }}
              title={`${seg.labelStart} - ${seg.labelEnd} • ${seg.busy ? "Appointment" : "No work"}`}
            >
              {/* subtle separators */}
              <div className="absolute right-0 top-0 h-full w-px bg-white/50" />

              {/* hover tooltip */}
              <div className="pointer-events-none absolute left-1/2 top-1 -translate-x-1/2 -translate-y-full opacity-0 transition-opacity group-hover:opacity-100">
                <div className="rounded-lg bg-gray-900 px-2 py-1 text-[11px] text-white shadow">
                  {seg.labelStart} – {seg.labelEnd}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Labels row */}
        <div className="mt-2 flex w-full items-center justify-between text-[11px] text-gray-600">
          {/* Show only a few labels nicely: start, some middle boundaries, end */}
          {(() => {
            // pick up to 6 evenly spaced tick labels
            const unique = [];
            const seen = new Set();
            for (const t of tickLabels) {
              const key = `${t.idx}-${t.label}`;
              if (!seen.has(key)) {
                seen.add(key);
                unique.push(t);
              }
            }

            const maxLabels = 6;
            if (unique.length <= maxLabels) {
              return unique.map((t) => <span key={t.idx + t.label}>{t.label}</span>);
            }

            const picked = [];
            for (let i = 0; i < maxLabels; i++) {
              const at = Math.round((i * (unique.length - 1)) / (maxLabels - 1));
              picked.push(unique[at]);
            }

            return picked.map((t) => <span key={t.idx + t.label}>{t.label}</span>);
          })()}
        </div>
      </div>
    </div>
  );
}

/* ------------------ Usage Example ------------------

const dummyAvailableSlots = {
  0: "8:00 AM",
  1: "8:15 AM",
  2: "8:30 AM",
  3: "8:45 AM",
  4: "9:00 AM",
  5: "9:15 AM",
  6: "9:30 AM",
  7: "9:45 AM",
  12: "11:00 AM",
  16: "12:00 PM",
  17: "12:15 PM",
  18: "1:30 PM",
  23: "1:45 PM",
  28: "3:00 PM",
  29: "3:15 PM",
};

<AppointmentTimeline
  slotsMap={dummyAvailableSlots}
  dayStart="8:00 AM"
  dayEnd="4:00 PM"
  slotMinutes={15}
/>

---------------------------------------------------- */
